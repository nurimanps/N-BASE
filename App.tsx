
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MonitorDashboard } from './components/MonitorDashboard';
import { TablesView } from './components/TablesView';
import { SettingsView } from './components/SettingsView';
import { SystemStats, ResourceData, HistoryItem } from './types';
import { getRecentActivity } from './services/supabase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'tables' | 'settings'>('dashboard');
  const [stats, setStats] = useState<SystemStats>({
    cpu: 28,
    ram: 4.2,
    storage: 65.4,
    network: 203
  });

  const getFormattedDate = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  const [resourceHistory, setResourceHistory] = useState<ResourceData[]>([]);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { id: '1', name: 'NAFIZA AZZAHRA SABRINA', timestamp: getFormattedDate(0), status: 'online' },
    { id: '2', name: 'KENZO DIKI ABISATYA NURROHKIM', timestamp: getFormattedDate(0), status: 'online' },
    { id: '3', name: 'KENAN DIKA ABISATYA NURROHKIM', timestamp: getFormattedDate(1), status: 'online' },
    { id: '4', name: 'SAFIRA ALMIRA SALMA', timestamp: getFormattedDate(1), status: 'online' },
    { id: '5', name: 'ANANTA SHAHREEN KHOLIFATUNISA', timestamp: getFormattedDate(2), status: 'online' },
    { id: '6', name: 'JOANNA IASHA', timestamp: getFormattedDate(2), status: 'online' },
  ]);

  // Fetch real-time activity from Supabase
  useEffect(() => {
    const fetchSupabaseActivity = async () => {
      const data = await getRecentActivity();
      if (data && data.length > 0) {
        // Map Supabase data to HistoryItem format
        const mappedData: HistoryItem[] = data.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          name: item.name || item.description || 'System Event',
          timestamp: new Date(item.created_at).toLocaleDateString(),
          status: 'online'
        }));
        setHistoryItems(mappedData);
      }
    };

    fetchSupabaseActivity();
    const historyInterval = setInterval(fetchSupabaseActivity, 30000); // Check every 30s
    return () => clearInterval(historyInterval);
  }, []);

  // Simulate real-time monitoring data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newCpu = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
      // Real-time RAM with decimal precision
      const newRam = parseFloat((4 + Math.random() * 0.8).toFixed(1));
      const newRamPerc = (newRam / 8) * 100;
      const newNetwork = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
      // Real-time Storage fluctuation
      const newStorage = parseFloat((65 + Math.random() * 0.5).toFixed(1));

      setStats(prev => ({
        ...prev,
        cpu: newCpu,
        ram: newRam,
        network: newNetwork,
        storage: newStorage
      }));

      setResourceHistory(prev => {
        const newData = [...prev, { time: timeStr, cpu: newCpu, ram: newRamPerc }];
        return newData.slice(-20); // Keep last 20 data points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'tables':
        return <TablesView historyItems={historyItems} />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <MonitorDashboard 
            stats={stats} 
            resourceHistory={resourceHistory} 
            historyItems={historyItems}
          />
        );
    }
  };

  return (
    <Layout stats={stats} currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
