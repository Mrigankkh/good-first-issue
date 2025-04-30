from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.issues import router as issues_router
from worker import refresh_loop  
import asyncio
app = FastAPI()

@app.on_event("startup")
async def start_worker():
    asyncio.create_task(refresh_loop())
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Monitoring"])
async def health_check():
    return {"status": "ok"}

# Mount main API routers
app.include_router(issues_router, prefix="/api", tags=["Issues"])
