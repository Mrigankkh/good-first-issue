from app.services.github_service import fetch_all_issues_from_github

async def get_issues(language, organization, sort, limit):
    issues = await fetch_all_issues_from_github()
    return {"success": True, "data": issues}
