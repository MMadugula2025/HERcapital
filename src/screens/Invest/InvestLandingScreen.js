import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const COLORS = {
  bg: '#081B33',
  card: '#102846',
  border: '#21436C',
  white: '#FFFFFF',
  soft: 'rgba(255,255,255,0.65)',
  fidelity: '#00A651',
};


export default function InvestLandingScreen() {

  const navigation = useNavigation();

  const handleFidelitySetup = () => {
    // Navigate to setup screen
    navigation.navigate('FidelitySetup');
  };

  const handleOpenFidelityApp = () => {
    // In a real app, this would deep link to Fidelity app or open their website
    Linking.openURL('https://www.fidelity.com');
  };


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Get Started Investing
      </Text>

      <Text style={styles.subtitle}>
        Build wealth for retirement with Fidelity
      </Text>

      {/* Existing Account Section */}
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            YOUR ACCOUNT
          </Text>
        </View>

        <Text style={styles.cardTitle}>
          Roth IRA (Fidelity)
        </Text>

        <Text style={styles.description}>
          You have an active Roth IRA account
          with Fidelity already set up.
        </Text>

        <View style={styles.accountInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Balance</Text>
            <Text style={styles.infoValue}>$1,840.00</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>2026 Contributions</Text>
            <Text style={styles.infoValue}>$1,500.00</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gains</Text>
            <Text style={[styles.infoValue, { color: COLORS.fidelity }]}>+$340.00</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('InvestmentDashboard')}
        >
          <Text style={styles.primaryText}>
            View Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Contribution Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Add to Your Roth IRA
        </Text>

        <Text style={styles.description}>
          Increase your contribution and watch
          your investment grow over time.
        </Text>

        <Benefit text="No fees on contributions" />
        <Benefit text="Tax-free growth" />
        <Benefit text="Flexible withdrawals" />

        <TouchableOpacity
          style={styles.contributionButton}
          onPress={() => navigation.navigate('InvestmentDashboard')}
        >
          <Text style={styles.contributionButtonText}>
            Contribute Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start New Account Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          New to Investing?
        </Text>

        <Text style={styles.description}>
          Open a Roth IRA and start your
          retirement savings journey today.
        </Text>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={handleFidelitySetup}
        >
          <Text style={styles.outlineText}>
            Open New Account
          </Text>
        </TouchableOpacity>
      </View>

      {/* Already Have Account Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Already have a Roth IRA elsewhere?
        </Text>

        <Text style={styles.description}>
          Connect your existing retirement account
          to track contributions and progress.
        </Text>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate('ConnectIRA')}
        >
          <Text style={styles.outlineText}>
            Connect Existing Account
          </Text>
        </TouchableOpacity>
      </View>

      {/* Fidelity Link */}
      <TouchableOpacity
        style={styles.fidelityLink}
        onPress={handleOpenFidelityApp}
      >
        <Text style={styles.fidelityLinkText}>
          Visit Fidelity.com for more information
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}



function Benefit({text}) {

  return (

    <View style={styles.benefit}>

      <Text style={styles.check}>
        ✓
      </Text>


      <Text style={styles.benefitText}>
        {text}
      </Text>

    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:COLORS.bg,
    padding:22,
  },


  title:{
    marginTop:20,
    fontSize:34,
    fontWeight:'700',
    color:COLORS.white,
  },


  subtitle:{
    marginTop:8,
    color:COLORS.soft,
    fontSize:15,
    marginBottom:30,
  },


  card:{
    backgroundColor:COLORS.card,
    borderRadius:22,
    borderWidth:1,
    borderColor:COLORS.border,
    padding:22,
    marginBottom:18,
  },


  badge:{
    alignSelf:'flex-start',
    backgroundColor:COLORS.fidelity,
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:20,
    marginBottom:15,
  },


  badgeText:{
    color:'white',
    fontWeight:'700',
    fontSize:11,
  },


  cardTitle:{
    color:COLORS.white,
    fontSize:21,
    fontWeight:'700',
    marginBottom:12,
  },


  description:{
    color:COLORS.soft,
    lineHeight:21,
    fontSize:14,
    marginBottom:18,
  },

  accountInfo: {
    backgroundColor: 'rgba(0,166,81,0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  infoLabel: {
    color: COLORS.soft,
    fontSize: 13,
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  benefit:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:12,
  },


  check:{
    color:COLORS.fidelity,
    fontSize:18,
    marginRight:10,
    fontWeight:'700',
  },


  benefitText:{
    color:COLORS.white,
    fontSize:14,
  },


  primaryButton:{
    backgroundColor:COLORS.fidelity,
    marginTop:18,
    paddingVertical:15,
    borderRadius:15,
    alignItems:'center',
  },


  primaryText:{
    color:'white',
    fontWeight:'700',
    fontSize:15,
  },

  contributionButton:{
    backgroundColor:COLORS.fidelity,
    paddingVertical:15,
    borderRadius:15,
    alignItems:'center',
    marginTop:12,
  },

  contributionButtonText:{
    color:'white',
    fontWeight:'700',
    fontSize:15,
  },

  outlineButton:{
    borderColor:COLORS.fidelity,
    borderWidth:1.5,
    borderRadius:15,
    paddingVertical:15,
    alignItems:'center',
    marginTop:10,
  },


  outlineText:{
    color:COLORS.fidelity,
    fontWeight:'700',
    fontSize:15,
  },

  fidelityLink: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  fidelityLinkText: {
    color: COLORS.fidelity,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

});