import type { HealthMetrics } from './mockHealthDataProvider';

export type MockBackendResponse = {
  riskLevel: 'Low' | 'Moderate' | 'High';
  hydrationTip: string;
  coachMessage: string;
  nextCheckIn: string;
};

// Demo-only backend stub. Replace with real API integration when available.
export async function getMockBackendSummary(
  metrics: HealthMetrics,
): Promise<MockBackendResponse> {
  const riskLevel = metrics.steps > 6500 && metrics.sleepHours >= 7 ? 'Low' : 'Moderate';

  return {
    riskLevel,
    hydrationTip: 'Drink 2-3 glasses of water in the next 2 hours.',
    coachMessage:
      metrics.heartRateBpm <= 76
        ? 'Vitals look stable today. Keep a steady walking pace.'
        : 'Heart rate is slightly elevated. Take a short breathing break.',
    nextCheckIn: '18:00',
  };
}
