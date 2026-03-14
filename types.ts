
export interface ResourceData {
  time: string;
  cpu: number;
  ram: number;
}

export interface ActivityData {
  date: string;
  count: number;
}

export interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  status: 'online' | 'offline';
}

export interface SystemStats {
  cpu: number;
  ram: number;
  storage: number;
  network: number;
}
