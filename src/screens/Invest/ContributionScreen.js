import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  bg: '#081B33',
  card: '#102846',
  border: '#21436C',
  white: '#FFFFFF',
  soft: 'rgba(255,255,255,0.65)',
  fidelity: '#00A651',
};

export default function ContributionScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Contribution Amount</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>
          Choose how much you'd like to contribute to your Roth IRA each month.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('InvestmentDashboard')}
        >
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 22,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginTop: 20,
  },
  subtitle: {
    color: COLORS.soft,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.fidelity,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});
