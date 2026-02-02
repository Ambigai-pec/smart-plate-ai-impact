import { cn } from '@/lib/utils';
import { Badge } from '@/types';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BadgeDisplayProps {
  badges: Badge[];
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierColors = {
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-gray-300 to-gray-500',
  gold: 'from-yellow-400 to-amber-500',
  platinum: 'from-purple-400 to-indigo-500',
};

const sizeClasses = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-xl',
  lg: 'w-12 h-12 text-2xl',
};

export const BadgeDisplay = ({
  badges,
  maxDisplay = 5,
  size = 'md',
  className,
}: BadgeDisplayProps) => {
  const displayedBadges = badges.slice(0, maxDisplay);
  const remainingCount = badges.length - maxDisplay;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayedBadges.map((badge, index) => (
        <Tooltip key={badge.id}>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-full flex items-center justify-center bg-gradient-to-br shadow-soft cursor-pointer hover:z-10 hover:scale-110 transition-transform",
                tierColors[badge.tier],
                sizeClasses[size]
              )}
            >
              <span>{badge.icon}</span>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px]">
            <div className="text-center">
              <p className="font-semibold">{badge.name}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative rounded-full flex items-center justify-center bg-muted text-muted-foreground font-semibold text-xs",
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export const BadgeCard = ({ badge }: { badge: Badge }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-soft"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br text-2xl shadow-soft",
          tierColors[badge.tier]
        )}
      >
        {badge.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{badge.name}</h4>
        <p className="text-sm text-muted-foreground">{badge.description}</p>
      </div>
      <div className="text-xs text-muted-foreground capitalize px-2 py-1 rounded-full bg-muted">
        {badge.tier}
      </div>
    </motion.div>
  );
};
