// server/middleware/proxy.ts
import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
    // Only handle /api routes
    if (!event.path.startsWith('/api')) {
        return
    }

    const config = useRuntimeConfig()

    console.log('Proxy Middleware Called:', {
        path: event.path,
        method: event.method
    })

    // Remove /api prefix and construct target URL properly
    const targetPath = event.path.replace(/^\/api/, `/${config.public.apiVersion}`)
    const targetUrl = `${config.public.apiBase}${targetPath}`

    console.log('Proxying to:', targetUrl)

    try {
        // Add custom headers
        const headers = {
            ...Object.fromEntries(event.headers.entries()),
            'x-custom-header': 'custom-value',
            'x-proxy-timestamp': new Date().toISOString(),
            'x-request-id': crypto.randomUUID(),
        }

        // Remove problematic headers
        delete headers.host
        delete headers.connection
        delete headers['content-length']

        return await proxyRequest(event, targetUrl, {
            headers,
            fetchOptions: {
                timeout: 5000
            }
        })
    } catch (error) {
        console.error('Proxy Error:', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Bad Gateway',
            message: 'Failed to proxy request to backend'
        })
    }
})
