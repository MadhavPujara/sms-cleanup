import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type FilterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filter'>;
};

interface FilterOptions {
  sender: string;
  content: string;
  startDate: string;
  endDate: string;
}

export default function FilterScreen({ navigation }: FilterScreenProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sender: '',
    content: '',
    startDate: '',
    endDate: '',
  });

  const handleApplyFilter = () => {
    // TODO: Implement filter logic
    navigation.goBack();
  };

  const handleReset = () => {
    setFilterOptions({
      sender: '',
      content: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleInputChange = (field: keyof FilterOptions) => (text: string) => {
    setFilterOptions((prev) => ({ ...prev, [field]: text }));
  };

  return (
    <StyledView className="flex-1 bg-background p-4">
      <StyledView className="space-y-4">
        <StyledView>
          <StyledText className="text-text font-semibold mb-2">
            Sender
          </StyledText>
          <StyledTextInput
            className="bg-white p-2 rounded-lg border border-gray-300"
            placeholder="Filter by sender"
            value={filterOptions.sender}
            onChangeText={handleInputChange('sender')}
          />
        </StyledView>

        <StyledView>
          <StyledText className="text-text font-semibold mb-2">
            Content
          </StyledText>
          <StyledTextInput
            className="bg-white p-2 rounded-lg border border-gray-300"
            placeholder="Filter by message content"
            value={filterOptions.content}
            onChangeText={handleInputChange('content')}
          />
        </StyledView>

        <StyledView>
          <StyledText className="text-text font-semibold mb-2">
            Date Range
          </StyledText>
          <StyledView className="flex-row space-x-4">
            <StyledTextInput
              className="flex-1 bg-white p-2 rounded-lg border border-gray-300"
              placeholder="Start date"
              value={filterOptions.startDate}
              onChangeText={handleInputChange('startDate')}
            />
            <StyledTextInput
              className="flex-1 bg-white p-2 rounded-lg border border-gray-300"
              placeholder="End date"
              value={filterOptions.endDate}
              onChangeText={handleInputChange('endDate')}
            />
          </StyledView>
        </StyledView>

        <StyledView className="flex-row space-x-4 mt-6">
          <StyledTouchableOpacity
            className="flex-1 bg-primary p-4 rounded-lg"
            onPress={handleApplyFilter}
          >
            <StyledText className="text-white text-center font-semibold">
              Apply Filter
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            className="flex-1 bg-gray-200 p-4 rounded-lg"
            onPress={handleReset}
          >
            <StyledText className="text-text text-center font-semibold">
              Reset
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 