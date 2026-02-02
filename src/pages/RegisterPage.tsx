import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Building2,
  Users,
  Truck,
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

type Role = 'donor' | 'volunteer' | 'ngo';

const roleInfo: Record<Role, { title: string; description: string; icon: React.ElementType; benefits: string[] }> = {
  donor: {
    title: 'Food Donor',
    description: 'Restaurants, hotels, caterers, or individuals with surplus food',
    icon: Heart,
    benefits: [
      'Reduce food waste & costs',
      'Earn impact badges',
      'Get tax benefits',
      'Track your contribution',
    ],
  },
  volunteer: {
    title: 'Volunteer Driver',
    description: 'Help transport food from donors to NGOs',
    icon: Truck,
    benefits: [
      'Flexible schedules',
      'Earn rewards & badges',
      'Route optimization',
      'Make real impact',
    ],
  },
  ngo: {
    title: 'NGO / Charity',
    description: 'Organizations serving communities in need',
    icon: Building2,
    benefits: [
      'Free food supply',
      'AI-powered matching',
      'Verified trust badges',
      'Impact reports',
    ],
  },
};

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'donor';
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [step, setStep] = useState(1);

  const RoleIcon = roleInfo[selectedRole].icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              Join SmartPlate
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Role Selection */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-foreground mb-4">I want to join as:</h3>
              {(Object.keys(roleInfo) as Role[]).map((role) => {
                const info = roleInfo[role];
                const Icon = info.icon;
                const isSelected = selectedRole === role;

                return (
                  <motion.button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{info.title}</div>
                        <div className="text-sm text-muted-foreground">{info.description}</div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}

              {/* Benefits */}
              <div className="mt-6 p-4 rounded-xl bg-muted/50">
                <h4 className="font-medium text-foreground mb-3">Benefits for {roleInfo[selectedRole].title}s:</h4>
                <ul className="space-y-2">
                  {roleInfo[selectedRole].benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <RoleIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Register as {roleInfo[selectedRole].title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill in your details to get started
                    </p>
                  </div>
                </div>

                <form className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {selectedRole === 'ngo' ? 'Organization Name' : 'Full Name'}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder={selectedRole === 'ngo' ? 'Hope Foundation' : 'John Doe'}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">City / Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Mumbai"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {selectedRole === 'donor' && (
                    <div className="space-y-2">
                      <Label htmlFor="business">Business Name (Optional)</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="business"
                          placeholder="Your Restaurant or Company"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === 'volunteer' && (
                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Vehicle Type</Label>
                      <div className="relative">
                        <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="vehicle"
                          placeholder="Motorcycle, Car, Bicycle, etc."
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === 'ngo' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="registration">Registration Number</Label>
                        <Input
                          id="registration"
                          placeholder="NGO-XX-XXXX-XXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Organization Description</Label>
                        <Input
                          id="description"
                          placeholder="Brief description of your work"
                        />
                      </div>
                    </>
                  )}

                  {/* Terms */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <label htmlFor="terms">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  {/* Submit */}
                  <Button variant="hero" size="lg" className="w-full">
                    Create Account
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
