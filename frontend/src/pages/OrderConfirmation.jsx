import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";

export const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder(orderNumber).then(setOrder).catch(() => {});
  }, [orderNumber]);

  if (!order) return <div className="min-h-[60vh]" />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center" data-testid="order-confirmation-page">
      <CheckCircle2 className="w-14 h-14 text-stock-in mx-auto mb-5" />
      <h1 className="font-head text-3xl font-bold tracking-tight text-ink mb-2">Order Confirmed</h1>
      <p className="text-muted-foreground mb-1">Order number</p>
      <p className="font-mono tabular text-xl font-bold text-safety-orange mb-6" data-testid="order-confirmation-number">{order.order_number}</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
        A confirmation email is on its way. Orders ship within 3-5 business days via UPS. This is a demo checkout — no real payment was processed.
      </p>

      <div className="bg-cream rounded-2xl p-6 text-left mb-8">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm py-2 border-b border-border last:border-0" data-testid={`order-confirmation-item-${idx}`}>
            <span>{item.quantity}× {item.name} ({item.size}, {item.pack_type})</span>
            <span className="font-mono tabular">${item.line_total.toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-base font-bold pt-3">
          <span>Total</span>
          <span className="font-mono tabular" data-testid="order-confirmation-total">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold">
          <Link to="/products">Continue Shopping</Link>
        </Button>
        <a href="tel:5618607711" className="flex items-center gap-1.5 text-sm text-ink font-semibold">
          <Phone className="w-4 h-4 text-safety-orange" /> Questions? Call 561-860-7711
        </a>
      </div>
    </div>
  );
};
