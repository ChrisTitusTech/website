#!/usr/bin/env python3
"""Shared, bounded HTTP retry policy for livestream automation."""

from __future__ import annotations

import requests
from requests.adapters import HTTPAdapter
from urllib3.util import Retry


RETRY_COUNT = 4
# The only current POST calls mint Twitch app tokens and are safe to repeat.
RETRYABLE_METHODS = frozenset({"GET", "POST"})
RETRYABLE_STATUS_CODES = frozenset({408, 429, 500, 502, 503, 504})


def build_retry_policy() -> Retry:
    """Return the bounded retry policy used by trusted automation APIs."""
    return Retry(
        total=RETRY_COUNT,
        connect=RETRY_COUNT,
        read=RETRY_COUNT,
        status=RETRY_COUNT,
        other=0,
        allowed_methods=RETRYABLE_METHODS,
        status_forcelist=RETRYABLE_STATUS_CODES,
        backoff_factor=1.0,
        backoff_max=30.0,
        backoff_jitter=0.5,
        respect_retry_after_header=True,
        retry_after_max=60,
        raise_on_status=False,
    )


def create_retry_session() -> requests.Session:
    """Create a session that retries transient API failures and nothing else."""
    session = requests.Session()
    adapter = HTTPAdapter(max_retries=build_retry_policy())
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session
