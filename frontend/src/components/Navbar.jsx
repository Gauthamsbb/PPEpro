import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, ChevronDown, Search } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { MATERIALS } from "@/data/materials";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { totalItems, setDrawerOpen } = useCart();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-xl border-b border-white/10" data-testid="navbar">
      <div className="hidden md:flex items-center justify-between gap-2 px-4 lg:px-12 py-1.5 text-xs text-white/60 border-b border-white/5">
        <span>Volume pricing shown openly — no account or phone call needed to see case pricing.</span>
        <a href="tel:5618607711" className="flex items-center gap-1.5 text-safety-yellow hover:text-white transition-colors" data-testid="navbar-phone-link">
          <Phone className="w-3.5 h-3.5" /> 561-860-7711
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-baseline gap-2 shrink-0" data-testid="navbar-logo-link">
          <span className="font-head font-bold text-xl lg:text-2xl text-white tracking-tight">PPE PRO</span>
          <span className="font-head font-medium text-xs lg:text-sm text-safety-yellow tracking-widest uppercase">Solutions</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <div className="relative" onMouseEnter={() => setIndustryOpen(true)} onMouseLeave={() => setIndustryOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-white/85 hover:text-white transition-colors" data-testid="navbar-industries-trigger">
              By Industry <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {industryOpen && (
              <div className="absolute top-full left-0 pt-2 w-72" data-testid="navbar-industries-menu">
                <div className="bg-charcoal border border-white/10 rounded-lg shadow-2xl p-2">
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.slug}
                      to={`/industries/${ind.slug}`}
                      className="block px-3 py-2.5 rounded-md text-white/85 hover:bg-white/10 hover:text-white text-sm transition-colors"
                      data-testid={`navbar-industry-link-${ind.slug}`}
                    >
                      {ind.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setMaterialOpen(true)} onMouseLeave={() => setMaterialOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-white/85 hover:text-white transition-colors" data-testid="navbar-materials-trigger">
              By Material <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {materialOpen && (
              <div className="absolute top-full left-0 pt-2 w-56" data-testid="navbar-materials-menu">
                <div className="bg-charcoal border border-white/10 rounded-lg shadow-2xl p-2">
                  {MATERIALS.map((m) => (
                    <Link
                      key={m.slug}
                      to={`/materials/${m.slug}`}
                      className="block px-3 py-2.5 rounded-md text-white/85 hover:bg-white/10 hover:text-white text-sm transition-colors"
                      data-testid={`navbar-material-link-${m.slug}`}
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/products" className="px-3 py-2 text-white/85 hover:text-white transition-colors" data-testid="navbar-all-gloves-link">
            All Gloves
          </NavLink>
          <NavLink to="/sizing-guide" className="px-3 py-2 text-white/85 hover:text-white transition-colors" data-testid="navbar-sizing-guide-link">
            Sizing Guide
          </NavLink>
          <NavLink to="/glove-guide" className="px-3 py-2 text-white/85 hover:text-white transition-colors" data-testid="navbar-glove-guide-link">
            Glove Guide
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <form onSubmit={onSearch} className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gloves..."
              className="bg-white/10 text-white placeholder:text-white/40 text-sm rounded-full pl-9 pr-4 py-2 w-40 lg:w-52 focus:outline-none focus:ring-2 focus:ring-safety-orange transition-all"
              data-testid="navbar-search-input"
            />
          </form>
          <Button
            asChild
            className="hidden sm:flex bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold"
            data-testid="navbar-quote-button"
          >
            <Link to="/quote">Get Case Pricing</Link>
          </Button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 text-white hover:text-safety-yellow transition-colors"
            data-testid="navbar-cart-button"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-safety-orange text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center" data-testid="navbar-cart-count">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            data-testid="navbar-mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ink border-t border-white/10 px-4 py-4 space-y-1" data-testid="navbar-mobile-drawer">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gloves..."
              className="bg-white/10 text-white placeholder:text-white/40 text-sm rounded-full px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-safety-orange"
              data-testid="navbar-mobile-search-input"
            />
          </form>
          <p className="text-white/50 text-xs uppercase tracking-widest px-2 pt-2">By Industry</p>
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2 text-white/85 hover:text-white text-sm"
              data-testid={`navbar-mobile-industry-link-${ind.slug}`}
            >
              {ind.shortName}
            </Link>
          ))}
          <p className="text-white/50 text-xs uppercase tracking-widest px-2 pt-3">By Material</p>
          {MATERIALS.map((m) => (
            <Link key={m.slug} to={`/materials/${m.slug}`} onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 hover:text-white text-sm">
              {m.name}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-3 pt-3 space-y-1">
            <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 text-sm">All Gloves</Link>
            <Link to="/sizing-guide" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 text-sm">Sizing Guide</Link>
            <Link to="/glove-guide" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 text-sm">Glove Guide</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 text-sm">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-white/85 text-sm">Contact</Link>
          </div>
          <Button asChild className="w-full bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold mt-3">
            <Link to="/quote" onClick={() => setMobileOpen(false)}>Get Case Pricing</Link>
          </Button>
        </div>
      )}
    </header>
  );
};
