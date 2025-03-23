# API Documentation

## SMS Operations

### 1. Read SMS Messages

```typescript
interface ReadSMSResponse {
  messages: Message[];
  total: number;
  hasMore: boolean;
}

interface Message {
  id: string;
  threadId: string;
  address: string;
  body: string;
  date: number;
  dateSent: number;
  read: boolean;
  type: number;
  serviceCenter: string;
}
```

### 2. Delete SMS Messages

```typescript
interface DeleteSMSRequest {
  messageIds: string[];
}

interface DeleteSMSResponse {
  success: boolean;
  deletedCount: number;
  errors?: string[];
}
```

### 3. Filter Messages

```typescript
interface FilterRequest {
  startDate?: number;
  endDate?: number;
  sender?: string;
  searchTerm?: string;
  page: number;
  limit: number;
}

interface FilterResponse {
  messages: Message[];
  total: number;
  page: number;
  hasMore: boolean;
}
```

## React Native SMS API

### 1. Request Permissions

```typescript
import { PermissionsAndroid, Platform } from 'react-native';

async function requestSMSPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "SMS Permission",
          message: "App needs access to read your SMS.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}
```

### 2. Read Messages

```typescript
import Sms from 'react-native-sms';

async function readMessages() {
  try {
    const messages = await Sms.list(
      JSON.stringify({
        box: 'inbox',
        maxCount: 100,
        sort: 'date'
      })
    );
    return JSON.parse(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
}
```

### 3. Delete Messages

```typescript
async function deleteMessages(messageIds: string[]) {
  try {
    const result = await Sms.delete(
      JSON.stringify({
        messageIds: messageIds
      })
    );
    return JSON.parse(result);
  } catch (error) {
    console.error('Error deleting messages:', error);
    return { success: false, error: error.message };
  }
}
```

## Error Handling

### Common Errors

1. Permission Denied
   - Code: `PERMISSION_DENIED`
   - Solution: Request permissions again

2. Message Not Found
   - Code: `MESSAGE_NOT_FOUND`
   - Solution: Refresh message list

3. Delete Failed
   - Code: `DELETE_FAILED`
   - Solution: Retry operation

## Rate Limiting

- Read operations: 100 messages per request
- Delete operations: 50 messages per batch
- Filter operations: 1000 messages per query

## Best Practices

1. Always check permissions before operations
2. Implement pagination for large message lists
3. Cache frequently accessed data
4. Handle offline scenarios
5. Implement retry mechanism for failed operations
