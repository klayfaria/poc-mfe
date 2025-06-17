// This file manually initializes Module Federation for App Router
console.log('🔄 Manual Module Federation Init Starting...')

// Function to create the container manually
function createModuleFederationContainer() {
  console.log('🏗️ Creating Module Federation Container...')

  // Import your components dynamically
  const moduleMap = {
    './Title': () => import('../components/title'),
  }

  const container = {
    init: (shareScope) => {
      console.log('🚀 Module Federation Container Initialized', shareScope)
      return Promise.resolve()
    },

    get: (module) => {
      console.log('📦 Getting module:', module)
      if (moduleMap[module]) {
        return moduleMap[module]().then(mod => {
          console.log('✅ Module loaded:', module, mod)
          return mod
        })
      }
      return Promise.reject(new Error(`Module not found: ${module}`))
    }
  }

  // Expose globally
  window.remoteApp = container
  console.log('🌍 remoteApp container exposed globally', window.remoteApp)

  return container
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createModuleFederationContainer)
  } else {
    createModuleFederationContainer()
  }
}

export { createModuleFederationContainer }
