import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14" data-testid="cart-page">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <h1 className="font-head text-3xl font-bold tracking-tight text-ink mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-cream rounded-2xl" data-testid="cart-page-empty">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold">
            <Link to="/products">Browse Gloves</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white border border-border rounded-2xl p-4" data-testid={`cart-page-item-${item.id}`}>
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-cream shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">{item.brand}</p>
                  <p className="font-head font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Size {item.size} · {item.packType === "case" ? "Case" : "Box"}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2" data-testid={`cart-page-decrease-${item.id}`}><Minus className="w-3.5 h-3.5" /></button>
                      <span className="px-3 font-mono tabular text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2" data-testid={`cart-page-increase-${item.id}`}><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <span className="font-mono tabular font-bold text-ink">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive" data-testid={`cart-page-remove-${item.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-cream rounded-2xl p-6 h-fit">
            <h2 className="font-head font-semibold text-lg text-ink mb-4">Order Summary</h2>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono tabular font-semibold" data-testid="cart-page-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Shipping calculated at checkout. Free over $150.</p>
            <Button onClick={() => navigate("/checkout")} className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-11" data-testid="cart-page-checkout-button">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
