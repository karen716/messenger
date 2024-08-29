import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const MessageScreen = ({ route, navigation }) => {
  const { sender, messages } = route.params;
  const [reply, setReply] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', text: messages, sender: sender },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: sender,
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="call" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="videocam" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="info" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, sender]);

  const handleSend = async () => {
    if (reply.trim()) {
      const newMessage = { id: Date.now().toString(), text: reply, sender: 'You', receiver: sender };
      setChatMessages([newMessage, ...chatMessages]);
      setReply('');

      try {
        await axios.post('http://192.168.1.7:8000/replies', {
          text: reply,
          sender: 'Karen',
          receiver: sender,
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'You' ? styles.youContainer : styles.senderContainer]}>
      {item.sender !== 'You' && (
        <Icon name="account-circle" size={40} color="black" style={styles.icon} />
      )}
      <View style={[styles.bubble, item.sender === 'You' ? styles.youBubble : styles.senderBubble]}>
        <Text style={[styles.messageText, item.sender === 'You' ? styles.youMessageText : styles.senderMessageText]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={reply}
          onChangeText={setReply}
          placeholder="Type a message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  bubble: {
    padding: 15,
    borderRadius: 20,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  senderBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  youBubble: {
    backgroundColor: 'black',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  senderMessageText: {
    color: '#000',
  },
  youMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginLeft: 15,
  },
  youContainer: {
    justifyContent: 'flex-end',
  },
  senderContainer: {
    justifyContent: 'flex-start',
  },
});

export default MessageScreen;
