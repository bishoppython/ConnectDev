-- Function to create a match when there's mutual swipe
CREATE OR REPLACE FUNCTION check_and_create_match()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if the new swipe is a right swipe
  IF NEW.direction = 'right' OR NEW.direction = 'super' THEN
    -- Check if there's a mutual right swipe
    IF EXISTS (
      SELECT 1 FROM swipes
      WHERE swiper_id = NEW.swiped_id
      AND swiped_id = NEW.swiper_id
      AND (direction = 'right' OR direction = 'super')
    ) THEN
      -- Create a match (ensure profile1_id < profile2_id for uniqueness)
      INSERT INTO matches (profile1_id, profile2_id, created_at)
      VALUES (
        LEAST(NEW.swiper_id, NEW.swiped_id),
        GREATEST(NEW.swiper_id, NEW.swiped_id),
        NOW()
      )
      ON CONFLICT (profile1_id, profile2_id) DO NOTHING;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create matches
DROP TRIGGER IF EXISTS trigger_check_match ON swipes;
CREATE TRIGGER trigger_check_match
  AFTER INSERT ON swipes
  FOR EACH ROW
  EXECUTE FUNCTION check_and_create_match();

-- Function to update last_message_at in matches
CREATE OR REPLACE FUNCTION update_match_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE matches
  SET last_message_at = NEW.created_at
  WHERE id = NEW.match_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last message timestamp
DROP TRIGGER IF EXISTS trigger_update_last_message ON messages;
CREATE TRIGGER trigger_update_last_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_match_last_message();
