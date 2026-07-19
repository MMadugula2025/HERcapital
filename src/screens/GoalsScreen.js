import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing } from '../theme';

const ROADMAP = [
  { done: true, title: 'Keep utilization under 30%', sub: 'Helps your score before internship & lease applications' },
  { done: true, title: '6 months on-time payments', sub: 'Builds the payment history lenders check first' },
  { done: false, title: 'Open a second tradeline', sub: 'Improves your credit mix ahead of a first apartment' },
  { done: false, title: 'Build a 1-month emergency fund', sub: 'Gives you room to negotiate your first offer, not just accept it' },
];

export default function GoalsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your roadmap</Text>
        <Text style={styles.subtitle}>Target: 750 score by December 2026</Text>

        <Text style={styles.sectionTitle}>STEPS TIED TO YOUR GOALS</Text>
        {ROADMAP.map((item, i) => (
          <View key={i} style={styles.roadmapItem}>
            <View style={[styles.check, item.done && styles.checkDone]}>
              {item.done && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.roadmapTitle}>{item.title}</Text>
              <Text style={styles.roadmapSub}>{item.sub}</Text>
            </View>
          </View>
        ))}

        <View style={styles.warnCard}>
          <Text style={styles.warnTitle}>⚠ Perk vs. cost check</Text>
          <Text style={styles.warnBody}>
            Horizon Card's 1% cashback is outweighed by its 22.99% APR if you carry a balance
            past this month — Emerald Rewards has no annual fee and a lower rate.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '600', color: colors.ink },
  subtitle: { fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.inkSoft,
    marginTop: 22, marginBottom: 10,
  },
  roadmapItem: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  check: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.brand,
    alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  checkDone: { backgroundColor: colors.brand },
  checkMark: { color: '#fff', fontSize: 11 },
  roadmapTitle: { fontSize: 13.5, fontWeight: '600', color: colors.ink },
  roadmapSub: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2 },
  warnCard: {
    backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: '#e4c3b8',
    borderRadius: 16, padding: 14, marginTop: 16,
  },
  warnTitle: { fontSize: 12.5, fontWeight: '700', color: colors.warn },
  warnBody: { fontSize: 12, color: '#6b3a2c', marginTop: 4, lineHeight: 18 },
});