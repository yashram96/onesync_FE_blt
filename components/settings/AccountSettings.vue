<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Account Settings</h3>
    
    <!-- Profile Information -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">Profile Information</h4>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              v-model="profile.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="profile.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              disabled
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </form>
    </div>

    <!-- Password -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">Change Password</h4>
      <form @submit.prevent="updatePassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            v-model="passwordForm.current"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            v-model="passwordForm.new"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            v-model="passwordForm.confirm"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <Button type="submit" variant="primary">
          Update Password
        </Button>
      </form>
    </div>

    <!-- Delete Account -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-red-600 mb-4">Danger Zone</h4>
      <p class="text-sm text-gray-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button 
        variant="outline" 
        class="!text-red-600 !border-red-600 hover:!bg-red-50"
        @click="confirmDelete"
      >
        Delete Account
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/ui/Button.vue'

const profile = ref({
  name: 'John Doe',
  email: 'john@example.com'
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const updateProfile = async () => {
  // Implement profile update logic
  console.log('Updating profile:', profile.value)
}

const updatePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('New passwords do not match')
    return
  }
  // Implement password update logic
  console.log('Updating password')
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    // Implement account deletion logic
    console.log('Deleting account')
  }
}
</script>