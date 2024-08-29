import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const settingsData = [
  { id: '1', name: 'Account', icon: 'person' },
  { id: '2', name: 'Privacy', icon: 'lock' },
  { id: '3', name: 'Notifications', icon: 'notifications' },
  { id: '4', name: 'Data and Storage', icon: 'storage' },
  { id: '5', name: 'Help', icon: 'help' },
  { id: '6', name: 'About', icon: 'info' },
  // Add more settings as needed
];

const SettingsScreen = () => {
  const renderSetting = ({ item }) => (
    <TouchableOpacity style={styles.setting}>
      <Icon name={item.icon} size={24} color="black" />
      <Text style={styles.settingName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsData}
        renderItem={renderSetting}
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
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingName: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
