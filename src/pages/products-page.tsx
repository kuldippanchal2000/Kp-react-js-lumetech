import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { IProduct } from "../types/product";
import { getProducts } from "../api/products-api";
import { ProductCard } from "../components/product-card";
import { ProductCardShimmer } from "../components/product-card-shimmer";

const SHIMMER_CARD_COUNT = 20;

export const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedQuantityByProductId, setSelectedQuantityByProductId] =
    useState<Record<number, number>>({});

  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddToCart = (product: IProduct, quantity: number) => {
    if (quantity <= 0) {
      toast.warning("Please select quantity before adding to cart.");
      return;
    }

    dispatch(addToCart({ product, quantity }));
    toast.success("Product added to cart.");
    setSelectedQuantityByProductId((previousState) => ({
      ...previousState,
      [product?.id]: 1,
    }));
  };

  const handleIncreaseQuantity = (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (cartItem) {
      if (cartItem?.quantity >= cartItem?.stock) {
        toast.info(
          `Only ${cartItem.stock ?? cartItem.quantity} item(s) available in stock.`,
        );
        return;
      }
      dispatch(increaseQuantity(productId));
      return;
    }

    const targetProduct = products.find((product) => product?.id === productId);
    if (!targetProduct) {
      return;
    }

    const currentQuantity = selectedQuantityByProductId[productId] ?? 1;
    if (currentQuantity >= targetProduct.stock) {
      toast.info(`Only ${targetProduct.stock} item(s) available in stock.`);
      return;
    }

    setSelectedQuantityByProductId((previousState) => ({
      ...previousState,
      [productId]: currentQuantity + 1,
    }));
  };

  const handleDecreaseQuantity = (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (cartItem) {
      dispatch(decreaseQuantity(productId));
      return;
    }

    setSelectedQuantityByProductId((previousState) => {
      const currentQuantity = previousState[productId] ?? 1;
      const nextQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;

      return {
        ...previousState,
        [productId]: nextQuantity,
      };
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        setProducts(response.products);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (loadError) {
        const errorMessage = "Failed to load products.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <>
      <main className="p-4">
        <section>
          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
              {Array.from({ length: SHIMMER_CARD_COUNT }).map((_, index) => (
                <ProductCardShimmer key={`product-card-shimmer-${index}`} />
              ))}
            </div>
          ) : null}
          {!isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
              {products.map((product) => {
                const cartItem = cartItems.find(
                  (item) => item.productId === product.id,
                );
                const selectedQuantity =
                  selectedQuantityByProductId[product.id] ?? 1;

                return (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    selectedQuantity={selectedQuantity}
                    cartQuantity={cartItem?.quantity}
                    onAddToCart={handleAddToCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                );
              })}
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
};
