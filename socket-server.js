import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 取得 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 建立 Express 應用
const app = express();

// 設定 CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://ariesweng.github.io'],
  credentials: true
}));

// 建立 HTTP 伺服器
const httpServer = createServer(app);

// 建立 Socket.IO 伺服器
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'https://ariesweng.github.io'],
    credentials: true
  },
  transports: ['websocket']
});

// 基本路由
app.get('/', (req, res) => {
  res.json({
    message: 'Vue WebSocket 伺服器運行中',
    timestamp: new Date().toISOString(),
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Socket.IO 連接處理
io.on('connection', (socket) => {
  const clientInfo = {
    id: socket.id,
    host: `socket.handshake.query.host`,
    clientType: socket.handshake.query.clientType,
    environment: socket.handshake.query.environment,
    timestamp: new Date().toISOString()
  };

  console.log('🟢 新的客戶端連接:', clientInfo);

  // 發送歡迎訊息
  socket.emit('welcome', {
    message: '歡迎連接到 Vue WebSocket 伺服器！',
    clientId: socket.id,
    timestamp: new Date().toISOString()
  });

  // 廣播用戶上線
  socket.broadcast.emit('user_online', {
    ...clientInfo,
    event: 'user_online'
  });

  // 處理用戶資訊
  socket.on('user_info', (data) => {
    console.log('📝 收到用戶資訊:', data);
    
    // 廣播用戶資訊更新
    socket.broadcast.emit('user_info_update', {
      ...data,
      clientId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // 處理聊天訊息
  socket.on('chat_message', (data) => {
    console.log('💬 收到聊天訊息:', data);
    
    // 廣播訊息給所有客戶端
    io.emit('new_message', {
      ...data,
      clientId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // 處理訂單狀態更新
  socket.on('order_status_update', (data) => {
    console.log('📦 收到訂單狀態更新:', data);
    
    // 廣播訂單更新
    io.emit('order_update', {
      ...data,
      clientId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // 處理標記已讀事件
  socket.on('mark_as_read', (data) => {
    console.log('✅ 收到標記已讀事件:', data);
    
    // 這裡可以處理後端的已讀邏輯，例如更新資料庫
    // 目前只是記錄日誌，後續可以根據需求擴展
    
    // 可以選擇性地廣播給其他客戶端（如果需要同步狀態）
    // socket.broadcast.emit('customer_read', {
    //   customerId: data.customerId,
    //   clientId: socket.id,
    //   timestamp: new Date().toISOString()
    // });
  });

  // 處理自定義事件
  socket.on('custom_event', (data) => {
    console.log('🎯 收到自定義事件:', data);
    
    // 廣播自定義事件
    io.emit('custom_event_received', {
      ...data,
      clientId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // 處理斷線
  socket.on('disconnect', (reason) => {
    console.log('🔴 客戶端斷線:', {
      clientId: socket.id,
      reason,
      timestamp: new Date().toISOString()
    });

    // 廣播用戶下線
    socket.broadcast.emit('user_offline', {
      clientId: socket.id,
      reason,
      timestamp: new Date().toISOString()
    });
  });

  // 處理錯誤
  socket.on('error', (error) => {
    console.error('❌ Socket 錯誤:', error);
  });
});

// 伺服器狀態監控
setInterval(() => {
  const stats = {
    connections: io.engine.clientsCount,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
  
  console.log('📊 伺服器狀態:', stats);
  
  // 廣播伺服器狀態（可選）
  io.emit('server_stats', stats);
}, 30000); // 每30秒

// 優雅關閉處理
process.on('SIGINT', () => {
  console.log('\n🔄 正在關閉 WebSocket 伺服器...');
  
  io.close(() => {
    console.log('✅ WebSocket 伺服器已關閉');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🔄 正在關閉 WebSocket 伺服器...');
  
  io.close(() => {
    console.log('✅ WebSocket 伺服器已關閉');
    process.exit(0);
  });
});

// 啟動伺服器
const PORT = process.env.SOCKET_PORT || 3001;
const HOST = process.env.SOCKET_HOST || 'localhost';

httpServer.listen(PORT, HOST, () => {
  console.log('🚀 Vue WebSocket 伺服器已啟動');
  console.log(`📍 監聽地址: http://${HOST}:${PORT}`);
  console.log(`🔌 WebSocket: ws://${HOST}:${PORT}`);
  console.log(`⏰ 啟動時間: ${new Date().toLocaleString()}`);
  console.log('📱 支援的客戶端端口: 5173');
  console.log('🔒 CORS 已啟用');
  console.log('📡 傳輸協議: WebSocket');
  console.log('目前執行環境:', process.env.NODE_ENV);
  console.log('---');
});

// 導出 io 實例供其他模組使用
export { io };
