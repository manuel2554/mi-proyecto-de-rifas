import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import { BurgerIngredient, CustomBurger } from '../types';

interface BurgerBuilderProps {
  onAddToCart: (product: any) => void;
}

const BurgerBuilder = ({ onAddToCart }: BurgerBuilderProps) => {
  const [customBurger, setCustomBurger] = useState<CustomBurger>({
    bread: null,
    protein: null,
    cheese: null,
    toppings: [],
    sauces: []
  });

  const [activeStep, setActiveStep] = useState<'bread' | 'protein' | 'cheese' | 'toppings' | 'sauces'>('bread');

  const ingredients: BurgerIngredient[] = [
    // Breads
    { id: 'b1', name: 'Brioche Dorado', type: 'bread', price: 3.50, image: '🍞', description: 'Pan brioche con mantequilla y semillas de sésamo' },
    { id: 'b2', name: 'Integral Artesanal', type: 'bread', price: 2.50, image: '🥖', description: 'Pan integral con centeno y avena' },
    { id: 'b3', name: 'Pan de Papa', type: 'bread', price: 3.00, image: '🥔', description: 'Suave pan de papa con textura esponjosa' },
    { id: 'b4', name: 'Ciabatta Crujiente', type: 'bread', price: 2.80, image: '🥪', description: 'Pan italiano con corteza crujiente' },
    
    // Proteins
    { id: 'p1', name: 'Wagyu A5', type: 'protein', price: 18.00, image: '🥩', description: 'Carne wagyu grado A5, marmoleado premium' },
    { id: 'p2', name: 'Angus Black', type: 'protein', price: 12.50, image: '🐄', description: 'Carne angus 100% natural' },
    { id: 'p3', name: 'Cordero Mediterráneo', type: 'protein', price: 14.00, image: '🐑', description: 'Cordero alimentado con hierbas' },
    { id: 'p4', name: 'Portobello Grill', type: 'protein', price: 9.50, image: '🍄', description: 'Champiñones portobello a la parrilla' },
    
    // Cheeses
    { id: 'c1', name: 'Brie Trufado', type: 'cheese', price: 5.50, image: '🧀', description: 'Queso brie con trufa negra' },
    { id: 'c2', name: 'Manchego Curado', type: 'cheese', price: 4.50, image: '🧀', description: 'Queso manchego 12 meses de curación' },
    { id: 'c3', name: 'Gouda Ahumado', type: 'cheese', price: 4.00, image: '🧀', description: 'Queso gouda con ahumado natural' },
    { id: 'c4', name: 'Feta Griego', type: 'cheese', price: 3.50, image: '🧀', description: 'Queso feta tradicional griego' },
    
    // Toppings
    { id: 't1', name: 'Foie Gras', type: 'topping', price: 12.00, image: '🍖', description: 'Foie gras de pato francés' },
    { id: 't2', name: 'Trufa Negra', type: 'topping', price: 15.00, image: '🍄', description: 'Láminas de trufa negra fresca' },
    { id: 't3', name: 'Bacon Crispy', type: 'topping', price: 3.50, image: '🥓', description: 'Bacon crujiente ahumado' },
    { id: 't4', name: 'Aguacate Hass', type: 'topping', price: 4.00, image: '🥑', description: 'Aguacate hass maduro' },
    { id: 't5', name: 'Cebolla Caramelizada', type: 'topping', price: 2.50, image: '🧅', description: 'Cebolla caramelizada con vino tinto' },
    { id: 't6', name: 'Tomate Seco', type: 'topping', price: 3.00, image: '🍅', description: 'Tomate seco marinado en aceite de oliva' },
    
    // Sauces
    { id: 's1', name: 'Salsa Trufa', type: 'sauce', price: 3.50, image: '🍯', description: 'Salsa cremosa de trufa negra' },
    { id: 's2', name: 'Mayo Wasabi', type: 'sauce', price: 2.50, image: '🌶️', description: 'Mayonesa con wasabi japonés' },
    { id: 's3', name: 'BBQ Bourbon', type: 'sauce', price: 3.00, image: '🍖', description: 'Salsa BBQ con bourbon añejo' },
    { id: 's4', name: 'Tzatziki', type: 'sauce', price: 2.80, image: '🥒', description: 'Salsa griega de yogurt y pepino' },
  ];

  const handleSelectIngredient = (ingredient: BurgerIngredient) => {
    switch (ingredient.type) {
      case 'bread':
        setCustomBurger(prev => ({ ...prev, bread: ingredient }));
        setActiveStep('protein');
        break;
      case 'protein':
        setCustomBurger(prev => ({ ...prev, protein: ingredient }));
        setActiveStep('cheese');
        break;
      case 'cheese':
        setCustomBurger(prev => ({ ...prev, cheese: ingredient }));
        setActiveStep('toppings');
        break;
      case 'topping':
        setCustomBurger(prev => ({
          ...prev,
          toppings: prev.toppings.some(t => t.id === ingredient.id)
            ? prev.toppings.filter(t => t.id !== ingredient.id)
            : [...prev.toppings, ingredient]
        }));
        break;
      case 'sauce':
        setCustomBurger(prev => ({
          ...prev,
          sauces: prev.sauces.some(s => s.id === ingredient.id)
            ? prev.sauces.filter(s => s.id !== ingredient.id)
            : [...prev.sauces, ingredient]
        }));
        break;
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (customBurger.bread) total += customBurger.bread.price;
    if (customBurger.protein) total += customBurger.protein.price;
    if (customBurger.cheese) total += customBurger.cheese.price;
    customBurger.toppings.forEach(t => total += t.price);
    customBurger.sauces.forEach(s => total += s.price);
    return total;
  };

  const handleAddToCart = () => {
    const product = {
      id: `custom-${Date.now()}`,
      name: 'Burger Personalizada',
      description: 'Tu creación única',
      price: calculateTotal(),
      category: 'burger' as const,
      ingredients: [
        customBurger.bread?.name,
        customBurger.protein?.name,
        customBurger.cheese?.name,
        ...customBurger.toppings.map(t => t.name),
        ...customBurger.sauces.map(s => s.name)
      ].filter(Boolean) as string[],
      rating: 5,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    };
    onAddToCart(product);
  };

  const steps = [
    { id: 'bread', label: 'Pan', icon: '🍞' },
    { id: 'protein', label: 'Proteína', icon: '🥩' },
    { id: 'cheese', label: 'Queso', icon: '🧀' },
    { id: 'toppings', label: 'Toppings', icon: '🥑' },
    { id: 'sauces', label: 'Salsas', icon: '🍯' },
  ];

  const filteredIngredients = ingredients.filter(ing => ing.type === activeStep);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark/30 -translate-y-1/2"></div>
            {steps.map((step, index) => {
              const isActive = step.id === activeStep;
              const isCompleted = 
                (step.id === 'bread' && customBurger.bread) ||
                (step.id === 'protein' && customBurger.protein) ||
                (step.id === 'cheese' && customBurger.cheese) ||
                (step.id === 'toppings' && customBurger.toppings.length > 0) ||
                (step.id === 'sauces' && customBurger.sauces.length > 0);

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id as any)}
                  className={`relative z-10 flex flex-col items-center ${
                    isActive ? 'text-gold' : 'text-cream/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gold text-dark scale-110' 
                      : isCompleted 
                        ? 'bg-gold/20 text-gold' 
                        : 'bg-dark/50 text-cream/30'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-xl">{step.icon}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients Selection */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-6 text-cream">
              Selecciona tu {activeStep === 'bread' ? 'Pan' : 
                           activeStep === 'protein' ? 'Proteína' :
                           activeStep === 'cheese' ? 'Queso' :
                           activeStep === 'toppings' ? 'Toppings' : 'Salsas'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredIngredients.map((ingredient) => {
                const isSelected = 
                  (ingredient.type === 'bread' && customBurger.bread?.id === ingredient.id) ||
                  (ingredient.type === 'protein' && customBurger.protein?.id === ingredient.id) ||
                  (ingredient.type === 'cheese' && customBurger.cheese?.id === ingredient.id) ||
                  (ingredient.type === 'topping' && customBurger.toppings.some(t => t.id === ingredient.id)) ||
                  (ingredient.type === 'sauce' && customBurger.sauces.some(s => s.id === ingredient.id));

                return (
                  <motion.button
                    key={ingredient.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectIngredient(ingredient)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-gold bg-gold/10'
                        : 'border-dark/50 bg-dark/30 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{ingredient.image}</span>
                        <div>
                          <h4 className="font-semibold text-cream">{ingredient.name}</h4>
                          <p className="text-sm text-cream/60">{ingredient.description}</p>
                        </div>
                      </div>
                      <div className="text-gold font-bold">${ingredient.price.toFixed(2)}</div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center text-gold text-sm">
                        <Check className="w-4 h-4 mr-1" />
                        <span>Seleccionado</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {activeStep !== 'bread' && (
                <button
                  onClick={() => {
                    const stepIndex = steps.findIndex(s => s.id === activeStep);
                    if (stepIndex > 0) setActiveStep(steps[stepIndex - 1].id as any);
                  }}
                  className="px-6 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all duration-300"
                >
                  Anterior
                </button>
              )}
              <div className="flex-1"></div>
              {activeStep !== 'sauces' && (
                <button
                  onClick={() => {
                    const stepIndex = steps.findIndex(s => s.id === activeStep);
                    if (stepIndex < steps.length - 1) setActiveStep(steps[stepIndex + 1].id as any);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-dark/50 backdrop-blur-sm rounded-3xl border border-gold/20 p-6">
              <h3 className="text-2xl font-serif font-bold mb-6 text-cream">Tu Creación</h3>
              
              {/* Burger Preview */}
              <div className="mb-8">
                <div className="relative h-48 bg-dark/30 rounded-2xl border border-gold/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🍔</div>
                    <p className="text-cream/60">Vista previa de tu burger</p>
                  </div>
                </div>
              </div>

              {/* Selected Ingredients */}
              <div className="space-y-4 mb-8">
                {customBurger.bread && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{customBurger.bread.image}</span>
                      <span className="text-cream">{customBurger.bread.name}</span>
                    </div>
                    <span className="text-gold font-bold">${customBurger.bread.price.toFixed(2)}</span>
                  </div>
                )}

                {customBurger.protein && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{customBurger.protein.image}</span>
                      <span className="text-cream">{customBurger.protein.name}</span>
                    </div>
                    <span className="text-gold font-bold">${customBurger.protein.price.toFixed(2)}</span>
                  </div>
                )}

                {customBurger.cheese && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{customBurger.cheese.image}</span>
                      <span className="text-cream">{customBurger.cheese.name}</span>
                    </div>
                    <span className="text-gold font-bold">${customBurger.cheese.price.toFixed(2)}</span>
                  </div>
                )}

                {customBurger.toppings.map((topping) => (
                  <div key={topping.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{topping.image}</span>
                      <span className="text-cream">{topping.name}</span>
                    </div>
                    <span className="text-gold font-bold">${topping.price.toFixed(2)}</span>
                  </div>
                ))}

                {customBurger.sauces.map((sauce) => (
                  <div key={sauce.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{sauce.image}</span>
                      <span className="text-cream">{sauce.name}</span>
                    </div>
                    <span className="text-gold font-bold">${sauce.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gold/20 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-cream">Total</span>
                  <span className="text-3xl font-bold text-gold">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!customBurger.bread || !customBurger.protein}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  !customBurger.bread || !customBurger.protein
                    ? 'bg-dark/50 text-cream/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold to-gold-dark text-dark hover:shadow-2xl hover:scale-105'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Añadir al Carrito</span>
              </button>

              <p className="text-xs text-cream/50 text-center mt-4">
                * Precio final puede variar según disponibilidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;