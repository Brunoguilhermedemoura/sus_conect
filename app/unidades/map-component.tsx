"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Configuração dos ícones do Leaflet
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

function FocusOnMarker({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  map.setView([lat, lng], 16, { animate: true })
  return null
}

interface DynamicMapProps {
  selectedUnit: {
    lat: number
    lng: number
    nome: string
  }
}

export function DynamicMap({ selectedUnit }: DynamicMapProps) {
  return (
    <MapContainer center={[selectedUnit.lat, selectedUnit.lng]} zoom={16} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FocusOnMarker lat={selectedUnit.lat} lng={selectedUnit.lng} />
      <Marker position={[selectedUnit.lat, selectedUnit.lng]}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">{selectedUnit.nome.split(",")[0]}</p>
            <p className="text-xs">{selectedUnit.nome}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

