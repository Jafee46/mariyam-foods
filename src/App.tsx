/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  Menu,
  X,
  Star,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  MapPin,
  CheckCircle2,
  Loader2,
  Sparkles,
  Download,
  Image as ImageIcon,
  Mail,
  Phone,
  Send,
  Quote
} from "lucide-react";
import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const BRAND_NAME = "MARIYAM FOODS";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const HERO_OPTIONS = [
  {
    headline: "Nature's Purest Energy, Harvested for Your Vitality.",
    sub: "From sun-drenched orchards to your doorstep, experience the peak of freshness."
  },
  {
    headline: "The Art of Ethical Snacking: Earthy, Honest, Exceptional.",
    sub: "Sophisticated flavors rooted in tradition and nourished by the earth."
  },
  {
    headline: "Nourish Your Soul with the Gold of the Earth.",
    sub: "Premium nuts and dried fruits, ethically sourced and meticulously selected."
  }
];

const WHY_US = [
  {
    title: "Small-Batch Integrity",
    desc: "Unlike mass-produced grocery brands, we roast and pack in small batches to ensure every nut retains its natural oils and peak flavor profile.",
    icon: <Leaf className="w-6 h-6" />
  },
  {
    title: "Zero Preservatives",
    desc: "We believe nature is perfect as it is. Our products contain no sulfur, no artificial colors, and no hidden additives—just pure, honest food.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Farm-to-Door Transparency",
    desc: "We skip the middlemen. By sourcing directly from ethical growers, we ensure fair wages for farmers and the shortest journey possible to your kitchen.",
    icon: <Truck className="w-6 h-6" />
  },
  {
    title: "Meticulous Selection",
    desc: "Only the top 5% of the harvest makes it into a Mariyam Foods bag. We hand-sort for size, color, and texture to guarantee a premium experience.",
    icon: <Star className="w-6 h-6" />
  }
];

const PRODUCTS = [
  {
    id: "almonds",
    name: "Premium California Almonds",
    price: "₹249",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800",
    description: "Our Premium California Almonds are a testament to the golden sun of the Central Valley. Each nut is harvested at the precise moment of maturity, ensuring a snap that resonates with freshness. These aren't just snacks; they are concentrated capsules of raw energy, bursting with heart-healthy fats and a rich supply of Vitamin E. The texture is firm and satisfying, yielding to a creamy, slightly sweet interior that lingers on the palate. Whether enjoyed as a midday fuel source or as a sophisticated addition to a charcuterie board, these almonds provide a clean, powerful boost without the need for salt or oil. We preserve their natural integrity, allowing the subtle, woody undertones to shine through. Experience the difference of an almond that hasn't spent months on a warehouse shelf—just pure, unadulterated vitality from the orchard to you.",
    focus: "Crunch, Vitamin E, Raw Energy"
  },
  {
    id: "cashews",
    name: "cashew",
    price: "₹349",
    image: "https://images.unsplash.com/photo-1723466998040-78d7e2ef6d72?q=80&w=870?auto=format&fit=crop&q=80&w=800",
    description: "Our W240 Cashews are the epitome of creamy indulgence. Hand-picked for their size and ivory color, these cashews offer a buttery texture that melts in your mouth. They are a rich source of magnesium and healthy fats, making them a perfect brain-boosting snack. Lightly toasted to enhance their natural sweetness, they are an essential for any premium pantry.",
    focus: "Creamy, Buttery, Heart-Healthy"
  },
  {
    id: "grapes-cherries",
    name: "Premium Black Dry Grapes",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1608842850202-06e70ead4c10?q=80&w=387?auto=format&fit=crop&q=80&w=800",
    description: "Our Premium Black Dry Grapes are sun-dried to perfection, concentrating their natural sugars into a burst of intense flavor. These antioxidant-rich gems offer a perfect balance of tangy and sweet notes. Each grape is carefully dried to preserve its natural juices, providing a burst of energy and flavor in every handful. Ideal for snacking or as a topping for your morning yogurt.",
    focus: "Antioxidants, Tangy-Sweet, Energy"
  },
  {
    id: "dates",
    name: "Arabian Dates",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=871?auto=format&fit=crop&q=80&w=800",
    description: "Sourced from the finest orchards of Arabia, our dates are exceptionally large, soft, and sweet. With a texture reminiscent of caramel and a rich, deep flavor, they are nature's most luxurious candy. Packed with fiber and potassium, they provide a sustained energy boost without the sugar crash.",
    focus: "Caramel Sweetness, Natural Energy, Soft"
  },
  {
    id: "nuts-honey",
    name: "Wild Forest Honey- Nuts",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1708187813725-22d0141139d4?q=80&w=870?auto=format&fit=crop&q=80&w=800",
    description: "A gourmet blend of almonds, walnuts, and cashews, slow-roasted and glazed with pure wild forest honey. This artisanal snack combines the earthy crunch of premium nuts with the floral sweetness of raw honey. It's a sophisticated treat that satisfies both sweet and savory cravings.",
    focus: "Sweet Crunch, Pure Honey, Gourmet"
  },
  {
    id: "fig-honey",
    name: "Sun-Dried Figs in Wild Honey",
    price: "₹549",
    image: "https://images.unsplash.com/photo-1729698598542-69472b8c10de?q=80&w=387?auto=format&fit=crop&q=80&w=800",
    description: "Our signature sun-dried figs, submerged in a jar of pure, golden wild honey. The figs absorb the honey, creating a jammy, decadent texture that is truly unique. This traditional delicacy is a powerhouse of nutrition and a perfect natural sweetener for desserts or cheese platters.",
    focus: "Jammy, Rich, Natural Sweetener"
  },
  {
    id: "figs",
    name: "Organic Dried Figs",
    price: "₹199",
    image: "https://images.unsplash.com/photo-1556216583-cb1ac9559189?w=400?auto=format&fit=crop&q=80&w=800",
    description: "Step into a sun-drenched Mediterranean orchard with our Organic Dried Figs. These succulent gems are dried naturally under the warmth of the sun, concentrating their honey-like sweetness into a rich, jammy core. The exterior is soft and slightly chewy, giving way to a delightful crunch from the tiny, fiber-rich seeds within. Each fig is a complex tapestry of flavor—notes of caramel, molasses, and a hint of wild flora. High in essential minerals and dietary fiber, they offer a sophisticated way to satisfy a sweet craving while nourishing your body. We select only the plumpest fruit, ensuring that every bite is moist and flavorful, never tough or dry. These figs are the perfect companion for a sharp goat cheese or a morning bowl of steel-cut oats, bringing a touch of ancient rustic elegance to your modern table.",
    focus: "Honey-like Sweetness, Fiber, Chewy Texture"
  }
];

const SEO_KEYWORDS = [
  "Premium organic nuts online",
  "Ethically sourced dried fruits",
  "California almonds raw energy",
  "Organic figs honey sweetness",
  "Arabian dates natural energy",
  "Cashews heart-healthy snacks",
  "Nuts in wild forest honey",
  "Premium black dry grapes",
  "Gourmet nut gift baskets",
  "Mariyam Foods premium snacks"
];

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Culinary Blogger",
    content: "The quality of the cashews is unmatched. They have this natural creaminess that you just don't find in store-bought brands. Mariyam Foods has become my go-to for all my baking needs.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "David Chen",
    role: "Fitness Coach",
    content: "I recommend the Arabian Dates to all my clients. They are the perfect natural pre-workout snack. No added sugars, just pure energy from the earth.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Elena Rodriguez",
    role: "Home Chef",
    content: "The honey-glazed nuts are a revelation. The balance of savory and sweet is perfect. They make for an incredible addition to my cheese boards.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

function CreativeStudio() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: `A high-end, professional product photograph for a premium brand called MARIYAM FOODS. The image should be sophisticated, earthy, and elegant. Subject: ${prompt}` }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("No image was generated. Please try a different prompt.");
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate image. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Inspiration Prompt</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A rustic wooden bowl filled with premium walnuts and dried figs on a linen cloth, soft morning light..."
            className="w-full h-40 p-6 bg-white border border-[#E5E0D0] rounded-3xl focus:ring-2 focus:ring-[#D4C3A3] focus:border-transparent transition-all resize-none text-[#2A2415] placeholder:text-[#2A2415]/30"
          />
        </div>
        <button 
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-5 bg-[#2A2415] text-white rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3D3522] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#2A2415]/10"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Cultivating Image...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Masterpiece</span>
            </>
          )}
        </button>
        {error && (
          <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">
            {error}
          </p>
        )}
      </div>

      <div className="relative aspect-square bg-white rounded-[2rem] border border-[#E5E0D0] overflow-hidden flex items-center justify-center shadow-inner">
        {generatedImage ? (
          <div className="relative w-full h-full group">
            <img 
              src={generatedImage} 
              alt="AI Generated Harvest" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <a 
                href={generatedImage} 
                download="mariyam-foods-inspiration.png"
                className="p-4 bg-white rounded-full text-[#2A2415] hover:scale-110 transition-transform"
              >
                <Download className="w-6 h-6" />
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center p-12 space-y-4">
            <div className="w-20 h-20 bg-[#F5F1E6] rounded-3xl flex items-center justify-center mx-auto text-[#D4C3A3]">
              <ImageIcon className="w-10 h-10" />
            </div>
            <p className="text-[#8B735B] font-medium italic">Your vision will appear here...</p>
          </div>
        )}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-[#F5F1E6] border-t-[#8B735B] rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#8B735B] animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-serif">Harvesting your imagination</p>
              <p className="text-sm text-[#8B735B] animate-pulse">This may take a few moments to ripen...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setCheckoutStep('cart');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const price = parseInt(product?.price.replace('₹', '').replace(',', '') || '0');
    return acc + (price * item.quantity);
  }, 0);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Call the backend to notify the owner
      const response = await fetch('/api/notify-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: {
            total: cartTotal.toLocaleString(),
            items: cart.map(item => ({
              id: item.id,
              quantity: item.quantity,
              name: PRODUCTS.find(p => p.id === item.id)?.name
            }))
          },
          customerAddress: address
        })
      });

      if (!response.ok) throw new Error('Failed to notify owner');

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      setCheckoutStep('success');
      setCart([]);
    } catch (error) {
      console.error('Order error:', error);
      setIsProcessing(false);
      // In a real app, we would show a toast or error message in the UI
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#3D3522] font-sans selection:bg-[#D4C3A3] selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-[#E8E2D2]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              className="lg:hidden p-2 hover:bg-[#F5F1E6] rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <a href="/" className="text-2xl font-bold tracking-[0.2em] text-[#2A2415]">
              {BRAND_NAME}
            </a>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
              <a href="#shop" className="hover:text-[#8B735B] transition-colors">Shop</a>
              <a href="#about" className="hover:text-[#8B735B] transition-colors">Story</a>
              <a href="#creative" className="hover:text-[#8B735B] transition-colors">Studio</a>
              <a href="#contact" className="hover:text-[#8B735B] transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-[#F5F1E6] rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#8B735B] text-white text-[10px] flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-[#FDFCF8] border-b border-[#E8E2D2] px-6 py-8 flex flex-col gap-6 text-lg font-medium"
          >
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>Shop</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>Story</a>
            <a href="#creative" onClick={() => setIsMenuOpen(false)}>Studio</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </nav>

      {/* Cart & Checkout Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#F5F1E6] flex items-center justify-between">
              <h2 className="text-xl font-serif">
                {checkoutStep === 'cart' && 'Your Basket'}
                {checkoutStep === 'address' && 'Delivery Details'}
                {checkoutStep === 'payment' && 'Secure Payment'}
                {checkoutStep === 'success' && 'Order Confirmed'}
              </h2>
              <button onClick={closeCart} className="p-2 hover:bg-[#F5F1E6] rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                      <ShoppingBag className="w-12 h-12 mb-4" />
                      <p className="font-medium">Your basket is empty</p>
                      <button 
                        onClick={closeCart}
                        className="mt-4 text-sm underline font-bold uppercase tracking-widest"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {cart.map(item => {
                        const product = PRODUCTS.find(p => p.id === item.id);
                        if (!product) return null;
                        return (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-20 h-24 bg-[#FDFCF8] rounded-xl overflow-hidden flex-shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h3 className="font-serif">{product.name}</h3>
                                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                              </div>
                              <p className="text-sm text-[#8B735B] mb-2">Qty: {item.quantity}</p>
                              <p className="font-medium">{product.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'address' && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Contact Information</h3>
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                      value={address.name}
                      onChange={(e) => setAddress({...address, name: e.target.value})}
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                      value={address.email}
                      onChange={(e) => setAddress({...address, email: e.target.value})}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                      value={address.phone}
                      onChange={(e) => setAddress({...address, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Shipping Address</h3>
                    <input 
                      type="text" 
                      placeholder="Street Address"
                      className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="City"
                        className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="Pincode"
                        className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]"
                        value={address.pincode}
                        onChange={(e) => setAddress({...address, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                  <div className="w-16 h-16 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8B735B]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif mb-2">Secure Checkout</h3>
                    <p className="text-sm text-[#6B5E4C]">Your payment is encrypted and secure. We accept all major cards and UPI.</p>
                  </div>
                  <div className="w-full p-6 bg-[#FDFCF8] border border-[#E8E2D2] rounded-2xl text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8B735B] mb-4">Order Summary</p>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="pt-4 border-t border-[#E8E2D2] flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                  >
                    <ShieldCheck className="w-10 h-10" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-serif mb-2">Thank you, {address.name.split(' ')[0]}!</h3>
                    <p className="text-[#6B5E4C]">Your order has been placed successfully. We've sent a confirmation email to {address.email}.</p>
                  </div>
                  <div className="w-full p-6 bg-[#FDFCF8] border border-[#E8E2D2] rounded-2xl text-left text-sm">
                    <p className="font-bold mb-2">Shipping to:</p>
                    <p className="text-[#6B5E4C]">{address.street}, {address.city} - {address.pincode}</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="w-full py-4 bg-[#2A2415] text-white rounded-full font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {checkoutStep !== 'success' && cart.length > 0 && (
              <div className="p-6 border-t border-[#F5F1E6] bg-[#FDFCF8]">
                {checkoutStep === 'cart' && (
                  <>
                    <div className="flex justify-between mb-6 text-lg font-medium">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('address')}
                      className="w-full py-4 bg-[#2A2415] text-white rounded-full font-medium hover:bg-[#3D3522] transition-all"
                    >
                      Proceed to Checkout
                    </button>
                  </>
                )}
                {checkoutStep === 'address' && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep('cart')}
                      className="flex-1 py-4 border border-[#2A2415] rounded-full font-medium"
                    >
                      Back
                    </button>
                    <button 
                      disabled={!address.name || !address.email || !address.city}
                      onClick={() => setCheckoutStep('payment')}
                      className="flex-[2] py-4 bg-[#2A2415] text-white rounded-full font-medium disabled:opacity-50"
                    >
                      Next Step
                    </button>
                  </div>
                )}
                {checkoutStep === 'payment' && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep('address')}
                      className="flex-1 py-4 border border-[#2A2415] rounded-full font-medium"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-[2] py-4 bg-[#2A2415] text-white rounded-full font-medium flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${cartTotal.toLocaleString()}`
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1536627217141-8600f7694921?auto=format&fit=crop&q=80&w=2000" 
            alt="Orchard background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCF8]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-2 mb-6">
              {HERO_OPTIONS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveHero(i)}
                  className={`h-1 transition-all duration-300 ${activeHero === i ? 'w-8 bg-[#8B735B]' : 'w-4 bg-[#D4C3A3]'}`}
                />
              ))}
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif leading-tight mb-8 text-[#2A2415]">
              {HERO_OPTIONS[activeHero].headline}
            </h1>
            <p className="text-xl text-[#6B5E4C] mb-10 max-w-lg leading-relaxed">
              {HERO_OPTIONS[activeHero].sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#shop" className="bg-[#2A2415] text-white px-10 py-4 rounded-full font-medium hover:bg-[#3D3522] transition-all flex items-center gap-2 group">
                Shop the Collection
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="border border-[#2A2415] text-[#2A2415] px-10 py-4 rounded-full font-medium hover:bg-[#F5F1E6] transition-all">
                Our Story
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Nuts"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-[#F5F1E6]">
              <p className="text-sm italic text-[#8B735B] mb-2 font-serif">"The freshest almonds I've ever tasted. You can truly tell they are small-batch."</p>
              <p className="text-xs font-bold uppercase tracking-widest">— Sarah J., Verified Customer</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">The Harvest Selection</h2>
            <p className="text-[#6B5E4C] max-w-2xl mx-auto">Meticulously sourced, ethically grown, and delivered with the integrity of the earth in mind.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-8 bg-[#FDFCF8]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                      {product.focus.split(',')[0]}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif mb-1">{product.name}</h3>
                    <p className="text-sm text-[#8B735B] font-medium uppercase tracking-widest">{product.focus}</p>
                  </div>
                  <span className="text-xl font-medium">{product.price}</span>
                </div>
                <p className="text-[#6B5E4C] leading-relaxed mb-8 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  {product.description}
                </p>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="w-full py-4 border border-[#2A2415] rounded-full font-medium hover:bg-[#2A2415] hover:text-white transition-all"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Voices of the Harvest</h2>
            <p className="text-[#6B5E4C]">What our community is saying about Mariyam Foods.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-[#FDFCF8] border border-[#F5F1E6] rounded-[2rem] relative"
              >
                <Quote className="absolute top-8 right-8 w-10 h-10 text-[#F5F1E6]" />
                <p className="text-[#6B5E4C] italic mb-8 relative z-10">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-[#8B735B] uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-32 bg-[#F5F1E6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 leading-tight">Why Mariyam Foods?</h2>
              <p className="text-lg text-[#6B5E4C] mb-12 leading-relaxed">
                We believe that the best food comes from a place of respect—for the land, for the farmers, and for your body. Our commitment to quality is uncompromising.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {WHY_US.map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B735B] shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-[#2A2415]">{item.title}</h4>
                    <p className="text-sm text-[#6B5E4C] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1000" 
                alt="Ethical Sourcing"
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#2A2415] text-white p-10 rounded-3xl hidden xl:block">
                <p className="text-3xl font-serif mb-2">100%</p>
                <p className="text-xs uppercase tracking-[0.2em] opacity-70 font-medium">Ethically Sourced</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Studio Section */}
      <section id="creative" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-[#8B735B] font-bold uppercase tracking-[0.3em] text-xs mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Creative Studio</span>
              </div>
              <h2 className="text-5xl font-serif leading-tight">Visualize Your Perfect Harvest</h2>
              <p className="text-[#6B5E4C] mt-6 text-lg">
                Use our AI-powered Creative Studio to generate custom imagery for your premium gift boxes or culinary inspiration.
              </p>
            </div>
          </div>

          <div className="bg-[#FDFCF8] border border-[#E5E0D0] rounded-[3rem] p-8 md:p-16">
            <CreativeStudio />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#F5F1E6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-serif mb-8">Get in Touch</h2>
              <p className="text-[#6B5E4C] mb-12 text-lg">
                Have questions about our sourcing, bulk orders, or just want to say hello? We'd love to hear from you.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B735B] shadow-sm flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-[#6B5E4C]">hello@mariyamfoods.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B735B] shadow-sm flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-[#6B5E4C]">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B735B] shadow-sm flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Visit Our Orchard Office</h4>
                    <p className="text-[#6B5E4C]">123 Harvest Lane, Golden Valley,<br />California, USA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#E8E2D2]">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Name</label>
                    <input type="text" className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Email</label>
                    <input type="email" className="w-full p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B]" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Message</label>
                  <textarea className="w-full h-32 p-4 bg-[#FDFCF8] border border-[#E8E2D2] rounded-xl focus:outline-none focus:border-[#8B735B] resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full py-4 bg-[#2A2415] text-white rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3D3522] transition-all">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-[#2A2415] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1536627217141-8600f7694921?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-serif mb-6">Join the Harvest Circle</h2>
          <p className="text-white/60 mb-10 text-lg">Subscribe to receive seasonal recipes, ethical sourcing updates, and exclusive early access to our limited-batch harvests.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-8 py-4 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
            />
            <button className="px-10 py-4 bg-white text-[#2A2415] rounded-full font-bold uppercase tracking-widest hover:bg-[#D4C3A3] transition-all">
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-xs text-white/40 uppercase tracking-widest">No spam. Only pure, earthy goodness.</p>
        </div>
      </section>

      {/* SEO & Sitemap Footer Information (Visualized) */}
      <footer className="bg-[#2A2415] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <h4 className="text-xl font-bold tracking-[0.2em] mb-8 uppercase">{BRAND_NAME}</h4>
              <p className="text-white/60 leading-relaxed mb-8">
                Cultivating a legacy of health and tradition through the finest nuts and dried fruits the earth provides.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Sitemap</h5>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Home</a></li>
                <li><a href="#shop" className="hover:text-[#D4C3A3] transition-colors">Shop All Products</a></li>
                <li><a href="#nuts" className="hover:text-[#D4C3A3] transition-colors">Premium Nuts</a></li>
                <li><a href="#fruits" className="hover:text-[#D4C3A3] transition-colors">Dried Fruits</a></li>
                <li><a href="#about" className="hover:text-[#D4C3A3] transition-colors">Our Story & Ethics</a></li>
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Categories</h5>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">California Almonds</a></li>
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Organic Figs</a></li>
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Walnuts & Cashews</a></li>
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Dates & Apricots</a></li>
                <li><a href="#" className="hover:text-[#D4C3A3] transition-colors">Gift Collections</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/40">SEO Keywords</h5>
              <div className="flex flex-wrap gap-2">
                {SEO_KEYWORDS.map(keyword => (
                  <span key={keyword} className="text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full text-white/40">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-medium uppercase tracking-widest">
            <p>© 2026 {BRAND_NAME}. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
