import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";
import { Metadata } from "next";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";
export const metadata: Metadata = {
  title: "Homepage",
};
const Homepage = async () => {
  const latestProduct = await getLatestProducts();

  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProduct} title="Products" limit={4} />
      <ViewAllProductsButton />
    </div>
  );
};

export default Homepage;
