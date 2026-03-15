import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import zones from "../data/carbonZones.json";

// ── Color logic ──────────────────────────────────────────────────────────────
const getColor = (carbon) => {
  if (carbon > 60) return "#ef4444"; // red
  if (carbon > 40) return "#f97316"; // orange
  if (carbon > 20) return "#eab308"; // yellow
  return "#22c55e"; // green
};

// ── Suggestion by emission level ─────────────────────────────────────────────
const getSuggestion = (carbon) => {
  if (carbon > 60)
    return "Critical emission zone. Reduce vehicle usage and switch to public transport or carpooling.";
  if (carbon > 40)
    return "High emission zone. Consider using electric vehicles or cycling for short trips.";
  if (carbon > 20)
    return "Moderate emission zone. Reducing idle time and switching off engines helps.";
  return "Low emission zone. Great job! Keep promoting green practices here.";
};

// ── Level label ──────────────────────────────────────────────────────────────
const getLabel = (carbon) => {
  if (carbon > 60) return "Critical";
  if (carbon > 40) return "High";
  if (carbon > 20) return "Moderate";
  return "Low";
};

export default function CarbonMap() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        center={[21.1458, 79.0882]}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {zones.map((zone, index) => {
          const color = getColor(zone.carbon);
          return (
            <Circle
              key={index}
              center={[zone.lat, zone.lng]}
              radius={500}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.4,
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: "180px", fontFamily: "sans-serif" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Area: {zone.area}
                  </p>
                  <p style={{ fontSize: "13px", marginBottom: "4px" }}>
                    <strong>CO₂ Level:</strong> {zone.carbon} kg/day
                  </p>
                  <p style={{ fontSize: "13px", marginBottom: "6px" }}>
                    <strong>Status:</strong> {getLabel(zone.carbon)}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      borderTop: "1px solid #eee",
                      paddingTop: "6px",
                      lineHeight: "1.4",
                    }}
                  >
                    {getSuggestion(zone.carbon)}
                  </p>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "8px",
          padding: "6px 10px",
          fontSize: "11px",
          zIndex: 1000,
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          lineHeight: "1.8",
        }}
      >
        <div>
          <span style={{ color: "#22c55e" }}>●</span> Low
        </div>
        <div>
          <span style={{ color: "#eab308" }}>●</span> Moderate
        </div>
        <div>
          <span style={{ color: "#f97316" }}>●</span> High
        </div>
        <div>
          <span style={{ color: "#ef4444" }}>●</span> Critical
        </div>
      </div>
    </div>
  );
}
