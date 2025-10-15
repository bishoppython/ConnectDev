export type ConnectionType = "friendship" | "networking" | "dating" | "business" | "creative" | "sports" | "learning"

export interface Profile {
  id: string
  user_id: string
  name: string
  age?: number
  bio?: string
  location?: string
  photos: string[]
  interests: string[]
  connection_types: ConnectionType[]
  occupation?: string
  company?: string
  skills: string[]
  looking_for: string[]
  created_at: string
  updated_at: string
}

export interface Swipe {
  id: string
  swiper_id: string
  swiped_id: string
  direction: "left" | "right" | "super"
  created_at: string
}

export interface Match {
  id: string
  profile1_id: string
  profile2_id: string
  created_at: string
  last_message_at?: string
  profile?: Profile
}

export interface Message {
  id: string
  match_id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
}
