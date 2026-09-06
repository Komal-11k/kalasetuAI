import json
from fastapi import APIRouter, HTTPException
from app.models.schemas import CatalogRequest
from app.services.llm_service import generate_catalog_listing

router = APIRouter(prefix="/api/catalog", tags=["Cataloging"])

@router.post("/generate")
def generate_listing(request: CatalogRequest):
    try:
        raw_response = generate_catalog_listing(request.voice_text, request.language)
        cleaned = raw_response.strip().removeprefix("```json").removesuffix("```").strip()
        listing = json.loads(cleaned)
        return listing
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Could not parse AI response as JSON")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))