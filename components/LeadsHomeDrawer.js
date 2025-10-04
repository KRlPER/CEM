import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeadsHome from '../pages/LeadsHome';
import ProfileScreen from '../pages/ProfileScreen';
import SignupScreen from '../pages/SignupScreen';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Ensure this is imported correctly

const Drawer = createDrawerNavigator();

const LeadsHomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="LeadsHome" component={LeadsHome} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Signup" component={SignupScreen} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default LeadsHomeDrawer;
