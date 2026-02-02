import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  streak: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StreakCounter = ({
  streak,
  label = 'day streak',
  size = 'md',
  className,
}: StreakCounterProps) => {
  const isActive = streak > 0;
  
  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-1.5',
    lg: 'text-lg gap-2',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center font-semibold",
        sizeClasses[size],
        isActive ? 'text-accent' : 'text-muted-foreground',
        className
      )}
    >
      <motion.div
        animate={isActive ? { 
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ 
          duration: 0.5,
          repeat: isActive ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        <Flame 
          className={cn(
            iconSizes[size],
            isActive && 'fill-accent'
          )} 
        />
      </motion.div>
      <span className="tabular-nums">{streak}</span>
      {label && <span className="text-muted-foreground font-normal">{label}</span>}
    </motion.div>
  );
};

export const StreakCard = ({ streak, maxStreak }: { streak: number; maxStreak?: number }) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">Current Streak</span>
        {maxStreak && (
          <span className="text-xs text-muted-foreground">Best: {maxStreak} days</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          <Flame className="w-6 h-6 text-accent fill-accent" />
        </div>
        <div>
          <div className="text-3xl font-bold text-accent tabular-nums">{streak}</div>
          <div className="text-sm text-muted-foreground">days in a row</div>
        </div>
      </div>
      
      {/* Streak milestones */}
      <div className="mt-4 flex gap-1">
        {[7, 14, 30, 60, 100].map((milestone) => (
          <div
            key={milestone}
            className={cn(
              "flex-1 h-1 rounded-full transition-colors",
              streak >= milestone ? 'bg-accent' : 'bg-muted'
            )}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>7d</span>
        <span>14d</span>
        <span>30d</span>
        <span>60d</span>
        <span>100d</span>
      </div>
    </div>
  );
};
