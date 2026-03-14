
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  Activity,
  HeartPulse,
  Search,
  Menu,
  X,
  MoreVertical
} from 'lucide-react';
import { SystemStats } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  stats: SystemStats;
  currentView: 'dashboard' | 'tables' | 'settings';
  onViewChange: (view: 'dashboard' | 'tables' | 'settings') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, stats, currentView, onViewChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleViewChange = (view: 'dashboard' | 'tables' | 'settings') => {
    onViewChange(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-900 bg-[#0d0d0d] flex flex-col p-6 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00ff9d]/10 rounded-xl flex items-center justify-center border border-[#00ff9d]/30">
              <Database className="text-[#00ff9d] w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">N-BASE</h1>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-2 text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => handleViewChange('dashboard')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border font-medium transition-all ${
              currentView === 'dashboard' 
                ? 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20' 
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all">
            <Activity size={20} />
            Analytics
          </button>
          <button 
            onClick={() => handleViewChange('tables')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border font-medium transition-all ${
              currentView === 'tables' 
                ? 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20' 
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Database size={20} />
            Tables
          </button>
          <button 
            onClick={() => handleViewChange('settings')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border font-medium transition-all ${
              currentView === 'settings' 
                ? 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20' 
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>

        {/* System Health Widget */}
        <div className="mt-12 p-5 bg-[#141414] rounded-2xl border border-zinc-800/50">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            <HeartPulse size={14} className="text-[#00ff9d]" />
            System Health
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">CPU Load</span>
                <span className="text-[#00ff9d] font-mono">{stats.cpu}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00ff9d] rounded-full transition-all duration-500" 
                  style={{ width: `${stats.cpu}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">RAM Usage</span>
                <span className="text-[#a855f7] font-mono">{stats.ram.toFixed(1)} GB</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#a855f7] rounded-full transition-all duration-500" 
                  style={{ width: `${(stats.ram / 8) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-900/50 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-400 hover:text-[#00ff9d] transition-colors"
              >
                <MoreVertical size={20} />
              </button>
              <div>
                <h2 className="text-xl lg:text-3xl font-bold truncate">
                  {currentView === 'dashboard' ? 'Live Monitor' : currentView === 'tables' ? 'Database Tables' : 'System Settings'}
                </h2>
                <p className="hidden sm:block text-zinc-500 text-xs lg:text-sm font-medium italic">Dashboard Performa N-Base</p>
              </div>
            </div>
            
            <div className="relative group flex-1 max-w-xs hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00ff9d] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="bg-[#141414] border border-zinc-800/50 rounded-2xl py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/30 transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-2 lg:hidden">
               <div className="w-8 h-8 bg-[#00ff9d]/10 rounded-lg flex items-center justify-center border border-[#00ff9d]/20">
                  <Database size={16} className="text-[#00ff9d]" />
               </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
