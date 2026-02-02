import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  LogIn,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              Welcome Back
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Sign In to SmartPlate
            </h1>
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Create one
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-soft"
          >
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </form>

            {/* Demo Access */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Try demo accounts:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">
                    Admin Demo
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/donor/dashboard">
                    Donor Demo
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/volunteer/dashboard">
                    Volunteer Demo
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ngo/dashboard">
                    NGO Demo
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
