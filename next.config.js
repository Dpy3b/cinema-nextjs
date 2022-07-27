/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // здесь я выключаю стриктмод для предотвращения конфликтов библиотек с правилами некста
  poweredByHeader: false, // пометка о том, что сайт сделан на некстжс (выключаем на случай безопасности)
  optimizeFonts: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  // ниже перезапись путей для открытия с бэкенда
  async rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4200/api/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:4200/uploads/:path*'
      }
    ]
  }
};

module.exports = nextConfig
