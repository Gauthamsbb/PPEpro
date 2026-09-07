import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap" data-testid="breadcrumbs">
    <Link to="/" className="hover:text-safety-orange transition-colors">Home</Link>
    {items.map((item, idx) => (
      <span key={idx} className="flex items-center gap-1.5">
        <ChevronRight className="w-3 h-3" />
        {item.to ? (
          <Link to={item.to} className="hover:text-safety-orange transition-colors">{item.label}</Link>
        ) : (
          <span className="text-ink font-medium">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);
