#!/bin/bash

echo "🚀 開始部署 168money-socket-backend 到 Render..."

# 檢查必要檔案
echo "📋 檢查必要檔案..."
if [ ! -f "render.yaml" ]; then
    echo "❌ 缺少 render.yaml 檔案"
    exit 1
fi

if [ ! -f "Dockerfile" ]; then
    echo "❌ 缺少 Dockerfile 檔案"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ 缺少 package.json 檔案"
    exit 1
fi

if [ ! -f "socket-server.js" ]; then
    echo "❌ 缺少 socket-server.js 檔案"
    exit 1
fi

echo "✅ 所有必要檔案檢查完成"

# 檢查 Git 狀態
echo "🔍 檢查 Git 狀態..."
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 工作目錄乾淨"
else
    echo "⚠️  工作目錄有未提交的變更"
    echo "請先提交或暫存變更"
    exit 1
fi

# 推送到遠端儲存庫
echo "📤 推送到遠端儲存庫..."
git push origin main

echo ""
echo "🎉 部署準備完成！"
echo ""
echo "📝 下一步："
echo "1. 登入 [Render Dashboard](https://dashboard.render.com/)"
echo "2. 點擊 'New +' 選擇 'Blueprint'"
echo "3. 連接您的 GitHub 儲存庫"
echo "4. 選擇 socket-backend 資料夾"
echo "5. 點擊 'Apply' 開始部署"
echo ""
echo "🔗 部署完成後，您的服務將在："
echo "   https://168money-socket-backend.onrender.com"
echo ""
echo "📱 記得更新 Vue 專案中的 socket 連線設定！"
