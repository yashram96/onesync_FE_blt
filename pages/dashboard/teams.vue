<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Team Management</h1>
      <Button 
        v-if="!currentTeam"
        variant="primary"
        @click="showCreateTeamModal = true"
      >
        Create Team
      </Button>
      <Button 
        v-else
        variant="outline"
        @click="currentTeam = null"
      >
        Back to Teams
      </Button>
    </div>

    <!-- Team List or Current Team View -->
    <div v-if="!currentTeam">
      <TeamList 
        :teams="teams"
        @select="selectTeam"
      />
    </div>
    <div v-else>
      <TeamMembers 
        :team="currentTeam"
        :current-user-id="currentUserId"
        :is-loading="isLoading"
        @update-role="handleUpdateRole"
        @remove-member="handleRemoveMember"
        @invite-member="handleInviteMember"
      />
    </div>

    <!-- Create Team Modal -->
    <Modal v-model="showCreateTeamModal">
      <div>
        <h3 class="text-lg font-semibold mb-4">Create New Team</h3>
        <form @submit.prevent="handleCreateTeam" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Team Name
            </label>
            <input
              v-model="newTeamName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="My Team"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              v-model="newTeamDescription"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Brief description of your team"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <Button 
              type="button"
              variant="outline"
              @click="showCreateTeamModal = false"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary"
              :disabled="isLoading"
            >
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Team, TeamMember } from '~/types/team'
import { useTeams } from '~/composables/useTeams'
import TeamList from '~/components/teams/TeamList.vue'
import TeamMembers from '~/components/teams/TeamMembers.vue'
import Button from '~/components/ui/Button.vue'
import Modal from '~/components/ui/Modal.vue'

definePageMeta({
  layout: 'dashboard'
})

const {
  teams,
  currentTeam: activeTeam,
  isLoading,
  createTeam,
  inviteMember,
  removeMember,
  updateMemberRole,
  setCurrentTeam
} = useTeams()

const currentTeam = ref<Team | null>(null)
const showCreateTeamModal = ref(false)
const newTeamName = ref('')
const newTeamDescription = ref('')

// Mock current user ID - replace with actual auth user ID
const currentUserId = 'current-user'

const selectTeam = (team: Team) => {
  currentTeam.value = team
  setCurrentTeam(team.id) // Set the current team in the composable
}

const handleCreateTeam = async () => {
  try {
    const team = await createTeam(newTeamName.value, newTeamDescription.value)
    showCreateTeamModal.value = false
    newTeamName.value = ''
    newTeamDescription.value = ''
    selectTeam(team) // Use selectTeam to ensure proper team selection
  } catch (error) {
    console.error('Failed to create team:', error)
  }
}

const handleUpdateRole = async (memberId: string, role: TeamMember['role']) => {
  try {
    await updateMemberRole(memberId, role)
    // Update the current team's member role locally
    if (currentTeam.value) {
      const member = currentTeam.value.members.find(m => m.id === memberId)
      if (member) {
        member.role = role
      }
    }
  } catch (error) {
    console.error('Failed to update role:', error)
  }
}

const handleRemoveMember = async (member: TeamMember) => {
  try {
    await removeMember(member.id)
    // Update the current team's members locally
    if (currentTeam.value) {
      currentTeam.value.members = currentTeam.value.members.filter(m => m.id !== member.id)
    }
  } catch (error) {
    console.error('Failed to remove member:', error)
  }
}

const handleInviteMember = async (email: string, role: TeamMember['role']) => {
  try {
    await inviteMember(email, role)
    // Update the current team with the new member locally
    if (currentTeam.value) {
      const newMember: TeamMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        status: 'invited',
        joinedAt: new Date().toISOString()
      }
      currentTeam.value.members.push(newMember)
    }
  } catch (error) {
    console.error('Failed to invite member:', error)
  }
}

// Watch for changes in the activeTeam from the composable
watch(activeTeam, (newTeam) => {
  if (newTeam) {
    currentTeam.value = newTeam
  }
})
</script>