// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom header or any additional content */}
      <View style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Custom Drawer</Text>
      </View>

      {/* Default Drawer Item List */}
      <DrawerItemList {...props} />

      {/* Additional custom items */}
      <TouchableOpacity onPress={() => console.log('Custom Action')}>
        <Text style={{ padding: 20, fontSize: 16 }}>Custom Action</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};




