"""Recommendation engine aligned with this workspace structure.

It uses:
- frontend input shape from `frontend/src/utils/carbonCalculator.js`
- dataset `personal_carbon_footprint_behavior.csv` at workspace root
- trained ML models from ecotrack_ml_training.ipynb (.pkl files)

Run directly to test:
    python machine_lr/recommendation_engine.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Optional
import pickle
import warnings
warnings.filterwarnings('ignore')

import pandas as pd
import numpy as np

# ── Paths ─────────────────────────────────────────────────────
WORKSPACE_ROOT   = Path(__file__).resolve().parents[1]
ML_DIR           = Path(__file__).resolve().parent        # machine_lr/
DEFAULT_DATASET  = WORKSPACE_ROOT / "personal_carbon_footprint_behavior.csv"
CLF_PATH         = ML_DIR / "ecotrack_classifier.pkl"
REG_PATH         = ML_DIR / "ecotrack_regressor.pkl"
ENC_PATH         = ML_DIR / "ecotrack_encoders.pkl"

# ── Transport emission factors (kept for CO₂ breakdown) ───────
TRANSPORT_FACTORS = {
    "car":     0.21,
    "ev":      0.05,
    "bike":    0.12,
    "bus":     0.08,
    "train":   0.06,
    "walking": 0.0,
}

PLASTIC_FACTORS = {
    "low":    1.0,
    "medium": 3.0,
    "high":   6.0,
}

# ── Map frontend transport names → dataset transport names ─────
TRANSPORT_MAP = {
    "car":     "Car",
    "ev":      "EV",
    "bike":    "Bike",
    "bus":     "Bus",
    "train":   "Bus",      # closest match in dataset
    "walking": "Walk",
}

# ── Eco tips per impact level (data-driven) ────────────────────
ECO_TIPS = {
    "High": [
        "🚌 Use public transport for at least 2 trips per week.",
        "🥗 Try a vegetarian diet even 2 days/week — saves ~3.6 kg CO₂/day.",
        "⚡ Increase renewable energy usage to at least 50%.",
        "💡 Reduce electricity consumption by switching off idle appliances.",
        "♻️  Separate organic and recyclable waste at home.",
    ],
    "Medium": [
        "🚲 Replace 1 car trip/week with cycling or walking.",
        "⚡ Upgrade to 75% renewable energy — saves ~2 kg CO₂/day.",
        "🛍️  Carry reusable bottles/bags to avoid single-use plastics.",
        "🌱 Plan grocery portions to reduce food and packaging waste.",
    ],
    "Low": [
        "🌍 Great job! You are in the top 24% of eco-friendly citizens.",
        "📣 Encourage friends and family to track their carbon footprint too.",
        "⚡ Consider upgrading to 100% renewable energy.",
    ],
}

# ── ML model loader (lazy, loads once) ────────────────────────
_clf = None
_reg = None
_encoders = None
_ml_available = False


def _load_ml_models() -> bool:
    """Load trained ML models from .pkl files. Returns True if successful."""
    global _clf, _reg, _encoders, _ml_available
    if _ml_available:
        return True
    try:
        with open(CLF_PATH, "rb") as f: _clf      = pickle.load(f)
        with open(REG_PATH, "rb") as f: _reg      = pickle.load(f)
        with open(ENC_PATH, "rb") as f: _encoders = pickle.load(f)
        _ml_available = True
        print("✅ ML models loaded from ecotrack_ml_training")
        return True
    except FileNotFoundError:
        print("⚠️  ML model .pkl files not found.")
        print("   Run: python machine_lr/train_and_save.py")
        print("   Falling back to rule-based calculation.\n")
        _ml_available = False
        return False


def _round2(value: float) -> float:
    return round(float(value), 2)


# ── Dataset loader ────────────────────────────────────────────
def load_dataset(dataset_path: Optional[Path] = None) -> pd.DataFrame:
    path = dataset_path or DEFAULT_DATASET
    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")
    return pd.read_csv(path)


# ── CO₂ breakdown (kept from original — used for frontend chart) ──
def calculate_emissions(
    transport_type: str,
    distance: float,
    electricity: float,
    waste: float,
    plastic: str,
) -> Dict[str, float]:
    """Calculate weekly emission breakdown per category."""
    factor         = TRANSPORT_FACTORS.get(transport_type.lower(), 0.0)
    transport_co2  = _round2((factor * distance) * 7)
    electricity_co2= _round2((electricity * 0.82) * 7)
    waste_co2      = _round2(waste * 0.5)
    plastic_co2    = _round2(PLASTIC_FACTORS.get(plastic.lower(), 1.0))
    total_co2      = _round2(transport_co2 + electricity_co2 + waste_co2 + plastic_co2)

    return {
        "transportCO2":  transport_co2,
        "electricityCO2":electricity_co2,
        "wasteCO2":      waste_co2,
        "plasticCO2":    plastic_co2,
        "totalCO2":      total_co2,
    }


def _major_source(emissions: Dict[str, float]) -> str:
    pairs = [
        ("Transportation", emissions["transportCO2"]),
        ("Electricity",    emissions["electricityCO2"]),
        ("Waste",          emissions["wasteCO2"]),
        ("Plastic",        emissions["plasticCO2"]),
    ]
    return max(pairs, key=lambda x: x[1])[0]


# ── ML Prediction ─────────────────────────────────────────────
def _predict_with_ml(
    transport_type: str,
    distance: float,
    electricity: float,
    waste: float,
    renewable_pct: int   = 0,
    food_type: str       = "Mixed",
    screen_time: float   = 4.0,
    eco_actions: int     = 1,
    day_type: str        = "Weekday",
) -> Dict[str, object]:
    """
    Use trained Gradient Boosting model for prediction.
    Returns impact_level, co2_kg, eco_score.
    """
    le_dict   = _encoders["le_dict"]
    le_target = _encoders["le_target"]
    features  = _encoders["features"]

    # Map frontend transport name → dataset name
    transport_mapped = TRANSPORT_MAP.get(transport_type.lower(), "Car")

    # Snap renewable_pct to nearest valid value
    valid_pct = [0, 25, 50, 75, 100]
    renewable_pct = min(valid_pct, key=lambda x: abs(x - renewable_pct))

    # Encode categoricals
    day_enc       = le_dict["day_type"].transform([day_type])[0]
    transport_enc = le_dict["transport_mode"].transform([transport_mapped])[0]
    food_enc      = le_dict["food_type"].transform([food_type])[0]

    row = {
        "day_type":            day_enc,
        "transport_mode":      transport_enc,
        "distance_km":         distance,
        "electricity_kwh":     electricity,
        "renewable_usage_pct": renewable_pct,
        "food_type":           food_enc,
        "screen_time_hours":   screen_time,
        "waste_generated_kg":  waste,
        "eco_actions":         eco_actions,
    }

    df_in        = pd.DataFrame([row])[features]
    impact_enc   = _clf.predict(df_in)[0]
    impact_label = le_target.inverse_transform([impact_enc])[0]
    co2_kg       = _round2(float(_reg.predict(df_in)[0]))

    # Eco score: 0–100 (lower CO₂ = higher score)
    eco_score = max(0, min(100, int(100 - ((co2_kg - 1.79) / (16.02 - 1.79)) * 100)))

    return {
        "impact_level": impact_label,
        "co2_kg":       co2_kg,
        "eco_score":    eco_score,
    }


# ── Fallback: rule-based impact (original logic) ──────────────
def _predict_rule_based(
    total_co2: float,
    dataset_path: Optional[Path] = None,
) -> str:
    try:
        df = load_dataset(dataset_path)
        q1 = float(df["carbon_footprint_kg"].quantile(0.33))
        q2 = float(df["carbon_footprint_kg"].quantile(0.66))
        if total_co2 <= q1:   return "Low"
        elif total_co2 <= q2: return "Medium"
        else:                 return "High"
    except FileNotFoundError:
        if total_co2 < 5:   return "Low"
        elif total_co2 < 10: return "Medium"
        else:               return "High"


# ── Main public function ──────────────────────────────────────
def get_recommendation(
    transport_type: str,
    distance: float,
    electricity: float,
    waste: float,
    plastic: str,
    # ── Extended params (used by ML model) ──
    renewable_pct: int   = 0,
    food_type: str       = "Mixed",
    screen_time: float   = 4.0,
    eco_actions: int     = 1,
    day_type: str        = "Weekday",
    dataset_path: Optional[Path] = None,
) -> Dict[str, object]:
    """
    Return full recommendation payload.

    Always returns:
      - emissions breakdown (per category)
      - major_source
      - suggestions (tips)
      - impact_level
      - predicted_by ('ml_model' or 'rule_based')

    When ML model is available also returns:
      - co2_kg         (ML predicted daily CO₂)
      - eco_score      (0-100)
      - weekly_co2
      - yearly_co2
      - dataset_average_co2
    """
    # 1. Emission breakdown (always available, used for frontend charts)
    emissions   = calculate_emissions(transport_type, distance, electricity, waste, plastic)
    source      = _major_source(emissions)
    ml_loaded   = _load_ml_models()

    result: Dict[str, object] = {
        "emissions":    emissions,
        "major_source": source,
    }

    # 2. Try ML model prediction first
    if ml_loaded:
        try:
            ml_result = _predict_with_ml(
                transport_type = transport_type,
                distance       = distance,
                electricity    = electricity,
                waste          = waste,
                renewable_pct  = renewable_pct,
                food_type      = food_type,
                screen_time    = screen_time,
                eco_actions    = eco_actions,
                day_type       = day_type,
            )
            result.update({
                "impact_level":   ml_result["impact_level"],
                "co2_kg":         ml_result["co2_kg"],
                "eco_score":      ml_result["eco_score"],
                "weekly_co2":     _round2(ml_result["co2_kg"] * 7),
                "yearly_co2":     _round2(ml_result["co2_kg"] * 365),
                "predicted_by":   "ml_model",       # ← Gradient Boosting ✅
                "suggestions":    ECO_TIPS[ml_result["impact_level"]],
            })
        except Exception as e:
            print(f"⚠️  ML prediction failed: {e}. Using rule-based fallback.")
            ml_loaded = False

    # 3. Fallback to rule-based if ML unavailable
    if not ml_loaded:
        impact = _predict_rule_based(emissions["totalCO2"], dataset_path)
        result.update({
            "impact_level":  impact,
            "predicted_by":  "rule_based",          # ← original logic
            "suggestions":   ECO_TIPS[impact],
        })

    # 4. Dataset benchmark (always add if dataset available)
    try:
        df = load_dataset(dataset_path)
        result["dataset_average_co2"] = _round2(df["carbon_footprint_kg"].mean())
    except FileNotFoundError:
        pass

    return result


# ── CLI test ──────────────────────────────────────────────────
if __name__ == "__main__":
    import json

    print("\n🌿 EcoTrack — Recommendation Engine Test")
    print("=" * 50)

    # Test 1: High impact user
    print("\n📍 Test 1: Car user, Non-Veg, 0% renewable")
    r1 = get_recommendation(
        transport_type="car", distance=15, electricity=8.5,
        waste=1.0, plastic="medium",
        renewable_pct=0, food_type="Non-Veg",
        screen_time=5, eco_actions=1, day_type="Weekday",
    )
    print(f"  Predicted by  : {r1['predicted_by']}")
    print(f"  Impact Level  : {r1['impact_level']}")
    print(f"  CO₂/day       : {r1.get('co2_kg', 'N/A')} kg")
    print(f"  Eco Score     : {r1.get('eco_score', 'N/A')}")
    print(f"  Major Source  : {r1['major_source']}")
    print(f"  Tips          : {r1['suggestions'][0]}")

    # Test 2: Low impact user
    print("\n📍 Test 2: Walker, Veg, 100% renewable")
    r2 = get_recommendation(
        transport_type="walking", distance=3, electricity=3,
        waste=0.3, plastic="low",
        renewable_pct=100, food_type="Veg",
        screen_time=2, eco_actions=5, day_type="Weekend",
    )
    print(f"  Predicted by  : {r2['predicted_by']}")
    print(f"  Impact Level  : {r2['impact_level']}")
    print(f"  CO₂/day       : {r2.get('co2_kg', 'N/A')} kg")
    print(f"  Eco Score     : {r2.get('eco_score', 'N/A')}")
    print(f"  Tips          : {r2['suggestions'][0]}")

    print("\n" + "=" * 50)
    print("✅ Test complete!")
