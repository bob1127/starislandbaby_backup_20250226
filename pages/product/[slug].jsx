import React from "react";
import Layout from "../Layout";
// 定義 API 基礎 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WP_API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_BASE_URL;

export async function getStaticPaths() {
  // 從 WooCommerce API 中獲取所有產品的 `slug`
  const response = await fetch(`${API_BASE_URL}/api/products`);
  const products = await response.json();

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: "blocking", // ISR：如果路徑不存在，則進行服務端渲染
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    // 獲取產品數據
    const response = await fetch(`${API_BASE_URL}/api/products?slug=${slug}`);
    const data = await response.json();
    const matchedProduct = data.find((product) => product.slug === slug);

    if (!matchedProduct) {
      return {
        notFound: true, // 如果產品未找到，返回 404 頁面
      };
    }

    return {
      props: {
        product: matchedProduct,
      },
      revalidate: 2, // ISR：每 60 秒重新生成靜態頁面
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      notFound: true,
    };
  }
}

const ProductPage = ({ product }) => {
  const handleAddToCart = (productId, quantity) => {
    const addToCartUrl = `${WP_API_BASE_URL}/cart/?add-to-cart=${productId}&quantity=${quantity}`;
    window.location.href = addToCartUrl;
  };

  if (!product) return <div>Product not found.</div>;

  return (
    <Layout>
      <div className="h-[150vh]">
        <div className="w-[80%] mt-[100px] mx-auto flex justify-center items-center">
          <div className="Image-wrap w-1/2 flex justify-center items-center">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0].src}
                alt={product.name}
                className="w-full mt-4"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="Info-wrap pl-[80px] flex flex-col w-1/2 border border-black">
            <h1>{product.name}</h1>
            <br />
            <p>{product.description || "No description available."}</p>
            <p>Price: ${product.price}</p>

            <button
              onClick={() => handleAddToCart(product.id, 1)}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
