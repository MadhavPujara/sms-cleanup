// Set up global mocks for React Native
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));

// Mock react-native-sms
jest.mock('react-native-sms', () => require('./__tests__/__mocks__/react-native-sms'));

// Mock react-native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock nativewind's styled function to return the original component
jest.mock('nativewind', () => ({
  styled: (component) => component,
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useIsFocused: () => true,
}));

// Setup to ignore test warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filter out specific warning messages
  if (
    args[0]?.includes?.('Warning:') ||
    args[0]?.includes?.('ReactDOM.render is no longer supported')
  ) {
    return;
  }
  originalConsoleError(...args);
}; 