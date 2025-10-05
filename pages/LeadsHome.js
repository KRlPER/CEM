import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet, TouchableWithoutFeedback, Text, View, TouchableOpacity, Alert, ActivityIndicator, Animated, Dimensions, TextInput, Image, FlatList, BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
// import { ScrollView } from 'react-native';

const { width } = Dimensions.get("window");

const LeadsHomeScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const animation = useState(new Animated.Value(0))[0];
  // const scrollViewRef = useRef(null);
  // const scrollX = useRef(new Animated.Value(0)).current;
  // const scrollInterval = useRef(null);
  // const screenWidth = Dimensions.get("window").width;

 

    // Correcting the function declaration
    const handleCreateEvent = () => {
      navigation.navigate('CreateEventScreen'); // Navigate to Create Event screen
  
  
  
    return (
      <View style={styles.container}>
        
  
        {/* Other content of LeadHome */}
        <Text style={styles.heading}>Welcome to Lead Home</Text>
  
        {/* You can add more content or components below */}
      </View>
    );
  };

  // const startAutoScroll = () => {
  //   let currentIndex = 0;
  //   scrollInterval.current = setInterval(() => {
  //     currentIndex++;
  //     if (currentIndex >= 5) {
  //       currentIndex = 0; // Reset to first item
  //     }
  //     scrollViewRef.current?.scrollTo({ x: screenWidth * currentIndex, animated: true });
  //   }, 3000);
  // };

  // useEffect(() => {
  //   startAutoScroll(); // Start auto-scroll

  //   return () => clearInterval(scrollInterval.current); // Cleanup on unmount
  // }, []);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentList = [];
        for (const studentDoc of querySnapshot.docs) {
          const profileRef = doc(db, "students", studentDoc.id, "profile", "details");
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            studentList.push({ id: studentDoc.id, ...profileSnap.data() });
          }
        }
        setStudents(studentList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        Alert.alert("Error", "Failed to fetch student data.");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredStudents([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    let results = students.filter(student =>
      searchType === 'name' 
        ? student.fullName && student.fullName.toLowerCase().includes(query) 
        : student.skills && Array.isArray(student.skills) && student.skills.some(skill => skill.toLowerCase().includes(query))
    );
    setFilteredStudents(results);
  }, [searchQuery, searchType, students]);

  useEffect(() => {
    const backAction = () => {
      if (isSearching) {
        setIsSearching(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [isSearching]);

  const toggleDrawer = () => {
    const newState = !drawerOpen;
    setDrawerOpen(newState);
    Animated.timing(animation, {
      toValue: newState ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={() => drawerOpen && toggleDrawer()}>
      <LinearGradient colors={['#00BFFF', '#ffffff']} style={styles.gradientBackground}>
        <View style={styles.container}>
          {!isSearching && (
            <View style={styles.header}>
              <Image source={require('../assets/CSILOGO.png')} style={styles.logo} />
              <Text style={styles.greeting}>Hi, Lead</Text>
              <TouchableOpacity style={styles.profileAvatar}>
                <Icon name="user-circle" size={40} color="#00BFFF" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={() => setIsSearching(true)} style={styles.searchBar}>
            <Icon name="search" size={18} color="#00BFFF" style={{ marginRight: 10 }} />
            <TextInput 
              placeholder={`Search by ${searchType}`} 
              placeholderTextColor="#0077B6"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={isSearching}
              editable={isSearching}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.createEventButton} onPress={handleCreateEvent}>
  <Text style={styles.buttonText}>Create Event</Text>
</TouchableOpacity>

          {isSearching && (
            <>
              <View style={styles.searchOptions}>
                <TouchableOpacity 
                  style={[styles.optionButton, searchType === 'name' && styles.activeOption]} 
                  onPress={() => setSearchType('name')}>
                  <Text style={styles.optionText}>Search by Name</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.optionButton, searchType === 'skills' && styles.activeOption]} 
                  onPress={() => setSearchType('skills')}>
                  <Text style={styles.optionText}>Search by Skills</Text>
                </TouchableOpacity>
              </View>
                     {/* Scroll View */}
          {/* <Animated.ScrollView
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
          >  ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.scrollItem}>
              <Text style={styles.scrollText}>{item}</Text>
            </TouchableOpacity></Animated.ScrollView> */}


              <FlatList
                data={filteredStudents}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.profileCard}>
                    <Text style={styles.profileName}>{item.fullName || 'Unknown'}</Text>
                    <Text style={styles.profileDetails}>Contact: {item.contact || 'N/A'}</Text>
                    <Text style={styles.profileDetails}>Email: {item.email || 'N/A'}</Text>
                    <Text style={styles.profileDetails}>Address: {item.address || 'N/A'}</Text>
                    {searchType === 'skills' && <Text style={styles.profileDetails}>Skills: {item.skills?.join(', ') || 'N/A'}</Text>}
                  </View>
                )}
              />
            </>
          )}

          {!isSearching && (
            <TouchableOpacity style={styles.edgeSwipeButton} onPress={toggleDrawer}>
              <Icon name="bars" size={25} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // This ensures the button is centered
    alignItems: 'center',      // This ensures it stays centered horizontally
    padding: 20,
  },
  
  createEventButton: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#00BFFF',
    marginBottom: 20,
    position: 'absolute', // Makes sure it's positioned within the parent container
    bottom: 30, // Adjust as needed to bring it within visible range
    zIndex: 10, // Bring it to the front
  },
  
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BFFF', // Button color for the text
  },
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
  // scrollView: {
  //   height: 220, // Fixed height for the scroll view
  //   marginTop: 20,
  // },
  // scrollContainer: {
  //   paddingBottom:350,
  //   paddingVertical: 10,
  //   paddingLeft: 15,  // Adds space at the start
  // },
  
  // scrollItem: {
  //   width: width - 30, // Makes sure each item covers the screen (minus some padding)
  //   height: 200,  
  //   backgroundColor: '#FFFFFF', 
  //   paddingVertical: 12, 
  //   paddingHorizontal: 20,
  //   borderRadius: 20,
  //   marginRight: 10, // Space between items
  //   elevation: 3, // Shadow for depth
  // },
  
  // scrollText: {
  //   color: '#00BFFF',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  gradientBackground: { flex: 1 },
  container: { flex: 1, padding: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#009FFF',
    height: 40,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  searchOptions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  optionButton: { padding: 10, borderRadius: 10, backgroundColor: '#ddd' },
  activeOption: { backgroundColor: '#00BFFF' },
  optionText: { fontSize: 16, color: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 5,
  },
  profileDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  scrollItem: {
    width: width - 30,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    elevation: 3,
  },
  scrollText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
});

export default LeadsHomeScreen;