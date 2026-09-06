from fastapi import APIRouter
from app.models.schemas import ArtisanProfile
from app.services.scheme_engine import match_schemes

router = APIRouter(prefix="/api/schemes", tags=["Schemes"])

@router.post("/match")
def get_matching_schemes(profile: ArtisanProfile):
    results = match_schemes(
        state=profile.state,
        craft_type=profile.craft_type,
        business_stage=profile.business_stage,
        gender=profile.gender,
    )
    return {"matched_schemes": results, "count": len(results)}