import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatsScreen from './src/ChatsScreen';
import ContactsScreen from './src/ContactScreen';
import SettingsScreen from './src/SettingScreen';
import MessageScreen from './src/MessageScreen';
import 'react-native-gesture-handler';
import { AppRegistry, TextInput, StyleSheet, View } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

const ChatsStack = createStackNavigator();

function ChatsStackScreen() {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerTitle: () => (
            <View style={{ flex: 1, position: 'relative' }}>
              <TextInput
                placeholder="   Search"
                placeholderTextColor="#888"
                style={styles.searchInput}
              />
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            </View>
          ),
        }}
      />
      <ChatsStack.Screen name="MessageScreen" component={MessageScreen} />
    </ChatsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Chats') {
              iconName = 'chat';
            } else if (route.name === 'Contacts') {
              iconName = 'person';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [{ display: 'flex' }, null],
        })}
      >
        <Tab.Screen name="Chats" component={ChatsStackScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 0.7,
    height: 40,
    width: 330,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 30,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
});

export default App;
