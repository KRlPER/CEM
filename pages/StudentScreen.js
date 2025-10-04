import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { auth, db, signInWithEmailAndPassword, doc, getDoc } from '../firebaseConfig'; // Import Firebase functions
import logoImage from '../assets/CSILOGO.png';
import backgroundImage from '../assets/background.png';

const StudentScreen = ({ navigation }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!studentId || !password) {
      Alert.alert("Error", "Please enter both Student ID and Password");
      return;
    }
  
    try {
      const email = `${studentId}@student.com`; // Convert student ID to email format
      console.log("Trying to log in with:", email, password); // Debugging
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User logged in:", user.uid); // Debugging
  
      // Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, "students", user.uid));
  
      if (!userDoc.exists()) {
        Alert.alert("Error", "No profile found. Please create a profile.");
        return;
      }
  
      const userData = userDoc.data();
  
      if (userData.studentId !== studentId) {
        Alert.alert("Error", "Incorrect Student ID.");
        return;
      }
  
      Alert.alert("Login Successful", `Welcome, ${userData.fullName}`, [
        { text: "OK", onPress: () => navigation.navigate("ProfileScreen") },
      ]);
    } catch (error) {
      console.error("Login Error:", error); // Debugging
      Alert.alert("Error", error.message);
    }
  };
  

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Welcome to the Student Portal!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
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
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 30, textAlign: 'center' },
  inputContainer: { width: '100%', marginBottom: 20 },
  input: { width: '100%', padding: 15, borderWidth: 1, borderColor: '#00BFFF', borderRadius: 10, backgroundColor: '#fff', marginBottom: 15 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  passwordInput: { flex: 1, padding: 15, borderWidth: 1, borderColor: '#00BFFF', borderRadius: 10, backgroundColor: '#fff', marginRight: 10 },
  toggleText: { color: '#00BFFF', fontWeight: 'bold' },
  button: { backgroundColor: '#00BFFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, width: '100%' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupText: { marginTop: 15, color: '#00BFFF', textAlign: 'center' },
});

export default StudentScreen;
