# Setup Instructions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Git

## Initial Setup

### 1. Install Expo CLI

```bash
npm install -g expo-cli
```

### 2. Create Project

```bash
npx create-expo-app bulk-sms-deletion
cd bulk-sms-deletion
```

### 3. Install Dependencies

```bash
npm install nativewind tailwindcss@3.3.2 postcss autoprefixer
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-sms
```

### 4. Configure Tailwind CSS

Create `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### 5. Project Structure Setup

```bash
mkdir -p app/{assets,components,screens,navigation,utils}
mkdir -p server/{src,routes,config}
```

### 6. Configure Development Environment

1. Set up environment variables:
   Create `.env` file:

   ```
   EXPO_PUBLIC_API_URL=http://localhost:3000
   ```

2. Configure Android permissions in `app.json`:

```json
{
  "expo": {
    "android": {
      "permissions": ["READ_SMS", "SEND_SMS", "RECEIVE_SMS"]
    }
  }
}
```

### 7. Start Development Server

```bash
npx expo start
```

## Development Workflow

### Running the App

- iOS: Press `i` in the terminal or run `npx expo run:ios`
- Android: Press `a` in the terminal or run `npx expo run:android`
- Web: Press `w` in the terminal or run `npx expo run:web`

### Testing

```bash
npm test
```

### Building for Production

```bash
eas build --platform android
eas build --platform ios
```

## Troubleshooting

### Common Issues

1. Metro bundler not starting
   - Clear metro cache: `npx expo start -c`
   - Reset node_modules: `rm -rf node_modules && npm install`

2. Android build issues
   - Clean Android build: `cd android && ./gradlew clean`

3. iOS build issues
   - Clean iOS build: `cd ios && pod install`

## Next Steps

1. Review the project structure
2. Set up navigation
3. Implement basic UI components
4. Begin SMS permission implementation
