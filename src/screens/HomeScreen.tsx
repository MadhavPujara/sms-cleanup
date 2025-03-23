import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Text, PermissionsAndroid, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MessageItem from '../components/MessageItem';
import ActionBar from '../components/ActionBar';
import SmsAndroid from 'react-native-get-sms-android';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  selected: boolean;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs access to your SMS to manage messages.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Error requesting SMS permission:', err);
        return false;
      }
    }
    return false;
  };

  const loadMessages = async () => {
    try {
      const hasPermission = await requestSMSPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant SMS permission to use this app.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      const filter = {
        box: 'inbox',
        maxCount: 100,
      };

      SmsAndroid.list(
        JSON.stringify(filter),
        (fail: string) => {
          console.error('Failed to load messages:', fail);
          Alert.alert('Error', 'Failed to load messages');
          setLoading(false);
        },
        (count: number, smsList: string) => {
          const parsedMessages = JSON.parse(smsList).map((msg: any) => ({
            id: msg._id,
            sender: msg.address,
            content: msg.body,
            timestamp: parseInt(msg.date),
            selected: false,
          }));
          setMessages(parsedMessages);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error loading messages:', error);
      Alert.alert('Error', 'Failed to load messages');
      setLoading(false);
    }
  };

  const handleMessageSelect = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, selected: !msg.selected } : msg
      )
    );
  };

  const handleMessageLongPress = (id: string) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMessage(id),
        },
      ]
    );
  };

  const deleteMessage = async (id: string) => {
    try {
      SmsAndroid.delete(
        id,
        (fail: string) => {
          console.error('Failed to delete message:', fail);
          Alert.alert('Error', 'Failed to delete message');
        },
        (success: boolean) => {
          if (success) {
            setMessages((prevMessages) =>
              prevMessages.filter((msg) => msg.id !== id)
            );
          }
        }
      );
    } catch (error) {
      console.error('Error deleting message:', error);
      Alert.alert('Error', 'Failed to delete message');
    }
  };

  const deleteSelectedMessages = async () => {
    const selectedIds = messages
      .filter((msg) => msg.selected)
      .map((msg) => msg.id);

    if (selectedIds.length === 0) {
      Alert.alert('No Selection', 'Please select messages to delete');
      return;
    }

    Alert.alert(
      'Delete Messages',
      `Are you sure you want to delete ${selectedIds.length} messages?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              let deletedCount = 0;
              for (const id of selectedIds) {
                await new Promise<void>((resolve) => {
                  SmsAndroid.delete(
                    id,
                    (fail: string) => {
                      console.error('Failed to delete message:', fail);
                      resolve();
                    },
                    (success: boolean) => {
                      if (success) deletedCount++;
                      resolve();
                    }
                  );
                });
              }
              
              if (deletedCount > 0) {
                setMessages((prevMessages) =>
                  prevMessages.filter((msg) => !msg.selected)
                );
                Alert.alert('Success', `Deleted ${deletedCount} messages`);
              } else {
                Alert.alert('Error', 'Failed to delete messages');
              }
            } catch (error) {
              console.error('Error deleting messages:', error);
              Alert.alert('Error', 'Failed to delete messages');
            }
          },
        },
      ]
    );
  };

  const handleSelectAll = () => {
    const allSelected = messages.every((msg) => msg.selected);
    setMessages((prevMessages) =>
      prevMessages.map((msg) => ({ ...msg, selected: !allSelected }))
    );
  };

  const selectedCount = messages.filter((msg) => msg.selected).length;

  return (
    <StyledView className="flex-1 bg-gray-50">
      <ActionBar
        selectedCount={selectedCount}
        onSelectAll={handleSelectAll}
        onDeleteSelected={deleteSelectedMessages}
        onFilter={() => navigation.navigate('Filter')}
      />
      <FlatList
        data={messages}
        keyExtractor={(item: Message) => item.id}
        renderItem={({ item }: { item: Message }) => (
          <MessageItem
            sender={item.sender}
            content={item.content}
            timestamp={item.timestamp}
            selected={item.selected}
            onSelect={() => handleMessageSelect(item.id)}
            onLongPress={() => handleMessageLongPress(item.id)}
            testID={`message-item-${item.id}`}
          />
        )}
        refreshing={loading}
        onRefresh={loadMessages}
        contentContainerStyle={messages.length === 0 ? { flex: 1 } : undefined}
        ListEmptyComponent={
          <StyledView className="flex-1 justify-center items-center p-8">
            {loading ? (
              <StyledText className="text-gray-500 text-lg text-center">
                Loading messages...
              </StyledText>
            ) : (
              <>
                <Ionicons name="mail-outline" size={48} color="#9ca3af" />
                <StyledText className="text-gray-500 text-lg font-medium mt-4 text-center">
                  No messages found
                </StyledText>
                <StyledText className="text-gray-400 text-sm text-center mt-2">
                  Pull down to refresh
                </StyledText>
              </>
            )}
          </StyledView>
        }
      />
    </StyledView>
  );
} 