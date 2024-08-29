import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const contactsData = [
  { id: '1', name: 'John Doe', active: true },
  { id: '2', name: 'Jane Smith', active: false },
  { id: '3', name: 'Alice Johnson', active: true },
  { id: '4', name: 'Bob Brown', active: false },
  { id: '5', name: 'Eve Wilson', active: true },
  // Add more contacts as needed
];

const ContactsScreen = () => {
  const renderContact = ({ item }) => (
    <View style={styles.contact}>
      <View style={styles.iconContainer}>
        <Icon name="account-circle" size={35} color="black" style={styles.icon} />
        {item.active && <View style={styles.activeIndicator} />}
      </View>
      <Text style={styles.contactName}>{item.name}</Text>
      <TouchableOpacity style={styles.messageIcon}>
        <Icon name="message" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contactsData}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items at each end of the row
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    flexDirection: 'row', // Make icon container a row
    alignItems: 'center', // Align items vertically in the row
  },
  contactName: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 5, // Adjust bottom position for alignment
    right: 10, // Align with the right edge of the user icon
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    zIndex: 2, // Ensure active indicator is above the user icon
  },
  icon: {
    marginRight: 10, // Add margin to separate user icon from active indicator
  },
  messageIcon: {
    marginLeft: 'auto', // Move message icon to the right end
  },
});

export default ContactsScreen;