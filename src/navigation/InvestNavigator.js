import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvestLandingScreen from '../screens/Invest/InvestLandingScreen';
import FidelitySetupScreen from '../screens/Invest/FidelitySetupScreen';
import ConnectIRAScreen from '../screens/Invest/ConnectIRAScreen';
import ContributionScreen from '../screens/Invest/ContributionScreen';
import InvestmentDashboardScreen from '../screens/Invest/InvestmentDashboardScreen';

const Stack = createNativeStackNavigator();

export default function InvestNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >

      <Stack.Screen
        name="InvestLanding"
        component={InvestLandingScreen}
      />

      <Stack.Screen
        name="FidelitySetup"
        component={FidelitySetupScreen}
      />

      <Stack.Screen
        name="ConnectIRA"
        component={ConnectIRAScreen}
      />

      <Stack.Screen
        name="Contribution"
        component={ContributionScreen}
      />

      <Stack.Screen
        name="InvestmentDashboard"
        component={InvestmentDashboardScreen}
      />

    </Stack.Navigator>
  );
}