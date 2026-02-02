import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImpactCounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  colorClass?: string;
  delay?: number;
}

export const ImpactCounter = ({
  value,
  label,
  icon,
  suffix = '',
  prefix = '',
  decimals = 0,
  colorClass = 'text-primary',
  delay = 0,
}: ImpactCounterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="stat-card group"
    >
      <div className={cn("mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10", colorClass.replace('text-', 'bg-') + '/10')}>
        <span className={cn("text-2xl", colorClass)}>{icon}</span>
      </div>
      
      <div className="space-y-1">
        <div className={cn("text-3xl font-bold tabular-nums", colorClass)}>
          {isVisible ? (
            <CountUp
              start={0}
              end={value}
              duration={2}
              separator=","
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          ) : (
            `${prefix}0${suffix}`
          )}
        </div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-hero opacity-5 blur-2xl group-hover:opacity-10 transition-opacity" />
    </motion.div>
  );
};
