import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ activeSection, setActiveSection, cartItemCount, onCartClick }: HeaderProps) => {
  const navItems = [
    { id: 'burgers', label: 'Burgers' },
    { id: 'desserts', label: 'Postres' },
    { id: 'yogurt', label: 'Yogurt' },
    { id: 'builder', label: 'Crea tu Burger' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-md border-b border-gold/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('burgers')}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-dark">D</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Divinée
              </h1>
              <p className="text-xs text-cream/60">Gourmet Experience</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-gold'
                    : 'text-cream/70 hover:text-gold'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="relative p-3 bg-dark/50 rounded-full border border-gold/30 hover:bg-gold/10 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 text-gold" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex justify-center space-x-4 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gold text-dark'
                    : 'bg-dark/50 text-cream/70 hover:bg-dark/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;