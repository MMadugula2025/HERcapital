import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const { width, height } = Dimensions.get('window');

// Same local palette as HomeScreen — kept local so it doesn't touch shared theme.js
const palette = {
  bg: '#F2F7F0',        // pale sage background
  moneyGreen: '#2F5233', // deep bill-green
  leaf: '#8FBF95',
  rose: '#E48CA8',
  roseDeep: '#C96C8B',
};

export default function IntroScreen({ onFinish }) {
  // Logo container: scale + opacity (the core "app open" spring reveal)
  const logoScale = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Flash: a quick bright pulse that coincides with the spring landing,
  // like a camera-flash catch-light — this is what sells the "Instagram" feel
  const flashOpacity = useRef(new Animated.Value(0)).current;

  // Underline draws itself after the logo lands
  const underlineWidth = useRef(new Animated.Value(0)).current;

  // Background glow breathes gently the whole time
  const glowOpacity = useRef(new Animated.Value(0.5)).current;

  // Whole screen fade-out at the end
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous soft breathing glow behind the wordmark
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.9,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.5,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.sequence([
      // 1. Logo springs in fast and slightly overshoots, then settles —
      //    this snappy spring is the core "Instagram open" motion
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 140,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      
      
      // 4. Hold for a beat
      Animated.delay(650),
      // 5. Fade whole screen out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 320,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish && onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Soft breathing glow — real gradient circles instead of flat tinted views */}
      <Animated.View style={[styles.glowCircle, styles.glowGreenPos, { opacity: glowOpacity }]}>
        <LinearGradient
          colors={[palette.leaf, 'rgba(143,191,149,0)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.glowCircle,
          styles.glowPinkPos,
          { opacity: Animated.multiply(glowOpacity, 0.8) },
        ]}
      >
        <LinearGradient
          colors={[palette.rose, 'rgba(228,140,168,0)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.wordmark}>HER</Text>
          <Animated.View style={[styles.underline, { width: underlineWidth }]} />
        </Animated.View>

        {/* Flash overlay — soft radial gradient instead of a flat white circle,
            so it looks like a light catching the wordmark rather than a hard disc */}
        <AnimatedGradient
          pointerEvents="none"
          colors={['#FFFFFF', 'rgba(255,255,255,0)']}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.flash, { opacity: flashOpacity }]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontSize: 52,
    fontWeight: '800',
    color: palette.moneyGreen,
    letterSpacing: 6,
  },
  underline: {
    height: 3,
    borderRadius: 2,
    backgroundColor: palette.rose,
    marginTop: 10,
  },
  flash: {
    position: 'absolute',
    top: -40,
    left: -60,
    right: -60,
    bottom: -40,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  glowCircle: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    overflow: 'hidden',
  },
  glowGreenPos: {},
  glowPinkPos: {
    transform: [{ translateX: 30 }, { translateY: 20 }],
  },
});