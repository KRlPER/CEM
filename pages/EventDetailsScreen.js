import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
          setEvent(eventDoc.data());
        } else {
          Alert.alert('Error', 'Event not found.');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        Alert.alert('Error', 'Failed to fetch event details.');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleCreateTeam = async () => {
    if (teamName.trim() === '') {
      Alert.alert('Error', 'Team name cannot be empty.');
      return;
    }

    try {
      // Create a new team under the event
      const teamRef = await addDoc(collection(db, 'events', eventId, 'teams'), {
        teamName: teamName,
        students: [],
      });

      // Update event with new team reference
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        teams: [...event.teams, teamRef.id],
      });

      Alert.alert('Success', 'Team created successfully.');
    } catch (error) {
      console.error('Error creating team:', error);
      Alert.alert('Error', 'Failed to create team.');
    }
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Event: {event.eventName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />
      <Button title="Create Team" onPress={handleCreateTeam} />
      <FlatList
        data={event.teams}  // Here we need to fetch team names, this can be handled better by fetching team details from Firestore
        renderItem={({ item }) => (
          <Button
            title={`View Team ${item.teamName}`}
            onPress={() => navigation.navigate('TeamDetails', { teamId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EventDetailsScreen;
