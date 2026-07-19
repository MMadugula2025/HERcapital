import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../../theme';

const COLORS = {
  bg: '#081B33',
  card: '#102846',
  border: '#21436C',
  white: '#FFFFFF',
  soft: 'rgba(255,255,255,0.65)',
  fidelity: '#00A651',
  loss: '#F2A0A0',
};

const GROWTH_HISTORY = [
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 1350 },
  { month: 'Apr', value: 1300 },
  { month: 'May', value: 1520 },
  { month: 'Jun', value: 1680 },
  { month: 'Jul', value: 1840 },
];

const ROTH_IRA_LIMIT = 7000; // 2024 annual limit
const INITIAL_INVESTED = 1840;
const INITIAL_GAIN = 340;

// Sample contribution history
const INITIAL_HISTORY = [
  { month: 'Feb', contributed: 200 },
  { month: 'Mar', contributed: 250 },
  { month: 'Apr', contributed: 250 },
  { month: 'May', contributed: 300 },
  { month: 'Jun', contributed: 300 },
  { month: 'Jul', contributed: 200 },
];

export default function InvestmentDashboardScreen() {
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [currentInvested, setCurrentInvested] = useState(INITIAL_INVESTED);
  const [totalGain, setTotalGain] = useState(INITIAL_GAIN);
  const [contributionHistory, setContributionHistory] = useState(INITIAL_HISTORY);
  
  const currentValue = currentInvested + totalGain;
  const investedPercent = (currentInvested / ROTH_IRA_LIMIT) * 100;
  const remaining = ROTH_IRA_LIMIT - currentInvested;
  
  const handleAddContribution = () => {
    const amount = parseFloat(addAmount);
    if (amount > 0 && currentInvested + amount <= ROTH_IRA_LIMIT) {
      setCurrentInvested(prev => prev + amount);
      setTotalGain(prev => prev + (amount * 0.227)); // 22.7% gain growth
      setShowAddModal(false);
      setAddAmount('');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <Text style={styles.title}>Roth IRA Dashboard</Text>

        {/* Roth IRA Progress Card */}
        <View style={styles.card}>
          <Text style={styles.label}>2024 CONTRIBUTION PROGRESS</Text>
          <Text style={styles.amount}>${currentInvested.toLocaleString()}</Text>
          <Text style={styles.small}>of ${ROTH_IRA_LIMIT.toLocaleString()} annual limit</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${investedPercent}%` }]} />
          </View>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>{investedPercent.toFixed(1)}% Complete</Text>
            <Text style={styles.remainingText}>${remaining.toLocaleString()} Remaining</Text>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.addButtonText}>+ Add Contribution</Text>
          </TouchableOpacity>
        </View>

        {/* Account Value Card */}
        <View style={styles.card}>
          <Text style={styles.label}>CURRENT VALUE</Text>
          <Text style={styles.amount}>${currentValue.toLocaleString()}</Text>
          
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summarySubLabel}>Invested</Text>
              <Text style={styles.summarySubValue}>${currentInvested.toLocaleString()}</Text>
            </View>
            <View>
              <Text style={styles.summarySubLabel}>Total Gains</Text>
              <Text style={[styles.summarySubValue, { color: colors.brand }]}>
                +${totalGain.toLocaleString()} ({((totalGain / currentInvested) * 100).toFixed(1)}%)
              </Text>
            </View>
          </View>
        </View>

        {/* Contribution History - Numerical */}
        <Text style={styles.sectionTitle}>CONTRIBUTION HISTORY</Text>
        <View style={styles.card}>
          {contributionHistory.map((item) => (
            <View key={item.month} style={styles.historyRow}>
              <Text style={styles.historyMonth}>{item.month}</Text>
              <Text style={styles.historyContrib}>${item.contributed.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Spending Recommendations */}
        <Text style={styles.sectionTitle}>BOOST YOUR SAVINGS</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Spending Optimization</Text>
          <View style={styles.recommendationItem}>
            <Text style={styles.recLabel}>Reduce Subscriptions by:</Text>
            <Text style={styles.recValue}>$25</Text>
            <Text style={styles.recSub}>Netflix, Disney+ alternative</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recLabel}>Reduce Dining out by:</Text>
            <Text style={styles.recValue}>$75</Text>
            <Text style={styles.recSub}>Cook more meals at home</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recLabel}>Reduce Shopping by:</Text>
            <Text style={styles.recValue}>$50</Text>
            <Text style={styles.recSub}>Set a monthly budget limit</Text>
          </View>
          <View style={styles.totalRec}>
            <Text style={styles.recLabel}>Total Monthly Potential:</Text>
            <Text style={styles.recValueLarge}>$150</Text>
            <Text style={styles.recSub}>Adds up to $1,800/year to your Roth IRA!</Text>
          </View>
        </View>

        {/* Monthly Breakdown */}
        <Text style={styles.sectionTitle}>CONTRIBUTION HISTORY</Text>
        {GROWTH_HISTORY.slice().reverse().map((g, i, arr) => {
          const prev = arr[i + 1];
          const change = prev ? g.value - prev.value : 0;
          return (
            <View key={g.month} style={styles.row}>
              <Text style={styles.rowMonth}>{g.month}</Text>
              <Text style={styles.rowValue}>${g.value.toLocaleString()}</Text>
              {prev && (
                <Text style={[styles.rowChange, { color: change >= 0 ? COLORS.fidelity : COLORS.loss }]}>
                  {change >= 0 ? '+' : ''}${change.toLocaleString()}
                </Text>
              )}
            </View>
          );
        })}

      </ScrollView>

      {/* Add Contribution Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Contribution</Text>
              <TouchableOpacity onPress={() => {
                setShowAddModal(false);
                setAddAmount('');
              }}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>How much would you like to contribute?</Text>
            <TextInput
              style={styles.input}
              placeholder="$0.00"
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              keyboardType="decimal-pad"
              value={addAmount}
              onChangeText={setAddAmount}
            />

            <TouchableOpacity 
              style={[styles.submitButton, !addAmount && styles.submitButtonDisabled]}
              disabled={!addAmount}
              onPress={handleAddContribution}
            >
              <Text style={styles.submitButtonText}>Add to Roth IRA</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setShowAddModal(false);
                setAddAmount('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.bg2,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  label: {
    color: colors.inkLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  small: {
    color: colors.inkLight,
    fontSize: 12,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    marginVertical: spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: 4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  remainingText: {
    fontSize: 13,
    color: colors.inkLight,
  },
  addButton: {
    backgroundColor: colors.brand,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  summarySubLabel: {
    fontSize: 12,
    color: colors.inkLight,
    marginBottom: spacing.xs,
  },
  summarySubValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkLight,
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  historyMonth: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  historyContrib: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brand,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing.md,
  },
  recommendationItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  recLabel: {
    color: colors.inkLight,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  recValue: {
    color: colors.brand,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  recSub: {
    color: colors.inkLight,
    fontSize: 11,
  },
  totalRec: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  recValueLarge: {
    color: colors.brand,
    fontSize: 20,
    fontWeight: '700',
    marginVertical: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  closeButton: {
    fontSize: 20,
    color: colors.inkLight,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.bg2,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.ink,
    marginBottom: spacing.lg,
  },
  submitButton: {
    backgroundColor: colors.brand,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.inkLight,
    fontWeight: '600',
    fontSize: 15,
  },
});