import { useState } from "react";
import { submitContact } from "@/lib/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16" data-testid="contact-page">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10">
        <div className="space-y-5">
          <a href="tel:5618607711" className="flex items-center gap-3 bg-cream rounded-xl p-4 hover:bg-cream/70 transition-colors" data-testid="contact-phone-link">
            <Phone className="w-5 h-5 text-safety-orange" />
            <div><p className="font-semibold text-ink text-sm">561-860-7711</p><p className="text-xs text-muted-foreground">Best for large orders and quotes</p></div>
          </a>
          <a href="mailto:orders@ppeprosolutions.com" className="flex items-center gap-3 bg-cream rounded-xl p-4 hover:bg-cream/70 transition-colors" data-testid="contact-email-link">
            <Mail className="w-5 h-5 text-safety-orange" />
            <div><p className="font-semibold text-ink text-sm">orders@ppeprosolutions.com</p><p className="text-xs text-muted-foreground">General questions and order support</p></div>
          </a>
          <div className="flex items-center gap-3 bg-cream rounded-xl p-4">
            <MapPin className="w-5 h-5 text-safety-orange" />
            <div><p className="font-semibold text-ink text-sm">Florida Warehouse</p><p className="text-xs text-muted-foreground">Nationwide UPS shipping</p></div>
          </div>
        </div>

        <div>
          {done ? (
            <div className="bg-cream rounded-2xl p-8 text-center" data-testid="contact-form-success">
              <CheckCircle2 className="w-10 h-10 text-stock-in mx-auto mb-3" />
              <p className="font-head text-lg font-semibold text-ink mb-1">Message sent</p>
              <p className="text-muted-foreground text-sm">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream rounded-2xl p-6 space-y-4" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input id="contact-name" value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1" data-testid="contact-name-input" required />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input id="contact-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" data-testid="contact-phone-input" />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-email">Email *</Label>
                <Input id="contact-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1" data-testid="contact-email-input" required />
              </div>
              <div>
                <Label htmlFor="contact-subject">Subject *</Label>
                <Input id="contact-subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} className="mt-1" data-testid="contact-subject-input" required />
              </div>
              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea id="contact-message" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="mt-1" data-testid="contact-message-input" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-11" data-testid="contact-submit-button">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
