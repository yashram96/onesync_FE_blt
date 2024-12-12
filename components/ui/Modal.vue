<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click="$emit('update:modelValue', false)">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" aria-hidden="true" />
        
        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div 
            class="relative bg-white rounded-xl p-6 max-w-lg w-full shadow-xl"
            @click.stop
          >
            <!-- Close button -->
            <button 
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              @click="$emit('update:modelValue', false)"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
            
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>