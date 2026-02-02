import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ImpactCounter } from '@/components/shared/ImpactCounter';
import { TrustBadgeWithLabel } from '@/components/shared/TrustBadge';
import { BadgeDisplay, BadgeCard } from '@/components/shared/BadgeDisplay';
import { StreakCard } from '@/components/shared/StreakCounter';
import { RequestCard } from '@/components/requests/RequestCard';
import { AIRecommendationCard, AIInsightBanner } from '@/components/ai/AIRecommendationCard';
import { MapView } from '@/components/map/MapView';
import { mockFoodRequests, mockAIRecommendations, badges, impactMetrics } from '@/data/mockData';
import {
  Utensils,
  TrendingUp,
  Award,
  MapPin,
  Bell,
  Settings,
  Plus,
  ChevronRight,
  Sparkles,
  Heart,
  Globe,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  const approvedRequests = mockFoodRequests.filter(r => r.status === 'approved');

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn userRole="donor" userName="Cloud Kitchen Co." />

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
                Welcome back, Cloud Kitchen Co.! 👋
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <TrustBadgeWithLabel level="gold" score={91} />
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
                New Donation
              </Button>
            </div>
          </div>
        </motion.div>

        {/* AI Insight Banner */}
        <AIInsightBanner className="mb-8" />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ImpactCounter
            value={28000}
            label="Meals Donated"
            icon={<Utensils className="w-5 h-5" />}
            colorClass="text-primary"
            delay={0}
          />
          <ImpactCounter
            value={10080}
            label="kg CO₂ Saved"
            icon={<Globe className="w-5 h-5" />}
            colorClass="text-success"
            suffix=" kg"
            delay={1}
          />
          <ImpactCounter
            value={234}
            label="Total Donations"
            icon={<Heart className="w-5 h-5" />}
            colorClass="text-accent"
            delay={2}
          />
          <ImpactCounter
            value={45}
            label="Day Streak"
            icon={<TrendingUp className="w-5 h-5" />}
            colorClass="text-info"
            delay={3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {mockAIRecommendations.slice(0, 2).map((rec, idx) => (
                  <AIRecommendationCard
                    key={idx}
                    recommendation={rec}
                    onAccept={() => console.log('Accept', rec.targetId)}
                  />
                ))}
              </div>
            </section>

            {/* Active Requests */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Nearby Requests</h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/requests">
                    Browse All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4">
                {approvedRequests.slice(0, 3).map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={() => console.log('Accept', request.id)}
                    onView={() => console.log('View', request.id)}
                  />
                ))}
              </div>
            </section>

            {/* Map */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-info" />
                  <h2 className="text-lg font-semibold text-foreground">Nearby Activity</h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/map">
                    Full Map
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <MapView className="h-[300px]" showDonors={false} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Card */}
            <StreakCard streak={45} maxStreak={52} />

            {/* Badges */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Your Badges</h3>
                </div>
                <span className="text-sm text-muted-foreground">{badges.length} earned</span>
              </div>
              <div className="space-y-3">
                {badges.slice(0, 4).map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Badges
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Impact Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  View Donation History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Get Certificate
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

export default DonorDashboard;
