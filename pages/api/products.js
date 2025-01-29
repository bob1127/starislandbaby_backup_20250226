// pages/api/products.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { NEXT_PUBLIC_WP_API_BASE_URL, NEXT_PUBLIC_WC_CONSUMER_KEY, NEXT_PUBLIC_WC_CONSUMER_SECRET } = process.env;

    // 确保环境变量存在
    if (!NEXT_PUBLIC_WP_API_BASE_URL || !NEXT_PUBLIC_WC_CONSUMER_KEY || !NEXT_PUBLIC_WC_CONSUMER_SECRET) {
      console.error('Missing required environment variables');
      return res.status(500).json({ error: 'Environment variables are not properly configured' });
    }

    // 获取当前时间戳，避免缓存
    const timestamp = new Date().getTime();

    // 构建 API URL，设置 per_page 为 100，获取最多 100 个产品
    const url = `${NEXT_PUBLIC_WP_API_BASE_URL}/wp-json/wc/v3/products?consumer_key=${NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${NEXT_PUBLIC_WC_CONSUMER_SECRET}&timestamp=${timestamp}&per_page=100`;

    // 打印请求的 URL，确保它正确
    console.log('Request URL:', url);

    // 使用 axios 发送请求
    const response = await axios.get(url);

    // 打印响应数据
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    let products = response.data;

    // 如果产品数据为空，打印一条消息
    if (products.length === 0) {
      console.log('No products found.');
    }

    // 解码所有产品的分类 slug
    products = products.map((product) => {
      console.log('Before decoding categories for product:', product.name);
      console.log('Categories before decode:', product.categories);

      product.categories = product.categories.map((category) => {
        return {
          ...category,
          slug: decodeURIComponent(category.slug), // 解码分类 slug
        };
      });

      console.log('Categories after decode:', product.categories);
      return product;
    });

    // 返回产品数据
    return res.status(200).json(products);
  } catch (error) {
    // 捕获错误并返回错误信息
    console.error('Error fetching products:', error.message);
    return res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
  }
}
