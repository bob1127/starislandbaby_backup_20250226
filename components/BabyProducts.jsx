import { useEffect, useState, useRef } from "react";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import "aos/dist/aos.css";
import Image from "next/image";

async function fetchAllProducts() {
  try {
    const productUrl = `${process.env.NEXT_PUBLIC_WP_API_BASE_URL}wp-json/wc/v3/products?consumer_key=${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`;
    const response = await fetch(productUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const titleRef = useRef(null);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchAllProducts();
      const filteredProducts = fetchedProducts.filter((product) =>
        product.categories.some((category) => category.slug === "infants")
      );
      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const font = new FontFace(
      "WangZheGuiLai",
      "url(/fonts/王者歸來-華康海報體W12.ttf)"
    );

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        if (titleRef.current) {
          titleRef.current.style.fontFamily = "WangZheGuiLai, sans-serif";
          titleRef.current.style.fontWeight = "bold"; // 加粗
        }
      })
      .catch((error) => {
        console.error("字體加載失敗:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10 text-xl">該分類下尚未有產品</div>;
  }

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container w-[75%] flex flex-col mx-auto py-1 px-4">
      <div className="txt text-center">
        <Image
          src="/images/S__4972553.jpg"
          placeholder="empty"
          loading="lazy"
          className="mx-auto max-w-[700px]"
          width={700}
          height={300}
          alt="for_kid_title"
        ></Image>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block"
          >
            <Card className="bg-transparent p-4 rounded-lg">
              <CardBody className="flex flex-col items-center">
                <img
                  loading="lazy"
                  alt={product.name}
                  className="rounded-xl group-hover:scale-105 transition duration-200"
                  src={product.images[0]?.src || "/images/default.jpg"}
                  width={300}
                  height={300}
                />
                <b>{product.name}</b>
                <p className="mt-2 text-gray-700 font-semibold">
                  Price: ${product.price}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-4 py-2 rotate-180 rounded-lg disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Image
            src="/images/right-arrow.png"
            placeholder="empty"
            loading="lazy"
            width={50}
            height={50}
            alt="arrow"
          />
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <Image
            src="/images/right-arrow.png"
            placeholder="empty"
            loading="lazy"
            width={50}
            height={50}
            alt="arrow"
          />
        </button>
      </div>
    </div>
  );
}
