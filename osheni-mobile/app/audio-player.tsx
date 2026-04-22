import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const TOTAL_SECONDS = 480; // 8 min

const speeds = ['0.75x', '1x', '1.25x', '1.5x'];
const timerOptions = ['Off', '15 min', '30 min', '60 min'];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function AudioPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(202); // start at 3:22
  const [speedIndex, setSpeedIndex] = useState(1); // 1x default
  const [timerIndex, setTimerIndex] = useState(0); // Off default
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= TOTAL_SECONDS) {
            setIsPlaying(false);
            return TOTAL_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const skip = (seconds: number) => {
    setElapsed((prev) => Math.max(0, Math.min(TOTAL_SECONDS, prev + seconds)));
  };

  const progress = elapsed / TOTAL_SECONDS;

  return (
    <AppScreen title="Audio Player">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700' }}>Breath Into Calm</Text>
        <Text style={{ color: theme.colors.muted }}>Breathwork • 8 min</Text>

        <View style={{ height: 10, backgroundColor: '#DCE7F3', borderRadius: 999, overflow: 'hidden', marginTop: 12 }}>
          <View style={{ width: `${Math.round(progress * 100)}%`, height: '100%', backgroundColor: theme.colors.primary }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.muted }}>{formatTime(elapsed)}</Text>
          <Text style={{ color: theme.colors.muted }}>{formatTime(TOTAL_SECONDS)}</Text>
        </View>
      </Card>

      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <Pressable
            onPress={() => skip(-15)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#DCE7F3' : '#E6F3F3',
              borderRadius: 999,
              width: 56,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 13 }}>−15s</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsPlaying((p) => !p)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.colors.secondary : theme.colors.primary,
              borderRadius: 999,
              width: 72,
              height: 72,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Text style={{ color: theme.colors.white, fontSize: 28 }}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => skip(15)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#DCE7F3' : '#E6F3F3',
              borderRadius: 999,
              width: 56,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 13 }}>+15s</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 8 }}>
          <Pressable
            onPress={() => setSpeedIndex((i) => (i + 1) % speeds.length)}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{speeds[speedIndex]}</Text>
          </Pressable>

          <Pressable
            onPress={() => setTimerIndex((i) => (i + 1) % timerOptions.length)}
            style={{
              borderWidth: 1,
              borderColor: timerIndex > 0 ? theme.colors.primary : theme.colors.border,
              borderRadius: theme.radius.md,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: timerIndex > 0 ? theme.colors.primary : theme.colors.text, fontWeight: '600' }}>
              {timerIndex === 0 ? 'Sleep Timer' : `Timer: ${timerOptions[timerIndex]}`}
            </Text>
          </Pressable>
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.muted, textAlign: 'center', fontSize: 13 }}>
          Full audio requires a development build. Playback simulation is active.
        </Text>
      </Card>
    </AppScreen>
  );
}
