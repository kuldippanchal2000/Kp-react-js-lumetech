import type { IProduct } from "../types/product";

interface IProductCardProps {
  selectedQuantity: number;
  cartQuantity?: number;
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
}

export const ProductCard = ({
  product,
  selectedQuantity,
  cartQuantity,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: IProductCardProps) => {
  const shortDescription =
    product?.description?.length > 90
      ? `${product?.description?.slice(0, 90)}...`
      : product?.description;
  const displayQuantity = cartQuantity ?? selectedQuantity;
  const isMaxSelected = displayQuantity >= product.stock;

  const handleAddToCart = () => {
    onAddToCart(product, selectedQuantity);
  };

  const handleIncrease = () => {
    onIncreaseQuantity(product.id);
  };

  const handleDecrease = () => {
    onDecreaseQuantity(product.id);
  };

  return (
    <article className="grid gap-2 rounded-card border border-stroke bg-surface p-3">
      <img
        className="h-40 w-full rounded-control bg-slate-100 object-contain"
        src={product?.thumbnail}
        alt={product?.title}
        loading="lazy"
      />
      <div>
        <h2 className="m-0 text-base font-semibold">{product?.title}</h2>
        <p className="mt-1.5 text-base font-bold text-success">
          ${product?.price}
        </p>
        <p className="mt-1.5 text-xs text-slate-600">{shortDescription}</p>
      </div>
      <div className="grid gap-2">
        <div
          className="inline-flex items-center justify-center gap-2"
          aria-label={`Quantity for ${product.title}`}
        >
          <button
            type="button"
            className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-success bg-surface"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="min-w-6 text-center text-sm font-bold text-success">
            {displayQuantity}
          </span>
          <button
            type="button"
            className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-success bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleIncrease}
            disabled={isMaxSelected}
          >
            +
          </button>
        </div>
        {cartQuantity ? (
          <p className="text-xs text-success font-medium">
            Product already added in cart, update with + or -
          </p>
        ) : (
          <button
            type="button"
            className="mt-2 cursor-pointer rounded-control bg-success px-3 py-2 font-semibold text-white transition hover:brightness-95"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};
