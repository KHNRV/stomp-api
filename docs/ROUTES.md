## API > EVENTS
POST  > api/events/login

POST  > api/events/register

POST  > api/events/authenticate


## API > COMPETITIONS
GET    > api/events/:event_code/competitions

POST   > api/events/:event_code/competitions
GET    > api/events/:event_code/competitions/:id
PUT    > api/events/:event_code/competitions/:id
DELETE > api/events/:event_code/competitions/:id

## API > COMPETITIONS > SCORES
GET    > api/events/:event_code/competitions/:id/scores

POST   > api/events/:event_code/competitions/:id/scores
GET    > api/events/:event_code/competitions/:id/scores/:id
PUT    > api/events/:event_code/competitions/:id/scores/:id
DELETE > api/events/:event_code/competitions/:id/scores/:id


## API > PARTICIPANTS
GET    > api/events/:event_code/participants

POST   > api/events/:event_code/participants
GET    > api/events/:event_code/participants/:id
PUT    > api/events/:event_code/participants/:id
DELETE > api/events/:event_code/participants/:id


## API > JUDGES
GET    > api/events/:event_code/judges

POST   > api/events/:event_code/judges
GET    > api/events/:event_code/judges/:id
PUT    > api/events/:event_code/judges/:id
DELETE > api/events/:event_code/judges/:id