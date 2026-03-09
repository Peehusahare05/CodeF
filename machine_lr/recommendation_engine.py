"""Recommendation engine aligned with this workspace structure.

It uses:
- frontend input shape from `frontend/src/utils/carbonCalculator.js`
- dataset `personal_carbon_footprint_behavior.csv` at workspace root

Run directly to test:
    python machine_lr/recommendation_engine.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Optional

import pandas as pd


TRANSPORT_FACTORS = {
    "car": 0.21,
    "ev": 0.05,
    "bike": 0.12,
    "bus": 0.08,
    "train": 0.06,
    "walking": 0.0,
}

PLASTIC_FACTORS = {
    "low": 1.0,
    "medium": 3.0,
    "high": 6.0,
}

WORKSPACE_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DATASET_PATH = WORKSPACE_ROOT / "personal_carbon_footprint_behavior.csv"


def _round2(value: float) -> float:
    return round(float(value), 2)


def load_dataset(dataset_path: Optional[Path] = None) -> pd.DataFrame:
    """Load the main project dataset from workspace root."""
    path = dataset_path or DEFAULT_DATASET_PATH
    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")
    return pd.read_csv(path)


def calculate_emissions(
    transport_type: str,
    distance: float,
    electricity: float,
    waste: float,
    plastic: str,
) -> Dict[str, float]:
    """Calculate weekly emissions to match frontend carbon calculator behavior."""
    factor = TRANSPORT_FACTORS.get(transport_type, 0.0)

    transport_co2 = _round2((factor * distance) * 7)
    electricity_co2 = _round2((electricity * 0.82) * 7)
    waste_co2 = _round2(waste * 0.5)
    plastic_co2 = _round2(PLASTIC_FACTORS.get(plastic, 1.0))

    total_co2 = _round2(transport_co2 + electricity_co2 + waste_co2 + plastic_co2)

    return {
        "transportCO2": transport_co2,
        "electricityCO2": electricity_co2,
        "wasteCO2": waste_co2,
        "plasticCO2": plastic_co2,
        "totalCO2": total_co2,
    }


def _major_source(emissions: Dict[str, float]) -> str:
    pairs = [
        ("Transportation", emissions["transportCO2"]),
        ("Electricity", emissions["electricityCO2"]),
        ("Waste", emissions["wasteCO2"]),
        ("Plastic", emissions["plasticCO2"]),
    ]
    return max(pairs, key=lambda x: x[1])[0]


def _tips_for_source(source: str) -> List[str]:
    by_source = {
        "Transportation": [
            "Use public transport for at least 2 trips per week.",
            "Combine short trips into one route or walk/cycle for nearby tasks.",
        ],
        "Electricity": [
            "Reduce AC/heater runtime by setting efficient thermostat ranges.",
            "Switch to LED lighting and unplug idle appliances.",
        ],
        "Waste": [
            "Separate organic and recyclable waste at home.",
            "Plan grocery portions to reduce food and packaging waste.",
        ],
        "Plastic": [
            "Carry reusable bottles/bags to avoid single-use plastics.",
            "Choose refill packs or bulk options where possible.",
        ],
    }
    return by_source[source]


def get_recommendation(
    transport_type: str,
    distance: float,
    electricity: float,
    waste: float,
    plastic: str,
    dataset_path: Optional[Path] = None,
) -> Dict[str, object]:
    """Return recommendation payload aligned with frontend and dataset files."""
    emissions = calculate_emissions(
        transport_type=transport_type,
        distance=distance,
        electricity=electricity,
        waste=waste,
        plastic=plastic,
    )

    source = _major_source(emissions)
    suggestions = _tips_for_source(source)

    benchmark_avg = None
    impact_level = None
    try:
        df = load_dataset(dataset_path)
        benchmark_avg = _round2(df["carbon_footprint_kg"].mean())
        # Rough impact mapping using dataset distribution.
        q1 = float(df["carbon_footprint_kg"].quantile(0.33))
        q2 = float(df["carbon_footprint_kg"].quantile(0.66))
        total = emissions["totalCO2"]
        if total <= q1:
            impact_level = "Low"
        elif total <= q2:
            impact_level = "Medium"
        else:
            impact_level = "High"
    except FileNotFoundError:
        # Keep recommendations functional when dataset is missing.
        pass

    result: Dict[str, object] = {
        "major_source": source,
        "suggestions": suggestions,
        "emissions": emissions,
    }

    if benchmark_avg is not None:
        result["dataset_average_co2"] = benchmark_avg
    if impact_level is not None:
        result["predicted_impact_level"] = impact_level

    return result


if __name__ == "__main__":
    sample = get_recommendation(
        transport_type="car",
        distance=15,
        electricity=8.5,
        waste=5,
        plastic="medium",
    )
    print(sample)