import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const SideBar = dynamic(() => import("../../components/NavbarTestSideBar"), {
  ssr: false, // 禁用服务器端渲染
});
import Layout from "../Layout";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

// 获取类别数据的函数
async function fetchCategories() {
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}api/woocommerce/categories`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

// 获取产品数据的函数
async function fetchProductsByCategory(slug) {
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}api/products/?category=${slug}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getStaticPaths() {
  const categories = await fetchCategories();

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: "blocking", // 使用 ISR
  };
}

export async function getStaticProps({ params }) {
  try {
    console.log("Fetching categories...");
    const categories = await fetchCategories();
    const categoryData = categories.find((cat) => cat.slug === params.slug);

    if (!categoryData) {
      return { notFound: true };
    }

    console.log("Fetching products for category:", categoryData.name);
    const products = await fetchProductsByCategory(params.slug);

    return {
      props: {
        category: categoryData,
        products,
      },
      revalidate: 2, // 生产环境下生效
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

const CategoryPage = ({ category, products }) => {
  const [priceSort, setPriceSort] = useState("default");
  const [dateSort, setDateSort] = useState("default");

  const sortProducts = (products) => {
    let sortedProducts = [...products];

    if (priceSort === "asc") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (priceSort === "desc") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (dateSort === "asc") {
      sortedProducts.sort(
        (a, b) => new Date(a.date_created) - new Date(b.date_created)
      );
    } else if (dateSort === "desc") {
      sortedProducts.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    }

    return sortedProducts;
  };

  const handlePriceSortChange = (e) => {
    setPriceSort(e.target.value);
  };

  const handleDateSortChange = (e) => {
    setDateSort(e.target.value);
  };

  const sortedProducts = sortProducts(products);

  if (!category) return <div>Category not found.</div>;

  return (
    <Layout>
      <div className="my-[200px] flex flex-col">
        <div className="top-navgation pl-10">
          <a href="/">Home</a> ← <span>{category.name}</span>
        </div>
        <div className="bottom-content flex">
          <div className="left w-[40%] p-10 side_bar">
            <div className="wrap rounded-xl bg-[#91AD9E] px-5 flex flex-col w-full h-full">
              <div className="title flex justify-center py-10 w-full border-b-1 font-bold">
                <b>尋找您需要的商品</b>
              </div>
              <div className="menu">
                <SideBar />
              </div>
            </div>
          </div>
          <div className="right w-[60%] pt-5 products_menu">
            <div className="filter flex pl-3">
              <div className="flex">
                <div className="filter01 mr-4">
                  <select
                    value={priceSort}
                    className="rounded-full"
                    onChange={handlePriceSortChange}
                  >
                    <option value="default">依價格排序</option>
                    <option value="asc">Price: 由低到高</option>
                    <option value="desc">Price: 由高到低</option>
                  </select>
                </div>
                <div className="filter02">
                  <select
                    value={dateSort}
                    className="rounded-full"
                    onChange={handleDateSortChange}
                  >
                    <option value="default">依新舊排序</option>
                    <option value="asc">Date: 舊到新</option>
                    <option value="desc">Date: 新到舊</option>
                  </select>
                </div>
              </div>
            </div>
            {sortedProducts.length > 0 ? (
              <div className="flex flex-wrap" data-aos="fade-up">
                {sortedProducts.map((product) => {
                  // 获取第一个图片（如果存在）
                  const productImage =
                    product.images?.[0]?.src || "/default-image.jpg"; // 使用默认图片作为备选
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
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
