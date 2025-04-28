import os
import httpx
from dotenv import load_dotenv
from app.models.issue_model import Issue, RepositoryInfo
import asyncio

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_API_URL = "https://api.github.com/graphql"

HEADERS = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Content-Type": "application/json"
}

# Helper to load GraphQL query
def load_query(filename: str) -> str:
    filepath = os.path.join(os.path.dirname(__file__), "..", "queries", filename)
    with open(filepath, "r") as file:
        return file.read()

FETCH_GOOD_FIRST_ISSUES_QUERY = load_query("fetch_issues.graphql")

async def fetch_all_issues_from_github() -> list[Issue]:
    all_issues = []
    after_cursor = None
    query_string = 'label:"good first issue" state:open created:>=2023-04-27 is:issue'

    total_fetched = 0
    page_num = 1

    async with httpx.AsyncClient(timeout=20) as client:
        while True:
            variables = {
                "queryString": query_string,
                "first": 100,
                "after": after_cursor
            }

            for attempt in range(3):  # Up to 3 tries
                try:
                    response = await client.post(
                        GITHUB_API_URL,
                        headers=HEADERS,
                        json={"query": FETCH_GOOD_FIRST_ISSUES_QUERY, "variables": variables}
                    )
                    response.raise_for_status()
                    result = response.json()

                    if "errors" in result:
                        raise Exception(f"GitHub API error: {result['errors']}")
                    if "data" not in result:
                        raise Exception(f"Invalid GitHub API response: {result}")

                    break  

                except httpx.HTTPError as e:
                    if e.response.status_code == 403:
                            print("⚠️ Got 403 Forbidden. Sleeping for 60 seconds before retrying...")
                            await asyncio.sleep(60)
                            continue
                    print(f"❌ HTTP error (try {attempt+1}): {e}")
                    await asyncio.sleep(2 * (attempt + 1))  # backoff
                except Exception as e:
                    print(f"❌ Unexpected error (try {attempt+1}): {e}")
                    await asyncio.sleep(2 * (attempt + 1))
            else:
                raise Exception("❌ Failed to fetch from GitHub after 3 attempts.")

            search_data = result["data"]["search"]
            nodes = search_data["nodes"]

            fetched_this_page = len(nodes)
            total_fetched += fetched_this_page
            print(f"✅ Page {page_num}: Fetched {fetched_this_page} issues, Total so far: {total_fetched}")

            page_num += 1

            for node in nodes:
                repo = node["repository"]
                issue = Issue(
                    title=node["title"],
                    url=node["url"],
                    createdAt=node["createdAt"],
                    updatedAt=node["updatedAt"],
                    labels=[label["name"] for label in node["labels"]["nodes"]],
                    commentsCount=node["comments"]["totalCount"],
                    isAssigned=node["assignees"]["totalCount"] > 0,
                    repository=RepositoryInfo(
                        name=repo["name"],
                        fullName=f'{repo["owner"]["login"]}/{repo["name"]}',
                        description=repo["description"],
                        owner=repo["owner"]["login"],
                        stars=repo["stargazerCount"],
                        language=repo["primaryLanguage"]["name"] if repo["primaryLanguage"] else None,
                        topics=[topic["topic"]["name"] for topic in repo["repositoryTopics"]["nodes"]],
                        lastCommit=repo["pushedAt"],
                        visibility=repo["visibility"]
                    ),
                    organization=repo["owner"]["login"]
                )
                all_issues.append(issue)

            if not search_data["pageInfo"]["hasNextPage"]:
                print(f"✅ Completed fetching. Total issues fetched: {total_fetched}")
                break

            after_cursor = search_data["pageInfo"]["endCursor"]

            await asyncio.sleep(1)  #  sleep between pages to avoid rate limiting

    return all_issues
