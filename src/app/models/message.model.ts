export interface Message {
  sender: string;
  content: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}
