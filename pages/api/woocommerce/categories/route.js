import axios from "axios";

// 允許的來源和方法
const allowedOrigins = ['https://www.starislandbaby.com']; // 可根據需要修改

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" }); // 只允許 GET 方法
  }

  // 設置 CORS 標頭
  const origin = req.headers.origin || '*';  // 默認允許所有來源
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  try {
    const {
      NEXT_PUBLIC_WP_API_BASE_URL,
      NEXT_PUBLIC_WC_CONSUMER_KEY,
      NEXT_PUBLIC_WC_CONSUMER_SECRET,
    } = process.env;

    if (!NEXT_PUBLIC_WP_API_BASE_URL || !NEXT_PUBLIC_WC_CONSUMER_KEY || !NEXT_PUBLIC_WC_CONSUMER_SECRET) {
      throw new Error("Missing required environment variables");
    }

    // 構建 API 請求 URL
    const url = `${NEXT_PUBLIC_WP_API_BASE_URL}wp-json/wc/v3/products/categories?consumer_key=${NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${NEXT_PUBLIC_WC_CONSUMER_SECRET}`;

    // 打印 API 請求的 URL 來確保它正確
    console.log("Request URL:", url);

    // 發送請求到 WooCommerce
    const response = await axios.get(url);

    // 返回分類數據
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error.message);

    // 打印詳細的錯誤堆疊訊息
    console.error("Error stack:", error.stack);

    // 處理錯誤，返回詳細的錯誤訊息
    if (error.response) {
      // 如果 API 返回錯誤，打印響應內容
      console.error("Error response data:", error.response.data);
      res.status(error.response.status).json({
        error: "Failed to fetch categories",
        details: error.response.data,
      });
    } else {
      // 如果錯誤是發生在請求過程中
      res.status(500).json({
        error: "Failed to fetch categories",
        details: error.message,
        stack: error.stack, // 返回錯誤堆疊以便於排查
      });
    }
  }
}
