-- USERS
CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  cf_handle        VARCHAR(50) UNIQUE NOT NULL,
  email            VARCHAR(255) UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  cf_rating        INTEGER DEFAULT 0,
  cf_tier          VARCHAR(30) DEFAULT 'newbie',  -- pupil, specialist, expert...
  blitzforce_points INTEGER DEFAULT 1000,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- PROBLEMS (cached from CF API)
CREATE TABLE problems (
  id               SERIAL PRIMARY KEY,
  cf_contest_id    INTEGER NOT NULL,
  cf_index         VARCHAR(5) NOT NULL,           -- A, B, C, D...
  title            TEXT NOT NULL,
  rating           INTEGER,
  tags             TEXT[],
  fetched_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cf_contest_id, cf_index)
);

-- USER SOLVED PROBLEMS (synced from CF)
CREATE TABLE user_solved_problems (
  user_id          INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem_id       INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  solved_at        TIMESTAMPTZ,
  PRIMARY KEY(user_id, problem_id)
);

-- DUELS
CREATE TABLE duels (
  id               SERIAL PRIMARY KEY,
  player1_id       INTEGER REFERENCES users(id),
  player2_id       INTEGER REFERENCES users(id),
  problem_id       INTEGER REFERENCES problems(id),
  mode             VARCHAR(10) NOT NULL CHECK(mode IN ('normal','bet')),
  duration_mins    INTEGER NOT NULL,
  bet_amount       INTEGER DEFAULT 0,
  status           VARCHAR(20) DEFAULT 'active'
                     CHECK(status IN ('active','finished','cancelled')),
  winner_id        INTEGER REFERENCES users(id),
  started_at       TIMESTAMPTZ DEFAULT NOW(),
  ends_at          TIMESTAMPTZ NOT NULL,
  finished_at      TIMESTAMPTZ DEFAULT NOW()
);

-- SUBMISSIONS (every attempt, not just AC) 
-- NOTE: Not done yet
CREATE TABLE submissions (
  id               SERIAL PRIMARY KEY,
  duel_id          INTEGER REFERENCES duels(id) ON DELETE CASCADE,
  user_id          INTEGER REFERENCES users(id),
  cf_submission_id BIGINT UNIQUE,
  verdict          VARCHAR(20),                   -- AC, WA, TLE, CE...
  submitted_at     TIMESTAMPTZ NOT NULL,
  penalty_minutes  INTEGER DEFAULT 0              -- cumulative WAs at time of this submission
);

-- tracks blitzforce points after each duel (for rating graph)
CREATE TABLE points_history (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
  duel_id       INTEGER REFERENCES duels(id) ON DELETE CASCADE,
  points_before INTEGER NOT NULL,
  points_after  INTEGER NOT NULL,
  delta         INTEGER NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
