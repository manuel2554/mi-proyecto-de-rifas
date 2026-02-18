import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) => {
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] z-50"
          >
            <div className="h-full bg-gradient-to-b from-dark to-dark/95 backdrop-blur-xl border-l border-gold/20 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gold/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-dark" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-cream">Tu Carrito</h2>
                      <p className="text-cream/60 text-sm">
                        {items.length} {items.length === 1 ? 'producto' : 'productos'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-dark/50 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-cream" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-auto p-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-dark/50 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-12 h-12 text-cream/30" />
                    </div>
                    <h3 className="text-xl font-semibold text-cream mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-cream/60 mb-8">
                      Agrega productos deliciosos para comenzar
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Explorar Menú
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-dark/50 backdrop-blur-sm rounded-2xl p-4 border border-gold/10"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-xl"
                            />
                            <div className="absolute -top-2 -right-2 bg-gold text-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {item.quantity}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-cream">{item.name}</h4>
                                <p className="text-cream/60 text-sm line-clamp-1">
                                  {item.category === 'burger' ? 'Hamburguesa' : 
                                   item.category === 'dessert' ? 'Postre' : 'Yogurt'}
                                </p>
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 hover:bg-dark/30 rounded-full transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-cream/50 hover:text-red-400" />
                              </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-dark/30 rounded-lg hover:bg-gold/10 transition-colors"
                                >
                                  <Minus className="w-3 h-3 text-cream" />
                                </button>
                                <span className="w-8 text-center font-medium text-cream">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-dark/30 rounded-lg hover:bg-gold/10 transition-colors"
                                >
                                  <Plus className="w-3 h-3 text-cream" />
                                </button>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs text-cream/50">
                                  ${item.price.toFixed(2)} c/u
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gold/10">
                  {/* Order Summary */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-cream/80">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cream/80">
                      <span>Envío</span>
                      <span className="text-gold">Gratis</span>
                    </div>
                    <div className="flex justify-between text-cream/80">
                      <span>Impuestos</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gold/20 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-cream">Total</span>
                        <span className="text-2xl font-bold text-gold">
                          ${(total * 1.08).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-gradient-to-r from-gold to-gold-dark text-dark rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold">
                      Proceder al Pago
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 font-medium"
                    >
                      Seguir Comprando
                    </button>
                  </div>

                  {/* Security Info */}
                  <div className="mt-6 pt-6 border-t border-gold/10">
                    <div className="flex items-center justify-center space-x-4 text-xs text-cream/50">
                      <span>🔒 Pago seguro</span>
                      <span>•</span>
                      <span>🚚 Envío rápido</span>
                      <span>•</span>
                      <span>⭐ Garantía Divinée</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;