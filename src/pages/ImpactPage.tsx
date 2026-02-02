import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImpactCounter } from '@/components/shared/ImpactCounter';
import { impactMetrics, analyticsData } from '@/data/mockData';
import { motion } from 'framer-motion';
import {
  Utensils,
  Globe,
  Trash2,
  Users,
  Building2,
  Truck,
  Clock,
  TrendingUp,
  Target,
  Heart,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const ImpactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-transparent to-success/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Collective Impact
              </h1>
              <p className="text-lg text-muted-foreground">
                Every meal saved matters. See the real difference our community is making together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Stats */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
              value={impactMetrics.totalFoodWastePrevented}
              label="kg Waste Prevented"
              icon={<Trash2 className="w-6 h-6" />}
              colorClass="text-accent"
              suffix=" kg"
              delay={2}
            />
            <ImpactCounter
              value={impactMetrics.requestsCompleted}
              label="Deliveries Done"
              icon={<Truck className="w-6 h-6" />}
              colorClass="text-info"
              delay={3}
            />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Impact Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Monthly Impact Growth</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.monthlyImpact}>
                  <defs>
                    <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(162, 63%, 31%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(162, 63%, 31%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }} 
                  />
                  <Area type="monotone" dataKey="meals" stroke="hsl(162, 63%, 31%)" fillOpacity={1} fill="url(#colorMeals)" name="Meals" />
                  <Area type="monotone" dataKey="co2" stroke="hsl(145, 65%, 42%)" fillOpacity={1} fill="url(#colorCO2)" name="CO₂ (kg)" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Weekly Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Weekly Donations</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.weeklyDonations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }} 
                  />
                  <Bar dataKey="donations" fill="hsl(162, 63%, 31%)" radius={[4, 4, 0, 0]} name="Donations" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Requests by Urgency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">Requests by Urgency</h3>
              </div>
              <div className="flex items-center">
                <ResponsiveContainer width="50%" height={250}>
                  <PieChart>
                    <Pie
                      data={analyticsData.requestsByUrgency}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {analyticsData.requestsByUrgency.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3">
                  {analyticsData.requestsByUrgency.map((item) => (
                    <div key={item.urgency} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground flex-1">{item.urgency}</span>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Donor Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-info" />
                <h3 className="text-lg font-semibold">Donors by Type</h3>
              </div>
              <div className="space-y-4">
                {analyticsData.donorsByType.map((item, idx) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="h-full bg-gradient-hero rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              SmartPlate directly contributes to achieving global sustainability targets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                sdg: 'SDG 2',
                title: 'Zero Hunger',
                description: 'Ensuring food reaches those who need it most, reducing hunger in our communities.',
                color: 'from-yellow-400 to-amber-500',
                icon: '🍽️',
              },
              {
                sdg: 'SDG 12',
                title: 'Responsible Consumption',
                description: 'Reducing food waste through efficient redistribution and smart matching.',
                color: 'from-amber-500 to-orange-500',
                icon: '♻️',
              },
              {
                sdg: 'SDG 13',
                title: 'Climate Action',
                description: 'Lowering carbon emissions by preventing food from ending up in landfills.',
                color: 'from-green-400 to-emerald-500',
                icon: '🌍',
              },
            ].map((sdg, idx) => (
              <motion.div
                key={sdg.sdg}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sdg.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {sdg.icon}
                </div>
                <div className="text-sm font-semibold text-primary mb-1">{sdg.sdg}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{sdg.title}</h3>
                <p className="text-sm text-muted-foreground">{sdg.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Growing Community
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <ImpactCounter
              value={impactMetrics.activeDonors}
              label="Active Donors"
              icon={<Users className="w-6 h-6" />}
              colorClass="text-accent"
              delay={0}
            />
            <ImpactCounter
              value={impactMetrics.activeNGOs}
              label="Partner NGOs"
              icon={<Building2 className="w-6 h-6" />}
              colorClass="text-primary"
              delay={1}
            />
            <ImpactCounter
              value={impactMetrics.activeVolunteers}
              label="Volunteers"
              icon={<Truck className="w-6 h-6" />}
              colorClass="text-success"
              delay={2}
            />
            <ImpactCounter
              value={impactMetrics.averageDeliveryTime}
              label="Avg. Delivery (min)"
              icon={<Clock className="w-6 h-6" />}
              colorClass="text-info"
              suffix=" min"
              delay={3}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ImpactPage;
