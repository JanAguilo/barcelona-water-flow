import React from 'react';
import { Droplets, AlertCircle, TrendingUp } from 'lucide-react';

interface MeterPopupProps {
  meter: {
    id: string;
    status: 'normal' | 'warning' | 'alert';
    lastReading: number;
    predictedFailureRisk: number;
  };
  position: { x: number; y: number };
}

export const MeterPopup: React.FC<MeterPopupProps> = ({ meter, position }) => {
  const statusColor = meter.status === 'alert' 
    ? 'text-destructive' 
    : meter.status === 'warning'
    ? 'text-accent'
    : 'text-primary';

  const statusBg = meter.status === 'alert' 
    ? 'bg-destructive/10' 
    : meter.status === 'warning'
    ? 'bg-accent/10'
    : 'bg-primary/10';

  return (
    <div 
      className="fixed pointer-events-none z-50 animate-scale-in"
      style={{ 
        left: position.x,
        top: position.y - 10,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div 
        className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl px-4 py-3 min-w-[240px] ring-1 ring-black/5"
        style={{
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            {meter.id}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBg} ${statusColor}`}>
            {meter.status.toUpperCase()}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">{meter.lastReading} L</span>
            <span className="text-muted-foreground text-xs">last reading</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">{meter.predictedFailureRisk.toFixed(1)}%</span>
            <span className="text-muted-foreground text-xs">failure risk</span>
          </div>
          
          {meter.status !== 'normal' && (
            <div className="flex items-center gap-2 text-xs pt-1 border-t border-border">
              <AlertCircle className={`w-3 h-3 ${statusColor}`} />
              <span className="text-muted-foreground">
                {meter.status === 'alert' ? 'Immediate attention needed' : 'Monitor closely'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Arrow pointing down */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid hsl(var(--border))',
        }}
      />
    </div>
  );
};
