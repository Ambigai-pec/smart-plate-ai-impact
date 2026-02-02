import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LeaderboardEntry, UserRole } from '@/types';
import { BadgeDisplay } from '@/components/shared/BadgeDisplay';
import { StreakCounter } from '@/components/shared/StreakCounter';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Award, User } from 'lucide-react';
import { badges } from '@/data/mockData';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  className?: string;
}

const roleColors: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-700',
  ngo: 'bg-primary/10 text-primary',
  donor: 'bg-accent/10 text-accent',
  volunteer: 'bg-info/10 text-info',
};

const rankIcons: Record<number, React.ReactNode> = {
  1: <Crown className="w-5 h-5 text-yellow-500" />,
  2: <Medal className="w-5 h-5 text-gray-400" />,
  3: <Award className="w-5 h-5 text-amber-600" />,
};

export const LeaderboardTable = ({
  entries,
  currentUserId,
  className,
}: LeaderboardTableProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {entries.map((entry, index) => (
        <motion.div
          key={entry.userId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all",
            entry.userId === currentUserId && "ring-2 ring-primary bg-primary/5",
            entry.rank <= 3 && "shadow-soft"
          )}
        >
          {/* Rank */}
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
            entry.rank === 1 && "bg-yellow-100 text-yellow-700",
            entry.rank === 2 && "bg-gray-100 text-gray-600",
            entry.rank === 3 && "bg-amber-100 text-amber-700",
            entry.rank > 3 && "bg-muted text-muted-foreground"
          )}>
            {rankIcons[entry.rank] || entry.rank}
          </div>

          {/* Avatar & Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {entry.avatar ? (
                <img src={entry.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground truncate">
                  {entry.userName}
                </span>
                {entry.userId === currentUserId && (
                  <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                    You
                  </span>
                )}
              </div>
              <Badge 
                variant="secondary" 
                className={cn("text-xs capitalize", roleColors[entry.role])}
              >
                {entry.role}
              </Badge>
            </div>
          </div>

          {/* Badges */}
          <div className="hidden md:block">
            <BadgeDisplay badges={badges.slice(0, entry.badges)} size="sm" maxDisplay={3} />
          </div>

          {/* Streak */}
          <div className="hidden sm:block">
            <StreakCounter streak={entry.streak} size="sm" label="" />
          </div>

          {/* Score */}
          <div className="text-right">
            <div className="text-lg font-bold text-foreground tabular-nums">
              {entry.score.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const LeaderboardPodium = ({ entries }: { entries: LeaderboardEntry[] }) => {
  const top3 = entries.slice(0, 3);
  const [second, first, third] = [top3[1], top3[0], top3[2]];

  const PodiumSpot = ({ entry, position }: { entry?: LeaderboardEntry; position: 1 | 2 | 3 }) => {
    if (!entry) return null;
    
    const heights = { 1: 'h-32', 2: 'h-24', 3: 'h-20' };
    const sizes = { 1: 'w-20 h-20', 2: 'w-16 h-16', 3: 'w-16 h-16' };
    const colors = { 1: 'from-yellow-400 to-amber-500', 2: 'from-gray-300 to-gray-400', 3: 'from-amber-500 to-amber-700' };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: position * 0.1 }}
        className="flex flex-col items-center"
      >
        {/* Avatar */}
        <div className={cn(
          "rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-elevated mb-3",
          sizes[position],
          colors[position]
        )}>
          {entry.avatar ? (
            <img src={entry.avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-2xl font-bold">{entry.userName[0]}</span>
          )}
        </div>

        {/* Name */}
        <div className="text-center mb-2">
          <div className="font-semibold text-sm text-foreground truncate max-w-[100px]">
            {entry.userName}
          </div>
          <div className="text-lg font-bold text-primary">{entry.score.toLocaleString()}</div>
        </div>

        {/* Podium */}
        <div className={cn(
          "w-24 rounded-t-xl bg-gradient-to-t flex items-start justify-center pt-2",
          heights[position],
          colors[position]
        )}>
          <span className="text-2xl font-bold text-white">{position}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex items-end justify-center gap-4">
      <PodiumSpot entry={second} position={2} />
      <PodiumSpot entry={first} position={1} />
      <PodiumSpot entry={third} position={3} />
    </div>
  );
};
