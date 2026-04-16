export type HealthMetrics = {
  heartRateBpm: number;
  steps: number;
  sleepHours: number;
  recordedAtIso: string;
  source: 'mock';
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSleepHours(min: number, max: number): number {
  const value = Math.random() * (max - min) + min;
  return Math.round(value * 10) / 10;
}

// Demo-only mock provider. Real wearable integrations are intentionally bypassed.
export async function getMockHealthMetrics(): Promise<HealthMetrics> {
  return {
    heartRateBpm: randomInt(70, 80),
    steps: randomInt(4000, 8000),
    sleepHours: randomSleepHours(6, 8),
    recordedAtIso: new Date().toISOString(),
    source: 'mock',
  };
}
