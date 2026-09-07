import { Plus, Minus, ShoppingCart } from "lucide-react";

export const StickyMobileAddToCart = ({ price, onAdd, disabled, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]" data-testid="sticky-mobile-cart-bar">
      <div className="flex items-center border border-border rounded-full">
        <button onClick={onDecrement} className="p-2.5" aria-label="Decrease quantity" data-testid="sticky-mobile-decrease">
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-2 font-mono tabular text-sm" data-testid="sticky-mobile-quantity">{quantity}</span>
        <button onClick={onIncrement} className="p-2.5" aria-label="Increase quantity" data-testid="sticky-mobile-increase">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onAdd}
        disabled={disabled}
        className="flex-1 bg-safety-orange hover:bg-safety-hover disabled:opacity-50 text-white rounded-full font-semibold h-11 flex items-center justify-center gap-2"
        data-testid="sticky-mobile-add-to-cart"
      >
        <ShoppingCart className="w-4 h-4" /> Add · ${price.toFixed(2)}
      </button>
    </div>
  );
};
