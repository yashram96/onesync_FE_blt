export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member'
  status: 'active' | 'invited'
  joinedAt: string
}

export interface Team {
  id: string
  name: string
  description?: string
  members: TeamMember[]
  createdAt: string
  updatedAt: string
}

export interface TeamInvite {
  id: string
  teamId: string
  email: string
  role: TeamMember['role']
  expiresAt: string
  status: 'pending' | 'accepted' | 'expired'
}