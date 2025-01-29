import axios from 'axios';

export default async function handler(req, res) {
  try {
    // 從 .env.local 文件中讀取密鑰
    const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

    const response = await axios.get('https://starislandbaby.com/wp-json/wc/v3/products/categories', {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
}
