SELECT event_id, json_agg(json_build_object('id', id,
                                            'first_name', first_name,
                                            'last_name', last_name,
                                            'email', email,
                                            'phone', phone)) AS judges
FROM judges
GROUP BY event_id;