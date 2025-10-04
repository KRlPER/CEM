import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet,TouchableWithoutFeedback, Text, View, TouchableOpacity, Alert, ActivityIndicator, Animated, Dimensions, TextInput, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
// import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { ScrollView } from 'react-native';



const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [profileExists, setProfileExists] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];
  const scrollViewRef = useRef(null);
const scrollX = useRef(new Animated.Value(0)).current;
const scrollInterval = useRef(null);
const screenWidth = Dimensions.get("window").width;

const startAutoScroll = () => {
  let currentIndex = 0;
  scrollInterval.current = setInterval(() => {
    currentIndex++;
    if (currentIndex >= 5) {
      currentIndex = 0; // Reset to first item
    }
    scrollViewRef.current?.scrollTo({ x: screenWidth * currentIndex, animated: true });
  }, 3000);
};

useEffect(() => {
  startAutoScroll(); // Start auto-scroll

  return () => clearInterval(scrollInterval.current); // Cleanup on unmount
}, []);


  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user logged in.');
        return;
      }

      try {
        const profileDoc = await getDoc(doc(db, "students", user.uid, "profile", "details"));
        if (profileDoc.exists()) {
          setProfileExists(true);
          setFirstName(profileDoc.data().fullName.split(" ")[0]); // Extracting First Name
        } else {
          setProfileExists(false);
        }
      } catch (error) {
        console.error("🔥 Firestore Fetch Error:", error.message);
        Alert.alert("Error", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileCreation = () => {
    navigation.navigate('CreateProfile');
  };

  const handleProfileClick = () => {
    navigation.navigate('ProfileDetails');
  };

  const toggleDrawer = () => {
    const newState = !drawerOpen;
    setDrawerOpen(newState);
    Animated.timing(animation, {
      toValue: newState ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (profileExists === null) {
    return <ActivityIndicator size="large" color="#00BFFF" style={styles.loader} />;
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => drawerOpen && toggleDrawer()} // ✅ Closes drawer when tapping outside
    >

    <LinearGradient 
      colors={['#00BFFF', '#ffffff']} 
      style={styles.gradientBackground} // Ensures the gradient is applied to the entire screen
    > 
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* SHAIDS Logo */}
          <Image source={require('../assets/CSILOGO.png')} style={styles.logo} />

          {/* Greeting */}
          <Text style={styles.greeting}>Hi, {firstName}</Text>

          {/* Profile Avatar */}
          {profileExists && (
            <TouchableOpacity style={styles.profileAvatar} onPress={handleProfileClick}>
              <Icon name="user-circle" size={40} color="#00BFFF" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.searchBar}>
  <Icon name="search" size={18} color="#00BFFF" style={{ marginRight: 10 }} />
  <TextInput 
    placeholder="Search..." 
    placeholderTextColor="#0077B6"
    style={{ flex: 1, fontSize: 16, color: '#333' }}
  />
</View>
<Animated.ScrollView
  ref={scrollViewRef}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.scrollContainer}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  )}
  scrollEventThrottle={16}
>
  {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((item, index) => (
    <TouchableOpacity key={index} style={styles.scrollItem}>
      <Text style={styles.scrollText}>{item}</Text>
    </TouchableOpacity>
  ))}
</Animated.ScrollView>




        {/* Profile Creation Button */}
        {!profileExists && (
          <TouchableOpacity style={styles.createProfileButton} onPress={handleProfileCreation}>
            <Icon name="user-plus" size={24} color="#fff" />
            <Text style={styles.createProfileText}>Create Profile</Text>
          </TouchableOpacity>
        )}

        {/* Edge Swipe Button for Drawer */}
        <TouchableOpacity style={styles.edgeSwipeButton} onPress={toggleDrawer}>
          <Icon name="bars" size={25} color="white" />
        </TouchableOpacity>

        <Animated.View 
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [-150, 0] }) }] }
        ]}
      >
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={20} color="#fff" />
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={20} color="#fff" />
          <Text style={styles.drawerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color="#fff" />
          <Text style={styles.drawerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => Alert.alert("Logout", "Logging Out...")}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </LinearGradient>
     </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,  // Ensures the LinearGradient covers the full screen
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent', // Ensures the header is transparent over the gradient
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    top: 20, 
    left: 5
  },
  greeting: {
    fontSize: 23,
    marginTop: 40,
    marginRight: 150,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast with the gradient
  },
  profileAvatar: {
    padding: 3,
    position: 'absolute',
    top: 47, 
    right: 17,
    backgroundColor: 'white',
    borderRadius: 30,

  },
  searchBar: {
    flexDirection: 'row',         // Aligns icon & text inline
    alignItems: 'center',        // Centers content vertically
    backgroundColor: '#ffffff',  // Light blue background
    borderRadius: 20,            // Rounded edges
    paddingHorizontal: 19,       
    fontSize: 16,                
    marginHorizontal: 15,        
    marginVertical: 10,          
    elevation: 19,                // Shadow for depth effect
    // shadowColor: '#00BFFF',      
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    borderWidth: 2,              // Subtle border
    borderColor: '#009FFF',
    height: 40,  // Adjust to make the bar thicker
    paddingVertical: 4, // More padding inside the bar

  },
  
  createProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  createProfileText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  edgeSwipeButton: {
    position: 'absolute',
    left: 0,
    top: '50%',
    backgroundColor: '#00BFFF',
    padding: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: '35%',
    backgroundColor: '#333',
    width: 150,
    height: 200,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  drawerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom:350,
    paddingVertical: 10,
    paddingLeft: 15,  // Adds space at the start
  },
  
  scrollItem: {
    width: width - 30, // Makes sure each item covers the screen (minus some padding)
    height: 200,  
    backgroundColor: '#FFFFFF', 
    paddingVertical: 12, 
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10, // Space between items
    elevation: 3, // Shadow for depth
  },
  
  scrollText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default ProfileScreen;
