import React, { useState } from 'react';
import { View, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState('');

  const handleCreateEvent = async () => {
    if (eventName.trim() === '') {
      Alert.alert('Error', 'Event name cannot be empty.');
      return;
    }

    try {
      // Create the event in the "events" collection
      const eventRef = await addDoc(collection(db, 'events'), {
        eventName: eventName,
        creatorId: 'leadUserId', // Replace with actual creator ID
        teams: [],
      });

      // Navigate to the created event
      navigation.navigate('EventDetails', { eventId: eventRef.id });
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default CreateEventScreen;
