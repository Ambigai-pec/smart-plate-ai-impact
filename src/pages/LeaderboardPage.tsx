import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeaderboardTable, LeaderboardPodium } from '@/components/leaderboard/LeaderboardTable';
import { mockLeaderboard } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Building2, Truck, Calendar } from 'lucide-react';

const LeaderboardPage = () => {
  const donorLeaderboard = mockLeaderboard.filter(e => e.role === 'donor');
  const volunteerLeaderboard = mockLeaderboard.filter(e => e.role === 'volunteer');
  const ngoLeaderboard = mockLeaderboard.filter(e => e.role === 'ngo');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-12 bg-gradient-to-br from-accent/5 via-transparent to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Trophy className="w-4 h-4" />
                Community Champions
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Leaderboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Celebrating our top contributors making the biggest impact
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Podium */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <LeaderboardPodium entries={mockLeaderboard} />
        </div>
      </section>

      {/* Leaderboard Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="gap-2">
                  <Users className="w-4 h-4" />
                  All
                </TabsTrigger>
                <TabsTrigger value="donors" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Donors
                </TabsTrigger>
                <TabsTrigger value="volunteers" className="gap-2">
                  <Truck className="w-4 h-4" />
                  Volunteers
                </TabsTrigger>
                <TabsTrigger value="ngos" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  NGOs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <LeaderboardTable entries={mockLeaderboard} />
            </TabsContent>

            <TabsContent value="donors">
              <LeaderboardTable entries={donorLeaderboard} />
            </TabsContent>

            <TabsContent value="volunteers">
              <LeaderboardTable entries={volunteerLeaderboard} />
            </TabsContent>

            <TabsContent value="ngos">
              <LeaderboardTable entries={ngoLeaderboard} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Time Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Showing: All Time</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
