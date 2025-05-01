from app.services.issues_store import load_issues_from_cache, get_last_updated_timestamp
from fastapi import HTTPException
from typing import List
from app.models.issue_model import Issue
import time 
async def get_issues() -> List[Issue]:
    try:
        issues = await load_issues_from_cache()
        return {"success": True, "data": issues}
    except Exception as e:
        print(f"❌ Error loading issues from Redis: {e}")
        raise HTTPException(status_code=500, detail="Internal server error fetching issues.")



async def get_issue_last_updated() -> int:
    try:
        last_updated = await get_last_updated_timestamp()
        now = int(time.time())
        if last_updated:
            elapsed_time = now - last_updated
            return {"success": True,"data": f"{elapsed_time/3600:.2f}"} 
    except Exception as e:
        print(f"❌ Error loading last updated timestamp from Redis: {e}")
        raise HTTPException(status_code=500, detail="Internal server error fetching last updated timestamp.")