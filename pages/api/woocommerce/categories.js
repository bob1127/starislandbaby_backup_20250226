// pages/api/woocommerce/categories.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { NEXT_PUBLIC_WP_API_BASE_URL, NEXT_PUBLIC_WC_CONSUMER_KEY, NEXT_PUBLIC_WC_CONSUMER_SECRET } = process.env;

      // 打印環境變數，確保它們正確設置
      console.log('Consumer Key:', NEXT_PUBLIC_WC_CONSUMER_KEY);
      console.log('Consumer Secret:', NEXT_PUBLIC_WC_CONSUMER_SECRET);

      // 構建 API URL
      const url = `${NEXT_PUBLIC_WP_API_BASE_URL}wp-json/wc/v3/products/categories?consumer_key=${NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${NEXT_PUBLIC_WC_CONSUMER_SECRET}`;
      console.log('Request URL:', url);

      // 發送請求
      const response = await axios.get(url);
      console.log('Response:', response.data);  // 打印響應數據

      // 返回 WooCommerce 獲取的分類數據
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // 返回錯誤信息
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  } else {
    // 如果不是 GET 請求，返回方法不被允許
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
