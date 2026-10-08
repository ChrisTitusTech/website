export const implicitNetworkPrefix = "implicit-network-target:";

const valueOptions = {
  curl: new Set([
    "-o",
    "--output",
    "-H",
    "--header",
    "-A",
    "--user-agent",
    "-d",
    "--data",
    "--data-raw",
    "--data-binary",
    "--data-urlencode",
    "-X",
    "--request",
    "-u",
    "--user",
    "-b",
    "--cookie",
    "-c",
    "--cookie-jar",
    "-e",
    "--referer",
    "-m",
    "--max-time",
    "--connect-timeout",
    "--retry",
    "--retry-delay",
    "--proto-default",
    "--proto",
    "--proto-redir",
    "-w",
    "--write-out",
    "-F",
    "--form",
    "-T",
    "--upload-file",
    "-K",
    "--config",
  ]),
  wget: new Set([
    "-O",
    "--output-document",
    "-o",
    "--output-file",
    "-P",
    "--directory-prefix",
    "-U",
    "--user-agent",
    "--header",
    "--user",
    "--password",
    "--timeout",
    "--tries",
    "--post-data",
    "--post-file",
    "-i",
    "--input-file",
    "--referer",
  ]),
};
const urlOptions = {
  curl: new Set(["--url", "-x", "--proxy", "--preproxy", "--doh-url"]),
  wget: new Set(["-B", "--base"]),
};

// Classify literal curl/wget arguments without executing or interpreting shell
// code. Unrecognized option values stay URL candidates and fail closed.
export function networkCommandArguments(text) {
  const urls = [],
    nonUrlRanges = [];
  const source = text.replace(/\\\r?\n/g, (match) => " ".repeat(match.length));
  const tokens = source.matchAll(
    /(?:\d*|&)(?:>>?|<)(?:&(?:\d+|-))?|(?:'[^']*'|"(?:\\[\s\S]|[^"\\])*"|\\[\s\S]|[^\s"'\\;&|<>])+|[;&|\n]/g,
  );
  let command = null,
    atStart = true,
    pending = null,
    optionsEnded = false,
    redirectOperand = false;
  const target = (value) =>
    urls.push(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(value) && !/[$`]/.test(value)
        ? value
        : implicitNetworkPrefix + encodeURIComponent(value),
    );
  for (const token of tokens) {
    const raw = token[0];
    if (/^[;&|\n]$/.test(raw)) {
      command = null;
      atStart = true;
      pending = null;
      optionsEnded = false;
      redirectOperand = false;
      continue;
    }
    const word = raw.replace(
      /'([^']*)'|"((?:\\[\s\S]|[^"\\])*)"/g,
      (_match, single, double) => single ?? double,
    );
    const range = [token.index, token.index + raw.length];
    if (redirectOperand) {
      nonUrlRanges.push(range);
      redirectOperand = false;
      continue;
    }
    if (command && /^(?:\d*|&)(?:>>?|<)(?:&(?:\d+|-))?$/.test(raw)) {
      nonUrlRanges.push(range);
      redirectOperand = !/&(?:\d+|-)$/.test(raw);
      continue;
    }
    if (!command) {
      if (
        atStart &&
        (/^(?:sudo|env|exec|command|if|then|do|!|\$)$/.test(word) ||
          /^[A-Za-z_]\w*=/.test(word))
      )
        continue;
      const found = atStart && word.match(/(?:^|\/)(curl|wget)(?:\.exe)?$/i);
      if (found) {
        command = found[1].toLowerCase();
        nonUrlRanges.push(range);
      }
      atStart = false;
      continue;
    }
    if (word.startsWith("#")) {
      command = null;
      atStart = false;
      continue;
    }
    if (pending) {
      if (pending === "url") target(word);
      else nonUrlRanges.push(range);
      pending = null;
      continue;
    }
    if (!optionsEnded && word === "--") {
      optionsEnded = true;
      continue;
    }
    if (!optionsEnded && word.startsWith("-")) {
      const equals = word.indexOf("=");
      const flag = equals < 0 ? word : word.slice(0, equals);
      const role = urlOptions[command].has(flag)
        ? "url"
        : valueOptions[command].has(flag)
          ? "value"
          : null;
      if (role) {
        if (equals < 0) pending = role;
        else if (role === "url") target(word.slice(equals + 1));
        else nonUrlRanges.push(range);
      } else if (!word.startsWith("--")) {
        for (let index = 1; index < word.length; index++) {
          const short = `-${word[index]}`;
          const shortRole = urlOptions[command].has(short)
            ? "url"
            : valueOptions[command].has(short)
              ? "value"
              : null;
          if (!shortRole) continue;
          if (index === word.length - 1) pending = shortRole;
          else if (shortRole === "url") target(word.slice(index + 1));
          else nonUrlRanges.push(range);
          break;
        }
      }
      continue;
    }
    target(word);
  }
  return { urls, nonUrlRanges };
}
