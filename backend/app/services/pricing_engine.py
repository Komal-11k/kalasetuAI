def calculate_pricing(material_cost, labor_hours, hourly_rate, packaging_cost, transport_cost, desired_margin_percent):
    labor_cost = labor_hours * hourly_rate
    cost_floor = material_cost + labor_cost + packaging_cost + transport_cost

    margin_multiplier_min = 1 + (desired_margin_percent / 100)
    margin_multiplier_max = 1 + ((desired_margin_percent + 20) / 100)

    recommended_min = round(cost_floor * margin_multiplier_min, 2)
    recommended_max = round(cost_floor * margin_multiplier_max, 2)

    bulk_min = round(cost_floor * 1.15, 2)
    bulk_max = round(cost_floor * 1.30, 2)

    return {
        "cost_floor": round(cost_floor, 2),
        "recommended_min": recommended_min,
        "recommended_max": recommended_max,
        "bulk_min": bulk_min,
        "bulk_max": bulk_max,
    }