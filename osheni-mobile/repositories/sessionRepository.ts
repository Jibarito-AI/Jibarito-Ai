import { getSupabaseClient } from '@/lib/supabase';
import { listLiveSessions } from '@/services/sessionService';
import type { LiveSession } from '@/types/session';

function mapSessionRow(row: any): LiveSession {
  return {
    id: row.id,
    title: row.title,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    timezone: row.timezone,
    timeLabel: row.time_label,
    dateLabel: row.date_label,
    attendees: row.attendees,
    status: row.status,
    provider: row.provider,
    link: row.link,
    instructorName: row.instructor_name
  };
}

export async function fetchLiveSessions(): Promise<LiveSession[]> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return listLiveSessions();
  }

  try {
    const { data, error } = await client
      .from('live_sessions')
      .select('id, title, starts_at, ends_at, timezone, time_label, date_label, attendees, status, provider, link, instructor_name')
      .order('starts_at', { ascending: true });

    if (error || !data) {
      return listLiveSessions();
    }

    return data.map(mapSessionRow);
  } catch {
    return listLiveSessions();
  }
}

export async function fetchNextLiveSession(): Promise<LiveSession | undefined> {
  const sessions = await fetchLiveSessions();
  return sessions.find((session) => session.status === 'live') ?? sessions.find((session) => session.status === 'upcoming') ?? sessions[0];
}
