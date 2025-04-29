import json
import os
import asyncio
import redis.asyncio as redis
from app.models.issue_model import Issue
from dotenv import load_dotenv
import time

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")
REDIS_KEY = "goodfirstissue"
LAST_UPDATED_KEY = "goodfirstissue:last_updated"

r = redis.from_url(
    REDIS_URL,
    decode_responses=True,
    max_connections=5
)


async def update_last_updated_timestamp():
    timestamp = int(time.time())
    await r.set(LAST_UPDATED_KEY, timestamp)

async def get_last_updated_timestamp() -> int | None:
    data = await r.get(LAST_UPDATED_KEY)
    if data:
        return int(data)
    return None

async def save_issues_to_cache(issues: list[Issue]):
    try:
        serialized_issues = [issue.dict() for issue in issues]
        await r.set(REDIS_KEY, json.dumps(serialized_issues))
        await r.expire(REDIS_KEY, 25200)  # 7 hours
    except Exception as e:
        print(f"❌ Redis write error: {e}")

async def load_issues_from_cache() -> list[Issue]:
    try:
        data = await r.get(REDIS_KEY)
        if data:
            issues_raw = json.loads(data)
            return [Issue(**issue) for issue in issues_raw]
    except Exception as e:
        print(f"❌ Redis read error: {e}")

    return []

async def clear_issues_cache():
    try:
        await r.delete(REDIS_KEY)
    except Exception as e:
        print(f"❌ Redis clear error: {e}")
