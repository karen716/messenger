import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatsScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.1.7:8000/messages')  
      .then(response => {
        console.log(response.data);  // Log the response data
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MessageScreen', { sender: item.senders, messages: item.message })}>
      <View style={styles.item}>
        <FontAwesome name="user-circle" size={35} color="black" style={styles.icon} />
        <View>
          <Text style={styles.sender}>{item.senders}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString(36).substr(2, 9)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E6E6FA',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 13,
    marginTop: 3,
  },
  headerText: {
    fontSize: 25,
    color: '#841584',
    fontWeight: 'bold',
  },
  titleContainer: {
    backgroundColor: '#f5f5f5',
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 1,
  },
  title: {
    fontSize: 23,
    color: '#841584',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  message: {
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'right',
    flex: 1,
  },  
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: 13,
    marginTop: 3,
  },
});
