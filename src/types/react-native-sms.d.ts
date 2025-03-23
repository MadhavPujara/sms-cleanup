declare module 'react-native-sms' {
  interface SMSOptions {
    box: 'inbox' | 'sent' | 'draft' | 'outbox' | 'failed' | 'queued';
    maxCount?: number;
    sort?: 'date' | 'address' | 'body';
  }

  interface SMSMessage {
    _id: string;
    address: string;
    body: string;
    date: number;
    dateSent: number;
    read: boolean;
    type: number;
    serviceCenter: string;
  }

  interface DeleteOptions {
    messageIds: string[];
  }

  const Sms: {
    list(options: string): Promise<string>;
    delete(options: string): Promise<string>;
    hasPermission(): Promise<boolean>;
  };

  export default Sms;
} 