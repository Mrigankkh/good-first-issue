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

async def refresh_loop():
    print("🚀 Worker started successfully. Beginning refresh loop.")

    while True:
        last_updated = await get_last_updated_timestamp()
        now = int(time.time())
        
        if last_updated:
            elapsed_time = now - last_updated
            if elapsed_time < REFRESH_INTERVAL:
                sleep_for = REFRESH_INTERVAL - elapsed_time
                print(f"⏳ Last refresh was {elapsed_time/3600:.2f} hours ago. Sleeping for {sleep_for/3600:.2f} more hours...")
                await asyncio.sleep(sleep_for)


        await refresh_issues()

        print(f"⏳ Sleeping for {REFRESH_INTERVAL / 3600:.1f} hours until next refresh...")
        await asyncio.sleep(REFRESH_INTERVAL)

if __name__ == "__main__":
    try:
        asyncio.run(refresh_loop())
    except KeyboardInterrupt:
        print("👋 Worker shutdown requested. Exiting gracefully.")
    except Exception as e:
        print(f"❌ Critical Worker Error: {e}")
