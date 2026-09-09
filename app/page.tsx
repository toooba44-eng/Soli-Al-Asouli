"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";

const categories = [
  { name: "عطور", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85" },
  { name: "بخور", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85" },
  { name: "الريحة السودانية", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85" },
  { name: "منتجات سودانية", image: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?auto=format&fit=crop&w=1200&q=85" },
];

const products = [
  {
    id: 1,
    name: "خمرة سولي",
    category: "الريحة السودانية",
    price: 120,
    note: "مسك · صندل · ورد",
    badge: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "بخور الأصالة",
    category: "بخور",
    price: 95,
    note: "عود · عنبر · دخان دافئ",
    badge: "توقيع سولي",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "عطر نيل",
    category: "عطور",
    price: 185,
    note: "حمضيات · مسك · أخشاب",
    badge: "جديد",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "دلكة العروس",
    category: "منتجات سودانية",
    price: 80,
    note: "محلب · صندل · عطر سوداني",
    badge: "طقس سوداني",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    name: "مسك سولي",
    category: "عطور",
    price: 140,
    note: "مسك أبيض · فانيلا · ورد",
    badge: "ناعم",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    name: "بوكس البيت السوداني",
    category: "منتجات سودانية",
    price: 240,
    note: "خمرة · بخور · دلكة",
    badge: "هدية",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
  },
];

type CartLine = { id: number; qty: number };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = useMemo(
    () => activeFilter === "الكل" ? products : products.filter((product) => product.category === activeFilter),
    [activeFilter]
  );

  const cartItems = cart.map((line) => ({
    ...products.find((product) => product.id === line.id)!,
    qty: line.qty,
  }));

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (id: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);
      return existing
        ? current.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { id, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <main>
      <div className="announcement">شحن مجاني للطلبات فوق 300 ر.س · أهلاً بك في بيت الريحة السودانية</div>

      <header className="site-header">
        <button className="icon-btn mobile-only" aria-label="فتح القائمة" onClick={() => setMenuOpen(true)}><Menu /></button>
        <a href="#home" className="logo" aria-label="سولي العسولي">
          <span className="logo-mark">س</span>
          <span><strong>سولي العسولي</strong><small>SOLI AL-ASOULI</small></span>
        </a>
        <nav className="desktop-nav">
          <a href="#home">الرئيسية</a>
          <a href="#shop">المتجر</a>
          <a href="#ritual">الريحة السودانية</a>
          <a href="#gifts">الهدايا</a>
          <a href="#story">قصتنا</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn desktop-only" aria-label="البحث"><Search /></button>
          <button className="icon-btn desktop-only" aria-label="المفضلة"><Heart /></button>
          <button className="icon-btn cart-button" aria-label="السلة" onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <Image
          src="https://images.unsplash.com/photo-1595150358733-9a5f2a7a64f3?auto=format&fit=crop&w=2200&q=90"
          alt="مشهد عطري فاخر"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <span className="eyebrow light">من السودان · بحب</span>
          <h1>ريحة تحكي<br />حكاية السودان</h1>
          <p>عطور وبخور وطقوس سودانية أصيلة، صغناها بروح معاصرة لتأخذي إحساس البيت معك أينما كنتِ.</p>
          <div className="hero-actions">
            <a href="#shop" className="button primary">تسوقي المجموعة <ArrowLeft size={18} /></a>
            <a href="#story" className="button ghost">اكتشفي حكايتنا</a>
          </div>
        </div>
        <div className="scroll-hint">مرري للاكتشاف <ChevronDown size={16} /></div>
      </section>

      <section className="section container">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">اكتشفي عالم سولي</span><h2>تسوقي حسب الطقس</h2></div>
          <p>كل رائحة لها لحظة، وكل طقس يحمل ذاكرة. اختاري الباب الذي يأخذك إلى مزاجك.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a href="#shop" className={`category-card category-${index + 1}`} key={category.name} onClick={() => setActiveFilter(category.name)}>
              <Image src={category.image} alt={category.name} fill sizes="(max-width: 800px) 50vw, 25vw" />
              <div className="category-shade" />
              <div className="category-copy"><span>0{index + 1}</span><h3>{category.name}</h3><span className="round-arrow"><ArrowLeft size={18} /></span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section shop-section" id="shop">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">مختاراتنا</span>
            <h2>الأكثر حبًا</h2>
            <p>روائح صنعت لتصبح جزءًا من يومك، بيتك، ومناسباتك.</p>
          </div>
          <div className="filters" role="tablist" aria-label="تصفية المنتجات">
            {["الكل", "عطور", "بخور", "الريحة السودانية", "منتجات سودانية"].map((filter) => (
              <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-media">
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                  <span className="badge">{product.badge}</span>
                  <button className={`favorite ${favorites.includes(product.id) ? "selected" : ""}`} aria-label="إضافة للمفضلة" onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                  <button className="quick-add" onClick={() => addToCart(product.id)}>أضيفي للسلة <Plus size={17} /></button>
                </div>
                <div className="product-copy">
                  <div><small>{product.category}</small><h3>{product.name}</h3><p>{product.note}</p></div>
                  <strong>{product.price} ر.س</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="signature-section">
        <div className="signature-image">
          <Image src="https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=1600&q=90" alt="مجموعة سولي المميزة" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="signature-copy">
          <span className="eyebrow light">Signature collection</span>
          <h2>ليست مجرد رائحة…<br />بل ذاكرة.</h2>
          <p>مجموعة مستوحاة من البخور، الصندل، المحلب، المسك، الورد والدخان الدافئ الذي يملأ البيوت السودانية.</p>
          <div className="note-cloud"><span>مسك</span><span>محلب</span><span>صندل</span><span>عنبر</span><span>ورد</span></div>
          <a href="#shop" className="text-link">اكتشفي مجموعة سولي <ArrowLeft size={18} /></a>
        </div>
      </section>

      <section className="section ritual-section container" id="ritual">
        <div className="ritual-intro">
          <span className="eyebrow">تراث يتجدد</span>
          <h2>الريحة السودانية</h2>
          <p>أكثر من عطر. هي طقوس جمال ودفء وضيافة انتقلت من جيل إلى جيل.</p>
        </div>
        <div className="ritual-grid">
          {["الخمرة", "الدلكة", "البخور", "المحلب", "المسك", "الصندل"].map((item, index) => (
            <div className="ritual-item" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{index % 2 === 0 ? "دفء وعمق يثبت على البشرة ويحكي حضورًا سودانيًا أصيلًا." : "طقس عناية عطري يربط الجمال بالموروث والذاكرة."}</p></div>
          ))}
        </div>
      </section>

      <section className="scent-finder">
        <div className="container scent-inner">
          <div><span className="eyebrow light">Find your scent</span><h2>أي ريحة تشبهك؟</h2><p>ابدئي من الإحساس الذي تحبينه، وسنقودك للمجموعة الأقرب لمزاجك.</p></div>
          <div className="mood-grid">
            {["دافئة", "ناعمة", "شرقية", "دخانية", "حلوة", "منعشة"].map((mood) => <button key={mood}>{mood}<Sparkles size={17} /></button>)}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading centered"><span className="eyebrow">كيف تعيشين التجربة؟</span><h2>طقوس سولي</h2></div>
        <div className="steps">
          {["جهزي المبخرة", "اختاري بخورك", "دعي الدخان يملأ المكان", "أكملي الطقس بالخمرة أو العطر"].map((step, index) => (
            <div className="step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><div className="step-line" /><h3>{step}</h3></div>
          ))}
        </div>
      </section>

      <section className="gift-section" id="gifts">
        <Image src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=2000&q=90" alt="هدايا سولي" fill sizes="100vw" />
        <div className="gift-overlay" />
        <div className="container gift-copy"><span className="eyebrow light">هدايا تحمل معنى</span><h2>هدية برائحة السودان</h2><p>بوكسات مختارة للعروس، البيت، المناسبات ولمن تحبين. ويمكنك تكوين بوكسك بطريقتك.</p><a href="#shop" className="button primary">اكتشفي الهدايا <ArrowLeft size={18} /></a></div>
      </section>

      <section className="story-section" id="story">
        <div className="story-copy"><span className="eyebrow">قصتنا</span><h2>من السودان…<br />إلى كل مكان</h2><p>بدأت سولي العسولي من رغبة بسيطة: أن نحفظ رائحة البيت السوداني ونقدمها بلغة تليق بالحاضر. نأخذ من طقوسنا الأصيلة، ونصنع منها تجربة حسية معاصرة، أنيقة وقريبة من القلب.</p><a href="#ritual" className="text-link dark">تعرفي على الريحة السودانية <ArrowLeft size={18} /></a></div>
        <div className="story-image"><Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1500&q=85" alt="حكاية سولي" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
      </section>

      <section className="section reviews container">
        <div className="section-heading centered"><span className="eyebrow">قالوا عن سولي</span><h2>محبة تشبه الريحة</h2></div>
        <div className="review-grid">
          {[
            ["الخمرة ثباتها جميل جدًا وريحتها فعلًا رجعتني للبيت.", "سارة م."],
            ["التغليف راقٍ والبخور مميز، واضح إن في عناية بكل تفصيلة.", "مها ع."],
            ["بوكس الهدية كان أجمل من الصور، وريحتهم بقيت جزء من البيت.", "ريم أ."],
          ].map(([text, name]) => (
            <figure key={name}><div className="stars">{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill="currentColor" />)}</div><blockquote>“{text}”</blockquote><figcaption>{name}</figcaption></figure>
          ))}
        </div>
      </section>

      <section className="social-section">
        <div className="container social-heading"><div><span className="eyebrow">من مجتمعنا</span><h2>@SoliAlAsouli</h2></div><a href="#"><Instagram size={19} /> تابعي سولي</a></div>
        <div className="social-grid">
          {[
            "https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80",
          ].map((src, index) => <div className="social-image" key={src}><Image src={src} alt={`سولي ${index + 1}`} fill sizes="25vw" /></div>)}
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><a href="#home" className="logo footer-logo"><span className="logo-mark">س</span><span><strong>سولي العسولي</strong><small>SOLI AL-ASOULI</small></span></a><p>بيت حديث للريحة السودانية.<br />نحفظ الذاكرة في رائحة.</p></div>
          <div><h4>اكتشفي</h4><a href="#shop">المتجر</a><a href="#ritual">الريحة السودانية</a><a href="#gifts">الهدايا</a><a href="#story">قصتنا</a></div>
          <div><h4>خدمة العملاء</h4><a href="#">الشحن والتوصيل</a><a href="#">الاستبدال والاسترجاع</a><a href="#">الأسئلة الشائعة</a><a href="#">تواصل معنا</a></div>
          <div><h4>كوني قريبة</h4><p>اشتركي لتصلك الإصدارات الجديدة وطقوس سولي.</p><div className="newsletter"><input aria-label="البريد الإلكتروني" placeholder="بريدك الإلكتروني" type="email" /><button aria-label="اشتراك"><ArrowLeft size={18} /></button></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Soli Al-Asouli</span><span>صُنع بحب للثقافة السودانية</span><div><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">WhatsApp</a></div></div>
      </footer>

      <nav className="mobile-tabs">
        <a href="#home">الرئيسية</a><a href="#shop">المتجر</a><button onClick={() => setCartOpen(true)}><ShoppingBag size={19} /> السلة{cartCount > 0 ? ` (${cartCount})` : ""}</button>
      </nav>

      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}><X /></button>
        <div className="mobile-menu-logo">سولي العسولي</div>
        {["الرئيسية", "المتجر", "الريحة السودانية", "الهدايا", "قصتنا"].map((label, index) => <a key={label} href={["#home", "#shop", "#ritual", "#gifts", "#story"][index]} onClick={() => setMenuOpen(false)}>{label}<ArrowLeft size={18} /></a>)}
      </aside>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />}
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head"><div><span>سلة سولي</span><small>{cartCount} منتج</small></div><button className="close-btn" onClick={() => setCartOpen(false)}><X /></button></div>
        <div className="cart-lines">
          {cartItems.length === 0 ? (
            <div className="empty-cart"><ShoppingBag size={42} /><h3>السلة بانتظار ريحتك</h3><p>أضيفي المنتجات التي تحبينها وسنحتفظ بها هنا.</p><button className="button primary" onClick={() => setCartOpen(false)}>اكتشفي المتجر</button></div>
          ) : cartItems.map((item) => (
            <div className="cart-line" key={item.id}>
              <div className="cart-thumb"><Image src={item.image} alt={item.name} fill sizes="90px" /></div>
              <div className="cart-info"><h4>{item.name}</h4><small>{item.note}</small><strong>{item.price} ر.س</strong><div className="qty"><button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button></div></div>
              <button className="remove" onClick={() => setCart((current) => current.filter((line) => line.id !== item.id))}><Trash2 size={17} /></button>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && <div className="cart-footer"><div><span>المجموع</span><strong>{total} ر.س</strong></div><p>الشحن والضريبة تُحسب عند إتمام الطلب.</p><button className="checkout">إتمام الطلب <ArrowLeft size={18} /></button><small>دفع آمن · تغليف بعناية · شحن موثوق</small></div>}
      </aside>
    </main>
  );
}
