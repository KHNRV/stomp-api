WITH _event_id AS (
        SELECT id
        FROM events
        WHERE event_code = 'csc2020'
)
SELECT id, bib, first_name, last_name, email, phone
FROM participants
WHERE event_id = _event_id;