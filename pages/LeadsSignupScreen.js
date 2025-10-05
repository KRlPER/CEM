import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, ImageBackground 
} from 'react-native';
import { auth, db } from '../firebaseConfig'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

import logoImage from '../assets/CSILOGO.png';
import backgroundImage from '../assets/background.png';

const LeadsSignupScreen = ({ navigation }) => {
  const [leadId, setLeadId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!studentId || !password || password !== confirmPassword) {
      Alert.alert('Error', 'Make sure all fields are filled and passwords match.');
      return;
    }
  
    try {
      // Create user in Firebase Authentication
      const email = `${studentId}@student.com`; // Convert student ID to email format
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User signed up:", user.uid);
  
      // Check if user is authenticated
      if (!user || !user.uid) {
        throw new Error("User not authenticated.");
      }
  
      // Save student profile in Firestore
      await setDoc(doc(db, "students", user.uid), {
        studentId: studentId,
        email: user.email,
        createdAt: new Date(),
      });
  
      Alert.alert('Signup Successful', `Welcome, Student ID: ${studentId}`, [
        { text: "OK", onPress: () => navigation.navigate('Student') }
      ]);
  
    } catch (error) {
      console.error("Signup Error:", error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign Up</Text>

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
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
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
    opacity: 0.9,
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
    width: '115%',
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
  passwordInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 15,
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
