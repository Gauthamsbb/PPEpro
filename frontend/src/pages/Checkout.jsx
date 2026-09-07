import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { submitOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

const emptyShipping = { full_name: "", business_name: "", email: "", phone: "", address: "", city: "", state: "", zip_code: "" };

export const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(emptyShipping);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center" data-testid="checkout-empty">
        <p className="text-muted-foreground mb-4">Your cart is empty — add some gloves before checking out.</p>
        <Button asChild className="bg-safety-orange hover:bg-safety-hover text-white rounded-full"><Link to="/products">Browse Gloves</Link></Button>
      </div>
    );
  }

  const shippingCost = shippingMethod === "pickup" || subtotal >= 150 ? 0 : 12;
  const expeditedFee = shippingMethod === "expedited" ? 35 : 0;
  const total = subtotal + shippingCost + expeditedFee;

  const update = (field, value) => setShipping((s) => ({ ...s, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["full_name", "email", "phone", "address", "city", "state", "zip_code"];
    if (required.some((f) => !shipping[f])) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }
    setLoading(true);
    try {
      const order = await submitOrder({
        items: items.map((i) => ({ slug: i.slug, size: i.size, pack_type: i.packType, quantity: i.quantity })),
        shipping,
        shipping_method: shippingMethod,
      });
      clearCart();
      navigate(`/order-confirmation/${order.order_number}`);
    } catch (err) {
      toast.error("Checkout failed. Please check your cart and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14" data-testid="checkout-page">
      <Breadcrumbs items={[{ to: "/cart", label: "Cart" }, { label: "Checkout" }]} />
      <h1 className="font-head text-3xl font-bold tracking-tight text-ink mb-2">Checkout</h1>
      <p className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Demo checkout — this is a placeholder flow, no real payment is processed.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-8">
          <div>
            <h2 className="font-head font-semibold text-lg text-ink mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input id="full_name" value={shipping.full_name} onChange={(e) => update("full_name", e.target.value)} className="mt-1" data-testid="checkout-fullname-input" required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="business_name">Business Name</Label>
                <Input id="business_name" value={shipping.business_name} onChange={(e) => update("business_name", e.target.value)} className="mt-1" data-testid="checkout-business-input" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={shipping.email} onChange={(e) => update("email", e.target.value)} className="mt-1" data-testid="checkout-email-input" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" value={shipping.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" data-testid="checkout-phone-input" required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" value={shipping.address} onChange={(e) => update("address", e.target.value)} className="mt-1" data-testid="checkout-address-input" required />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" value={shipping.city} onChange={(e) => update("city", e.target.value)} className="mt-1" data-testid="checkout-city-input" required />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input id="state" value={shipping.state} onChange={(e) => update("state", e.target.value)} className="mt-1" data-testid="checkout-state-input" required />
              </div>
              <div>
                <Label htmlFor="zip_code">ZIP Code *</Label>
                <Input id="zip_code" value={shipping.zip_code} onChange={(e) => update("zip_code", e.target.value)} className="mt-1" data-testid="checkout-zip-input" required />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-head font-semibold text-lg text-ink mb-4">Shipping Method</h2>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
              <label className="flex items-center justify-between border border-border rounded-xl p-4 cursor-pointer" data-testid="checkout-shipping-standard">
                <span className="flex items-center gap-3"><RadioGroupItem value="standard" /> Standard UPS (3-5 business days)</span>
                <span className="font-mono text-sm">{subtotal >= 150 ? "Free" : "$12.00"}</span>
              </label>
              <label className="flex items-center justify-between border border-border rounded-xl p-4 cursor-pointer" data-testid="checkout-shipping-expedited">
                <span className="flex items-center gap-3"><RadioGroupItem value="expedited" /> Expedited Handling</span>
                <span className="font-mono text-sm">+$35.00</span>
              </label>
              <label className="flex items-center justify-between border border-border rounded-xl p-4 cursor-pointer" data-testid="checkout-shipping-pickup">
                <span className="flex items-center gap-3"><RadioGroupItem value="pickup" /> Florida Warehouse Pickup</span>
                <span className="font-mono text-sm">Free</span>
              </label>
            </RadioGroup>
          </div>

          <div>
            <h2 className="font-head font-semibold text-lg text-ink mb-4">Payment</h2>
            <div className="border border-dashed border-border rounded-xl p-5 bg-cream text-sm text-muted-foreground" data-testid="checkout-payment-placeholder">
              Payment processing is a placeholder for this demo — no card details are collected or charged. In production this connects to Shopify Payments and major credit cards.
            </div>
          </div>
        </div>

        <div className="bg-cream rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-head font-semibold text-lg text-ink mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground line-clamp-1 pr-2">{item.quantity}× {item.name} ({item.size})</span>
                <span className="font-mono tabular shrink-0">${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono tabular">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-mono tabular">${shippingCost.toFixed(2)}</span></div>
            {expeditedFee > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Expedited</span><span className="font-mono tabular">${expeditedFee.toFixed(2)}</span></div>}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border"><span>Total</span><span className="font-mono tabular" data-testid="checkout-total">${total.toFixed(2)}</span></div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-12 mt-5" data-testid="checkout-place-order-button">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};
