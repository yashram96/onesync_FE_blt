import { getSVGAsURL } from '~/utils/logo'

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Create favicon link element
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link')
    link.setAttribute('rel', 'icon')
    link.setAttribute('type', 'image/svg+xml')
    link.setAttribute('href', getSVGAsURL())
    document.head.appendChild(link)
  }
})