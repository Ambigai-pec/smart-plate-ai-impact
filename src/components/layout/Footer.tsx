import { Link } from 'react-router-dom';
import { Utensils, Heart, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SmartPlate</span>
            </div>
            <p className="text-sm text-background/70">
              AI-powered food redistribution platform connecting donors, NGOs, and volunteers to reduce food waste and fight hunger.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/how-it-works" className="hover:text-background transition-colors">How It Works</Link></li>
              <li><Link to="/impact" className="hover:text-background transition-colors">Our Impact</Link></li>
              <li><Link to="/leaderboard" className="hover:text-background transition-colors">Leaderboard</Link></li>
              <li><Link to="/map" className="hover:text-background transition-colors">Live Map</Link></li>
            </ul>
          </div>

          {/* Join Us */}
          <div>
            <h4 className="font-semibold mb-4">Join Us</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/register?role=donor" className="hover:text-background transition-colors">Become a Donor</Link></li>
              <li><Link to="/register?role=volunteer" className="hover:text-background transition-colors">Volunteer</Link></li>
              <li><Link to="/register?role=ngo" className="hover:text-background transition-colors">Register NGO</Link></li>
              <li><Link to="/partner" className="hover:text-background transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/faq" className="hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © 2024 SmartPlate. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-background/50">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for SDG 2, 12 & 13
          </div>
        </div>
      </div>
    </footer>
  );
};
