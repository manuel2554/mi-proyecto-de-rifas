import { motion } from 'framer-motion';
import { Star, Eye, ShoppingCart, Droplets } from 'lucide-react';
import { Product, SectionProps } from '../types';

const YogurtSection = ({ onProductClick, onAddToCart }: SectionProps) => {
  const yogurts: Product[] = [
    {
      id: 'y1',
      name: 'Greek Paradise',
      description: 'Yogurt griego artesanal con miel de acacia, nueces caramelizadas y frutos del bosque',
      price: 9.99,
      category: 'yogurt',
      ingredients: ['Yogurt Griego Artesanal', 'Miel de Acacia', 'Nueces Caramelizadas', 'Frambuesas', 'Arándanos'],
      weight: 200,
      calories: 280,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop',
      isFeatured: true,
      nutritionalInfo: {
        protein: 18,
        carbs: 22,
        fat: 12,
        fiber: 5
      }
    },
    {
      id: 'y2',
      name: 'Tropical Sunrise',
      description: 'Yogurt con mango, maracuyá, coco rallado y semillas de chía',
      price: 8.50,
      category: 'yogurt',
      ingredients: ['Yogurt Natural', 'Mango', 'Maracuyá', 'Coco Rallado', 'Semillas de Chía', 'Granola'],
      weight: 180,
      calories: 240,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 15,
        carbs: 28,
        fat: 10,
        fiber: 7
      }
    },
    {
      id: 'y3',
      name: 'Berry Power',
      description: 'Yogurt proteico con mezcla de bayas, almendras y sirope de agave',
      price: 10.50,
      category: 'yogurt',
      ingredients: ['Yogurt Proteico', 'Mezcla de Bayas', 'Almendras Fileteadas', 'Sirope de Agave', 'Semillas de Lino'],
      weight: 220,
      calories: 320,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1540420828642-fca2c5c18abb?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 25,
        carbs: 25,
        fat: 15,
        fiber: 6
      }
    },
    {
      id: 'y4',
      name: 'Chocolate Dream',
      description: 'Yogurt con cacao puro, plátano, avellanas y chips de chocolate negro',
      price: 9.00,
      category: 'yogurt',
      ingredients: ['Yogurt Griego', 'Cacao Puro', 'Plátano', 'Avellanas', 'Chips de Chocolate 85%'],
      weight: 190,
      calories: 290,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&h=600&fit=crop',
      nutritionalInfo: {
        protein: 16,
        carbs: 30,
        fat: 14,
        fiber: 5
      }
    }
  ];

  const toppings = [
    { name: 'Granola Casera', price: 1.50 },
    { name: 'Miel de Lavanda', price: 2.00 },
    { name: 'Frutos Secos', price: 2.50 },
    { name: 'Compota de Frutas', price: 1.80 },
    { name: 'Chips de Coco', price: 1.20 },
    { name: 'Semillas Mixtas', price: 1.00 },
  ];

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl mb-4">
          <Droplets className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4 text-cream">
          Yogurt Griego Bar
        </h2>
        <p className="text-cream/70 max-w-2xl mx-auto">
          Fresco, cremoso y nutritivo. Nuestro yogurt griego artesanal es perfecto para cualquier momento del día.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {yogurts.map((yogurt, index) => (
          <motion.div
            key={yogurt.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-dark/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500"
          >
            {/* Featured Badge */}
            {yogurt.isFeatured && (
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                FRESCO
              </div>
            )}

            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={yogurt.image}
                alt={yogurt.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
              
              {/* View Button */}
              <button
                onClick={() => onProductClick(yogurt)}
                className="absolute top-4 right-4 z-20 bg-dark/80 backdrop-blur-sm p-2 rounded-full hover:bg-cyan-500 hover:text-dark transition-all duration-300"
                title="Ver Detalles"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif font-bold text-cream group-hover:text-cyan-400 transition-colors duration-300">
                  {yogurt.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                  <span className="text-sm font-medium text-gold">{yogurt.rating}</span>
                </div>
              </div>

              <p className="text-cream/70 text-sm mb-4 line-clamp-2">
                {yogurt.description}
              </p>

              {/* Nutritional Info */}
              <div className="mb-4">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-dark/30 rounded-lg p-2">
                    <div className="text-xs text-cream/50">Proteína</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.nutritionalInfo?.protein}g</div>
                  </div>
                  <div className="bg-dark/30 rounded-lg p-2">
                    <div className="text-xs text-cream/50">Carbs</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.nutritionalInfo?.carbs}g</div>
                  </div>
                  <div className="bg-dark/30 rounded-lg p-2">
                    <div className="text-xs text-cream/50">Grasas</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.nutritionalInfo?.fat}g</div>
                  </div>
                  <div className="bg-dark/30 rounded-lg p-2">
                    <div className="text-xs text-cream/50">Fibra</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.nutritionalInfo?.fiber}g</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Peso</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.weight}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-cream/50">Calorías</div>
                    <div className="text-sm font-semibold text-cyan-400">{yogurt.calories}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">${yogurt.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => onProductClick(yogurt)}
                  className="flex-1 py-3 border border-cyan-500 text-cyan-500 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 text-sm font-medium"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => onAddToCart(yogurt)}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-dark rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toppings Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl border border-cyan-500/20 p-8"
      >
        <h3 className="text-2xl font-serif font-bold text-cream mb-6 text-center">
          Personaliza tu Yogurt
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {toppings.map((topping, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-dark/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="text-2xl mb-2">🥄</div>
              <h4 className="font-semibold text-cream mb-1">{topping.name}</h4>
              <div className="text-cyan-400 font-bold">+${topping.price.toFixed(2)}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-dark font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Crear Yogurt Personalizado
          </button>
        </div>
      </motion.div>

      {/* Health Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: '💪',
            title: 'Alto en Proteínas',
            description: '18-25g de proteína por porción para una nutrición óptima'
          },
          {
            icon: '🦴',
            title: 'Rico en Calcio',
            description: 'Fortalece huesos y dientes con calcio natural'
          },
          {
            icon: '🦠',
            title: 'Probióticos',
            description: 'Cultivos vivos para una digestión saludable'
          }
        ].map((benefit, index) => (
          <div
            key={index}
            className="bg-dark/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-cyan-500/10"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h4 className="text-xl font-semibold text-cream mb-2">{benefit.title}</h4>
            <p className="text-cream/70">{benefit.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default YogurtSection;