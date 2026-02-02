import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapView, MapLegend } from '@/components/map/MapView';
import { motion } from 'framer-motion';
import { Map, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const MapPage = () => {
  const [filters, setFilters] = useState({
    showNGOs: true,
    showDonors: true,
    showVolunteers: true,
    showRequests: true,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Map className="w-5 h-5 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Live Map</h1>
              </div>
              <p className="text-muted-foreground">
                Real-time view of NGOs, donors, volunteers, and active food requests
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={filters.showNGOs ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters({ ...filters, showNGOs: !filters.showNGOs })}
              >
                NGOs
              </Button>
              <Button
                variant={filters.showDonors ? "accent" : "outline"}
                size="sm"
                onClick={() => setFilters({ ...filters, showDonors: !filters.showDonors })}
              >
                Donors
              </Button>
              <Button
                variant={filters.showVolunteers ? "default" : "outline"}
                size="sm"
                className={filters.showVolunteers ? "bg-info hover:bg-info/90" : ""}
                onClick={() => setFilters({ ...filters, showVolunteers: !filters.showVolunteers })}
              >
                Volunteers
              </Button>
              <Button
                variant={filters.showRequests ? "warning" : "outline"}
                size="sm"
                onClick={() => setFilters({ ...filters, showRequests: !filters.showRequests })}
              >
                Requests
              </Button>
            </div>
          </motion.div>

          <MapView
            className="h-[600px]"
            showNGOs={filters.showNGOs}
            showDonors={filters.showDonors}
            showVolunteers={filters.showVolunteers}
            showRequests={filters.showRequests}
          />

          <div className="mt-4">
            <MapLegend />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MapPage;
