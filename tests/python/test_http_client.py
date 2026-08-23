from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from urllib3.exceptions import MaxRetryError, ProtocolError


ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / "scripts"
sys.path.insert(0, str(SCRIPTS))

from http_client import (  # noqa: E402
    RETRY_COUNT,
    RETRYABLE_STATUS_CODES,
    build_retry_policy,
    create_retry_session,
)


class RetryPolicyTests(unittest.TestCase):
    def test_mounts_the_same_bounded_policy_for_http_and_https(self) -> None:
        session = create_retry_session()

        for prefix in ("http://", "https://"):
            retry = session.get_adapter(prefix).max_retries
            self.assertEqual(retry.total, RETRY_COUNT)
            self.assertEqual(retry.connect, RETRY_COUNT)
            self.assertEqual(retry.read, RETRY_COUNT)
            self.assertEqual(retry.status, RETRY_COUNT)
            self.assertEqual(retry.other, 0)
            self.assertEqual(retry.backoff_max, 30.0)
            self.assertEqual(retry.retry_after_max, 60)
            self.assertTrue(retry.respect_retry_after_header)

    def test_retries_only_transient_statuses_for_get_and_token_post(self) -> None:
        retry = build_retry_policy()

        for status in RETRYABLE_STATUS_CODES:
            self.assertTrue(retry.is_retry("GET", status))
            self.assertTrue(retry.is_retry("POST", status))
        for status in (400, 401, 403, 404):
            self.assertFalse(retry.is_retry("GET", status))
            self.assertFalse(retry.is_retry("POST", status))

    def test_retry_after_is_honored_but_bounded(self) -> None:
        retry = build_retry_policy()
        response = Mock(headers={"Retry-After": "120"})

        self.assertEqual(retry.get_retry_after(response), 60)

    def test_connection_reset_is_retried_then_fails_closed_when_exhausted(self) -> None:
        retry = build_retry_policy()
        error = ProtocolError(
            "Connection aborted.",
            ConnectionResetError(104, "Connection reset by peer"),
        )

        for remaining in range(RETRY_COUNT - 1, -1, -1):
            retry = retry.increment(method="GET", url="/playlistItems", error=error)
            self.assertEqual(retry.total, remaining)
            self.assertEqual(retry.read, remaining)

        with self.assertRaises(MaxRetryError):
            retry.increment(method="GET", url="/playlistItems", error=error)


class YouTubeCredentialTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        spec = importlib.util.spec_from_file_location(
            "fetch_livestreams_test_module",
            SCRIPTS / "fetch-livestreams.py",
        )
        if spec is None or spec.loader is None:
            raise RuntimeError("could not load fetch-livestreams.py")
        cls.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.module)

    def test_api_key_uses_header_and_never_query_parameters(self) -> None:
        secret = "test-secret-do-not-log"
        response = Mock(status_code=200)
        response.json.return_value = {"items": []}

        with (
            patch.object(self.module, "API_KEY", secret),
            patch.object(self.module.HTTP, "get", return_value=response) as get,
        ):
            self.assertEqual(self.module.fetch_playlist_items(), [])

        _, kwargs = get.call_args
        self.assertNotIn("key", kwargs["params"])
        self.assertEqual(kwargs["headers"], {"X-Goog-Api-Key": secret})
        self.assertNotIn(secret, get.call_args.args[0])
        response.raise_for_status.assert_called_once_with()


if __name__ == "__main__":
    unittest.main()
