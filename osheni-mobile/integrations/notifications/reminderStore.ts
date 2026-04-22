import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type SessionReminderRecord = {
  sessionId: string;
  enabled: boolean;
  createdAt: string;
};

const reminderMap = new Map<string, SessionReminderRecord>();
const STORAGE_KEY = 'osheni_session_reminders';

async function readReminderMap(): Promise<Record<string, SessionReminderRecord>> {
  if (Platform.OS === 'web') {
    return Object.fromEntries(reminderMap);
  }

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return Object.fromEntries(reminderMap);
  }
}

async function writeReminderMap(data: Record<string, SessionReminderRecord>) {
  Object.entries(data).forEach(([key, value]) => {
    reminderMap.set(key, value);
  });

  if (Platform.OS === 'web') {
    return;
  }

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // keep in-memory fallback
  }
}

export async function fetchSessionReminder(sessionId: string): Promise<SessionReminderRecord | null> {
  const data = await readReminderMap();
  return data[sessionId] ?? reminderMap.get(sessionId) ?? null;
}

export async function saveSessionReminder(sessionId: string): Promise<SessionReminderRecord> {
  const record: SessionReminderRecord = {
    sessionId,
    enabled: true,
    createdAt: new Date().toISOString()
  };

  const data = await readReminderMap();
  data[sessionId] = record;
  await writeReminderMap(data);
  return record;
}
