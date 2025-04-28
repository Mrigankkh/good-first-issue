from fastapi import FastAPI
import asyncio
from app.routes.issues import router as issues_router
from app.services.github_service import fetch_all_issues_from_github
from app.services.issues_store import save_issues_to_cache
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the /api/issues route
app.include_router(issues_router, prefix="/api/issues")

async def refresh_issues_loop():
    while True:
        try:
            print("Refreshing issues from GitHub...")
            issues = await fetch_all_issues_from_github()
            await save_issues_to_cache(issues)
            print(f"✅ Fetched and cached {len(issues)} issues successfully.")
        except Exception as e:
            print(f"❌ Error refreshing issues: {e}")
        await asyncio.sleep(6 * 60 * 60)  # 6 hours = 21600 seconds


# Start background refresh on server startup
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(refresh_issues_loop())

# Basic health check
@app.get("/")
def read_root():
    return {"message": "Backend server is running!"}
