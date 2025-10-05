import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';  
import { Picker } from '@react-native-picker/picker';  
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

// 🔥 Skill Categories
const skillCategories = {
  "Leadership & Organization": ["Event Planning", "Public Speaking", "Debate", "Elocution", "Anchoring", "Hosting", "Team Management", "Volunteer Work", "Fundraising & Sponsorship Management", "Student Council & Club Leadership"],
  "Creative & Performing Arts": ["Singing", "Instrument Playing", "Dance", "Theater & Acting", "Stand-up Comedy", "Poetry & Storytelling", "Photography & Videography", "Video Editing & Filmmaking", "Graphic Designing", "Fashion Designing & Costume Making", "Painting & Sketching"],
  "Writing & Communication": ["Content Writing & Blogging", "Copywriting & Advertising", "Speech Writing", "Scriptwriting", "Journalism & Campus News", "Resume & Cover Letter Writing", "Podcasting"],
  "Technical & Academic Skills": ["Coding & Programming", "Ethical Hacking & Cybersecurity", "Robotics & IoT", "AI & Machine Learning", "Data Analysis & Visualization", "Research & Paper Presentation", "Financial Analysis & Stock Trading", "Mathematics & Logical Puzzles"],
  "Sports & Fitness": ["Athletics", "Indoor Games (Chess, Carrom, Table Tennis)", "Outdoor Games (Football, Cricket, Basketball, Badminton)", "Martial Arts & Self-defense", "Yoga & Meditation", "Bodybuilding & Fitness Training"],
  "Social & Community Service": ["Teaching & Mentoring", "Blood Donation & Health Camps", "Environmental Conservation", "Mental Health Awareness", "Helping Differently Abled Individuals", "Women’s Rights & Safety Awareness"],
  "Business & Entrepreneurship": ["Marketing & Sales", "Entrepreneurship & Startups", "Stock Market Trading", "Public Relations", "Negotiation Skills", "Product Designing & Innovation", "Networking & Corporate Communication"],
  "Cultural & Intellectual Activities": ["Quiz & Trivia", "Model United Nations (MUN)", "Science & Tech Exhibitions", "Cultural Heritage & Traditional Arts", "Language Learning", "Historical Research & Mythology"],
  "Gaming & Esports": ["Competitive Gaming (Valorant, PUBG, COD)", "Game Development", "Strategy-based Games (Chess, Sudoku)"],
  "Miscellaneous Useful Skills": ["Cooking", "Travel & Exploration", "Calligraphy", "DIY & Handicrafts", "Magic Tricks & Illusions"]
};

// 🔥 Department & Division Options
const departmentOptions = ["AI & DS", "Computer", "Information Technology", "Electronic & Telecommunication", "Civil", "Mechanical"];
const divisionOptions = ["A", "B", "C"];

const CreateProfile = ({ navigation }) => {
  // 🔥 State for Profile Info
  const [fullName, setFullName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [email, setEmail] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [year, setYear] = useState('SE');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState(departmentOptions[0]);
  const [division, setDivision] = useState(divisionOptions[0]);

  // 🔥 Additional input fields
  const [sports, setSports] = useState('');
  const [musicalInstruments, setMusicalInstruments] = useState('');
  const [otherSkill, setOtherSkill] = useState('');

  // 🔥 State for Skill Selection
  const [selectedSkills, setSelectedSkills] = useState({});

  // ✅ Toggle Skill Selection
  const toggleSkill = (skill) => {
    setSelectedSkills((prevSkills) => ({
      ...prevSkills,
      [skill]: !prevSkills[skill] 
    }));
  };


  
  const handleSubmit = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Error", "No user logged in. Please log in first.");
      return;
    }
  
    console.log("User ID:", user.uid); // Debugging: Log User ID
  
    try {
      // 🔥 Store the profile inside "students/{userId}/profile"
      await setDoc(doc(db, "students", user.uid, "profile", "details"), {
        fullName,
        contactDetails,
        email,
        currentAddress,
        year,
        rollNo,
        department,
        division,
        sports: sports || null,  
        musicalInstruments: musicalInstruments || null,  
        otherSkill: otherSkill || null,  
        skills: Object.keys(selectedSkills).filter(skill => selectedSkills[skill])
      });
  
      Alert.alert("Profile Created", "Your profile has been successfully saved!", [
        { text: "OK", onPress: () => navigation.navigate("ProfileDrawer") }
      ]);
  
    } catch (error) {
      console.error("🔥 Firestore Error:", error.message); // Debugging: Log Firestore error
      Alert.alert("Error", error.message);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔥 Personal Details Form */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Contact Details" value={contactDetails} onChangeText={setContactDetails} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Current Address" value={currentAddress} onChangeText={setCurrentAddress} />
        <TextInput style={styles.input} placeholder="Roll No." value={rollNo} onChangeText={setRollNo} />

        {/* 🔥 Department Dropdown */}
        <Text style={styles.label}>Select Department:</Text>
        <Picker selectedValue={department} style={styles.picker} onValueChange={setDepartment}>
          {departmentOptions.map((dept) => <Picker.Item key={dept} label={dept} value={dept} />)}
        </Picker>

        {/* 🔥 Division Dropdown */}
        <Text style={styles.label}>Select Division:</Text>
        <Picker selectedValue={division} style={styles.picker} onValueChange={setDivision}>
          {divisionOptions.map((div) => <Picker.Item key={div} label={div} value={div} />)}
        </Picker>
      </View>

      {/* 🔥 Skills & Interests Section */}
      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Skills & Interests</Text>
        {Object.keys(skillCategories).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {skillCategories[category].map((skill) => (
              <View key={skill} style={styles.skillItem}>
                <Checkbox
                  status={selectedSkills[skill] ? 'checked' : 'unchecked'}
                  onPress={() => toggleSkill(skill)}
                  color="#00BFFF"
                />
                <Text>{skill}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* 🔥 Additional Inputs */}
      <TextInput style={styles.input} placeholder="Enter Indoor/Outdoor Sports" value={sports} onChangeText={setSports} />
      <TextInput style={styles.input} placeholder="Enter Musical Instruments" value={musicalInstruments} onChangeText={setMusicalInstruments} />
      <TextInput style={styles.input} placeholder="Any Other Hobby/Skill?" value={otherSkill} onChangeText={setOtherSkill} />

      {/* 🔥 Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  detailsContainer: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 1, marginBottom: 20 },
  skillsContainer: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 1, marginBottom: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  categoryContainer: { marginBottom: 10 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  skillItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  input: { width: '100%', padding: 15, borderWidth: 1, borderColor: '#00BFFF', borderRadius: 10, backgroundColor: '#fff', marginBottom: 15 },
  picker: { height: 50, width: '100%', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#00BFFF', padding: 15, borderRadius: 10, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CreateProfile;
