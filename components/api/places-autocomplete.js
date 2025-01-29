// /pages/api/places-autocomplete.js
export default async function handler(req, res) {
  const query = req.query.query; // 获取前端传来的查询参数
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // 从环境变量中获取 Google Maps API 密钥

  // 检查是否有传入 query 参数
  if (!query) {
    return res.status(400).json({ error: "查询参数缺失" });
  }

  try {
    // 发起请求到 Google Places API，获取自动补全的地点信息
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`
    );

    // 检查 Google API 是否成功返回
    if (!response.ok) {
      throw new Error(`Google Places API 请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 返回 Google Places API 返回的数据
    res.status(200).json(data);
  } catch (error) {
    // 错误处理
    console.error("API 请求出错:", error);
    res.status(500).json({ error: "无法处理请求" });
  }
}
