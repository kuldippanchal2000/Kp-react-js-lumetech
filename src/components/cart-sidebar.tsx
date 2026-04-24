import { useMemo } from 'react'
import type { ICartItem } from '../types/cart'

interface ICartSidebarProps {
  items: ICartItem[]
  onIncreaseQuantity: (productId: number) => void
  onDecreaseQuantity: (productId: number) => void
  onRemoveItem: (productId: number) => void
}

export const CartSidebar = ({
  items,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: ICartSidebarProps) => {
  const total = useMemo(
    () =>
      items.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      ),
    [items],
  )

  return (
    <aside className="sticky top-[72px] h-fit rounded-card border border-stroke bg-surface p-4 max-lg:static">
      <h2 className="mt-0 text-xl font-semibold">Cart</h2>
      {items.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <ul className="m-0 grid list-none gap-3 p-0">
          {items.map((item) => {
            const subtotal = item.price * item.quantity

            const handleIncrease = () => {
              onIncreaseQuantity(item.productId)
            }

            const handleDecrease = () => {
              onDecreaseQuantity(item.productId)
            }

            const handleRemove = () => {
              onRemoveItem(item.productId)
            }

            return (
              <li
                key={item.productId}
                className="grid grid-cols-[70px_1fr] gap-3 border-b border-slate-100 pb-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-[70px] w-[70px] rounded-control object-cover"
                />
                <div>
                  <h3 className="m-0 text-[0.95rem] font-semibold">{item.title}</h3>
                  <p className="my-1 text-sm text-slate-600">${item.price} each</p>
                  <p className="my-1 text-sm text-slate-600">Subtotal: ${subtotal}</p>
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-md border border-stroke bg-surface"
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-md border border-stroke bg-surface"
                      onClick={handleIncrease}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-1 text-sm font-medium text-danger hover:underline"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
    </aside>
  )
}
