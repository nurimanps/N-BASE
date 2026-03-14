
import React from 'react';
import { Settings, Shield, Bell, HardDrive, RefreshCw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-[#111111] border border-zinc-800/50 p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] space-y-6 lg:space-y-8">
        <div className="flex items-center gap-3">
          <Settings size={24} className="text-[#00ff9d]" />
          <h3 className="text-xl lg:text-2xl font-bold text-white">General Settings</h3>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <SettingItem 
            icon={<Bell size={20} className="text-orange-400" />} 
            title="Notifications" 
            desc="Manage system and performance alerts" 
            active 
          />
          <SettingItem 
            icon={<Shield size={20} className="text-blue-400" />} 
            title="Security" 
            desc="API Keys and project permissions" 
          />
          <SettingItem 
            icon={<HardDrive size={20} className="text-purple-400" />} 
            title="Storage Management" 
            desc="Automated cleanup and cache control" 
          />
        </div>
      </div>

      <div className="bg-[#111111] border border-zinc-800/50 p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] space-y-6 lg:space-y-8">
        <div className="flex items-center gap-3">
          <RefreshCw size={24} className="text-[#00ff9d]" />
          <h3 className="text-xl lg:text-2xl font-bold text-white">Auto Sync</h3>
        </div>
        
        <div className="p-5 lg:p-6 bg-[#1a1a1a] border border-zinc-800/50 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-white">Supabase Live Connection</p>
            <div className="w-12 h-6 bg-[#00ff9d] rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
            </div>
          </div>
          <p className="text-xs text-zinc-500">Automatically synchronizing telemetry data every 30 seconds for optimal monitoring performance.</p>
        </div>

        <button className="w-full py-4 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode, title: string, desc: string, active?: boolean }> = ({ icon, title, desc, active }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-zinc-800/20 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-zinc-800/50">
    <div className="mt-1 p-2 bg-[#1a1a1a] rounded-xl border border-zinc-800/50">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-xs text-zinc-500 mt-1">{desc}</p>
    </div>
    {active && (
      <div className="w-2 h-2 rounded-full bg-[#00ff9d] self-center" />
    )}
  </div>
);
