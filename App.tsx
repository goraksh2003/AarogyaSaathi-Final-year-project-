import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMockBackendSummary, type MockBackendResponse } from './src/mock/mockBackend';
import { getMockHealthMetrics, type HealthMetrics } from './src/mock/mockHealthDataProvider';

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [backend, setBackend] = useState<MockBackendResponse | null>(null);

  // Integration boundary: wearable/back-end can be swapped here later.
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    const nextMetrics = await getMockHealthMetrics();
    const nextBackend = await getMockBackendSummary(nextMetrics);
    setMetrics(nextMetrics);
    setBackend(nextBackend);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const goalSteps = 8000;
  const stepProgress = metrics ? Math.min(100, Math.round((metrics.steps / goalSteps) * 100)) : 0;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>AarogyaSaathi Health Monitor</Text>
          <Text style={styles.subtitle}>
            Daily wellness snapshot with vitals, activity tracking, and health insights.
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Patient Overview</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {loading || !metrics || !backend ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color="#ffd166" />
              <Text style={styles.loadingText}>Syncing latest health readings...</Text>
            </View>
          ) : (
            <>
              <View style={styles.cardRow}>
                <MetricCard label="Heart Rate" value={`${metrics.heartRateBpm} bpm`} />
                <MetricCard label="Steps" value={`${metrics.steps}`} />
              </View>
              <MetricCard label="Sleep" value={`${metrics.sleepHours} hours`} />

              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>Daily Step Goal</Text>
                <Text style={styles.goalText}>{stepProgress}% of {goalSteps} steps</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${stepProgress}%` }]} />
                </View>
              </View>

              <View style={styles.backendCard}>
                <Text style={styles.backendTitle}>Clinical Summary</Text>
                <Text style={styles.backendItem}>Risk Level: {backend.riskLevel}</Text>
                <Text style={styles.backendItem}>{backend.coachMessage}</Text>
                <Text style={styles.backendItem}>{backend.hydrationTip}</Text>
                <Text style={styles.backendItem}>Next Check-In: {backend.nextCheckIn}</Text>
                <Text style={styles.timestamp}>Updated: {new Date(metrics.recordedAtIso).toLocaleString()}</Text>
              </View>
            </>
          )}

          <Pressable style={styles.button} onPress={() => void loadDashboardData()}>
            <Text style={styles.buttonText}>Refresh Health Data</Text>
          </Pressable>

          <Text style={styles.noteText}>
            Integration note: current build uses local providers while wearable and backend environments are unavailable.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 16,
    paddingBottom: 28,
    gap: 14,
  },
  hero: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  tag: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tagText: {
    color: '#042f2e',
    fontWeight: '800',
    fontSize: 12,
  },
  section: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    gap: 8,
  },
  sectionTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  loadingText: {
    color: '#d1d5db',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#374151',
    marginTop: 2,
  },
  metricLabel: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  metricValue: {
    marginTop: 4,
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
  },
  goalCard: {
    marginTop: 8,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  goalTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 14,
  },
  goalText: {
    marginTop: 4,
    marginBottom: 8,
    color: '#cbd5e1',
    fontSize: 13,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#1e293b',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  backendCard: {
    marginTop: 8,
    backgroundColor: '#0b1220',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 5,
  },
  backendTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  backendItem: {
    color: '#e2e8f0',
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
  },
  noteText: {
    marginTop: 8,
    color: '#93a3b8',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default App;
