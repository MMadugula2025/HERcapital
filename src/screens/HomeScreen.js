import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../theme';
import SurveySheet from '../components/SurveySheet';
import { CARDS } from '../components/CardData';


const CATEGORIES = [
  { key: 'Food', amount: 564, color: colors.brand },
  { key: 'Subscriptions', amount: 310, color: colors.rose },
  { key: 'Shopping', amount: 205, color: colors.leaf },
  { key: 'Other', amount: 205, color: colors.sage },
];

const ACTIVITY = [
  { name: 'Blue Bottle Coffee', sub: 'Used Capital One · Dining', amount: '-$6.25' },
  { name: 'Netflix', sub: 'Used Discover · Subscriptions', amount: '-$15.49' },
  { name: 'Target', sub: 'Used Debit Card · Shopping', amount: '-$42.10' },
];

const DOUBLE_TAP_DELAY = 280; // ms

export default function HomeScreen() {
  const navigation = useNavigation();
  const [surveyVisible, setSurveyVisible] = useState(false);
  const [surveyMode, setSurveyMode] = useState('quick');
  const lastTap = useRef(0);
  const total = CATEGORIES.reduce((sum, c) => sum + c.amount, 0);

  function openInvestDashboard() {
  navigation.navigate('Invest', {
    screen: 'InvestmentDashboard',
  });
}

  function handleQuickButtonPress() {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      setSurveyMode('quick');
      setSurveyVisible(true);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inset}>
          <Text style={styles.greeting}>Hey, Razan</Text>
          <Text style={styles.dateLine}>Friday, July 10</Text>
        </View>

        <Text style={[styles.sectionTitle, styles.inset]}>WHERE YOUR MONEY'S GOING</Text>

        {/* Full-bleed section: no card, no rounded corners, runs edge to edge */}
        <View style={styles.spendSection}>
          <Text style={[styles.totalLabel, styles.inset]}>${total.toLocaleString()} this month</Text>
          <View style={styles.stackBar}>
            {CATEGORIES.map((c) => (
              <View
                key={c.key}
                style={{ flex: c.amount, backgroundColor: c.color, height: '100%' }}
              />
            ))}
          </View>
          <View style={[styles.legend, styles.inset]}>
            {CATEGORIES.map((c) => (
              <View key={c.key} style={styles.legendRow}>
                <View style={styles.legendLabel}>
                  <View style={[styles.dot, { backgroundColor: c.color }]} />
                  <Text style={styles.legendText}>{c.key}</Text>
                </View>
                <Text style={styles.legendAmount}>${c.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.inset}>
          <View style={styles.goalCard}>
            <Text style={styles.goalLabel}>CREDIT SCORE GOAL</Text>
            <View style={styles.goalRow}>
              <Text style={styles.goalScore}>690</Text>
              <Text style={styles.goalArrow}>→</Text>
              <Text style={styles.goalScore}>750</Text>
              <Text style={styles.goalDate}>by Dec 2026</Text>
            </View>
            <View style={styles.goalTrack}>
              <View style={styles.goalFill} />
            </View>
            <Text style={styles.goalCaption}>On track — utilization down 8% this month</Text>
          </View>

          <View style={styles.investCard}>
            <Text style={styles.sectionTitle}>INVESTMENT FOCUS</Text>
            <Text style={styles.investTitle}>Grow your Roth IRA with every month</Text>
            <Text style={styles.investBody}>
              Redirect a bit of your spending into long-term investing and keep your future on track.
            </Text>
            <TouchableOpacity style={styles.btnOutline} onPress={openInvestDashboard}>
              <Text style={styles.btnOutlineText}>Open investment view</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
          {ACTIVITY.map((a, i) => (
            <View key={i} style={styles.activityRow}>
              <View style={styles.activityIcon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityName}>{a.name}</Text>
                <Text style={styles.activitySub}>{a.sub}</Text>
              </View>
              <Text style={styles.activityAmount}>{a.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Small floating AssistiveTouch-style button, bottom-left. Double-tap opens the survey. */}
      <TouchableOpacity
        style={styles.assistiveButton}
        activeOpacity={0.75}
        onPress={handleQuickButtonPress}
      >
        <View style={styles.assistiveButtonInner} />
      </TouchableOpacity>

      <SurveySheet
        visible={surveyVisible}
        onClose={() => setSurveyVisible(false)}
        mode={surveyMode}
        cards={CARDS}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { paddingBottom: 40 },
  inset: { paddingHorizontal: spacing.lg },

  greeting: { fontSize: 26, fontWeight: '600', color: colors.ink, marginTop: spacing.lg },
  dateLine: { fontSize: 12, color: colors.inkSoft, marginTop: 2 },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.inkSoft,
    marginTop: 22,
    marginBottom: 10,
  },

  spendSection: {
    backgroundColor: colors.blush,
    paddingVertical: 18,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.ink, marginBottom: 12 },
  stackBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    marginBottom: 14,
  },
  legend: { gap: 7 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  legendLabel: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12.5, color: colors.ink },
  legendAmount: { fontSize: 12, color: colors.roseDeep },

  goalCard: { backgroundColor: colors.brand, borderRadius: 20, padding: 18, marginTop: 18 },
  investCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 20,
    padding: 18,
    marginTop: 18,
  },
  investTitle: { fontSize: 17, fontWeight: '700', color: colors.ink, marginTop: 4 },
  investBody: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19, marginTop: 8, marginBottom: 14 },
  goalLabel: { fontSize: 11, color: '#CFE3D6', fontWeight: '700', letterSpacing: 1 },
  goalRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  goalScore: { fontSize: 22, fontWeight: '700', color: '#fff' },
  goalArrow: { color: '#CFE3D6', marginHorizontal: 6 },
  goalDate: { fontSize: 11, color: '#CFE3D6', marginLeft: 'auto' },
  goalTrack: { height: 6, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.22)', marginTop: 12, overflow: 'hidden' },
  goalFill: { height: '100%', width: '46%', backgroundColor: colors.rose, borderRadius: 4 },
  goalCaption: { fontSize: 11, color: '#CFE3D6', marginTop: 8 },

  quickActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btnOutline: { flex: 1, borderWidth: 1.5, borderColor: colors.brand, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  btnOutlineText: { color: colors.brand, fontWeight: '700', fontSize: 13 },

  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  activityIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: colors.sage,
  },
  activityName: { fontSize: 13, fontWeight: '600', color: colors.ink },
  activitySub: { fontSize: 11, color: colors.inkSoft },
  activityAmount: { fontSize: 13, color: colors.ink },

  assistiveButton: {
    position: 'absolute',
    left: 16,
    bottom: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(31, 92, 78, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  assistiveButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});