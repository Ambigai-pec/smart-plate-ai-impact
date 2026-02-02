import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ImpactCounter } from '@/components/shared/ImpactCounter';
import { TrustBadgeWithLabel } from '@/components/shared/TrustBadge';
import { StreakCard } from '@/components/shared/StreakCounter';
import { BadgeCard } from '@/components/shared/BadgeDisplay';
import { MapView } from '@/components/map/MapView';
import { badges } from '@/data/mockData';
import {
  Truck,
  Navigation,
  Clock,
  Star,
  Award,
  Bell,
  Settings,
  Play,
  MapPin,
  ChevronRight,
  Package,
  CheckCircle,
  Timer,
  Route,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock active deliveries for volunteer
const activeDeliveries = [
  {
    id: 'del-1',
    from: 'Taj Hotels, Colaba',
    to: 'Hope Foundation, Dharavi',
    status: 'picking_up',
    distance: 8.2,
    estimatedTime: 25,
    meals: 150,
    urgency: 'high',
  },
  {
    id: 'del-2',
    from: 'Fresh Mart, Bandra',
    to: 'Food for All, Andheri',
    status: 'pending_pickup',
    distance: 5.4,
    estimatedTime: 18,
    meals: 80,
    urgency: 'medium',
  },
];

const VolunteerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn userRole="volunteer" userName="Rahul Sharma" />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Ready to deliver, Rahul? 🚀
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <TrustBadgeWithLabel level="gold" score={96} />
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="hero">
                <Play className="w-4 h-4" />
                Go Online
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ImpactCounter
            value={234}
            label="Deliveries Done"
            icon={<Truck className="w-5 h-5" />}
            colorClass="text-primary"
            delay={0}
          />
          <ImpactCounter
            value={1890}
            label="km Traveled"
            icon={<Navigation className="w-5 h-5" />}
            colorClass="text-info"
            suffix=" km"
            delay={1}
          />
          <ImpactCounter
            value={4.9}
            label="Rating"
            icon={<Star className="w-5 h-5" />}
            colorClass="text-warning"
            decimals={1}
            delay={2}
          />
          <ImpactCounter
            value={31}
            label="Day Streak"
            icon={<Award className="w-5 h-5" />}
            colorClass="text-accent"
            delay={3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Deliveries */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Active Deliveries</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View History
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          delivery.status === 'picking_up' ? "bg-accent/10" : "bg-muted"
                        )}>
                          <Truck className={cn(
                            "w-5 h-5",
                            delivery.status === 'picking_up' ? "text-accent" : "text-muted-foreground"
                          )} />
                        </div>
                        <div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            delivery.status === 'picking_up' 
                              ? "bg-accent/10 text-accent" 
                              : "bg-muted text-muted-foreground"
                          )}>
                            {delivery.status === 'picking_up' ? 'En Route to Pickup' : 'Pending Pickup'}
                          </span>
                          <div className="text-sm text-muted-foreground mt-1">
                            {delivery.meals} meals • {delivery.distance} km
                          </div>
                        </div>
                      </div>
                      <div className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        delivery.urgency === 'high' ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                      )}>
                        {delivery.urgency.toUpperCase()}
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <div className="w-0.5 h-8 bg-border" />
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Pickup</div>
                          <div className="font-medium text-foreground">{delivery.from}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Dropoff</div>
                          <div className="font-medium text-foreground">{delivery.to}</div>
                        </div>
                      </div>
                    </div>

                    {/* ETA & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          ~{delivery.estimatedTime} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Route className="w-4 h-4" />
                          {delivery.distance} km
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Navigation className="w-4 h-4" />
                          Navigate
                        </Button>
                        {delivery.status === 'picking_up' && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="w-4 h-4" />
                            Picked Up
                          </Button>
                        )}
                        {delivery.status === 'pending_pickup' && (
                          <Button variant="default" size="sm">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Route Optimization Notice */}
            <section className="bg-gradient-to-r from-info/10 to-info/5 rounded-2xl p-5 border border-info/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
                  <Route className="w-5 h-5 text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Route Optimized!</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI has calculated the fastest route for your deliveries, saving you 12 minutes and 3.2 km.
                  </p>
                  <Button variant="outline" size="sm" className="border-info text-info hover:bg-info/10">
                    View Optimized Route
                  </Button>
                </div>
              </div>
            </section>

            {/* Map */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Delivery Map</h2>
                </div>
              </div>
              <MapView className="h-[350px]" showVolunteers={false} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Toggle */}
            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">You're Online</span>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Accepting new delivery requests
              </p>
              <Button variant="secondary" className="w-full">
                Go Offline
              </Button>
            </div>

            {/* Streak Card */}
            <StreakCard streak={31} maxStreak={45} />

            {/* Today's Stats */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Today's Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Deliveries</span>
                  <span className="font-semibold">3 / 5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-hero rounded-full" style={{ width: '60%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Distance</span>
                  <span className="font-semibold">18.2 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Meals Delivered</span>
                  <span className="font-semibold">280</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Recent Badges</h3>
                </div>
              </div>
              <div className="space-y-3">
                {badges.slice(2, 5).map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
