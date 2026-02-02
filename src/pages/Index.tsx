import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ImpactCounter } from '@/components/shared/ImpactCounter';
import { RequestCard } from '@/components/requests/RequestCard';
import { AIRecommendationCard } from '@/components/ai/AIRecommendationCard';
import { impactMetrics, mockFoodRequests, mockAIRecommendations } from '@/data/mockData';
import {
  Utensils,
  Users,
  Truck,
  Building2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Play,
  CheckCircle,
} from 'lucide-react';

const Index = () => {
  const emergencyRequests = mockFoodRequests.filter(r => r.urgency === 'emergency' || r.urgency === 'high');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Food Redistribution
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Turn Surplus Into
                <span className="text-gradient-hero block">Smiles & Sustainability</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                SmartPlate uses AI to connect food donors with NGOs, reducing waste and fighting hunger. 
                Every meal saved is a step toward a sustainable future.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/register">
                    Start Donating
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/how-it-works">
                    <Play className="w-5 h-5" />
                    See How It Works
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Verified NGOs Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure & Transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Real-time Tracking</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Impact, Real Numbers
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every donation on SmartPlate creates measurable change. Here's our collective impact so far.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            <ImpactCounter
              value={impactMetrics.totalMealsSaved}
              label="Meals Saved"
              icon={<Utensils className="w-6 h-6" />}
              colorClass="text-primary"
              delay={0}
            />
            <ImpactCounter
              value={impactMetrics.totalCO2Reduced}
              label="kg CO₂ Reduced"
              icon={<Globe className="w-6 h-6" />}
              colorClass="text-success"
              suffix=" kg"
              delay={1}
            />
            <ImpactCounter
              value={impactMetrics.activeDonors}
              label="Active Donors"
              icon={<Users className="w-6 h-6" />}
              colorClass="text-accent"
              delay={2}
            />
            <ImpactCounter
              value={impactMetrics.activeNGOs}
              label="Partner NGOs"
              icon={<Building2 className="w-6 h-6" />}
              colorClass="text-info"
              delay={3}
            />
          </div>
        </div>
      </section>

      {/* Urgent Requests */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                🚨 Urgent Requests
              </h2>
              <p className="text-muted-foreground">
                These communities need your help right now
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/requests">
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyRequests.slice(0, 3).map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={() => console.log('Accept', request.id)}
                onView={() => console.log('View', request.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                Powered by AI
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Smart Matching, Maximum Impact
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our AI analyzes location, urgency, capacity, and spoilage risk to find the perfect match for your donation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {mockAIRecommendations.map((rec, idx) => (
                <AIRecommendationCard
                  key={idx}
                  recommendation={rec}
                  onAccept={() => console.log('Accept recommendation')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How SmartPlate Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: 'NGOs Post Requests',
                description: 'Verified NGOs create food requests with quantity, urgency, and location details.',
                step: 1,
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'AI Matches Donors',
                description: 'Our AI finds the best donor matches based on proximity, capacity, and timing.',
                step: 2,
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Volunteers Deliver',
                description: 'Volunteers pick up and deliver food with real-time tracking and proof of delivery.',
                step: 3,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                
                {/* Step Number */}
                <div className="relative inline-flex">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-hero flex items-center justify-center text-primary-foreground mb-4 shadow-glow">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of donors, NGOs, and volunteers who are already transforming surplus food into hope.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="secondary" asChild>
                <Link to="/register?role=donor">
                  Donate Food
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/register?role=volunteer">
                  Volunteer
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/register?role=ngo">
                  Register NGO
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
