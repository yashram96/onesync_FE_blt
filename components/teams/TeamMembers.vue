<template>
  <div class="space-y-6">
    <!-- Team Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">{{ team.name }}</h2>
        <p v-if="team.description" class="text-gray-600">
          {{ team.description }}
        </p>
      </div>
      <Button 
        variant="primary"
        @click="showInviteModal = true"
      >
        Invite Member
      </Button>
    </div>

    <!-- Members List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Member
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th class="px-6 py-3 text-right">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in team.members" :key="member.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-semibold">
                    {{ member.name[0].toUpperCase() }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="font-medium">{{ member.name }}</div>
                  <div class="text-sm text-gray-500">{{ member.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select 
                v-if="canManageRoles && member.id !== currentUserId"
                v-model="member.role"
                class="text-sm border-gray-300 rounded-md"
                @change="updateRole(member.id, $event)"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
              <span v-else class="capitalize">{{ member.role }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="[
                  member.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ member.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <Button 
                v-if="canManageMembers && member.id !== currentUserId"
                variant="outline"
                size="sm"
                @click="removeMember(member)"
              >
                Remove
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Invite Modal -->
    <Modal v-model="showInviteModal">
      <div>
        <h3 class="text-lg font-semibold mb-4">Invite Team Member</h3>
        <form @submit.prevent="handleInvite" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              v-model="inviteEmail"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="colleague@example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              v-model="inviteRole"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <Button 
              type="button"
              variant="outline"
              @click="showInviteModal = false"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary"
              :disabled="isLoading"
            >
              Send Invite
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Team, TeamMember } from '~/types/team'
import Button from '~/components/ui/Button.vue'
import Modal from '~/components/ui/Modal.vue'

const props = defineProps<{
  team: Team
  currentUserId: string
  isLoading?: boolean
}>()

const emit = defineEmits<{
  'update-role': [memberId: string, role: TeamMember['role']]
  'remove-member': [member: TeamMember]
  'invite-member': [email: string, role: TeamMember['role']]
}>()

const showInviteModal = ref(false)
const inviteEmail = ref('')
const inviteRole = ref<TeamMember['role']>('member')

const currentUser = computed(() => 
  props.team.members.find(m => m.id === props.currentUserId)
)

const canManageRoles = computed(() => 
  currentUser.value?.role === 'owner' || currentUser.value?.role === 'admin'
)

const canManageMembers = computed(() => 
  currentUser.value?.role === 'owner' || currentUser.value?.role === 'admin'
)

const updateRole = (memberId: string, event: Event) => {
  const role = (event.target as HTMLSelectElement).value as TeamMember['role']
  emit('update-role', memberId, role)
}

const removeMember = (member: TeamMember) => {
  if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
    emit('remove-member', member)
  }
}

const handleInvite = () => {
  emit('invite-member', inviteEmail.value, inviteRole.value)
  inviteEmail.value = ''
  inviteRole.value = 'member'
  showInviteModal.value = false
}
</script>