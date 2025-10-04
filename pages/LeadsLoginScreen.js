import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { auth, db } from '../firebaseConfig'; // Import Firebase Auth & Firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import logoImage from '../assets/CSILOGO.png';
import backgroundImage from '../assets/background.png';

const LeadsLoginScreen = ({ navigation }) => {
  const [leadId, setLeadId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = async () => {
    if (!leadId || !password) {
      Alert.alert('Error', 'Please enter both Lead ID and Password');
      return;
    }
  
    try {
      // Firestore Path: leads/{leadId}/profile/details
      const detailsRef = doc(db, 'leads', leadId, 'profile', 'details');
      const detailsSnap = await getDoc(detailsRef);
  
      if (!detailsSnap.exists()) {
        Alert.alert('Error', 'Lead ID not found.');
        return;
      }
  
      // Retrieve stored data
      const leadData = detailsSnap.data();
      console.log('Retrieved Data:', leadData);
  
      // Check if entered password matches stored password
      if (leadData.password !== password) {
        Alert.alert('Error', 'Invalid Password.');
        return;
      }
  
      Alert.alert('Login Successful', `Welcome, ${leadData.name || leadId}`);
      navigation.navigate('LeadsHome'); // Navigate to LeadsHome after login
  
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    }
  };
  

  const handleSignupPress = () => {
    navigation.navigate('LeadsSignup'); // Navigate to LeadsSignup screen
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Welcome to the Leads Portal!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Lead ID"
            value={leadId}
            onChangeText={setLeadId}
            placeholderTextColor="#aaa"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
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
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    elevation: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    elevation: 1,
  },
  toggleText: {
    color: '#00BFFF',
    fontWeight: 'bold',
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
  signupText: {
    marginTop: 15,
    color: '#00BFFF',
    textAlign: 'center',
  },
});

export default LeadsLoginScreen;
