import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function CardWallet({ cards }) {
  if (!cards || cards.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No cards available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <View key={index} style={styles.cardRow}>
          <View style={[styles.cardPreview, { backgroundColor: card.color }]} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardNumber}>
              {card.network} •••• {card.last4}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardPreview: {
    width: 50,
    height: 32,
    borderRadius: 6,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  cardNumber: {
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 2,
  },
  empty: {
    padding: spacing.md,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.inkSoft,
    fontSize: 12,
  },
});
