const express = require('express');
const { Pool } = require('pg');
const app = express();

// 1. 连接数据库 (使用你的环境变量)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 2. 中间件配置
app.use(express.json()); // 解析JSON请求体
app.use(express.static('public')); // 【关键】提供public目录下的静态文件

// 3. API路由示例
// 创建抽签
app.post('/api/create', async (req, res) => {
  try {
    const { name, creatorName, password, teamList, groupConfig } = req.body;
    // 这里应有你的业务逻辑，例如生成ID、存入数据库等
    // const result = await pool.query('INSERT INTO draws ...', [values]);
    res.json({ success: true, message: '抽签创建成功（示例）', drawId: 'TEST123' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: '创建失败' });
  }
});

// 获取抽签详情
app.get('/api/draw/:id', async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM draws WHERE id = $1', [req.params.id]);
    res.json({ success: true, draw: { id: req.params.id, name: '示例抽签' } });
  } catch (error) {
    res.status(500).json({ success: false, error: '查询失败' });
  }
});

// 4. 【重要】不需要 app.get('*') 通配符路由！
// 因为 `vercel.json` 已经将非 `/api` 的请求指向了 `public` 文件夹。
// 添加通配符路由反而会导致冲突或“Cannot GET /”错误。

// 5. 导出app供Vercel使用
module.exports = app;