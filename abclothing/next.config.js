
  const withPWA= require('next-pwa')

  const PWA = withPWA({
    
    dest:"public",
    register:true,
    skipWaiting:true,
    disable: process.env.NODE_ENV === 'development',  
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  })
  
  module.exports = PWA
  