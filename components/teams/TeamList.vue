<template>
  <div class="space-y-4">
    <div v-for="team in teams" :key="team.id" 
      class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold">{{ team.name }}</h3>
          <p v-if="team.description" class="text-sm text-gray-600">
            {{ team.description }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ team.members.length }} members
          </p>
        </div>
        <Button 
          variant="outline"
          @click="$emit('select', team)"
        >
          Manage Team
        </Button>
      </div>
    </div>

    <div v-if="teams.length === 0" class="text-center py-8 text-gray-500">
      No teams created yet
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Team } from '~/types/team'
import Button from '~/components/ui/Button.vue'

defineProps<{
  teams: Team[]
}>()

defineEmits<{
  select: [team: Team]
}>()
</script>