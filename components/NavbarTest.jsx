import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://starislandbaby.com/test/wp-json/wc/v3/products/categories",
          {
            params: {
              consumer_key: "ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b",
              consumer_secret: "cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f",
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = (parentId) => {
    const subCategories = categories.filter(
      (category) => category.parent === parentId
    );

    return (
      <ul className="flex">
        {subCategories.map((category) => (
          <li className="flex" key={category.id}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            {renderCategories(category.id)} {/* 顯示子分類 */}
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
      <ul className="flex">
        {categories.map((category) => (
          <li key={category.id} className="mx-6 font-bold ">
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            {renderCategories(category.id)} {/* 顯示子分類 */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
