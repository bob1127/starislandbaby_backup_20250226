import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const fetchCategories = async () => {
      let allCategories = [];
      let page = 1;
      const perPage = 100;
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
                page: page,
                per_page: perPage,
              },
            }
          );

          if (response.data.length === 0) break;

          allCategories = [...allCategories, ...response.data];
          page++;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setCategories(allCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubcategories = (categoryId) => {
    if (isMobile) return;
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const renderCategories = (parentId) => {
    const subCategories = categories.filter(
      (category) => category.parent === parentId
    );
    if (subCategories.length === 0) return null;

    return (
      <ul className="pl-4 flex flex-col space-y-2">
        {subCategories.map((category) => (
          <li className="flex group" key={category.id}>
            <Link
              href={`/category/${category.slug}`}
              className={`px-3 py-1 transition duration-200 rounded-lg hover:bg-gray-200`}
            >
              {category.name}
            </Link>
            {renderCategories(category.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="relative overflow-x-scroll scrollbar-none scrollbar-hidden">
      <ul className="flex flex-row  lg:flex-col space-y-4">
        {categories.length > 0 ? (
          categories
            .filter((category) => category.parent === 0)
            .map((category) => (
              <li
                key={category.id}
                className={`relative lg:bg-transparent rounded-full p-1 h duration-150 pr-3 inline-block w-[180px] mx-2 group`}
              >
                <button
                  onClick={() => toggleSubcategories(category.id)}
                  className=" py-1 rounded-full px-3 flex justify-center w-full  text-center   lg:w-auto lg:bg-transparent font-bold bg-white "
                  disabled={isMobile}
                >
                  <Link href={`/category/${category.slug}`} passHref>
                    <span className="whitespace-nowrap group-hover:gray-900 font-bold">
                      {category.name}
                    </span>
                  </Link>
                </button>
                {activeCategory === category.id && (
                  <div className="mt-2">{renderCategories(category.id)}</div>
                )}
              </li>
            ))
        ) : (
          <li className="px-3 py-2 text-gray-500"></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
