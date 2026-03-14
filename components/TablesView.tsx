
import React from 'react';
import { Table, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { HistoryItem } from '../types';

interface TablesViewProps {
  historyItems: HistoryItem[];
}

export const TablesView: React.FC<TablesViewProps> = ({ historyItems }) => {
  return (
    <div className="bg-[#111111] border border-zinc-800/50 p-4 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Table size={24} className="text-[#00ff9d]" />
          <h3 className="text-xl lg:text-2xl font-bold text-white">Project Tables</h3>
        </div>
        <button className="w-full sm:w-auto px-6 py-2.5 bg-[#00ff9d] text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
          Create Table
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 lg:mx-0 px-4 lg:px-0">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">Name <ArrowUpDown size={14} /></div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">Last Activity</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-zinc-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-800/20 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white group-hover:text-[#00ff9d] transition-colors">{item.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-400 font-mono">{item.timestamp}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">
                    Online
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
