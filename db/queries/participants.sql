SELECT event_id, json_agg(json_build_object('id', id,
                                            'bib', bib,
                                            'first_name', first_name,
                                            'last_name', last_name,
                                            'email', email,
                                            'phone', phone)) AS participants
FROM participants
GROUP BY event_id;