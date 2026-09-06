import google.generativeai as genai
from app.config import GEMINI_API_KEY
import PIL.Image
import io
import json

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-3.6-flash")

def generate_catalog_listing(voice_text: str, language: str = "en", image_bytes: bytes = None):
    prompt = f"""You are helping an artisan create a product listing from their spoken description and a photo of the product.

Artisan's description (in {language}): "{voice_text}"

Generate a structured product listing as JSON with these exact fields:
- title (short, appealing product title)
- category (product category)
- craft_type (type of craft/technique used)
- material (materials used)
- description (2-3 sentence professional description)
- tags (array of 5 relevant tags)

Respond ONLY with valid JSON, no other text."""

    content = [prompt]

    if image_bytes:
        image = PIL.Image.open(io.BytesIO(image_bytes))
        content.append(image)

    response = model.generate_content(content)

    cleaned_response = response.text.strip()

    # Remove markdown JSON formatting if Gemini adds it
    if cleaned_response.startswith("```json"):
        cleaned_response = cleaned_response.replace("```json", "", 1)

    if cleaned_response.startswith("```"):
        cleaned_response = cleaned_response.replace("```", "", 1)

    if cleaned_response.endswith("```"):
        cleaned_response = cleaned_response[:-3]

    return json.loads(cleaned_response.strip())