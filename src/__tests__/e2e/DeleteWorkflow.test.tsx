import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';
import Sms from 'react-native-sms';
import { Alert } from 'react-native';

jest.mock('../../navigation/AppNavigator', () => {
  const React = require('react');
  const HomeScreen = require('../../screens/HomeScreen').default;
  
  return function MockNavigator() {
    return <HomeScreen navigation={{ navigate: jest.fn() }} />;
  };
});

describe('E2E: SMS Deletion Workflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow users to select and delete multiple messages', async () => {
    const { getByText, queryByText } = render(<App />);

    // Wait for the app to load messages
    await waitFor(() => {
      expect(Sms.list).toHaveBeenCalled();
      expect(getByText('Contact 1')).toBeTruthy();
    });

    // Select all messages
    fireEvent.press(getByText('Select All'));

    // Verify that delete button appears and shows count
    expect(getByText('Delete Selected (3)')).toBeTruthy();

    // Press delete button
    fireEvent.press(getByText('Delete Selected (3)'));

    // Verify that confirmation alert appears
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Messages',
      'Are you sure you want to delete 3 messages?',
      expect.arrayContaining([
        expect.objectContaining({ text: 'Cancel' }),
        expect.objectContaining({ text: 'Delete' })
      ])
    );

    // Simulate confirming deletion by calling the onPress handler of the "Delete" button
    const alertMock = Alert.alert as jest.Mock;
    const deleteAction = alertMock.mock.calls[0][2].find(
      (action: any) => action.text === 'Delete'
    );
    deleteAction.onPress();

    // Verify SMS deletion was called with the correct IDs
    await waitFor(() => {
      expect(Sms.delete).toHaveBeenCalledWith(
        expect.stringContaining('"messageIds":')
      );
    });

    // Verify the messages are removed from the UI (empty state appears)
    await waitFor(() => {
      expect(getByText('No messages found')).toBeTruthy();
    });
  });
}); 