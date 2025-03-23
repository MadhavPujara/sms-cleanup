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
    expect(getByText('Test message content')).toBeTruthy();
    expect(getByText('3/21/2022')).toBeTruthy();
  });

  it('renders with selected style when selected is true', () => {
    const { getByTestId } = render(
      <MessageItem 
        {...defaultProps} 
        selected={true} 
        testID="message-item"
      />
    );
    
    const messageItem = getByTestId('message-item');
    expect(messageItem.props.className).toContain('bg-blue-50');
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

  it('calls onLongPress when long pressed', () => {
    const onLongPress = jest.fn();
    const { getByTestId } = render(
      <MessageItem 
        {...defaultProps} 
        onLongPress={onLongPress}
        testID="message-item"
      />
    );
    
    fireEvent(getByTestId('message-item'), 'onLongPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });
}); 