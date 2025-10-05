import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const AddStudentsToTeamScreen = ({ route }) => {
  const { teamId, eventId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentsList = [];
        querySnapshot.forEach(doc => {
          studentsList.push({ id: doc.id, ...doc.data() });
        });
        setStudents(studentsList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchTeam = async () => {
      try {
        const teamDoc = await getDoc(doc(db, 'events', eventId, 'teams', teamId));
        setTeam(teamDoc.data());
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchStudents();
    fetchTeam();
  }, [eventId, teamId]);

  const handleAddStudentToTeam = async (studentId) => {
    if (!team) return;

    try {
      // Update team with the new student
      const teamRef = doc(db, 'events', eventId, 'teams', teamId);
      await updateDoc(teamRef, {
        students: [...team.students, studentId],
      });

      alert('Student added to team.');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a student"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredStudents}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <Button
              title="Add"
              onPress={() => handleAddStudentToTeam(item.id)}
            />
          </View>
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
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default AddStudentsToTeamScreen;
