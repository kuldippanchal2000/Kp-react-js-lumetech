import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ShoppingCart } from "lucide-react";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  return (
    <main className="p-4">
      <div className="mx-auto max-w-5xl rounded-card border border-stroke bg-surface p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="m-0 text-2xl font-semibold text-success">Cart</h2>
          <Link
            to="/products"
            className="w-full rounded-control border border-stroke px-3 py-2 text-center text-sm font-semibold text-success transition hover:bg-slate-100 sm:w-auto"
          >
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center py-10">
            <ShoppingCart size={40} color="gray" />
            <p className="text-muted">No items added yet.</p>
          </div>
        ) : (
          <>
            <ul className="m-0 grid list-none gap-3 p-0">
              {cartItems.map((item) => {
                const subtotal = item.price * item.quantity;
                const isMaxQuantityReached =
                  typeof item.stock === "number" && item.quantity >= item.stock;
                return (
                  <li
                    key={item.productId}
                    className="grid grid-cols-1 gap-3 rounded-control border border-stroke p-3 sm:grid-cols-[80px_1fr]"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-20 w-20 rounded-control object-cover justify-self-start"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="m-0 text-base font-semibold">
                          {item.title}
                        </h3>
                        <p className="my-1 text-sm text-slate-600">
                          ${item.price} each
                        </p>
                        <p className="my-1 text-sm font-semibold text-success">
                          Subtotal: ${subtotal.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-stroke bg-surface"
                          onClick={() =>
                            dispatch(decreaseQuantity(item.productId))
                          }
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-success">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-stroke bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                          onClick={() =>
                            dispatch(increaseQuantity(item.productId))
                          }
                          disabled={isMaxQuantityReached}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer rounded-control border border-danger px-2 py-1 text-sm font-semibold text-danger transition hover:bg-red-50 sm:ml-2"
                          onClick={() =>
                            dispatch(removeFromCart(item.productId))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex justify-start sm:justify-end">
              <p className="m-0 text-lg font-bold text-success">
                Total: ${totalAmount.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
