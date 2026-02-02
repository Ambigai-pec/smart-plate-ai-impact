import { cn } from '@/lib/utils';
import { UrgencyLevel } from '@/types';
import { AlertTriangle, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const urgencyConfig: Record<UrgencyLevel, {
  icon: React.ElementType;
  label: string;
  className: string;
  bgClass: string;
}> = {
  emergency: {
    icon: AlertTriangle,
    label: 'EMERGENCY',
    className: 'text-destructive',
    bgClass: 'bg-destructive/10 border-destructive/30',
  },
  high: {
    icon: AlertCircle,
    label: 'High Priority',
    className: 'text-accent',
    bgClass: 'bg-accent/10 border-accent/30',
  },
  medium: {
    icon: Clock,
    label: 'Medium',
    className: 'text-warning',
    bgClass: 'bg-warning/10 border-warning/30',
  },
  low: {
    icon: CheckCircle,
    label: 'Low',
    className: 'text-success',
    bgClass: 'bg-success/10 border-success/30',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const UrgencyBadge = ({
  urgency,
  showLabel = true,
  size = 'md',
  className,
  animated = false,
}: UrgencyBadgeProps) => {
  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        config.bgClass,
        config.className,
        sizeClasses[size],
        animated && urgency === 'emergency' && 'emergency-pulse',
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};
