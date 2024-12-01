import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Make sure to install this package for dropdowns

const CreateProfile = () => {
  const [fullName, setFullName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [email, setEmail] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [year, setYear] = useState('SE');
  const [division, setDivision] = useState('A');
  const [rollNo, setRollNo] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = () => {
    Alert.alert('Profile Created', 'Your profile has been created successfully!');
    // Add logic to handle profile submission
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Details"
          value={contactDetails}
          onChangeText={setContactDetails}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Current Address"
          value={currentAddress}
          onChangeText={setCurrentAddress}
        />
        <Picker
          selectedValue={year}
          style={styles.picker}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          <Picker.Item label="SE" value="SE" />
          <Picker.Item label="TE" value="TE" />
        </Picker>
        <Picker
          selectedValue={division}
          style={styles.picker}
          onValueChange={(itemValue) => setDivision(itemValue)}
        >
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Roll No."
          value={rollNo}
          onChangeText={setRollNo}
        />
      </View>

      <View style={styles.hobbiesContainer}>
        <Text style={styles.sectionTitle}>Hobbies and Interests</Text>
        <Picker
          selectedValue={hobbies}
          style={styles.picker}
          onValueChange={(itemValue) => setHobbies(itemValue)}
        >
          <Picker.Item label="Running" value="Running" />
          <Picker.Item label="Cycling" value="Cycling" />
          <Picker.Item label="Swimming" value="Swimming" />
          <Picker.Item label="Writing" value="Writing" />
          <Picker.Item label="Bodybuilding" value="Bodybuilding" />
        </Picker>
        <Picker
          selectedValue={interests}
          style={styles.picker}
          onValueChange={(itemValue) => setInterests(itemValue)}
        >
          <Picker.Item label="Reading" value="Reading" />
          <Picker.Item label="Traveling" value="Traveling" />
          <Picker.Item label="Music" value="Music" />
          <Picker.Item label="Gaming" value="Gaming" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 1,
  },
  hobbiesContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateProfile;
