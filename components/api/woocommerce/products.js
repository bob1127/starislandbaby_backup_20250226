import fetch from "node-fetch";

export default async function handler(req, res) {
  const { slug } = req.query; // 從前端獲取 slug

  try {
    // 構造 Basic Auth 授權標頭
    const authHeader =
      "Basic " +
      Buffer.from(
        `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`
      ).toString("base64");

    // 1. 查詢所有分類資料
    const categoryResponse = await fetch(
      "https://starislandbaby.com/wp-json/wc/v3/products/categories",
      {
        method: "GET",
        headers: {
          Authorization: authHeader, // 使用授權標頭
        },
      }
    );

    if (!categoryResponse.ok) {
      return res
        .status(categoryResponse.status)
        .json({ message: "Error fetching categories" });
    }

    const categories = await categoryResponse.json();

    // 2. 查找對應 slug 的分類 ID
    const categoryData = categories.find(
      (cat) => cat.slug === slug // 根據 slug 查找分類資料
    );

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" }); // 如果找不到分類，返回 404
    }

    // 3. 根據分類 ID 查詢該分類下的產品
    const productResponse = await fetch(
      `https://starislandbaby.com/wp-json/wc/v3/products?category=${categoryData.id}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader, // 使用授權標頭
        },
      }
    );

    if (!productResponse.ok) {
      return res
        .status(productResponse.status)
        .json({ message: "Error fetching products" });
    }

    const products = await productResponse.json();

    res.status(200).json(products); // 返回查詢到的產品資料
  } catch (error) {
    console.error("Error fetching products:", error.message); // 錯誤處理
    res.status(500).json({ message: "Error fetching products" });
  }
}
