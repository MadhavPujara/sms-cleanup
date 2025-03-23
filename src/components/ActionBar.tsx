import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ActionBarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onFilter: () => void;
  testID?: string;
}

export default function ActionBar({
  selectedCount,
  onSelectAll,
  onDeleteSelected,
  onFilter,
  testID,
}: ActionBarProps) {
  return (
    <StyledView 
      className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-100 shadow-sm"
      testID={testID}
    >
      <StyledView className="flex-row items-center">
        <StyledTouchableOpacity
          className="flex-row items-center mr-4"
          onPress={onSelectAll}
          testID={`${testID}-select-all`}
        >
          <Ionicons 
            name={selectedCount > 0 ? "checkbox" : "square-outline"} 
            size={20} 
            color="#3b82f6"
            style={{ marginRight: 4 }}
          />
          <StyledText className="text-primary font-medium">
            {selectedCount > 0 ? 'Deselect All' : 'Select All'}
          </StyledText>
        </StyledTouchableOpacity>
        {selectedCount > 0 && (
          <StyledTouchableOpacity
            className="flex-row items-center"
            onPress={onDeleteSelected}
            testID={`${testID}-delete-selected`}
          >
            <Ionicons 
              name="trash-outline" 
              size={20} 
              color="#ef4444"
              style={{ marginRight: 4 }}
            />
            <StyledText className="text-red-500 font-medium">
              Delete ({selectedCount})
            </StyledText>
          </StyledTouchableOpacity>
        )}
      </StyledView>
      <StyledTouchableOpacity 
        className="flex-row items-center"
        onPress={onFilter}
        testID={`${testID}-filter`}
      >
        <Ionicons 
          name="filter" 
          size={20} 
          color="#3b82f6"
          style={{ marginRight: 4 }}
        />
        <StyledText className="text-primary font-medium">
          Filter
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
} 