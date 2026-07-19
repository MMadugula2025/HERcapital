import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '../theme';
import CardWallet from './CardWallet';

const CATEGORIES = [
  { key: 'Food', label: '🍽 Food' },
  { key: 'Shopping', label: '🛍 Shopping' },
  { key: 'Subscription', label: '🎬 Subscription' },
  { key: 'Travel', label: '✈️ Travel' },
];

const DETAIL_QUESTIONS = {
  Food: { q: 'Is this a restaurant or a grocery run?', opts: ['Restaurant', 'Grocery store'] },
  Shopping: { q: 'In-store or online?', opts: ['In-store', 'Online'] },
  Subscription: { q: 'Is this a recurring monthly charge?', opts: ['Yes, recurring', 'One-time'] },
  Travel: { q: 'Flights/hotel, or everyday transit?', opts: ['Flights & hotel', 'Everyday transit'] },
};

// Simple rules-based stand-in for the recommendation engine.
// Swap this for a real lookup against the user's connected cards,
// or a Claude API call that reasons over their card terms.
function recommendCard(category, detail) {
  return {
    skip: { name: 'Horizon Card', stat: '1% back · 22.99% APR eats the reward' },
    use: { name: 'Emerald Rewards', stat: '4% back on this category · 14.9% APR' },
  };
}

export default function SurveySheet({ visible, onClose, mode = 'quick', cards = [] }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [detail, setDetail] = useState(null);

  function reset() {
    setStep(1);
    setCategory(null);
    setDetail(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function pickCategory(key) {
    setCategory(key);
    setStep(2);
  }

  function pickDetail(opt) {
    setDetail(opt);
    setStep(3);
  }

  const rec = category && detail ? recommendCard(category, detail) : null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {mode === 'wallet' && (
              <>
                <Text style={styles.eyebrow}>Your cards</Text>
                <CardWallet cards={cards} />
              </>
            )}

          {step === 1 && (
            <>
              <Text style={styles.eyebrow}>Quick check · step 1 of 2</Text>
              <Text style={styles.question}>What are you about to spend on?</Text>
              <View style={styles.chipGrid}>
                {CATEGORIES.map((c) => (
                  <TouchableOpacity key={c.key} style={styles.chip} onPress={() => pickCategory(c.key)}>
                    <Text style={styles.chipText}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {step === 2 && category && (
            <>
              <Text style={styles.eyebrow}>Quick check · step 2 of 2</Text>
              <Text style={styles.question}>{DETAIL_QUESTIONS[category].q}</Text>
              <View style={styles.chipGrid}>
                {DETAIL_QUESTIONS[category].opts.map((opt) => (
                  <TouchableOpacity key={opt} style={styles.chip} onPress={() => pickDetail(opt)}>
                    <Text style={styles.chipText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {step === 3 && rec && (
            <>
              <Text style={styles.eyebrow}>Recommended for this purchase</Text>
              <Text style={styles.question}>{category} · {detail}</Text>

              <View style={styles.cardStack}>
                <View style={[styles.payCard, styles.payCardSkip]}>
                  <Text style={styles.badgeSkip}>SKIP</Text>
                  <Text style={styles.payCardNameSkip}>{rec.skip.name}</Text>
                  <Text style={styles.payCardStatSkip}>{rec.skip.stat}</Text>
                </View>
                <View style={[styles.payCard, styles.payCardUse]}>
                  <Text style={styles.badgeUse}>USE THIS</Text>
                  <Text style={styles.payCardName}>{rec.use.name}</Text>
                  <Text style={styles.payCardStat}>{rec.use.stat}</Text>
                </View>
              </View>

              <Text style={styles.note}>
                This category is trending higher than last month — worth a second look before you tap.
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.btnOutline} onPress={handleClose}>
                  <Text style={styles.btnOutlineText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={handleClose}>
                  <Text style={styles.btnPrimaryText}>Use this card</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(14,22,19,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing.lg,
    paddingBottom: 34,
    maxHeight: '86%',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 3,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  question: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.ink,
    marginTop: 6,
    marginBottom: spacing.md,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  cardStack: {
    marginTop: 6,
    height: 150,
  },
  payCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 16,
    padding: 16,
  },
  payCardSkip: {
    top: 14,
    backgroundColor: '#cfcabb',
    transform: [{ scale: 0.96 }],
    opacity: 0.85,
  },
  payCardUse: {
    top: 0,
    backgroundColor: colors.brand,
    shadowColor: colors.brandDark,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  badgeSkip: { fontSize: 10, fontWeight: '700', color: '#5b5647', letterSpacing: 1 },
  badgeUse: { fontSize: 10, fontWeight: '700', color: '#d7e8e1', letterSpacing: 1 },
  payCardNameSkip: { fontSize: 15, fontWeight: '600', color: '#5b5647', marginTop: 6 },
  payCardName: { fontSize: 15, fontWeight: '600', color: '#fff', marginTop: 6 },
  payCardStatSkip: { fontSize: 12, color: '#5b5647', marginTop: 8 },
  payCardStat: { fontSize: 12, color: '#eef4f1', marginTop: 8 },
  note: {
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 14,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.md,
  },
  btnOutline: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.brand,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnOutlineText: { color: colors.brand, fontWeight: '600', fontSize: 13 },
  btnPrimary: {
    flex: 1,
    backgroundColor: colors.gold,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#251705', fontWeight: '700', fontSize: 13 },
});