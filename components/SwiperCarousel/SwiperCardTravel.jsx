import { useEffect, useState } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import AOS from "aos";
import Link from "next/link"; // Import Link for internal navigation
import "aos/dist/aos.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Fetch products from API
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

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Track if client-side rendering is active

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchData();

    // Set isClient to true after component mounts to ensure it's only rendered client-side
    setIsClient(true);
  }, []);

  if (loading || !isClient) {
    return <div>Loading...</div>; // Display loading until data is fetched and client is ready
  }

  return (
    <>
      <div className="e-full m-0 p-0">
        <Swiper
          breakpoints={{
            0: { slidesPerView: 3 },
            500: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={1}
          className="m-0 p-0"
          navigation
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="bg-white">
              <Link href={`/product/${product.slug}`}>
                {" "}
                {/* Use Link to navigate to product page */}
                <Card className="py-4 bg-white p-0 m-0 shadow-none">
                  <CardHeader className="">
                    <div className="txt p-4"></div>
                  </CardHeader>
                  <CardBody className="pb-[30px]">
                    {/* 延遲圖片渲染，只有在客戶端加載後才渲染 */}
                    {isClient && product.images[0]?.src && (
                      <img
                        loading="lazy"
                        alt={product.name}
                        className="rounded-xl"
                        src={product.images[0]?.src || "/images/default.jpg"}
                        width={500}
                        height={300}
                      />
                    )}
                    <div className="description">
                      {/* 顯示產品名稱 */}
                      <b className="text-black">{product.name}</b>
                      <b className="text-black">Price: ${product.price}</b>
                      <p className="text-[12px]">
                        {product.description || "No description available."}
                      </p>
                      <a
                        href="#"
                        className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                      >
                        BUY NOW
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <button className="px-6 py-2 font-medium bg-buy-dark text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          More
        </button>
      </div>
    </>
  );
}
