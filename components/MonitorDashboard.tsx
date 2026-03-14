
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { SystemStats, ResourceData, HistoryItem } from '../types';

// Provided SVG Logo for RAM
const RamLogo = () => (
  <svg width="28" height="28" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="31" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="40" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="49" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="58" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="67" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="76" y="5" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="15" y="13" width="70" height="44" rx="6" stroke="#a855f7" strokeWidth="3"/>
    <rect x="22" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="31" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="40" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="49" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="58" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="67" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
    <rect x="76" y="57" width="3" height="8" rx="1" fill="#a855f7"/>
  </svg>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-zinc-800 p-3 rounded-xl shadow-2xl">
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-medium text-zinc-300 uppercase">{entry.name}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: entry.color }}>
                {entry.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface MonitorDashboardProps {
  stats: SystemStats;
  resourceHistory: ResourceData[];
  historyItems: HistoryItem[];
}

export const MonitorDashboard: React.FC<MonitorDashboardProps> = ({ 
  stats, 
  resourceHistory, 
  historyItems 
}) => {
  const getFormattedDate = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  const activityData = [
    { date: getFormattedDate(13), count: 4 },
    { date: getFormattedDate(9), count: 6 },
    { date: getFormattedDate(6), count: 5 },
    { date: getFormattedDate(4), count: 8 },
    { date: getFormattedDate(2), count: 6 },
    { date: getFormattedDate(0), count: 7 },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6">
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-2">
        <StatCard 
          icon={<Cpu size={24} className="text-[#00ff9d]" />} 
          label="CPU PROCESSOR" 
          value={`${stats.cpu}%`} 
          color="#00ff9d"
        />
        <StatCard 
          icon={<RamLogo />} 
          label="MEMORY RAM" 
          value={`${stats.ram.toFixed(1)}/8GB`} 
          color="#a855f7"
        />
        <StatCard 
          icon={<HardDrive size={24} className="text-blue-400" />} 
          label="STORAGE NVME" 
          value={`${stats.storage.toFixed(1)}%`} 
          color="#60a5fa"
        />
        <StatCard 
          icon={<Activity size={24} className="text-orange-400" />} 
          label="NETWORK" 
          value={`${stats.network}kb/s`} 
          color="#fb923c"
        />
      </div>

      <div className="col-span-12 lg:col-span-9 space-y-4 lg:space-y-6">
        <div className="bg-[#111111] border border-zinc-800/50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem]">
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
             <TrendingUp size={20} className="text-[#00ff9d]" />
             <h3 className="text-lg lg:text-xl font-bold">Tren Aktivitas Database</h3>
          </div>
          <div className="h-[200px] lg:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                  itemStyle={{ color: '#00ff9d' }}
                />
                <Area type="stepAfter" dataKey="count" stroke="#00ff9d" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111111] border border-zinc-800/50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
             <div className="flex items-center gap-3">
               <Activity size={20} className="text-[#a855f7]" />
               <h3 className="text-lg lg:text-xl font-bold">System Resources Monitor</h3>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9d]" />
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">RAM</span>
                </div>
             </div>
          </div>
          <div className="h-[200px] lg:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resourceHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} hide />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  name="CPU"
                  stroke="#00ff9d" 
                  strokeWidth={3} 
                  dot={{ r: 3, fill: '#00ff9d', strokeWidth: 0 }} 
                  activeDot={{ r: 5, fill: '#00ff9d', stroke: '#111', strokeWidth: 2 }}
                  animationDuration={1000} 
                />
                <Line 
                  type="monotone" 
                  dataKey="ram" 
                  name="RAM"
                  stroke="#a855f7" 
                  strokeWidth={3} 
                  dot={{ r: 3, fill: '#a855f7', strokeWidth: 0 }} 
                  activeDot={{ r: 5, fill: '#a855f7', stroke: '#111', strokeWidth: 2 }}
                  animationDuration={1000} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-3">
        <div className="bg-[#111111] border border-zinc-800/50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-zinc-300">
            <Clock size={20} className="text-[#00ff9d]" />
            <h3 className="text-lg font-bold">Histori Terbaru</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-none space-y-3 lg:space-y-4 pr-1">
            {historyItems.map((item) => (
              <div 
                key={item.id} 
                className="group p-4 bg-[#1a1a1a] border border-zinc-800/50 rounded-2xl hover:bg-[#222222] transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-bold leading-tight group-hover:text-[#00ff9d] transition-colors uppercase">{item.name}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{item.timestamp}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_rgba(0,255,157,0.5)]" />
                </div>
                <div className="absolute left-0 top-0 w-1 h-full bg-[#00ff9d] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          
          <button className="mt-6 w-full py-3 text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
            Lihat Semua
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-[#111111] border border-zinc-800/50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col items-start gap-3 lg:gap-4 transition-transform hover:scale-[1.02] cursor-default">
    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800/50">
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </div>
    <div>
      <p className="text-[9px] lg:text-[10px] font-bold text-zinc-500 tracking-[0.2em] mb-1">{label}</p>
      <h4 className="text-2xl lg:text-3xl font-bold tracking-tight">{value}</h4>
    </div>
    <div className="w-full h-1 rounded-full opacity-20" style={{ backgroundColor: color }} />
  </div>
);
