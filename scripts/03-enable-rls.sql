-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Swipes policies
CREATE POLICY "Users can view own swipes"
  ON swipes FOR SELECT
  USING (swiper_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create own swipes"
  ON swipes FOR INSERT
  WITH CHECK (swiper_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Matches policies
CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  USING (
    profile1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR profile2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Messages policies
CREATE POLICY "Users can view messages in their matches"
  ON messages FOR SELECT
  USING (
    match_id IN (
      SELECT id FROM matches
      WHERE profile1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
      OR profile2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their matches"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    AND match_id IN (
      SELECT id FROM matches
      WHERE profile1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
      OR profile2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  USING (
    match_id IN (
      SELECT id FROM matches
      WHERE profile1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
      OR profile2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );
