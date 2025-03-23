# Testing Documentation

This project includes comprehensive test coverage with the following types of tests:

## Test Types

1. **Unit Tests**
   - Component tests for individual UI components
   - Utility function tests

2. **Integration Tests**
   - Screen tests that combine multiple components
   - API integration tests

3. **End-to-End Tests**
   - Critical user workflows
   - Message deletion workflow

4. **Performance Tests**
   - Message list rendering performance
   - Selection performance

## Test File Structure

Tests are organized in the following directories:

```
src/
└── __tests__/
    ├── components/       # Unit tests for UI components
    ├── screens/          # Integration tests for screens
    ├── utils/            # Tests for utility functions
    ├── e2e/              # End-to-end workflow tests
    ├── performance/      # Performance tests
    └── __mocks__/        # Mock implementations
```

## Test Configuration

The project uses the following testing tools:

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **Jest Native** - React Native specific matchers

## Setting Up the Testing Environment

### Prerequisites

To set up the testing environment, you'll need to resolve some potential dependency conflicts. Here's what you need to do:

1. Install compatible versions of the testing libraries:

```bash
npm install --save-dev jest @testing-library/react-native@12.4.0 @testing-library/jest-native jest-expo --legacy-peer-deps
```

2. Configure Jest in `jest.config.js`:

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind)'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ],
  testEnvironment: 'node'
}
```

3. Configure Babel in `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      api.env('test') && "@babel/plugin-transform-runtime"
    ].filter(Boolean),
  };
};
```

4. Create a setup file in `jest.setup.js`:

```javascript
// Set up global mocks for React Native
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));

// Mock react-native-sms
jest.mock('react-native-sms', () => require('./__tests__/__mocks__/react-native-sms'));

// Mock react-native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
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
```

### Known Issues and Troubleshooting

There are some known compatibility issues between React Native, Expo, and the testing libraries. These issues are mostly related to:

1. **Babel configuration conflicts**
   - Solution: Make sure your Babel configuration properly handles the test environment

2. **React version compatibility**
   - Solution: Use compatible versions of testing libraries with your React version

3. **NativeWind/styled-components integration**
   - Solution: Mock the styled component functions to return the original component

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- path/to/test.tsx
```

To run tests in watch mode:

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm run test:coverage
```

## Writing Tests

### Component Tests

Component tests should focus on:

- Rendering with different props
- User interactions
- State changes

Example:

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessageItem, { MessageItemProps } from '../../components/MessageItem';

describe('MessageItem', () => {
  const defaultProps: MessageItemProps = {
    sender: 'Test Sender',
    content: 'Test message content',
    timestamp: 1647853200000, // March 21, 2022
    selected: false,
    onSelect: jest.fn(),
    onLongPress: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const { getByText } = render(<MessageItem {...defaultProps} />);
    expect(getByText('Test Sender')).toBeTruthy();
  });

  it('calls onSelect when pressed', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <MessageItem 
        {...defaultProps} 
        onSelect={onSelect}
        testID="message-item"
      />
    );
    
    fireEvent.press(getByTestId('message-item'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
```

### Screen Tests

Screen tests should focus on:

- Screen navigation
- Component integration
- Data flow

### E2E Tests

E2E tests should focus on:

- Full user workflows
- Multi-step interactions

### Performance Tests

Performance tests should focus on:

- Rendering performance
- Operation timing
- Memory usage

## Test Mocks

Common mocks used in tests:

1. **React Native SMS**
   - Located at `src/__tests__/__mocks__/react-native-sms.ts`
   - Provides mock implementations for SMS functions

2. **Navigation**
   - Mocked in `jest.setup.js`
   - Provides navigation functions (navigate, goBack)
