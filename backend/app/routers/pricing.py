from fastapi import APIRouter
from app.models.schemas import PricingRequest, PricingResponse
from app.services.pricing_engine import calculate_pricing

router = APIRouter(prefix="/api/pricing", tags=["Pricing"])

@router.post("/calculate", response_model=PricingResponse)
def get_pricing(request: PricingRequest):
    result = calculate_pricing(
        request.material_cost,
        request.labor_hours,
        request.hourly_rate,
        request.packaging_cost,
        request.transport_cost,
        request.desired_margin_percent,
    )
    return result