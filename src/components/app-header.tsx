import { ShoppingCart } from "lucide-react";
import { logout } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalProducts = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login", { replace: true });
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-stroke bg-surface px-5 py-4">
      <div className="flex items-center gap-2 justify-between w-full">
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user?.image}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="h-9 w-9 rounded-full border border-stroke object-cover"
              />
              <span className="text-sm font-semibold text-success">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          ) : null}
        </div>
        <h1 className="hidden sm:block m-0 text-xl font-semibold text-success">
          KP's Mini Mart
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGoToCart}
            className="relative cursor-pointer rounded-control border border-stroke p-2 text-success transition hover:bg-slate-100"
            aria-label="Go to cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-success px-1 text-xs font-semibold text-white">
              {totalProducts}
            </span>
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-control bg-success px-3 py-2 font-semibold text-white transition hover:brightness-95"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
