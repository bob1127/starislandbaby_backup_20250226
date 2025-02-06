import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const SideBar = dynamic(() => import("../../components/NavbarTestSideBar"), {
  ssr: false, // 禁用服务器端渲染
});
import Layout from "../Layout";
import { useRouter } from "next/router"; // 获取 slug

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

// 获取所有产品数据
async function fetchAllProducts() {
  const productUrl = `${NEXT_PUBLIC_API_BASE_URL}api/products?consumer_key=ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b&consumer_secret=cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f`;

  console.log("Fetching all products from:", productUrl);

  const response = await fetch(productUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch all products");
  }

  const products = await response.json();
  console.log("Fetched all products:", products);

  return products;
}

// 过滤符合 slug 的产品
async function fetchProductsBySlug(slug) {
  console.log("📌 Fetching products for category slug:", slug);

  const allProducts = await fetchAllProducts();
  console.log("🛒 获取到的所有产品:", allProducts);

  // 过滤符合 slug 的产品（匹配 categories 中的 slug）
  const filteredProducts = allProducts.filter((product) =>
    product.categories.some((category) => category.slug === slug)
  );

  console.log(
    `🔍 过滤后符合 category slug "${slug}" 的产品:`,
    filteredProducts
  );
  return filteredProducts;
}

export async function getStaticPaths() {
  const allProducts = await fetchAllProducts();

  // 获取所有唯一的产品 slug 并生成路径
  const paths = allProducts.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: "blocking", // 确保新增的 slug 页面可以动态生成
  };
}

export async function getStaticProps({ params }) {
  console.log("getStaticProps is called with params:", params);

  let { slug } = params;
  console.log("Received slug:", slug);

  try {
    // 获取并过滤符合 slug 的产品
    const products = await fetchProductsBySlug(slug);

    return {
      props: {
        slug,
        products,
      },
      revalidate: 10, // 每 10 秒重新生成页面
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
}

const CategoryPage = ({ slug, products }) => {
  console.log("Rendering products for slug:", slug);

  return (
    <Layout>
      <div className="my-[200px]  flex flex-col">
        <div className="top-navgation pl-10">
          <a href="/">Home</a> ← <span>{slug ? slug : "All Products"}</span>
        </div>
        <div className="bottom-content flex">
          {/* 左側側邊欄保留 */}
          <div className="left w-[40%] 2xl:w-[25%] p-10 side_bar">
            <div className="wrap rounded-xl bg-[#91AD9E] px-5 flex flex-col w-full h-full">
              <div className="title flex justify-center py-10 w-full border-b-1 font-bold">
                <b>尋找您需要的商品</b>
              </div>
              <div className="menu">
                <SideBar />
              </div>
            </div>
          </div>

          {/* 右側產品區域，只有在有產品時才顯示 */}
          {products && products.length > 0 && (
            <div className="right w-[60%] 2xl:w-[75%] 2xl:pr-[200px] pt-5 products_menu">
              <div className="flex flex-wrap" data-aos="fade-up">
                {products.map((product) => {
                  const productImage =
                    product.images?.[0]?.src || "/default-image.jpg";
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="mt-2"
                    >
                      <div className="card m-3 overflow-hidden w-[220px] bg-[#E4E6E1] border border-gray-100 p-4">
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-48 object-cover mb-4"
                        />
                        <span className="font-bold">{product.name}</span>
                        <div>
                          <span className="text-gray-700 font-bold">
                            NT.{product.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
