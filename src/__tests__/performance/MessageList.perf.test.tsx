import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import Sms from 'react-native-sms';

// Generate a large number of mock messages
const generateMockMessages = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `${i + 1}`,
    address: `Contact ${i + 1}`,
    body: `Message ${i + 1} content`,
    date: Date.now() - i * 1000 * 60 * 60, // Hours ago
  }));
};

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
};

describe('Performance: Message List Rendering', () => {
  const originalConsoleTime = console.time;
  const originalConsoleTimeEnd = console.timeEnd;
  
  let timeMarks: Record<string, number> = {};
  
  beforeAll(() => {
    // Override console.time and console.timeEnd for testing
    console.time = (label: string) => {
      timeMarks[label] = performance.now();
    };
    
    console.timeEnd = (label: string) => {
      const startTime = timeMarks[label];
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${label}: ${duration}ms`);
      return duration;
    };
    
    // Mock SMS.list to return a large number of messages
    (Sms.list as jest.Mock).mockImplementation((args) => {
      const parsedArgs = JSON.parse(args);
      const count = parsedArgs.maxCount || 100;
      const mockMessages = generateMockMessages(count);
      return Promise.resolve(JSON.stringify(mockMessages));
    });
  });
  
  afterAll(() => {
    console.time = originalConsoleTime;
    console.timeEnd = originalConsoleTimeEnd;
  });
  
  it('renders 100 messages efficiently', async () => {
    console.time('render-100-messages');
    const { findAllByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );
    
    // Wait for the messages to render
    const messageItems = await findAllByTestId(/^message-item/);
    
    const renderTime = console.timeEnd('render-100-messages');
    
    // Expect message items to be rendered
    expect(messageItems.length).toBe(100);
    
    // Set a performance threshold (adjust based on your requirements)
    expect(renderTime).toBeLessThan(2000); // 2 seconds
  });
  
  it('handles message selection efficiently', async () => {
    const { findAllByTestId, getByText } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );
    
    // Wait for the messages to render
    const messageItems = await findAllByTestId(/^message-item/);
    
    // Measure select all performance
    console.time('select-all-messages');
    getByText('Select All').press();
    const selectAllTime = console.timeEnd('select-all-messages');
    
    // Set a performance threshold
    expect(selectAllTime).toBeLessThan(200); // 200ms
  });
}); 