import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface MessageItemProps {
  sender: string;
  content: string;
  timestamp: number;
  selected: boolean;
  onSelect: () => void;
  onLongPress: () => void;
  testID?: string;
}

export default function MessageItem({
  sender,
  content,
  timestamp,
  selected,
  onSelect,
  onLongPress,
  testID,
}: MessageItemProps) {
  const date = new Date(timestamp).toLocaleDateString();
  const time = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <StyledTouchableOpacity
      className={`p-4 border-b border-gray-100 flex-row items-center ${
        selected ? 'bg-blue-50' : 'bg-white'
      }`}
      onPress={onSelect}
      onLongPress={onLongPress}
      testID={testID}
      activeOpacity={0.7}
    >
      <StyledView className="mr-3">
        <Ionicons 
          name={selected ? "checkmark-circle" : "radio-button-off"} 
          size={24} 
          color={selected ? "#3b82f6" : "#9ca3af"}
        />
      </StyledView>
      <StyledView className="flex-1">
        <StyledView className="flex-row justify-between items-center mb-1">
          <StyledText className="text-base font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
            {sender}
          </StyledText>
          <StyledView className="flex-row items-center">
            <StyledText className="text-xs text-gray-500">
              {date} {time}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledText 
          className="text-sm text-gray-600" 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {content}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
} 