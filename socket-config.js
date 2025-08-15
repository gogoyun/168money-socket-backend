// Socket 環境配置
export const socketConfig = {
  // 開發環境 - 本機
  development: {
    url: 'http://localhost:3001',
    transports: ['websocket'],
    timeout: 20000,
    forceNew: true,
    query: {
      clientType: 'vue',
      environment: 'development'
    }
  },
  
  // 測試環境
  staging: {
    url: 'https://staging-api.168money.com.tw',
    transports: ['websocket'],
    timeout: 20000,
    forceNew: true,
    query: {
      clientType: 'vue',
      environment: 'staging'
    }
  },
  
  // 生產環境
  production: {
    url: 'https://api.168money.com.tw',
    transports: ['websocket'],
    timeout: 20000,
    forceNew: true,
    query: {
      clientType: 'vue',
      environment: 'production'
    }
  }
}

// 根據當前環境獲取配置
export const getSocketConfig = () => {
  const env = import.meta.env.MODE || 'development'
  return socketConfig[env] || socketConfig.development
}

// 本機開發配置（可覆蓋環境配置）
export const localConfig = {
  url: 'http://localhost:3001',
  transports: ['websocket'],
  timeout: 20000,
  forceNew: true,
  query: {
    clientType: 'vue',
    environment: 'local',
    host: 'localhost'
  }
}

// 導出預設配置（優先使用本機配置）
export default localConfig
