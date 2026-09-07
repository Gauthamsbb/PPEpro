import { useState } from "react";
import { INDUSTRIES } from "@/data/industries";
import { submitQuote } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const VOLUME_OPTIONS = [
  "Under 5 cases / month",
  "5-19 cases / month",
  "20-49 cases / month",
  "50+ cases / month",
];

const emptyForm = {
  name: "",
  business_name: "",
  email: "",
  phone: "",
  industry: "",
  products_of_interest: "",
  monthly_volume: "",
  notes: "",
};

export const QuoteForm = ({ variant = "full", source = "quote_page", defaultIndustry = "" }) => {
  const [form, setForm] = useState({ ...emptyForm, industry: defaultIndustry });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.industry) {
      toast.error("Please fill in name, email, phone, and industry.");
      return;
    }
    setLoading(true);
    try {
      await submitQuote({ ...form, source });
      setDone(true);
      toast.success("Request received. We'll follow up by phone or email with your pricing.");
    } catch (err) {
      toast.error("Something went wrong. Please try again or call 561-860-7711.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center" data-testid="quote-form-success">
        <CheckCircle2 className="w-10 h-10 text-stock-in mx-auto mb-3" />
        <p className="font-head text-lg font-semibold text-ink mb-1">Request received</p>
        <p className="text-muted-foreground text-sm">
          We'll follow up directly by phone or email with your case pricing — no automated sales pitch.
        </p>
      </div>
    );
  }

  const isCompact = variant === "compact";

  return (
    <form
      onSubmit={handleSubmit}
      className={isCompact ? "bg-white rounded-2xl p-6 space-y-3" : "bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl"}
      data-testid={`quote-form-${variant}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`qf-name-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Name *</Label>
          <Input id={`qf-name-${source}`} value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1" data-testid="quote-form-name-input" required />
        </div>
        <div>
          <Label htmlFor={`qf-business-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Business Name</Label>
          <Input id={`qf-business-${source}`} value={form.business_name} onChange={(e) => update("business_name", e.target.value)} className="mt-1" data-testid="quote-form-business-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`qf-email-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Email *</Label>
          <Input id={`qf-email-${source}`} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1" data-testid="quote-form-email-input" required />
        </div>
        <div>
          <Label htmlFor={`qf-phone-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Phone *</Label>
          <Input id={`qf-phone-${source}`} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" data-testid="quote-form-phone-input" required />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-ink text-xs font-semibold uppercase tracking-wide">Industry *</Label>
          <Select value={form.industry} onValueChange={(v) => update("industry", v)}>
            <SelectTrigger className="mt-1" data-testid="quote-form-industry-select">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((i) => (
                <SelectItem key={i.slug} value={i.slug} data-testid={`quote-form-industry-option-${i.slug}`}>{i.shortName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-ink text-xs font-semibold uppercase tracking-wide">Rough Monthly Volume</Label>
          <Select value={form.monthly_volume} onValueChange={(v) => update("monthly_volume", v)}>
            <SelectTrigger className="mt-1" data-testid="quote-form-volume-select">
              <SelectValue placeholder="Select volume" />
            </SelectTrigger>
            <SelectContent>
              {VOLUME_OPTIONS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor={`qf-products-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Glove Types / Products of Interest</Label>
        <Input id={`qf-products-${source}`} value={form.products_of_interest} onChange={(e) => update("products_of_interest", e.target.value)} placeholder="e.g. black nitrile 5 mil, size M & L" className="mt-1" data-testid="quote-form-products-input" />
      </div>
      {!isCompact && (
        <div>
          <Label htmlFor={`qf-notes-${source}`} className="text-ink text-xs font-semibold uppercase tracking-wide">Anything else we should know?</Label>
          <Textarea id={`qf-notes-${source}`} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-1" rows={3} data-testid="quote-form-notes-input" />
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-11" data-testid="quote-form-submit-button">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Case Pricing"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">No minimum order. No sales pitch. We follow up directly by phone or email.</p>
    </form>
  );
};
