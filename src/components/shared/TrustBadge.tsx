import { cn } from '@/lib/utils';
import { TrustLevel } from '@/types';
import { Shield, ShieldCheck, Crown, Award } from 'lucide-react';

interface TrustBadgeProps {
  level: TrustLevel;
  score?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const trustConfig: Record<TrustLevel, { 
  icon: React.ReactNode; 
  label: string; 
  className: string;
  bgClass: string;
}> = {
  bronze: {
    icon: <Shield className="w-full h-full" />,
    label: 'Bronze',
    className: 'text-amber-700',
    bgClass: 'trust-bronze',
  },
  silver: {
    icon: <ShieldCheck className="w-full h-full" />,
    label: 'Silver',
    className: 'text-gray-400',
    bgClass: 'trust-silver',
  },
  gold: {
    icon: <Crown className="w-full h-full" />,
    label: 'Gold',
    className: 'text-yellow-500',
    bgClass: 'trust-gold',
  },
  verified: {
    icon: <Award className="w-full h-full" />,
    label: 'Verified',
    className: 'text-primary',
    bgClass: 'bg-gradient-hero',
  },
};

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const TrustBadge = ({
  level,
  score,
  showScore = false,
  size = 'md',
  className,
}: TrustBadgeProps) => {
  const config = trustConfig[level];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "rounded-full p-1 text-white badge-glow",
          config.bgClass,
          sizeClasses[size]
        )}
      >
        {config.icon}
      </div>
      {showScore && score !== undefined && (
        <span className={cn("text-xs font-semibold", config.className)}>
          {score}%
        </span>
      )}
    </div>
  );
};

export const TrustBadgeWithLabel = ({
  level,
  score,
  size = 'md',
  className,
}: TrustBadgeProps) => {
  const config = trustConfig[level];

  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50", className)}>
      <div
        className={cn(
          "rounded-full p-1 text-white",
          config.bgClass,
          sizeClasses[size]
        )}
      >
        {config.icon}
      </div>
      <span className="text-sm font-medium text-foreground">
        {config.label}
        {score !== undefined && (
          <span className="text-muted-foreground ml-1">({score}%)</span>
        )}
      </span>
    </div>
  );
};
