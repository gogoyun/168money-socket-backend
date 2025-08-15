# 168money Socket Backend

這是168money客服系統的WebSocket後端服務，負責處理即時通訊、聊天訊息、訂單狀態更新等功能。

## 功能特色

- 🔌 WebSocket 即時通訊
- 💬 聊天訊息處理
- 📦 訂單狀態更新
- 👥 用戶上線/下線管理
- 🔒 CORS 跨域支援
- 📊 伺服器狀態監控
- 🔄 自動重連機制

## 安裝與設定

### 1. 安裝依賴

```bash
cd socket-backend
npm install
```

### 2. 環境變數設定

可以設定以下環境變數（可選）：

```bash
export SOCKET_PORT=3001
export SOCKET_HOST=localhost
```

預設值：
- PORT: 3001
- HOST: localhost

### 3. 啟動服務

#### 開發模式（使用 nodemon）
```bash
npm run dev
```

#### 生產模式
```bash
npm start
```

#### 直接執行
```bash
node socket-server.js
```

## API 端點

### HTTP 端點

- `GET /` - 伺服器狀態
- `GET /health` - 健康檢查

### WebSocket 事件

#### 客戶端 → 伺服器

- `user_info` - 發送用戶資訊
- `chat_message` - 發送聊天訊息
- `order_status_update` - 更新訂單狀態
- `custom_event` - 自定義事件

#### 伺服器 → 客戶端

- `welcome` - 歡迎訊息
- `user_online` - 用戶上線通知
- `user_offline` - 用戶下線通知
- `new_message` - 新聊天訊息
- `order_update` - 訂單更新通知
- `server_stats` - 伺服器狀態

## 支援的客戶端

- Vue.js 前端應用
- 支援的端口：5173, 3000, 8080
- 傳輸協議：WebSocket, Polling

## 開發說明

### 專案結構

```
socket-backend/
├── socket-server.js      # 主要的Socket.IO伺服器
├── socket-config.js      # Socket配置檔案
├── socketService.js      # Socket服務類別
├── package.json          # 專案依賴
└── README.md            # 說明文件
```

### 主要檔案說明

#### socket-server.js
- Express + Socket.IO 伺服器
- 處理WebSocket連接和事件
- 提供HTTP API端點

#### socket-config.js
- 環境配置管理
- 支援開發、測試、生產環境
- CORS和連接設定

#### socketService.js
- Socket服務類別
- 事件處理和重連邏輯
- 與Vue前端的整合

## 與Vue前端的整合

Socket後端服務與Vue前端通過以下方式整合：

1. **連接管理**：使用 `useSocket` composable
2. **事件處理**：透過 `socketService` 類別
3. **狀態同步**：即時更新聊天和訂單狀態

## 監控與除錯

### 伺服器狀態
- 每30秒輸出連接數和運行時間
- 支援優雅關閉（SIGINT, SIGTERM）

### 日誌輸出
- 🟢 客戶端連接
- 🔴 客戶端斷線
- 💬 聊天訊息
- 📦 訂單更新
- ❌ 錯誤處理

## 部署注意事項

1. 確保防火牆開放對應端口
2. 設定適當的CORS策略
3. 配置環境變數
4. 使用PM2或類似工具管理程序

## 故障排除

### 常見問題

1. **連接失敗**
   - 檢查端口是否被佔用
   - 確認CORS設定
   - 檢查防火牆設定

2. **訊息無法發送**
   - 確認WebSocket連接狀態
   - 檢查事件名稱是否正確
   - 查看瀏覽器控制台錯誤

3. **效能問題**
   - 監控連接數
   - 檢查記憶體使用
   - 優化事件處理邏輯

## 授權

UNLICENSED - 168money 內部使用
