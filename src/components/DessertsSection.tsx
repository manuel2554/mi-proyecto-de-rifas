import { motion } from 'framer-motion';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product, SectionProps } from '../types';

const DessertsSection = ({ onProductClick, onAddToCart }: SectionProps) => {
  const desserts: Product[] = [
    {
      id: 'd1',
      name: 'Chocolate Symphony',
      description: 'Tarta de chocolate belga 70% con corazón de ganache líquido y oro comestible',
      price: 16.50,
      category: 'dessert',
      ingredients: ['Chocolate Belga 70%', 'Ganache de Chocolate', 'Oro Comestible', 'Crema de Avellanas'],
      weight: 180,
      calories: 420,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
      isFeatured: true,
      nutritionalInfo: {
        protein: 8,
        carbs: 45,
        fat: 32,
        fiber: 4
      }
    },
    {
      id: 'd2',
      name: 'Berry Royale',
      description: 'Mille-feuille de frutos rojos con crema chantilly y reducción de frambuesa',
      price: 14.99,
      category: 'dessert',
      ingredients: ['Frambuesas', 'Fresas', 'Arándanos', 'Crema Chantilly', 'Masa Hojaldre'],
      weight: 160,
      calories: 380,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 6,
        carbs: 42,
        fat: 28,
        fiber: 6
      }
    },
    {
      id: 'd3',
      name: 'Tiramisú Clásico',
      description: 'Tiramisú tradicional italiano con mascarpone, café arábica y cacao amargo',
      price: 12.99,
      category: 'dessert',
      ingredients: ['Mascarpone', 'Café Arábica', 'Cacao Amargo', 'Bizcochos Savoiardi', 'Licor Marsala'],
      weight: 150,
      calories: 350,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 7,
        carbs: 38,
        fat: 25,
        fiber: 3
      }
    },
    {
      id: 'd4',
      name: 'Crème Brûlée',
      description: 'Crema catalana con azúcar quemado al momento y vaina de vainilla de Madagascar',
      price: 11.50,
      category: 'dessert',
      ingredients: ['Crema de Vainilla', 'Azúcar Quemado', 'Vainilla de Madagascar', 'Yema de Huevo'],
      weight: 140,
      calories: 320,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 9,
        carbs: 35,
        fat: 22,
        fiber: 2
      }
    }
  ];

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-serif font-bold mb-4 text-cream">
          Postres Exquisitos
        </h2>
        <p className="text-cream/70 max-w-2xl mx-auto">
          Delicias dulces creadas por nuestros maestros reposteros. Cada postre es una obra de arte comestible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {desserts.map((dessert, index) => (
          <motion.div
            key={dessert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-dark/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500"
          >
            {/* Featured Badge */}
            {dessert.isFeatured && (
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-gold to-gold-dark text-dark text-xs font-bold px-3 py-1 rounded-full">
                CHEF'S CHOICE
              </div>
            )}

            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
              
              {/* View Button */}
              <button
                onClick={() => onProductClick(dessert)}
                className="absolute top-4 right-4 z-20 bg-dark/80 backdrop-blur-sm p-2 rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
                title="Ver Detalles"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif font-bold text-cream group-hover:text-gold transition-colors duration-300">
                  {dessert.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                  <span className="text-sm font-medium text-gold">{dessert.rating}</span>
                </div>
              </div>

              <p className="text-cream/70 text-sm mb-4 line-clamp-2">
                {dessert.description}
              </p>

              {/* Ingredients */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {dessert.ingredients.slice(0, 3).map((ingredient, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-dark/30 text-xs text-cream/60 rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {dessert.ingredients.length > 3 && (
                    <span className="px-2 py-1 bg-dark/30 text-xs text-cream/60 rounded-full">
                      +{dessert.ingredients.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Peso</div>
                    <div className="text-sm font-semibold text-gold">{dessert.weight}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Calorías</div>
                    <div className="text-sm font-semibold text-gold">{dessert.calories}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold">${dessert.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => onProductClick(dessert)}
                  className="flex-1 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 text-sm font-medium"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => onAddToCart(dessert)}
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

      {/* Special Offer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gradient-to-r from-gold/10 to-gold/5 backdrop-blur-sm rounded-3xl border border-gold/20 p-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-serif font-bold text-cream mb-2">
              Menú Degustación de Postres
            </h3>
            <p className="text-cream/70">
              Prueba los 4 postres principales por solo $49.99. Incluye maridaje con vino dulce.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Reservar Experiencia
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DessertsSection;