import React from 'react';
import { StyleSheet, ImageBackground, Image, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StudentScreen from './pages/StudentScreen';
import SignupScreen from './pages/SignupScreen';
import LeadsLoginScreen from './pages/LeadsLoginScreen';
import LeadsSignupScreen from './pages/LeadsSignupScreen';
import ProfileScreen from './pages/ProfileScreen';
// import { CustomDrawerContent } from './CustomDrawerContent';
import CreateProfile from './pages/CreateProfile';
import LeadsHome from './pages/LeadsHome';
import LeadsHomeDrawer from './components/LeadsHomeDrawer';
import ProfileDetailsScreen from './pages/ProfileDetailsScreen';

import CreateEventScreen from './pages/CreateEventScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const backgroundImage = require('./assets/background.png');
const logoImage = require('./assets/CSILOGO.png');
const studentImage = require('./assets/student.png');
const leadsImage = require('./assets/leads.png');

function HomeScreen({ navigation }) {
  const handleStudentPress = () => {
    navigation.navigate('Student');
  };

  const handleLeadsPress = () => {
    navigation.navigate('Leads');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Image source={logoImage} style={styles.SHAIDSLOGO} resizeMode="contain" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleStudentPress}>
            <Image source={studentImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLeadsPress}>
            <Image source={leadsImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Leads</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}



// function ProfileDrawer() {
//   return (
//     <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Signup" component={SignupScreen} />
//       <Drawer.Screen name="Leads" component={LeadsLoginScreen} />
//       <Drawer.Screen name="LeadsSignup" component={LeadsSignupScreen} />
//       <Drawer.Screen name="CreateProfile" component={CreateProfile} />
//       <Drawer.Screen name="LeadsHome" component={LeadsHome} />
//     </Drawer.Navigator>
//   );
// }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Leads" component={LeadsLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LeadsSignup" component={LeadsSignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LeadsHomeDrawer" component={LeadsHomeDrawer} options={{ headerShown: false }} />
        {/* <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="LeadsHome" component={LeadsHome} options={{ headerShown: false }} />
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{ headerShown: false }} // 🔥 Hide header for Profile screen
        />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{ headerShown: false }} />
  

        <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SHAIDSLOGO: {
    width: 120,
    height: 120,
    marginBottom: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonImage: {
    width: 135,
    height: 135,
    marginBottom: 1,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#00BFFF',
  },
  buttonText: {
    fontSize: 19,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default App;
