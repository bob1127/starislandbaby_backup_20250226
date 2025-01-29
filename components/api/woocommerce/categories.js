import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://starislandbaby.com/wp-json/wc/v3/products/categories",
      {
        params: {
          consumer_key: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
          consumer_secret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
        },
      }
    );
    res.status(200).json(response.data); // 返回 WooCommerce 的分類數據
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Error fetching categories" });
  }
}
