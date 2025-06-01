import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import OrderDetailstable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
export const metadat: Metadata = {
  title: "order Details",
};
const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();
  const session = await auth();
  return (
    <>
      <OrderDetailstable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </>
  );
};

export default OrderDetailsPage;
