#!/usr/bin/env bash

set -euo pipefail

if (($# != 2)); then
	printf 'usage: %s BASE_SHA CANDIDATE_SHA\n' "$0" >&2
	exit 2
fi

base_sha=$1
candidate_sha=$2

for value in "$base_sha" "$candidate_sha"; do
	if [[ ! $value =~ ^[0-9a-f]{40}$ ]]; then
		printf 'invalid commit SHA: %s\n' "$value" >&2
		exit 2
	fi
	git cat-file -e "${value}^{commit}"
done

if ! git merge-base --is-ancestor "$base_sha" "$candidate_sha"; then
	printf '%s is not based on %s\n' "$candidate_sha" "$base_sha" >&2
	exit 1
fi

while IFS= read -r changed_path; do
	[[ -z $changed_path ]] && continue
	if [[ $changed_path != data/livestreams.json && ! $changed_path =~ ^static/chats/[A-Za-z0-9_-]{6,16}\.json$ ]]; then
		printf 'candidate changes a non-generated path: %s\n' "$changed_path" >&2
		exit 1
	fi

	entry=$(git ls-tree "$candidate_sha" -- "$changed_path")
	if [[ -n $entry ]]; then
		metadata=${entry%%$'\t'*}
		read -r mode type _object <<<"$metadata"
		if [[ $mode != 100644 || $type != blob ]]; then
			printf 'candidate generated path is not a regular non-executable file: %s (%s %s)\n' \
				"$changed_path" "$mode" "$type" >&2
			exit 1
		fi
	fi
done < <(git diff --name-only --diff-filter=ACDMRTUXB "$base_sha" "$candidate_sha")

trusted_paths=(
	.github/scripts/validate-bot-candidate.sh
	.github/workflows/ci.yml
	.github/workflows/publish-data-check-tag.yml
	.github/workflows/update-livestreams.yml
	.markdownlint-cli2.yaml
	lighthouserc.cjs
	package-lock.json
	package.json
	playwright.config.ts
	tsconfig.json
	vitest.config.ts
)

for trusted_path in "${trusted_paths[@]}"; do
	if ! git diff --quiet "$base_sha" "$candidate_sha" -- "$trusted_path"; then
		printf 'candidate changes trusted CI configuration: %s\n' "$trusted_path" >&2
		exit 1
	fi
done

printf 'validated generated-data candidate %s against %s\n' "$candidate_sha" "$base_sha"
