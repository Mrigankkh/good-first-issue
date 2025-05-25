import argparse
import asyncio
import time
from app.services.github_service import fetch_all_issues_from_github
from app.services.issues_store import (
    save_issues_to_cache,
    update_last_updated_timestamp,
    get_last_updated_timestamp,
)

REFRESH_INTERVAL = 6 * 60 * 60  # 6 hours in seconds


async def refresh_issues():
    print("🔄 Starting refresh cycle...")

    try:
        issues = await fetch_all_issues_from_github()

        if not issues:
            print("⚠️ No issues fetched from GitHub. Skipping cache update.")
            return

        await save_issues_to_cache(issues)
        await update_last_updated_timestamp()

        print(f"✅ Saved {len(issues)} issues to Redis cache successfully.")

    except Exception as e:
        print(f"❌ Error during refresh: {e}")


async def refresh_loop(force: bool = False):
    print("🚀 Worker started successfully. Beginning refresh loop.")

    if force:
        print("⚡ Force refresh enabled. Skipping wait and refreshing immediately.")
        await refresh_issues()
        print(
            f"⏳ Sleeping for {REFRESH_INTERVAL / 3600:.1f} hours until next refresh..."
        )
        await asyncio.sleep(REFRESH_INTERVAL)

    while True:
        last_updated = await get_last_updated_timestamp()
        now = int(time.time())

        if last_updated:
            elapsed_time = now - last_updated
            if elapsed_time < REFRESH_INTERVAL:
                sleep_for = REFRESH_INTERVAL - elapsed_time
                print(
                    f"⏳ Last refresh was {elapsed_time / 3600:.2f} hours ago. Sleeping for {sleep_for / 3600:.2f} more hours..."
                )
                await asyncio.sleep(sleep_for)

        await refresh_issues()
        print(
            f"⏳ Sleeping for {REFRESH_INTERVAL / 3600:.1f} hours until next refresh..."
        )
        await asyncio.sleep(REFRESH_INTERVAL)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Start the GitHub issue refresh worker."
    )
    parser.add_argument(
        "-f", "--force", action="store_true", help="Force immediate refresh on start"
    )

    args = parser.parse_args()

    try:
        asyncio.run(refresh_loop(force=args.force))
    except KeyboardInterrupt:
        print("👋 Worker shutdown requested. Exiting gracefully.")
    except Exception as e:
        print(f"❌ Critical Worker Error: {e}")
