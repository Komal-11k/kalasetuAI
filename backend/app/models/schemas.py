from pydantic import BaseModel
from typing import Optional

class PricingRequest(BaseModel):
    material_cost: float
    labor_hours: float
    hourly_rate: float
    packaging_cost: float
    transport_cost: float
    desired_margin_percent: float

class PricingResponse(BaseModel):
    cost_floor: float
    recommended_min: float
    recommended_max: float
    bulk_min: float
    bulk_max: float

class ArtisanProfile(BaseModel):
    state: str
    craft_type: str
    annual_income: Optional[float] = None
    business_stage: str
    gender: Optional[str] = None

class CatalogRequest(BaseModel):
    voice_text: str
    language: Optional[str] = "en"