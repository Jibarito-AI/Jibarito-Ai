export function getSecondsUntilTodayTime(timeLabel: string): number {
  const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) {
    return 60;
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;

  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return Math.max(1, Math.floor((target.getTime() - now.getTime()) / 1000));
}

export function getReminderLeadSeconds(secondsUntilSession: number, leadMinutes = 15): number {
  return Math.max(1, secondsUntilSession - leadMinutes * 60);
}
