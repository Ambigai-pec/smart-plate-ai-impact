import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FoodRequest } from '@/types';
import { UrgencyBadge } from '@/components/shared/UrgencyBadge';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface RequestCardProps {
  request: FoodRequest;
  showAIScore?: boolean;
  onAccept?: () => void;
  onView?: () => void;
  className?: string;
}

export const RequestCard = ({
  request,
  showAIScore = true,
  onAccept,
  onView,
  className,
}: RequestCardProps) => {
  const isEmergency = request.urgency === 'emergency';
  const hoursLeft = Math.max(0, Math.floor((new Date(request.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60)));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-soft transition-shadow hover:shadow-elevated",
        isEmergency && "border-destructive/50 shadow-emergency",
        className
      )}
    >
      {/* Emergency Banner */}
      {isEmergency && (
        <div className="bg-gradient-urgent text-primary-foreground text-xs font-semibold py-1.5 px-4 flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          EMERGENCY REQUEST - URGENT HELP NEEDED
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <UrgencyBadge urgency={request.urgency} size="sm" animated={isEmergency} />
              {showAIScore && request.aiScore && (
                <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {request.aiScore}% match
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {request.title}
            </h3>
          </div>
          <TrustBadge level="gold" showScore score={95} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {request.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{request.location.city || 'Location'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{request.quantity} {request.unit}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1.5",
            hoursLeft <= 4 ? "text-destructive" : "text-muted-foreground"
          )}>
            <Clock className="w-4 h-4" />
            <span>{hoursLeft}h left</span>
          </div>
        </div>

        {/* Spoilage Risk Bar */}
        {request.spoilageRisk !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Spoilage Risk</span>
              <span className={cn(
                "font-medium",
                request.spoilageRisk > 60 ? "text-destructive" :
                request.spoilageRisk > 30 ? "text-warning" : "text-success"
              )}>
                {request.spoilageRisk}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  request.spoilageRisk > 60 ? "bg-destructive" :
                  request.spoilageRisk > 30 ? "bg-warning" : "bg-success"
                )}
                style={{ width: `${request.spoilageRisk}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onAccept && (
            <Button 
              variant={isEmergency ? "emergency" : "hero"} 
              className="flex-1"
              onClick={onAccept}
            >
              Accept & Donate
            </Button>
          )}
          {onView && (
            <Button variant="outline" size="icon" onClick={onView}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* NGO Info Footer */}
      <div className="px-5 py-3 bg-muted/30 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{request.ngoName}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {request.foodType}
        </span>
      </div>
    </motion.div>
  );
};
