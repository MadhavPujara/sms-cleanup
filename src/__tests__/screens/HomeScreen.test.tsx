import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import Sms from 'react-native-sms';
import { Alert } from 'react-native';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads and displays messages on mount', async () => {
    const { getByText, queryByText } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );

    // Wait for the messages to load
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
      expect(getByText('Contact 1')).toBeTruthy();
      expect(getByText('Message 1 content')).toBeTruthy();
      expect(getByText('Contact 2')).toBeTruthy();
      expect(getByText('Contact 3')).toBeTruthy();
    });

    // Should not show the empty state
    expect(queryByText('No messages found')).toBeNull();
  });

  it('can select and deselect a message', async () => {
    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );

    // Wait for messages to load
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
    });

    // Get all message items
    const messageItems = await waitFor(() => getAllByTestId(/^message-item/));
    expect(messageItems.length).toBe(3);

    // Select the first message
    fireEvent.press(messageItems[0]);

    // First message should now be selected
    expect(messageItems[0].props.className).toContain('bg-blue-50');
  });

  it('can select all messages using the Select All button', async () => {
    const { getByText, getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );

    // Wait for messages to load
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
    });

    // Click Select All
    fireEvent.press(getByText('Select All'));

    // All message items should now be selected
    const messageItems = await waitFor(() => getAllByTestId(/^message-item/));
    messageItems.forEach(item => {
      expect(item.props.className).toContain('bg-blue-50');
    });

    // Click Deselect All
    fireEvent.press(getByText('Deselect All'));

    // All message items should now be deselected
    messageItems.forEach(item => {
      expect(item.props.className).not.toContain('bg-blue-50');
    });
  });

  it('navigates to Filter screen when Filter button is pressed', async () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );

    // Wait for messages to load
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
    });

    // Click Filter button
    fireEvent.press(getByText('Filter'));

    // Should navigate to Filter screen
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Filter');
  });

  it('shows confirmation alert when trying to delete selected messages', async () => {
    const { getByText, getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} />
    );

    // Wait for messages to load
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
    });

    // Select all messages
    fireEvent.press(getByText('Select All'));

    // Click Delete Selected
    fireEvent.press(getByText('Delete Selected (3)'));

    // Should show confirmation alert
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Messages',
      'Are you sure you want to delete 3 messages?',
      expect.any(Array)
    );
  });
}); 