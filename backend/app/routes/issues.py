from fastapi import APIRouter, Query
from app.controllers.issues_controller import get_issues, get_issue_last_updated


router = APIRouter()

# At the moment, the issue endpoint has a few query params. This is if it is required in the future if I plan to do the sort and filter on backend
@router.get("/issues")
async def fetch_issues(
    language: str = Query(None),
    organization: str = Query(None),
    sort: str = Query(None),
    limit: int = Query(20)
):
    return await get_issues()

@router.get("/last_updated")
async def get_last_updated():
    return await get_issue_last_updated()