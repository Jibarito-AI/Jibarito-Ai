# Osheni Mobile Data Model Plan

## First backend tables

### users
- id
- email
- first_name
- language
- created_at
- subscription_status
- trial_end_date
- streak_count

### journal_entries
- id
- user_id
- prompt
- content
- mood_level
- mood_tags
- created_at
- updated_at

### live_sessions
- id
- title
- date
- time
- status
- attendee_count
- zoom_url
- passcode

### user_activity
- id
- user_id
- activity_type
- related_id
- created_at
- duration_seconds

### subscriptions
- id
- user_id
- provider
- plan_id
- status
- renewal_date
- created_at

## Prototype rule
Screens should consume services and types first. Services should consume backend clients later.
