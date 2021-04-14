UPDATE participants
SET bib = $1,
    first_name = $2,
    last_name = $3,
    email = $4,
    phone = $5
WHERE id = $6;