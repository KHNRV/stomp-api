SELECT id, first_name, last_name, email, phone
FROM judges
WHERE event_id = $1;