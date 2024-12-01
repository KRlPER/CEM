import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import logoImage from './assets/SHAIDSLOGO.png';
import backgroundImage from './assets/background.png'; // Ensure this is the same background as StudentScreen

const LeadsSignupScreen = ({ navigation }) => {
  const [leadId, setLeadId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (leadId && password && password === confirmPassword) {
      Alert.alert('Signup Successful', `Welcome, Lead ID: ${leadId}`);
      navigation.navigate('Leads'); // Navigate back to Leads login screen after signup
    } else {
      Alert.alert('Error', 'Please check your inputs. Make sure passwords match and all fields are filled.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>         Sign Up         </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Lead ID"
            value={leadId}
            onChangeText={setLeadId}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    opacity: 0.9, // Slight transparency for better background blending
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '115%', // Set a fixed width for consistency with StudentScreen
    marginBottom: 20,
  },
  input: {
    width: '100%', // Ensure input takes full width of container
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    elevation: 1,
  },
  passwordInput: {
    width: '100%', // Ensure password input takes full width of container
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 15, // Added margin for spacing
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeadsSignupScreen;
