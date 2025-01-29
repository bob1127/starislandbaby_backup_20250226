import { Buffer } from "buffer";
import axios from "axios";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { productId, quantity } = req.body;

  try {
    // 基於商品 ID 和數量創建 URL
    const addToCartUrl = `http://starislandbaby.com/test/cart/?add-to-cart=${productId}&quantity=${quantity}`;

    // 將用戶重定向到購物車頁面
    res.redirect(addToCartUrl);
  } catch (error) {
    console.error("Error redirecting to cart:", error.message);
    res.status(500).json({ message: "Error redirecting to cart" });
  }
}
