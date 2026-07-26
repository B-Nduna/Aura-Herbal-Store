import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag, X, Plus, Minus, Menu,
  Phone, Instagram, Facebook, Sparkles, MessageCircle
} from "lucide-react";

// Store WhatsApp number in international format, digits only (no +, no
// spaces, no leading 0). Update this one place if the client's number
// changes — it's used for both the footer link and the order flow.
const WHATSAPP_NUMBER = "27767153370";

// Real product photography from the client. Attraction Salts has no
// dedicated photo yet — keeping a neutral placeholder there until one is
// supplied.
const PRODUCTS = [
  { id: "aura",       name: "Aura Salts",         intent: "For cleansing",  price: 200, desc: "Our foundational blend — clears stagnant energy and resets the space around you.", image: "/images/AuraCleanser.jpg" },
  { id: "lucky",      name: "Lucky Salts",        intent: "For luck",       price: 250, desc: "A brighter blend carried for fortune, opportunity and good timing.", image: "/images/LuckySalts.jpg" },
  { id: "attraction", name: "Attraction Salts",   intent: "For attraction", price: 350, desc: "Warms the space you enter — for connection, charm and drawing people close.", image: "/images/ProtectionSalts.jpg" },
  { id: "protection", name: "Protection Salts",   intent: "For protection", price: 350, desc: "A grounding blend to hold at your door or on your person for safekeeping.", image: "/images/Proctection_Salts.jpg" },
  { id: "fertility",  name: "Fertility Tea",      intent: "For fertility",  price: 150, desc: "A gentle herbal tea steeped for nurturing, patience and new beginnings.", image: "/images/Fertility_kit.jpg" },
  { id: "lebaso",     name: "Lebaso la Business",  intent: "For business",   price: 300, desc: "A traditional charm blend carried for growth, income and steady prosperity.", image: "/images/Lebaso.jpeg" },
];

const RAND = (n) => `R${n.toFixed(2)}`;


function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("aura-fonts")) return;
    const link = document.createElement("link");
    link.id = "aura-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Work+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const serif = { fontFamily: "'Fraunces', serif" };
const script = { fontFamily: "'Fraunces', serif", fontStyle: "italic" };
const sans = { fontFamily: "'Work Sans', sans-serif" };

function PetalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <span className="h-px w-16 sm:w-32 bg-rose-200" />
      <Sparkles size={14} className="text-rose-300 animate-soft-float" />
      <span className="h-px w-16 sm:w-32 bg-rose-200" />
    </div>
  );
}

function PageTransition({ children, className = "" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`transition-all duration-700 ease-out ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
      {children}
    </div>
  );
}

function Header({ page, setPage, cartCount, setCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  const go = (id) => { setPage(id); setMenuOpen(false); };
  return (
    <header className="sticky top-0 z-40 bg-rose-50/90 backdrop-blur border-b border-rose-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-3 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95">
          <img src="/images/Aura.png" alt="Aura Herbal Store" className="h-14 w-auto" />
        </button>

        <nav className="hidden md:flex gap-9">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-300 ease-out ${
                page === l.id ? "text-stone-800 border-rose-400" : "text-stone-500 border-transparent hover:text-stone-800"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setCartOpen(true)} className="relative text-stone-700 hover:text-rose-500 transition-all duration-300 ease-out hover:scale-110 active:scale-95" aria-label="Open cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-400 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-stone-700 transition-all duration-300 ease-out hover:scale-110 active:scale-95" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-rose-100 bg-white transition-all duration-300 ease-out">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full text-left px-6 py-4 text-sm uppercase tracking-wide border-b border-rose-50 transition-all duration-300 ease-out ${
                page === l.id ? "text-rose-500" : "text-stone-600"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function ProductCard({ product, onAdd, added }) {
  return (
    <div className="group bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] flex flex-col overflow-hidden card-interactive">
      <div className="aspect-[4/3] w-full overflow-hidden bg-rose-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-7 flex flex-col flex-grow">
        <div className="text-[11px] uppercase tracking-widest text-rose-400 mb-2 font-medium">{product.intent}</div>
        <h3 style={serif} className="text-xl text-stone-800 mb-2 font-medium">{product.name}</h3>
        <p className="text-sm text-stone-500 mb-6 flex-grow leading-relaxed">{product.desc}</p>
        <div className="flex items-center justify-between pt-5 border-t border-rose-50">
          <span style={serif} className="text-stone-800 text-lg">{RAND(product.price)}</span>
          <button
            onClick={() => onAdd(product)}
            className={`text-xs uppercase tracking-wide px-4 py-2.5 rounded-full border transition-all duration-300 ease-out active:scale-95 ${
              added
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-rose-300 text-rose-500 hover:bg-rose-400 hover:text-white hover:border-rose-400"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage, addToCart }) {
  const [justAdded, setJustAdded] = useState(null);
  const handleAdd = (product) => {
    addToCart(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1400);
  };
  const featured = PRODUCTS.slice(0, 3);
  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden bg-gradient-to-b from-rose-50 to-transparent">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-rose-400 mb-6 font-medium">
              <span className="w-5 h-px bg-rose-300" /> Small-batch herbal &amp; self-care rituals
            </div>
            <h1 style={serif} className="text-4xl md:text-5xl leading-tight text-stone-800 mb-6">
              Cleanse what lingers.<br />
              Carry <em style={script} className="text-rose-500">what serves you.</em>
            </h1>
            <p className="text-stone-500 max-w-md mb-8 leading-relaxed">
              Aura Herbal Store blends salts, teas and charms for cleansing, protection, attraction and prosperity —
              gentle, hand-measured rituals to fold into your everyday.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => setPage("products")} className="bg-stone-800 hover:bg-stone-700 text-rose-50 text-xs uppercase tracking-widest px-7 py-3.5 font-medium rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
                Shop the salts
              </button>
              <button onClick={() => setPage("about")} className="border border-stone-300 hover:border-stone-800 hover:text-stone-900 text-stone-700 text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
                Our practice
              </button>
            </div>

            <div className="flex gap-8 flex-wrap mt-14 pt-8 border-t border-rose-100">
              {[["Cleanse", "Aura Salts"], ["Attract", "Lucky & Attraction"], ["Protect", "Protection Salts"], ["Prosper", "Lebaso la Business"]].map(([k, v]) => (
                <div key={k} className="text-xs uppercase tracking-widest text-stone-400">
                  {k}
                  <strong style={serif} className="block text-lg text-stone-800 normal-case tracking-normal mt-1 font-medium">{v}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-rose-100 rounded-[2rem] -z-10 hidden sm:block" />
            <div className="aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-lg">
              <img src="/images/AuraSalts_Family.jpg" alt="Aura Herbal Store salt jars" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <PetalDivider />

      <section className="py-16 px-6 text-center">
        <p style={script} className="max-w-xl mx-auto text-stone-600 text-2xl leading-relaxed">
          "Every salt is measured, blessed and packed by hand — a small ritual before it begins yours."
        </p>
      </section>

      <section className="py-16 px-6 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-rose-400 mb-3 font-medium">Shop the collection</div>
              <h2 style={serif} className="text-3xl md:text-4xl text-stone-800">Featured Items</h2>
            </div>
            <button onClick={() => setPage("products")} className="text-xs uppercase tracking-widest text-stone-700 border-b border-stone-800 pb-1 hover:text-rose-500 hover:border-rose-400 transition-all duration-300 ease-out hover:-translate-y-0.5">
              View all products
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} added={justAdded === p.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductsPage({ cart, addToCart }) {
  const [justAdded, setJustAdded] = useState(null);
  const handleAdd = (product) => {
    addToCart(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1400);
  };
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-400 mb-3 font-medium">Shop the collection</div>
            <h2 style={serif} className="text-3xl md:text-4xl text-stone-800">Featured Items</h2>
          </div>
          <p className="text-stone-500 text-sm max-w-xs">Six blends, each carrying a different intention. Choose the one your moment calls for.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} added={justAdded === p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ setPage }) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-rose-50 rounded-[2rem] -z-10 hidden sm:block" />
          <div className="aspect-[4/5] rounded-3xl relative overflow-hidden shadow-lg">
            <img src="/images/about.jpg" alt="Dried herbs used in Aura Herbal blends" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/70 to-transparent px-6 pt-10 pb-6 text-xs uppercase tracking-widest text-white">
              Salts, measured by hand
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-rose-400 mb-3 font-medium">Our story</div>
          <h2 style={serif} className="text-3xl text-stone-800 mb-5">About Aura Herbals</h2>
          <p className="text-stone-500 mb-4 leading-relaxed">
            We are dedicated to promoting holistic wellness through nature's finest offerings. Specialising in organic
            aura cleansing salts, we provide products designed to help restore balance, cleanse negative energy and
            nurture spiritual well-being.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Organic, hand-measured ingredients in every batch",
              "Rooted in traditional Southern African herbal practice",
              "Made to order, never mass-produced",
            ].map((t) => (
              <li key={t} className="flex gap-3 items-start text-sm text-stone-500">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <button onClick={() => setPage("contact")} className="mt-8 border border-stone-300 hover:border-stone-800 hover:text-stone-900 text-stone-700 text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}

function buildWhatsAppMessage({ form, cart, total }) {
  const lines = [];
  lines.push("Hi Aura Herbal Store! I'd like to place an order:");
  lines.push("");
  cart.forEach((it) => {
    lines.push(`• ${it.name} x${it.qty} — ${RAND(it.price * it.qty)}`);
  });
  lines.push("");
  lines.push(`Total: ${RAND(total)}`);
  lines.push("");
  lines.push(`Name: ${form.name}`);
  lines.push(`Phone: ${form.phone}`);
  lines.push(`Delivery address: ${form.address}, ${form.city}`);
  if (form.notes.trim()) lines.push(`Notes: ${form.notes}`);
  return lines.join("\n");
}

function ContactPage({ cart, total, updateQty, removeItem, clearCart }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [orderSent, setOrderSent] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (cart.length === 0) errs.cart = "Your cart is empty — add a product first";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const message = buildWhatsAppMessage({ form, cart, total });
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setOrderSent({ ...form, items: cart, total, waUrl });
    window.open(waUrl, "_blank", "noopener,noreferrer");
    clearCart();
  };

  if (orderSent) {
    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={26} className="text-white" />
          </div>
          <h2 style={serif} className="text-3xl text-stone-800 mb-3">Order sent via WhatsApp</h2>
          <p className="text-stone-500 mb-8">
            We've opened WhatsApp with your order ready to send to Aura Herbal Store. If it didn't open automatically,
            tap the button below — Aura will confirm your order and delivery to {orderSent.city} directly with you there.
          </p>
          <a
            href={orderSent.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest px-7 py-3.5 font-medium rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] mb-8"
          >
            <MessageCircle size={16} /> Open WhatsApp
          </a>
          <div className="text-left border border-rose-100 bg-rose-50 p-6 rounded-2xl">
            {orderSent.items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm text-stone-600 py-2 border-b border-rose-100 last:border-0">
                <span>{it.name} × {it.qty}</span>
                <span>{RAND(it.price * it.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 mt-2 text-stone-800" style={serif}>
              <span>Total</span>
              <span>{RAND(orderSent.total)}</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-6">No online payment is taken — Aura will arrange payment and delivery with you over WhatsApp.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <h2 style={serif} className="text-3xl text-stone-800 mb-2">Checkout</h2>
          <p className="text-stone-500 text-sm mb-6">Tell us where to send your order — we'll confirm everything with you over WhatsApp.</p>

          {errors.cart && <p className="text-sm text-rose-500">{errors.cart}</p>}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
            <Field label="Phone (WhatsApp)" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} />
            <Field label="Delivery address" name="address" value={form.address} onChange={handleChange} error={errors.address} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">Order notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white border border-stone-200 focus:border-rose-300 outline-none rounded-xl px-4 py-3 text-stone-800 text-sm"
            />
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest px-7 py-4 font-medium rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]">
            <MessageCircle size={16} /> Send order via WhatsApp
          </button>
          <p className="text-xs text-stone-400">No online payment is taken. Aura will confirm pricing, payment and delivery with you directly on WhatsApp.</p>
        </form>

        <div className="md:col-span-2">
          <h3 style={serif} className="text-lg text-stone-800 mb-4">Your order</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-stone-400">Your cart is empty.</p>
          ) : (
            <div className="border border-rose-100 bg-rose-50 rounded-2xl divide-y divide-rose-100">
              {cart.map((it) => (
                <div key={it.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-stone-800 truncate">{it.name}</p>
                    <p className="text-xs text-stone-400">{RAND(it.price)} each</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-6 h-6 flex items-center justify-center border border-stone-300 rounded-full text-stone-600 hover:border-rose-400 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm text-stone-800 w-4 text-center">{it.qty}</span>
                    <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-6 h-6 flex items-center justify-center border border-stone-300 rounded-full text-stone-600 hover:border-rose-400 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                      <Plus size={12} />
                    </button>
                    <button onClick={() => removeItem(it.id)} className="text-stone-400 hover:text-rose-500 ml-1 transition-all duration-300 ease-out hover:scale-110 active:scale-95" aria-label={`Remove ${it.name}`}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-4 flex justify-between items-center">
                <span className="text-stone-600 text-sm" style={sans}>Total</span>
                <span style={serif} className="text-stone-800 text-lg">{RAND(total)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function Field({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-white border outline-none rounded-xl px-4 py-3 text-stone-800 text-sm transition-all duration-300 ease-out ${
          error ? "border-rose-400" : "border-stone-200 focus:border-rose-300"
        }`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

function CartDrawer({ open, onClose, cart, total, updateQty, removeItem, setPage }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white border-l border-rose-100 h-full flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-rose-100">
          <h3 style={serif} className="text-lg text-stone-800">Your cart</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-800 transition-all duration-300 ease-out hover:scale-110 active:scale-95" aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-sm text-stone-400">Nothing here yet — add a salt or tea to begin.</p>
          ) : cart.map((it) => (
            <div key={it.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-stone-800 truncate">{it.name}</p>
                <p className="text-xs text-stone-400">{RAND(it.price)} each</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-6 h-6 flex items-center justify-center border border-stone-300 rounded-full text-stone-600 hover:border-rose-400 transition-all duration-300 ease-out hover:scale-110 active:scale-95"><Minus size={12} /></button>
                <span className="text-sm text-stone-800 w-4 text-center">{it.qty}</span>
                <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-6 h-6 flex items-center justify-center border border-stone-300 rounded-full text-stone-600 hover:border-rose-400 transition-all duration-300 ease-out hover:scale-110 active:scale-95"><Plus size={12} /></button>
                <button onClick={() => removeItem(it.id)} className="text-stone-400 hover:text-rose-500 ml-1 transition-all duration-300 ease-out hover:scale-110 active:scale-95" aria-label={`Remove ${it.name}`}><X size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-rose-100">
          <div className="flex justify-between mb-4 text-stone-800">
            <span className="text-sm" style={sans}>Total</span>
            <span style={serif} className="text-lg">{RAND(total)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => { setPage("contact"); onClose(); }}
            className="w-full bg-stone-800 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-rose-50 text-xs uppercase tracking-widest px-7 py-3.5 font-medium rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="px-6 pt-16 pb-10 border-t border-rose-100 bg-rose-50 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-10 pb-10 border-b border-rose-100 mb-7">
          <div className="max-w-xs">
            <img src="/images/Logo.png" alt="Aura Herbal Store" className="h-14 w-auto mb-3" />
            <p className="text-sm text-stone-500">Herbal salts and teas for cleansing, protection, attraction and prosperity — made with intention.</p>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-rose-400 mb-4 font-medium">Explore</h4>
              {["home", "products", "about"].map((id) => (
                <button key={id} onClick={() => setPage(id)} className="block text-sm text-stone-500 hover:text-stone-800 mb-2 capitalize transition-all duration-300 ease-out hover:translate-x-1">{id}</button>
              ))}
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-rose-400 mb-4 font-medium">Support</h4>
              <button onClick={() => setPage("contact")} className="block text-sm text-stone-500 hover:text-stone-800 mb-2 transition-all duration-300 ease-out hover:translate-x-1">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-wide text-stone-400">© 2026 Aura Herbals</p>
          <div className="flex gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-rose-200 flex items-center justify-center text-stone-500 hover:text-rose-500 hover:border-rose-400 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105">
              <Phone size={14} />
            </a>
            <a href="https://www.instagram.com/pretty_aura26" aria-label="Instagram" className="w-9 h-9 rounded-full border border-rose-200 flex items-center justify-center text-stone-500 hover:text-rose-500 hover:border-rose-400 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105">
              <Instagram size={14} />
            </a>
            <a href="https://www.facebook.com/regoratile.setibelo" aria-label="Facebook" className="w-9 h-9 rounded-full border border-rose-200 flex items-center justify-center text-stone-500 hover:text-rose-500 hover:border-rose-400 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105">
              <Facebook size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AuraHerbalStore() {
  useGoogleFonts();
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((it) => it.id !== id);
      return prev.map((it) => (it.id === id ? { ...it, qty } : it));
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const clearCart = () => setCart([]);

  const total = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="min-h-screen bg-white" style={sans}>
      <Header page={page} setPage={setPage} cartCount={cartCount} setCartOpen={setCartOpen} />

      {page === "home" && (
        <PageTransition key="home">
          <HomePage setPage={setPage} addToCart={addToCart} />
        </PageTransition>
      )}
      {page === "products" && (
        <PageTransition key="products">
          <ProductsPage cart={cart} addToCart={addToCart} />
        </PageTransition>
      )}
      {page === "about" && (
        <PageTransition key="about">
          <AboutPage setPage={setPage} />
        </PageTransition>
      )}
      {page === "contact" && (
        <PageTransition key="contact">
          <ContactPage cart={cart} total={total} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} />
        </PageTransition>
      )}

      <Footer setPage={setPage} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={total}
        updateQty={updateQty}
        removeItem={removeItem}
        setPage={setPage}
      />
    </div>
  );
}