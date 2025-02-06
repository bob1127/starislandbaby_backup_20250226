import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // 用來顯示箭頭

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // 用來追蹤當前被點擊的父分類

  useEffect(() => {
    const fetchCategories = async () => {
      let allCategories = [];
      let page = 1;
      const perPage = 100; // 每頁顯示的分類數量
      const consumerKey = "ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b";
      const consumerSecret = "cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f";

      try {
        while (true) {
          const response = await axios.get(
            "https://starislandbaby.com/test/wp-json/wc/v3/products/categories",
            {
              params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                page: page, // 當前頁數
                per_page: perPage, // 每頁返回的項目數
              },
            }
          );

          if (response.data.length === 0) {
            break; // 如果返回的數據為空，則退出循環
          }

          allCategories = [...allCategories, ...response.data]; // 將當前頁數的數據添加到總數據中
          page++; // 增加頁數，繼續請求下一頁
        }

        setCategories(allCategories); // 將所有數據設置到 state 中
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // 數據請求完成，設置加載狀態為 false
      }
    };

    fetchCategories();
  }, []);

  // 處理點擊父分類顯示或隱藏子分類
  const toggleSubcategories = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null); // 如果點擊的是同一個分類，則隱藏子分類
    } else {
      setActiveCategory(categoryId); // 否則顯示該分類的子分類
    }
  };

  // 渲染子分類
  const renderCategories = (parentId) => {
    const subCategories = categories.filter(
      (category) => category.parent === parentId
    );

    if (subCategories.length === 0) return null;

    return (
      <ul className="pl-4 flex flex-col space-y-2">
        {subCategories.map((category) => (
          <li className="flex" key={category.id}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            {renderCategories(category.id)} {/* 顯示子分類的子分類 */}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="relative">
      <ul className="flex flex-col space-y-4">
        {categories
          .filter((category) => category.parent === 0) // 只顯示頂級分類
          .map((category) => (
            <li
              key={category.id}
              className="relative text-gray-600 hover:text-black duration-150 my-2 font-bold"
            >
              <button
                onClick={() => toggleSubcategories(category.id)} // 點擊父分類顯示/隱藏子分類
                className="flex items-center gap-2 w-full"
              >
                <Link href={`/category/${category.slug}`} passHref>
                  {category.name}
                </Link>
                {/* 顯示或隱藏箭頭 */}
                <span className="ml-2">
                  {activeCategory === category.id ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </button>

              {/* 直接顯示/隱藏子分類 */}
              {activeCategory === category.id && (
                <div className="mt-2">
                  {renderCategories(category.id)} {/* 顯示子分類 */}
                </div>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
