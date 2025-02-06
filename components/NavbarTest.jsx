import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // 用來顯示箭頭
import { motion } from "framer-motion"; // 导入framer-motion

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
      <ul className="flex flex-col space-y-2 pl-4">
        {subCategories.map((category) => (
          <li className="flex" key={category.id}>
            <Link href={`/category/${category.slug}`} className="text-black">
              {category.name}
            </Link>
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
    <nav>
      <ul className="flex space-x-8 relative">
        {categories
          .filter((category) => category.parent === 0) // 只顯示頂級分類
          .map((category) => {
            // 判斷該分類是否有子分類
            const hasSubCategories = categories.some(
              (cat) => cat.parent === category.id
            );

            return (
              <li
                key={category.id}
                className="relative text-gray-300 hover:text-white duration-150 font-bold"
                onMouseEnter={() => setActiveCategory(category.id)} // 鼠标移入时显示子分类
                onMouseLeave={() => setActiveCategory(null)} // 鼠标移出时隐藏子分类
              >
                <button className="flex items-center gap-2">
                  <Link href={`/category/${category.slug}`} passHref>
                    {category.name}
                  </Link>
                  {/* 顯示或隱藏箭頭 */}
                  {hasSubCategories && (
                    <span className="ml-2">
                      {activeCategory === category.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </span>
                  )}
                </button>
                {/* 使用 framer-motion 實現動畫效果 */}
                {activeCategory === category.id && hasSubCategories && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-max bg-white rounded-xl py-4 pl-5 pr-[80px] shadow-lg z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderCategories(category.id)} {/* 顯示子分類 */}
                  </motion.div>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navbar;
