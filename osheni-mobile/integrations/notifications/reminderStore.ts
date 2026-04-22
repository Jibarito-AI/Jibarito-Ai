export type SessionReminderRecord = {
  sessionId: string;
  enabled: boolean;
  createdAt: string;
};

const reminderMap = new Map<string, SessionReminderRecord>();

export async function fetchSessionReminder(sessionId: string): Promise<SessionReminderRecord | null> {
  return reminderMap.get(sessionId) ?? null;
}

export async function saveSessionReminder(sessionId: string): Promise<SessionReminderRecord> {
  const record: SessionReminderRecord = {
    sessionId,
    enabled: true,
    createdAt: new Date().toISOString()
  };
  reminderMap.set(sessionId, record);
  return record;
}
