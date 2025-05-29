"use client";
import { Button } from "@/components/ui/button";
import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { toast } from "sonner";
import { useTransition } from "react";
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast("wrong");
        return;
      }
      // Handle Success add to cart
      toast("Okay");
    });
  };

  // Handle Remove From Cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
    });
    return;
  };
  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button onClick={handleRemoveFromCart} type="button" variant="outline">
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button onClick={handleAddToCart} type="button" variant="outline">
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
