import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionBar from '../../components/ActionBar';

describe('ActionBar', () => {
  const defaultProps = {
    selectedCount: 0,
    onSelectAll: jest.fn(),
    onDeleteSelected: jest.fn(),
    onFilter: jest.fn(),
    testID: 'action-bar'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Select All" when no items are selected', () => {
    const { getByText, queryByText } = render(<ActionBar {...defaultProps} />);
    
    expect(getByText('Select All')).toBeTruthy();
    expect(queryByText('Delete Selected')).toBeNull();
  });

  it('renders "Deselect All" and "Delete Selected" when items are selected', () => {
    const { getByText } = render(
      <ActionBar 
        {...defaultProps} 
        selectedCount={3} 
      />
    );
    
    expect(getByText('Deselect All')).toBeTruthy();
    expect(getByText('Delete Selected (3)')).toBeTruthy();
  });

  it('calls onSelectAll when "Select All" is pressed', () => {
    const { getByTestId } = render(<ActionBar {...defaultProps} />);
    
    fireEvent.press(getByTestId('action-bar-select-all'));
    expect(defaultProps.onSelectAll).toHaveBeenCalledTimes(1);
  });

  it('calls onDeleteSelected when "Delete Selected" is pressed', () => {
    const { getByTestId } = render(
      <ActionBar 
        {...defaultProps} 
        selectedCount={3} 
      />
    );
    
    fireEvent.press(getByTestId('action-bar-delete-selected'));
    expect(defaultProps.onDeleteSelected).toHaveBeenCalledTimes(1);
  });

  it('calls onFilter when "Filter" is pressed', () => {
    const { getByTestId } = render(<ActionBar {...defaultProps} />);
    
    fireEvent.press(getByTestId('action-bar-filter'));
    expect(defaultProps.onFilter).toHaveBeenCalledTimes(1);
  });
}); 