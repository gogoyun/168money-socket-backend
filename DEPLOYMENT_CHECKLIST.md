# 部署檢查清單

## 部署前檢查 ✅

### 1. 檔案準備
- [ ] `render.yaml` 已創建
- [ ] `Dockerfile` 已創建
- [ ] `.dockerignore` 已創建
- [ ] `package.json` 腳本已更新（移除 Windows 特定的 set 命令）
- [ ] 所有檔案已提交到 Git

### 2. 專案結構
- [ ] `socket-backend/` 資料夾包含所有必要檔案
- [ ] 沒有 `node_modules/` 資料夾（會被 .dockerignore 排除）
- [ ] 主要檔案：`socket-server.js`, `socket-config.js`

### 3. 依賴檢查
- [ ] `package.json` 中的依賴版本正確
- [ ] Node.js 版本 >= 20.0.0
- [ ] 主要依賴：express, socket.io, cors

## 部署步驟 ✅

### 1. Render 設定
- [ ] 登入 Render Dashboard
- [ ] 選擇 Blueprint 部署方式
- [ ] 連接 GitHub 儲存庫
- [ ] 選擇 `socket-backend` 資料夾
- [ ] 確認 Hobby 方案
- [ ] 點擊 Apply 開始部署

### 2. 環境變數
- [ ] `NODE_ENV`: production
- [ ] `SOCKET_PORT`: 10000
- [ ] `SOCKET_HOST`: 0.0.0.0

### 3. 部署監控
- [ ] 監控構建過程
- [ ] 檢查部署日誌
- [ ] 確認健康檢查通過
- [ ] 記錄 Render 網址

## 部署後檢查 ✅

### 1. 服務狀態
- [ ] 服務狀態顯示為 "Live"
- [ ] 健康檢查端點 `/health` 可訪問
- [ ] 主頁端點 `/` 可訪問

### 2. 前端連線測試
- [ ] Vue 專案已更新 socket.js 中的 URL
- [ ] 前端能成功連接到 Render 上的 socket-backend
- [ ] WebSocket 連線正常
- [ ] 聊天功能正常運作

### 3. 功能測試
- [ ] 用戶連線/斷線事件正常
- [ ] 聊天訊息能正常發送和接收
- [ ] 訂單狀態更新正常
- [ ] 錯誤處理正常

## 故障排除 ✅

### 常見問題
- [ ] 部署失敗：檢查依賴和腳本
- [ ] 連線失敗：檢查 CORS 和環境變數
- [ ] 服務休眠：等待首次連線喚醒
- [ ] 健康檢查失敗：檢查伺服器配置

### 日誌檢查
- [ ] 查看 Render 服務日誌
- [ ] 檢查前端瀏覽器控制台
- [ ] 確認網路請求狀態

## 完成確認 ✅

- [ ] socket-backend 成功部署到 Render
- [ ] 前端能正常連線
- [ ] 所有功能正常運作
- [ ] 部署文件已更新
- [ ] 團隊成員已通知新的連線設定
