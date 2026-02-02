import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AIRecommendation } from '@/types';
import { UrgencyBadge } from '@/components/shared/UrgencyBadge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight,
  AlertTriangle,
  Clock,
} from 'lucide-react';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAccept?: () => void;
  className?: string;
}

export const AIRecommendationCard = ({
  recommendation,
  onAccept,
  className,
}: AIRecommendationCardProps) => {
  const isUrgent = recommendation.urgency === 'emergency' || recommendation.urgency === 'high';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-5",
        isUrgent && "from-accent/5 to-accent/10 border-accent/30",
        className
      )}
    >
      {/* AI Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          AI Recommended
        </div>
        <div className="text-xs font-bold text-primary">
          {recommendation.score}% Match
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-foreground mb-1">
          {recommendation.targetName}
        </h4>
        <p className="text-sm text-muted-foreground">
          {recommendation.reason}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {recommendation.urgency && (
          <UrgencyBadge urgency={recommendation.urgency} size="sm" />
        )}
        {recommendation.distance && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {recommendation.distance} km away
          </div>
        )}
        {recommendation.spoilageRisk && recommendation.spoilageRisk > 50 && (
          <div className="flex items-center gap-1 text-xs text-destructive">
            <Clock className="w-3 h-3" />
            High spoilage risk
          </div>
        )}
      </div>

      {/* Action */}
      <Button 
        variant={isUrgent ? "accent" : "hero"} 
        className="w-full group"
        onClick={onAccept}
      >
        View & Accept
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>

      {/* Decorative */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </motion.div>
  );
};

export const AIInsightBanner = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-gradient-hero text-primary-foreground rounded-2xl p-4 flex items-center gap-4",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-0.5">AI-Powered Matching Active</h4>
        <p className="text-sm text-primary-foreground/80">
          Our AI is analyzing nearby requests, predicting demand, and finding the best matches for you.
        </p>
      </div>
      <Button variant="secondary" size="sm" className="flex-shrink-0">
        View Insights
      </Button>
    </motion.div>
  );
};
