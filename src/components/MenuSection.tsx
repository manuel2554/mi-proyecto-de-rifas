import { motion } from 'framer-motion';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product, SectionProps } from '../types';

const MenuSection = ({ onProductClick, onAddToCart }: SectionProps) => {
  const burgers: Product[] = [
    {
      id: '1',
      name: 'The Golden Divine',
      description: 'Hamburguesa premium con carne wagyu A5, foie gras, trufa negra y pan brioche bañado en oro comestible',
      price: 89.99,
      category: 'burger',
      ingredients: ['Carne Wagyu A5', 'Foie Gras', 'Trufa Negra', 'Pan Brioche', 'Oro Comestible', 'Queso Brie'],
      weight: 350,
      calories: 850,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      isFeatured: true,
      nutritionalInfo: {
        protein: 45,
        carbs: 35,
        fat: 55,
        fiber: 8
      }
    },
    {
      id: '2',
      name: 'Black Truffle Royale',
      description: 'Carne de res angus con salsa de trufa negra, cebolla caramelizada y queso manchego curado',
      price: 34.99,
      category: 'burger',
      ingredients: ['Carne Angus', 'Salsa Trufa Negra', 'Cebolla Caramelizada', 'Queso Manchego', 'Pan Artesanal'],
      weight: 320,
      calories: 780,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 42,
        carbs: 38,
        fat: 48,
        fiber: 6
      }
    },
    {
      id: '3',
      name: 'Mediterranean Bliss',
      description: 'Hamburguesa de cordero con tzatziki, tomate seco, aceitunas kalamata y queso feta',
      price: 28.50,
      category: 'burger',
      ingredients: ['Cordero', 'Tzatziki', 'Tomate Seco', 'Aceitunas Kalamata', 'Queso Feta', 'Pan de Pita'],
      weight: 300,
      calories: 720,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 38,
        carbs: 40,
        fat: 42,
        fiber: 7
      }
    },
    {
      id: '4',
      name: 'Umami Masterpiece',
      description: 'Hamburguesa de champiñones portobello con salsa teriyaki, cebolla crispy y queso gouda ahumado',
      price: 24.99,
      category: 'burger',
      ingredients: ['Champiñones Portobello', 'Salsa Teriyaki', 'Cebolla Crispy', 'Queso Gouda Ahumado', 'Pan Integral'],
      weight: 280,
      calories: 650,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 22,
        carbs: 45,
        fat: 35,
        fiber: 9
      }
    }
  ];

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {burgers.map((burger, index) => (
          <motion.div
            key={burger.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-dark/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500"
          >
            {/* Featured Badge */}
            {burger.isFeatured && (
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-gold to-gold-dark text-dark text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>
            )}

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={burger.image}
                alt={burger.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
              
              {/* View 3D Button */}
              <button
                onClick={() => onProductClick(burger)}
                className="absolute top-4 right-4 z-20 bg-dark/80 backdrop-blur-sm p-2 rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
                title="Ver en 3D"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif font-bold text-cream group-hover:text-gold transition-colors duration-300">
                  {burger.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                  <span className="text-sm font-medium text-gold">{burger.rating}</span>
                </div>
              </div>

              <p className="text-cream/70 text-sm mb-4 line-clamp-2">
                {burger.description}
              </p>

              {/* Ingredients */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {burger.ingredients.slice(0, 3).map((ingredient, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-dark/30 text-xs text-cream/60 rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {burger.ingredients.length > 3 && (
                    <span className="px-2 py-1 bg-dark/30 text-xs text-cream/60 rounded-full">
                      +{burger.ingredients.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Peso</div>
                    <div className="text-sm font-semibold text-gold">{burger.weight}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Calorías</div>
                    <div className="text-sm font-semibold text-gold">{burger.calories}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold">${burger.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => onProductClick(burger)}
                  className="flex-1 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 text-sm font-medium"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => onAddToCart(burger)}
                  className="flex-1 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <button className="px-8 py-3 border-2 border-gold/30 text-gold rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 font-medium">
          Ver Todas las Creaciones
        </button>
      </motion.div>
    </div>
  );
};

export default MenuSection;