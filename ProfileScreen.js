import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const ProfileScreen = ({ navigation }) => {
  const handleProfileCreation = () => {
    // Navigate to the CreateProfile screen
    navigation.navigate('CreateProfile');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out successfully.');
    navigation.navigate('Home'); // Navigate back to Home screen
  };

  const renderProfileContent = () => {
    return (
      <TouchableOpacity style={styles.createProfileButton} onPress={handleProfileCreation}>
        <Icon name="user-plus" size={24} color="#fff" />
        <Text style={styles.createProfileText}>Create Profile</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderProfileContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  createProfileText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProfileScreen;

