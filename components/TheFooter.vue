<template>
  <footer class="bg-gray-50 pt-20 pb-10">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <OneSyncLogo class="h-8 w-auto text-primary mb-4" />
          <p class="text-gray-600">Unifying your cloud storage experience.</p>
        </div>
        <div v-for="(column, index) in footerColumns" :key="index">
          <h4 class="font-semibold mb-4">{{ column.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in column.links" :key="link.text">
              <a :href="link.url" class="text-gray-600 hover:text-primary transition-colors">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-600 text-sm">© {{ new Date().getFullYear() }} OneSync. All rights reserved.</p>
        <SocialIcons />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'
import SocialIcons from '~/components/icons/SocialIcons.vue'
import { footerColumns } from '~/constants/footer'
</script>