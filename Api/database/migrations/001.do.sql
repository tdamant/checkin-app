CREATE TABLE checkins (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  mood INTEGER NOT NULL,
  feeling VARCHAR[] NOT NULL,
  comment VARCHAR
)
