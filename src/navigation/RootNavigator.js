import React from 'react';

import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';


import HomeScreen from '../screens/HomeScreen';
import CardsScreen from '../screens/CardScreen';
import GoalsScreen from '../screens/GoalsScreen';
import CommunityScreen from '../screens/CommunityScreen';

import InvestNavigator from './InvestNavigator';

import { colors } from '../theme';



const Tab = createBottomTabNavigator();



const ICONS = {

  Home: 'home-outline',

  Invest: 'cash-outline',

  Cards: 'card-outline',

  Goals: 'flag-outline',

  Community: 'people-outline',

};



export default function RootNavigator() {

  return (

    <Tab.Navigator

      screenOptions={({route}) => ({

        headerShown:false,

        tabBarActiveTintColor: colors.brand,

        tabBarInactiveTintColor: colors.inkSoft,

        tabBarStyle:{
          backgroundColor: colors.bg,
          borderTopColor: colors.line,
        },

        tabBarLabelStyle:{
          fontSize:11,
          fontWeight:'600',
        },


        tabBarIcon:({color,size})=>(

          <Ionicons

            name={ICONS[route.name]}

            size={size ?? 20}

            color={color}

          />

        ),

      })}

    >


      <Tab.Screen

        name="Home"

        component={HomeScreen}

      />


      <Tab.Screen

        name="Invest"

        component={InvestNavigator}

      />


      <Tab.Screen

        name="Cards"

        component={CardsScreen}

      />


      <Tab.Screen

        name="Goals"

        component={GoalsScreen}

      />


      <Tab.Screen

        name="Community"

        component={CommunityScreen}

      />


    </Tab.Navigator>

  );

}