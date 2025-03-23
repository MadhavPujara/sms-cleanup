declare module 'react-native-get-sms-android' {
  interface SmsFilter {
    box?: 'inbox' | 'sent' | 'draft';
    maxCount?: number;
    address?: string;
    bodyRegex?: string;
    indexFrom?: number;
    minDate?: number;
    maxDate?: number;
    read?: 0 | 1;
  }

  interface SmsAndroid {
    list(
      filter: string,
      fail: (error: string) => void,
      success: (count: number, smsList: string) => void
    ): void;

    delete(
      messageId: string,
      fail: (error: string) => void,
      success: (wasSuccessful: boolean) => void
    ): void;
  }

  const SmsAndroid: SmsAndroid;
  export default SmsAndroid;
} 