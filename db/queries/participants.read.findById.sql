SELECT id, bib, first_name, last_name, email, phone
FROM participants
WHERE event_id = $1;