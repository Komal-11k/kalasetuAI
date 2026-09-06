import json

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.llm_service import generate_catalog_listing

router = APIRouter(prefix="/api/catalog", tags=["Cataloging"])


@router.post("/generate")
async def generate_listing(
    voice_text: str = Form(...),
    language: str = Form(...),
    photo: UploadFile = File(...)
):
    try:
        image_bytes = await photo.read()

        result = generate_catalog_listing(
            voice_text,
            language,
            image_bytes
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )