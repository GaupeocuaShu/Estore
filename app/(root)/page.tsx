import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import sampleData from "@/db/sample-data";
export const metadata: Metadata = {
  title: "Homepage",
};
const Homepage = async () => {
  const latestProduct = await getLatestProducts();
  return (
    <div>
      <ProductList data={latestProduct} title="Products" limit={4} />
    </div>
  );
};

export default Homepage;
