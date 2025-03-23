import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

interface Settings {
  darkMode: boolean;
  confirmDelete: boolean;
  autoBackup: boolean;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    confirmDelete: true,
    autoBackup: false,
  });

  const handleSettingChange = (key: keyof Settings) => (value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearCache = () => {
    // TODO: Implement cache clearing
  };

  const handleExportData = () => {
    // TODO: Implement data export
  };

  return (
    <StyledView className="flex-1 bg-background p-4">
      <StyledView className="space-y-6">
        <StyledView>
          <StyledText className="text-xl font-bold text-text mb-4">
            Appearance
          </StyledText>
          <StyledView className="flex-row justify-between items-center bg-white p-4 rounded-lg">
            <StyledText className="text-text">Dark Mode</StyledText>
            <Switch
              value={settings.darkMode}
              onValueChange={handleSettingChange('darkMode')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.darkMode ? '#007AFF' : '#f4f3f4'}
            />
          </StyledView>
        </StyledView>

        <StyledView>
          <StyledText className="text-xl font-bold text-text mb-4">
            Messages
          </StyledText>
          <StyledView className="space-y-4">
            <StyledView className="flex-row justify-between items-center bg-white p-4 rounded-lg">
              <StyledText className="text-text">Confirm Delete</StyledText>
              <Switch
                value={settings.confirmDelete}
                onValueChange={handleSettingChange('confirmDelete')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.confirmDelete ? '#007AFF' : '#f4f3f4'}
              />
            </StyledView>
            <StyledView className="flex-row justify-between items-center bg-white p-4 rounded-lg">
              <StyledText className="text-text">Auto Backup</StyledText>
              <Switch
                value={settings.autoBackup}
                onValueChange={handleSettingChange('autoBackup')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.autoBackup ? '#007AFF' : '#f4f3f4'}
              />
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView>
          <StyledText className="text-xl font-bold text-text mb-4">
            Data Management
          </StyledText>
          <StyledView className="space-y-4">
            <StyledTouchableOpacity
              className="bg-white p-4 rounded-lg"
              onPress={handleClearCache}
            >
              <StyledText className="text-text">Clear Cache</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              className="bg-white p-4 rounded-lg"
              onPress={handleExportData}
            >
              <StyledText className="text-text">Export Data</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 