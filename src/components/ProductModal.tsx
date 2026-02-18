import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, RotateCw, ZoomIn, ZoomOut, Info } from 'lucide-react';
import { Product } from '../types';
import Burger3DViewer from './Burger3DViewer';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

const ProductModal = ({ isOpen, onClose, product, onAddToCart }: ProductModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'ingredients'>('details');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 md:inset-20 z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-dark to-dark/95 backdrop-blur-xl rounded-3xl border border-gold/20 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/10">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-cream">{product.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold" fill="currentColor" />
                      <span className="ml-1 text-gold font-medium">{product.rating}</span>
                    </div>
                    <span className="text-cream/50">•</span>
                    <span className="text-cream/70">{product.category === 'burger' ? 'Hamburguesa' : 
                                                   product.category === 'dessert' ? 'Postre' : 'Yogurt'}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-dark/50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-cream" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="grid lg:grid-cols-2 h-full">
                  {/* Left Column - 3D Viewer */}
                  <div className="p-6 border-r border-gold/10">
                    <div className="relative h-[400px] lg:h-[500px] bg-dark/50 rounded-2xl overflow-hidden border border-gold/10">
                      <Burger3DViewer 
                        zoom={zoom}
                        rotation={rotation}
                        onRotationChange={setRotation}
                      />
                      
                      {/* 3D Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-dark/80 backdrop-blur-sm rounded-full px-4 py-2">
                        <button
                          onClick={handleZoomOut}
                          className="p-2 hover:bg-gold/10 rounded-full transition-colors"
                          title="Zoom Out"
                        >
                          <ZoomOut className="w-4 h-4 text-gold" />
                        </button>
                        <button
                          onClick={handleReset}
                          className="p-2 hover:bg-gold/10 rounded-full transition-colors"
                          title="Reset View"
                        >
                          <RotateCw className="w-4 h-4 text-gold" />
                        </button>
                        <button
                          onClick={handleZoomIn}
                          className="p-2 hover:bg-gold/10 rounded-full transition-colors"
                          title="Zoom In"
                        >
                          <ZoomIn className="w-4 h-4 text-gold" />
                        </button>
                        <div className="text-xs text-cream/50 px-2">
                          Zoom: {zoom.toFixed(1)}x
                        </div>
                      </div>

                      {/* 3D Instructions */}
                      <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-2 text-xs text-cream/70">
                          <Info className="w-3 h-3" />
                          <span>Arrastra para rotar • Rueda para zoom</span>
                        </div>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="mt-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="p-6">
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeTab === 'details'
                            ? 'bg-gold text-dark font-semibold'
                            : 'bg-dark/50 text-cream/70 hover:bg-dark/80'
                        }`}
                      >
                        Detalles
                      </button>
                      <button
                        onClick={() => setActiveTab('ingredients')}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeTab === 'ingredients'
                            ? 'bg-gold text-dark font-semibold'
                            : 'bg-dark/50 text-cream/70 hover:bg-dark/80'
                        }`}
                      >
                        Ingredientes
                      </button>
                      <button
                        onClick={() => setActiveTab('nutrition')}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeTab === 'nutrition'
                            ? 'bg-gold text-dark font-semibold'
                            : 'bg-dark/50 text-cream/70 hover:bg-dark/80'
                        }`}
                      >
                        Nutrición
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                      {activeTab === 'details' && (
                        <>
                          <div>
                            <h3 className="text-xl font-semibold text-cream mb-3">Descripción</h3>
                            <p className="text-cream/80 leading-relaxed">
                              {product.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-dark/50 rounded-xl p-4">
                              <div className="text-cream/50 text-sm mb-1">Peso</div>
                              <div className="text-2xl font-bold text-gold">{product.weight}g</div>
                            </div>
                            <div className="bg-dark/50 rounded-xl p-4">
                              <div className="text-cream/50 text-sm mb-1">Calorías</div>
                              <div className="text-2xl font-bold text-gold">{product.calories}</div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold text-cream mb-3">Características</h3>
                            <ul className="space-y-2">
                              <li className="flex items-center text-cream/80">
                                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                                Ingredientes premium seleccionados
                              </li>
                              <li className="flex items-center text-cream/80">
                                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                                Preparación artesanal
                              </li>
                              <li className="flex items-center text-cream/80">
                                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                                Presentación gourmet
                              </li>
                            </ul>
                          </div>
                        </>
                      )}

                      {activeTab === 'ingredients' && (
                        <div>
                          <h3 className="text-xl font-semibold text-cream mb-4">Ingredientes</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {product.ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="bg-dark/50 rounded-lg p-3 flex items-center"
                              >
                                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                                <span className="text-cream/80">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/20">
                            <div className="flex items-center text-gold mb-2">
                              <Info className="w-4 h-4 mr-2" />
                              <span className="font-semibold">Información Alergénica</span>
                            </div>
                            <p className="text-cream/70 text-sm">
                              Este producto puede contener trazas de frutos secos, gluten y lácteos.
                              Consulte con nuestro personal si tiene alergias específicas.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'nutrition' && product.nutritionalInfo && (
                        <div>
                          <h3 className="text-xl font-semibold text-cream mb-4">Información Nutricional</h3>
                          <div className="bg-dark/50 rounded-2xl p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gold">{product.nutritionalInfo.protein}g</div>
                                <div className="text-cream/70 text-sm mt-1">Proteína</div>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gold">{product.nutritionalInfo.carbs}g</div>
                                <div className="text-cream/70 text-sm mt-1">Carbohidratos</div>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gold">{product.nutritionalInfo.fat}g</div>
                                <div className="text-cream/70 text-sm mt-1">Grasas</div>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gold">{product.nutritionalInfo.fiber}g</div>
                                <div className="text-cream/70 text-sm mt-1">Fibra</div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-cream/80 mb-1">
                                  <span>Grasas Saturadas</span>
                                  <span>{(product.nutritionalInfo.fat * 0.3).toFixed(1)}g</span>
                                </div>
                                <div className="h-2 bg-dark/30 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gold rounded-full" 
                                    style={{ width: '30%' }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-cream/80 mb-1">
                                  <span>Azúcares</span>
                                  <span>{(product.nutritionalInfo.carbs * 0.2).toFixed(1)}g</span>
                                </div>
                                <div className="h-2 bg-dark/30 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gold rounded-full" 
                                    style={{ width: '20%' }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-cream/80 mb-1">
                                  <span>Sal</span>
                                  <span>1.2g</span>
                                </div>
                                <div className="h-2 bg-dark/30 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gold rounded-full" 
                                    style={{ width: '15%' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gold/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gold">${product.price.toFixed(2)}</div>
                    <div className="text-cream/50 text-sm">Precio por unidad</div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={onClose}
                      className="px-8 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 font-medium"
                    >
                      Seguir Explorando
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;