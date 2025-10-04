import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileDetailsScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in.");
        return;
      }

      try {
        const profileDoc = await getDoc(doc(db, "students", user.uid, "profile", "details"));
        if (profileDoc.exists()) {
          setUserData(profileDoc.data());
        } else {
          Alert.alert("Profile Not Found", "Please create your profile first.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Firestore Fetch Error:", error.message);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔥 Handle Image Selection and Upload
  const handleImagePick = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // ✅ Request permissions correctly
    

    const pickImage = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "You need to allow access to select a profile photo.");
        return;
      }
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    
      if (!result.canceled) {
        console.log("Image Selected: ", result.uri);
      }
    };
    
    

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (pickerResult.canceled) return;

    setUploading(true);
    const imageUri = pickerResult.assets[0].uri;
    const imageRef = ref(storage, `profilePictures/${user.uid}.jpg`);

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "students", user.uid, "profile", "details"), {
        profileImage: downloadURL,
      });

      setUserData((prev) => ({ ...prev, profileImage: downloadURL }));
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload Error:", error.message);
      Alert.alert("Error", "Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00BFFF" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* 🖼️ Profile Picture Upload */}
      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={handleImagePick} disabled={uploading}>
          {userData?.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Icon name="camera" size={30} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.profileName}>{userData?.fullName || "No Name Available"}</Text>
      <Text style={styles.profileSubtext}>{userData?.department || "No Department"}</Text>

      {/* 📌 User Details */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="envelope" size={20} color="#00BFFF" />
          <Text style={styles.infoText}>{userData?.email || "No Email"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#00BFFF" />
          <Text style={styles.infoText}>{userData?.contactDetails || "No Phone Number"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="id-badge" size={20} color="#00BFFF" />
          <Text style={styles.infoText}>Roll No: {userData?.rollNo || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="building" size={20} color="#00BFFF" />
          <Text style={styles.infoText}>Division: {userData?.division || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', alignItems: 'center', paddingTop: 30 },
  header: { flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15 },
  backButton: { position: 'absolute', left: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  profilePictureContainer: { alignItems: 'center', marginBottom: 15, marginTop: 10 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#00BFFF' },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: { fontSize: 24, fontWeight: 'bold' },
  profileSubtext: { fontSize: 16, color: 'gray', marginBottom: 10 },
  infoContainer: { marginTop: 15, width: '100%', paddingHorizontal: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoText: { fontSize: 16, marginLeft: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileDetailsScreen;
