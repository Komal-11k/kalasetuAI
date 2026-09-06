from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import cataloging, pricing, schemes

app = FastAPI(title="KalaSetu AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cataloging.router)
app.include_router(pricing.router)
app.include_router(schemes.router)

@app.get("/")
def health_check():
    return {"status": "KalaSetu AI backend is running"}