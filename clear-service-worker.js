// Service Worker Cache Clearing Script
// Run this in your browser's developer console (F12)

console.log('🔄 Clearing Service Worker Cache...');

// Clear all caches
caches.keys().then(function(cacheNames) {
  return Promise.all(
    cacheNames.map(function(cacheName) {
      console.log('🗑️ Deleting cache:', cacheName);
      return caches.delete(cacheName);
    })
  );
}).then(function() {
  console.log('✅ All caches cleared!');
  
  // Unregister service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
        console.log('🔄 Service worker unregistered');
      }
    });
  }
  
  // Reload the page
  console.log('🔄 Reloading page in 2 seconds...');
  setTimeout(() => {
    window.location.reload(true);
  }, 2000);
});

// Alternative: Force reload without cache
// window.location.reload(true);

// Alternative: Clear browser cache programmatically (may not work in all browsers)
// if ('caches' in window) {
//   caches.keys().then(names => {
//     names.forEach(name => {
//       caches.delete(name);
//     });
//   });
// } 