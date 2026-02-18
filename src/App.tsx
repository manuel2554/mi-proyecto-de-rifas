import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import BurgerBuilder from './components/BurgerBuilder';
import DessertsSection from './components/DessertsSection';
import YogurtSection from './components/YogurtSection';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import { Product, CartItem } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('burgers');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'The Golden Divine',
      description: 'Hamburguesa premium con carne wagyu A5, foie gras, trufa negra y pan brioche bañado en oro comestible',
      price: 89.99,
      category: 'burger',
      ingredients: ['Carne Wagyu A5', 'Foie Gras', 'Trufa Negra', 'Pan Brioche', 'Oro Comestible', 'Queso Brie'],
      rating: 4.9,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Chocolate Symphony',
      description: 'Tarta de chocolate belga 70% con corazón de ganache líquido y oro comestible',
      price: 16.50,
      category: 'dessert',
      ingredients: ['Chocolate Belga 70%', 'Ganache de Chocolate', 'Oro Comestible', 'Crema de Avellanas'],
      rating: 4.9,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    }
  ]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-cream">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="pt-24">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-serif font-bold mb-4 glow-text">
                The Divine Collection
              </h2>
              <p className="text-xl text-gold/80 max-w-2xl mx-auto">
                Descubre nuestras creaciones gourmet, cada una diseñada para ofrecer una experiencia celestial
              </p>
            </motion.div>

            <div className="flex justify-center mb-12">
              <div className="flex space-x-2 bg-dark/50 backdrop-blur-sm rounded-full p-2">
                {['burgers', 'desserts', 'yogurt', 'builder'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-gold text-dark font-semibold'
                        : 'text-cream hover:bg-dark/30'
                    }`}
                  >
                    {section === 'burgers' && 'Burgers Divinas'}
                    {section === 'desserts' && 'Postres Exquisitos'}
                    {section === 'yogurt' && 'Yogurt Griego'}
                    {section === 'builder' && 'Crea tu Burger'}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeSection === 'burgers' && (
                <motion.div
                  key="burgers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <MenuSection onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
                </motion.div>
              )}

              {activeSection === 'desserts' && (
                <motion.div
                  key="desserts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <DessertsSection onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
                </motion.div>
              )}

              {activeSection === 'yogurt' && (
                <motion.div
                  key="yogurt"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <YogurtSection onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
                </motion.div>
              )}

              {activeSection === 'builder' && (
                <motion.div
                  key="builder"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <BurgerBuilder onAddToCart={handleAddToCart} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gold text-dark p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 glow-effect"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalCartItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalCartItems}
          </span>
        )}
      </button>
    </div>
  );
}

export default App;