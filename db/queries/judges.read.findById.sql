SELECT id, first_name, last_name, email, phone, event_id
FROM judges
WHERE id = $1;