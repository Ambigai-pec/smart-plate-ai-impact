import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ImpactCounter } from '@/components/shared/ImpactCounter';
import { TrustBadgeWithLabel } from '@/components/shared/TrustBadge';
import { UrgencyBadge } from '@/components/shared/UrgencyBadge';
import { MapView } from '@/components/map/MapView';
import { mockFoodRequests } from '@/data/mockData';
import {
  Building2,
  Users,
  Utensils,
  Plus,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
  const myRequests = mockFoodRequests.filter(r => r.ngoId === 'ngo-1');

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn userRole="ngo" userName="Hope Foundation" />

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
                Hope Foundation Dashboard
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <TrustBadgeWithLabel level="gold" score={95} />
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
                <Plus className="w-4 h-4" />
                New Request
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ImpactCounter
            value={12500}
            label="Meals Received"
            icon={<Utensils className="w-5 h-5" />}
            colorClass="text-primary"
            delay={0}
          />
          <ImpactCounter
            value={850}
            label="Beneficiaries"
            icon={<Users className="w-5 h-5" />}
            colorClass="text-accent"
            delay={1}
          />
          <ImpactCounter
            value={3}
            label="Active Requests"
            icon={<Clock className="w-5 h-5" />}
            colorClass="text-warning"
            delay={2}
          />
          <ImpactCounter
            value={89}
            label="Requests Fulfilled"
            icon={<CheckCircle className="w-5 h-5" />}
            colorClass="text-success"
            delay={3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Requests */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">My Requests</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {myRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-xl p-4 shadow-soft border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <UrgencyBadge urgency={request.urgency} size="sm" />
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            request.status === 'approved' && "bg-success/10 text-success",
                            request.status === 'pending' && "bg-warning/10 text-warning",
                            request.status === 'in_progress' && "bg-info/10 text-info",
                          )}>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{request.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {request.quantity} {request.unit} • {request.foodType}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>

                    {request.status === 'approved' && (
                      <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">Waiting for donor match...</span>
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '30%' }}
                            transition={{ duration: 1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {request.matchedDonorId && (
                      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-info" />
                          <span className="text-sm text-muted-foreground">Matched! Delivery in progress</span>
                        </div>
                        <Button variant="soft-success" size="sm">
                          Track
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Nearby Donors Map */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Nearby Donors & Volunteers</h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/map">
                    Full Map
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <MapView className="h-[350px]" showNGOs={false} showRequests={false} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Summary */}
            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold">This Month's Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Meals Received</span>
                  <span className="font-bold">2,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">People Fed</span>
                  <span className="font-bold">850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Requests Fulfilled</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                Download Report
              </Button>
            </div>

            {/* Request Status Summary */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Request Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-sm">Approved</span>
                  </div>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-info" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Request
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Update Beneficiary Count
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Donations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NGODashboard;
