# Render 部署說明

## 部署步驟

### 1. 準備工作
確保您的 socket-backend 資料夾包含以下檔案：
- `render.yaml` - Render Blueprint 配置
- `Dockerfile` - Docker 配置
- `package.json` - 專案依賴
- `socket-server.js` - 主要伺服器檔案

### 2. 部署到 Render

#### 方法一：使用 Blueprint（推薦）
1. 登入 [Render Dashboard](https://dashboard.render.com/)
2. 點擊 "New +" 按鈕
3. 選擇 "Blueprint"
4. 連接您的 GitHub 儲存庫
5. 選擇包含 socket-backend 的儲存庫
6. 選擇 `socket-backend` 資料夾
7. 點擊 "Apply" 開始部署

#### 方法二：手動部署
1. 在 Render Dashboard 點擊 "New +"
2. 選擇 "Web Service"
3. 連接 GitHub 儲存庫
4. 設定以下參數：
   - **Name**: 168money-socket-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Hobby

### 3. 環境變數設定
在 Render Dashboard 中設定以下環境變數：
- `NODE_ENV`: production
- `SOCKET_PORT`: 10000
- `SOCKET_HOST`: 0.0.0.0

### 4. 部署完成後
部署成功後，您會得到一個 Render 網址，例如：
`https://168money-socket-backend.onrender.com`

## 前端連線設定

部署完成後，需要更新 Vue 專案中的 WebSocket 連線設定：

### 更新 socket.js
```javascript
// 將原本的 localhost:3001 改為 Render 網址
const SOCKET_URL = 'https://168money-socket-backend.onrender.com';
```

### 更新 CORS 設定
在 `socket-server.js` 中，確保 CORS 包含您的 Render 網址：
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://ariesweng.github.io',
    'https://168money-socket-backend.onrender.com'
  ],
  credentials: true
}));
```

## 注意事項

1. **Hobby 方案限制**：
   - 每月 750 小時免費
   - 15 分鐘無活動後會休眠
   - 首次連線可能需要等待喚醒

2. **WebSocket 連線**：
   - Render 使用 HTTPS，WebSocket 會自動升級到 WSS
   - 確保前端使用 WSS 協議連線

3. **健康檢查**：
   - 健康檢查端點：`/health`
   - 每 30 秒檢查一次伺服器狀態

## 故障排除

### 常見問題
1. **部署失敗**：檢查 `package.json` 和依賴是否正確
2. **連線失敗**：確認環境變數和 CORS 設定
3. **服務休眠**：首次連線可能需要等待幾秒鐘

### 日誌查看
在 Render Dashboard 中查看服務日誌，了解運行狀態和錯誤訊息。
