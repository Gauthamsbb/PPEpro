import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, subtotal, drawerOpen, setDrawerOpen } = useCart();

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md" data-testid="cart-drawer">
        <SheetHeader>
          <SheetTitle className="font-head">Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-muted-foreground" data-testid="cart-drawer-empty">
            <ShoppingBag className="w-10 h-10 opacity-40" />
            <p>Your cart is empty.</p>
            <Button asChild variant="outline" onClick={() => setDrawerOpen(false)}>
              <Link to="/products">Browse Gloves</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-border last:border-0" data-testid={`cart-item-${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-cream shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink line-clamp-2">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Size {item.size} · {item.packType === "case" ? "Case" : "Box"}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:text-safety-orange" data-testid={`cart-item-decrease-${item.id}`}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular" data-testid={`cart-item-qty-${item.id}`}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:text-safety-orange" data-testid={`cart-item-increase-${item.id}`}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono tabular text-sm font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive shrink-0" data-testid={`cart-item-remove-${item.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono tabular font-bold text-lg" data-testid="cart-drawer-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and any expedited fees calculated at checkout.</p>
              <Button asChild className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-11" onClick={() => setDrawerOpen(false)} data-testid="cart-drawer-checkout-button">
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
