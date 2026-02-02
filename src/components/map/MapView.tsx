import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { mockNGOs, mockDonors, mockVolunteers, mockFoodRequests } from '@/data/mockData';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  className?: string;
  showNGOs?: boolean;
  showDonors?: boolean;
  showVolunteers?: boolean;
  showRequests?: boolean;
  center?: [number, number];
  zoom?: number;
}

const createCustomIcon = (color: string, size: number = 12) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const createPulsingIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker-pulsing',
    html: `
      <div style="position: relative;">
        <div style="
          width: 16px;
          height: 16px;
          background: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
          z-index: 2;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: ${color};
          opacity: 0.3;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.5; }
        }
      </style>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export const MapView = ({
  className,
  showNGOs = true,
  showDonors = true,
  showVolunteers = true,
  showRequests = true,
  center = [19.0760, 72.8777],
  zoom = 12,
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add NGO markers
    if (showNGOs) {
      mockNGOs.forEach((ngo) => {
        const marker = L.marker([ngo.location.lat, ngo.location.lng], {
          icon: createCustomIcon('#0d9488', 14),
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 180px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${ngo.organizationName}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
              🏢 NGO • ${ngo.activeRequests} active requests
            </div>
            <div style="font-size: 11px; color: #888;">
              ${ngo.beneficiaries} beneficiaries served
            </div>
          </div>
        `);
      });
    }

    // Add Donor markers
    if (showDonors) {
      mockDonors.forEach((donor) => {
        const marker = L.marker([donor.location.lat, donor.location.lng], {
          icon: createCustomIcon('#f97316', 12),
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 180px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${donor.businessName || donor.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
              🍽️ Donor • ${donor.totalDonations} donations
            </div>
            <div style="font-size: 11px; color: #888;">
              ${donor.totalMealsDonated.toLocaleString()} meals donated
            </div>
          </div>
        `);
      });
    }

    // Add Volunteer markers
    if (showVolunteers) {
      mockVolunteers.forEach((volunteer) => {
        if (volunteer.available) {
          const marker = L.marker([volunteer.location.lat, volunteer.location.lng], {
            icon: createCustomIcon('#3b82f6', 10),
          }).addTo(map);

          marker.bindPopup(`
            <div style="padding: 8px; min-width: 180px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${volunteer.name}</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
                🚗 ${volunteer.vehicleType} • ${volunteer.totalDeliveries} deliveries
              </div>
              <div style="font-size: 11px; color: #22c55e;">
                ✓ Available now
              </div>
            </div>
          `);
        }
      });
    }

    // Add Request markers (pulsing for urgent)
    if (showRequests) {
      mockFoodRequests.forEach((request) => {
        const isUrgent = request.urgency === 'emergency' || request.urgency === 'high';
        const marker = L.marker([request.location.lat, request.location.lng], {
          icon: isUrgent ? createPulsingIcon('#ef4444') : createCustomIcon('#eab308', 10),
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${request.title}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
              📍 ${request.ngoName}
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              ${request.quantity} ${request.unit} needed
            </div>
            <div style="
              font-size: 11px; 
              padding: 4px 8px; 
              border-radius: 4px;
              display: inline-block;
              background: ${isUrgent ? '#fee2e2' : '#fef3c7'};
              color: ${isUrgent ? '#dc2626' : '#d97706'};
            ">
              ${request.urgency.toUpperCase()}
            </div>
          </div>
        `);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, showNGOs, showDonors, showVolunteers, showRequests]);

  return (
    <div className={cn("rounded-2xl overflow-hidden shadow-soft", className)}>
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
};

export const MapLegend = () => {
  const items = [
    { label: 'NGO', color: '#0d9488' },
    { label: 'Donor', color: '#f97316' },
    { label: 'Volunteer', color: '#3b82f6' },
    { label: 'Urgent Request', color: '#ef4444' },
    { label: 'Request', color: '#eab308' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-xl shadow-soft">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
