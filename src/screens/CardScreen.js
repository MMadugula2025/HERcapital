import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.lg * 2;
const CARD_HEIGHT = 190;
const STACK_OFFSET = 40; // sliver visible per card at rest
const SPREAD_OFFSET = 150; // spacing once the stack is expanded

const CARDS = [
  {
    name: 'Capital One',
    network: 'VISA',
    last4: '4821',
    color: '#004977',
    colorDark: '#002d4d',
    balance: '1,682.55',
    available: '8,317.45',
    dueDays: 6,
    weekly: [22, 40, 18, 55, 30, 60, 25],
  },
  {
    name: 'Discover',
    network: 'DISCOVER',
    last4: '2290',
    color: '#FF6000',
    colorDark: '#cc4c00',
    balance: '412.10',
    available: '2,587.90',
    dueDays: 14,
    weekly: [10, 25, 15, 20, 45, 12, 30],
  },
  {
    name: 'Debit Card',
    network: 'DEBIT',
    last4: '7734',
    color: '#2b3a45',
    colorDark: '#162027',
    balance: '0.00',
    available: '3,204.60',
    dueDays: null,
    weekly: [35, 20, 42, 18, 28, 50, 33],
  },
];

export default function CardsScreen() {
  const [mode, setMode] = useState('stacked'); // 'stacked' | 'expanded' | 'flipped'
  const [selected, setSelected] = useState(null);
  const spread = useRef(new Animated.Value(0)).current; // 0 stacked -> 1 expanded
  const flip = useRef(new Animated.Value(0)).current; // 0 front -> 1 back

  function expandStack() {
    if (mode !== 'stacked') return;
    setMode('expanded');
    Animated.spring(spread, { toValue: 1, useNativeDriver: false, friction: 9 }).start();
  }

  function collapseStack() {
    Animated.spring(spread, { toValue: 0, useNativeDriver: false, friction: 9 }).start(() => {
      setMode('stacked');
      setSelected(null);
    });
    Animated.timing(flip, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  }

  function selectCard(i) {
    if (mode !== 'expanded') return;
    setSelected(i);
    setMode('flipped');
    Animated.timing(flip, { toValue: 1, duration: 450, useNativeDriver: true }).start();
  }

  function unflip() {
    Animated.timing(flip, { toValue: 0, duration: 350, useNativeDriver: true }).start(() => {
      setMode('expanded');
      setSelected(null);
    });
  }

  const frontRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const frontOpacity = flip.interpolate({ inputRange: [0, 0.5, 0.5], outputRange: [1, 1, 0] });
  const backOpacity = flip.interpolate({ inputRange: [0.5, 0.5, 1], outputRange: [0, 1, 1] });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
        {mode !== 'stacked' && (
          <TouchableOpacity onPress={mode === 'flipped' ? unflip : collapseStack}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.stackArea}>
        {CARDS.map((c, i) => {
          const top = spread.interpolate({
            inputRange: [0, 1],
            outputRange: [i * STACK_OFFSET, i * SPREAD_OFFSET],
          });

          const isSelected = selected === i;
          const isDimmed = mode === 'flipped' && !isSelected;

          return (
            <Animated.View
              key={c.name}
              style={[
                styles.cardWrap,
                {
                  top,
                  zIndex: isSelected ? 50 : CARDS.length - i,
                  opacity: isDimmed ? 0.35 : 1,
                  transform: [{ scale: isDimmed ? 0.94 : 1 }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={mode === 'flipped'}
                onPress={() => (mode === 'stacked' ? expandStack() : selectCard(i))}
              >
                {/* FRONT FACE */}
                <Animated.View
                  style={[
                    styles.card,
                    { backgroundColor: c.color },
                    isSelected && {
                      transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
                      opacity: frontOpacity,
                    },
                  ]}
                >
                  <View style={styles.cardTopRow}>
                    <Text style={styles.appleMark}>􀣺</Text>
                    <Text style={styles.network}>{c.network}</Text>
                  </View>
                  <Text style={styles.cardName}>{c.name}</Text>
                  <Text style={styles.cardNumber}>•••• {c.last4}</Text>
                </Animated.View>

                {/* BACK FACE (only meaningful once selected) */}
                {isSelected && (
                  <Animated.View
                    style={[
                      styles.card,
                      styles.cardBack,
                      { backgroundColor: c.colorDark },
                      {
                        transform: [{ perspective: 1000 }, { rotateY: backRotate }],
                        opacity: backOpacity,
                      },
                    ]}
                  >
                    <Text style={styles.backHeader}>{c.name}</Text>
                  </Animated.View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {mode === 'flipped' && selected !== null && (
        <Animated.View style={[styles.detailPanel, { opacity: backOpacity }]}>
          <View style={styles.detailRow}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Total Balance</Text>
              <Text style={styles.detailValue}>${CARDS[selected].balance}</Text>
              <Text style={styles.detailSub}>${CARDS[selected].available} Available</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Payment Due In</Text>
              <Text style={styles.detailValue}>
                {CARDS[selected].dueDays !== null ? `${CARDS[selected].dueDays} Days` : '—'}
              </Text>
              <TouchableOpacity style={styles.payBtn}>
                <Text style={styles.payBtnText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {mode === 'stacked' && (
        <Text style={styles.hint}>Tap the stack to see all your cards</Text>
      )}
      {mode === 'expanded' && (
        <Text style={styles.hint}>Tap a card to view balance & activity</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: { fontSize: 22, fontWeight: '600', color: colors.ink },
  doneText: { fontSize: 15, fontWeight: '600', color: colors.brand },

  stackArea: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    height: CARD_HEIGHT + (CARDS.length - 1) * SPREAD_OFFSET,
  },
  cardWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  appleMark: { color: 'rgba(255,255,255,0.85)', fontSize: 16 },
  network: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardName: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 'auto' },
  cardNumber: { color: 'rgba(255,255,255,0.85)', fontSize: 14, letterSpacing: 1, marginTop: 4 },
  backHeader: { color: '#fff', fontSize: 14, fontWeight: '700' },

  hint: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: spacing.md,
  },

  detailPanel: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  detailRow: { flexDirection: 'row', gap: 10 },
  detailCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  detailLabel: { fontSize: 12, color: colors.inkSoft, marginBottom: 6 },
  detailValue: { fontSize: 20, fontWeight: '700', color: colors.ink },
  detailSub: { fontSize: 11, color: colors.inkSoft, marginTop: 2 },
  payBtn: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    backgroundColor: colors.ink,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  payBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 60,
  },
  bar: { width: 10, borderRadius: 4 },
});