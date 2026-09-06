import json
import os

SCHEMES_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "schemes.json")

def load_schemes():
    with open(SCHEMES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def match_schemes(state: str, craft_type: str, business_stage: str, gender: str = None):
    schemes = load_schemes()
    matched = []
    craft_type_lower = craft_type.lower()

    for scheme in schemes:
        state_match = "all" in scheme["applicable_states"] or state.lower() in [s.lower() for s in scheme["applicable_states"]]
        craft_match = "all" in scheme["applicable_crafts"] or any(c in craft_type_lower for c in scheme["applicable_crafts"])

        if state_match and craft_match:
            matched.append({
                "name": scheme["name"],
                "description": scheme["description"],
                "benefits": scheme["benefits"],
                "eligibility": scheme["eligibility"],
                "documents_required": scheme["documents_required"],
            })

    return matched