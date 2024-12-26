import { ref, computed } from 'vue'
import type { Team, TeamMember, TeamInvite } from '~/types/team'

export function useTeams() {
  const teams = ref<Team[]>([])
  const currentTeam = ref<Team | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const activeMembers = computed(() => 
    currentTeam.value?.members.filter(m => m.status === 'active') || []
  )

  const pendingInvites = computed(() => 
    currentTeam.value?.members.filter(m => m.status === 'invited') || []
  )

  const createTeam = async (name: string, description?: string): Promise<Team> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newTeam: Team = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        description,
        members: [{
          id: 'current-user',
          name: 'Current User',
          email: 'user@example.com',
          role: 'owner',
          status: 'active',
          joinedAt: new Date().toISOString()
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      teams.value.push(newTeam)
      return newTeam
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const inviteMember = async (email: string, role: TeamMember['role']): Promise<void> => {
    if (!currentTeam.value) throw new Error('No team selected')

    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newMember: TeamMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        status: 'invited',
        joinedAt: new Date().toISOString()
      }

      currentTeam.value.members.push(newMember)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const removeMember = async (memberId: string): Promise<void> => {
    if (!currentTeam.value) throw new Error('No team selected')

    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const index = currentTeam.value.members.findIndex(m => m.id === memberId)
      if (index !== -1) {
        currentTeam.value.members.splice(index, 1)
      }
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateMemberRole = async (memberId: string, newRole: TeamMember['role']): Promise<void> => {
    if (!currentTeam.value) throw new Error('No team selected')

    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const member = currentTeam.value.members.find(m => m.id === memberId)
      if (member) {
        member.role = newRole
      }
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const setCurrentTeam = (teamId: string) => {
    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      currentTeam.value = team
    }
  }

  return {
    teams,
    currentTeam,
    isLoading,
    error,
    activeMembers,
    pendingInvites,
    createTeam,
    inviteMember,
    removeMember,
    updateMemberRole,
    setCurrentTeam
  }
}