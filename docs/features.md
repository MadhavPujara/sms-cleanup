# Features & Components

## Core Features

### 1. SMS Management

- List all SMS messages
- Filter messages by:
  - Date range
  - Sender
  - Message content
- Bulk selection
- Delete selected messages
- Undo delete operation

### 2. User Interface

- Dark/Light mode support
- Pull-to-refresh
- Infinite scroll
- Search functionality
- Sort options

### 3. Security

- SMS permission handling
- Confirmation dialogs for delete operations
- Backup before deletion

## UI Components

### 1. Message List

```typescript
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  selected: boolean;
}
```

### 2. Message Item

- Sender avatar/initial
- Message preview
- Timestamp
- Selection checkbox
- Long press actions

### 3. Action Bar

- Select all
- Delete selected
- Filter options
- Search bar

### 4. Filter Modal

- Date range picker
- Sender search
- Content search
- Apply/Reset buttons

### 5. Confirmation Dialog

- Warning message
- Selected count
- Cancel/Confirm buttons

## Screens

### 1. Home Screen

- Message list
- Action bar
- Empty state
- Loading state

### 2. Filter Screen

- Filter options
- Search history
- Recent filters

### 3. Settings Screen

- Theme toggle
- Backup settings
- App information

## Navigation Flow

1. App Launch → Permission Check
2. Permission Granted → Home Screen
3. Permission Denied → Permission Request Screen
4. Home Screen → Filter/Delete Operations
5. Settings → App Configuration

## State Management

- Selected messages
- Filter state
- Theme preference
- Search history

## API Integration

- SMS reading
- SMS deletion
- Backup operations
- Settings persistence
