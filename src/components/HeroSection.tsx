import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-dark/90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent"></div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center space-x-2 bg-gold/10 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-gold" fill="currentColor" />
            <span className="text-sm font-medium text-gold">Experiencia Gourmet Premium</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6">
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              Divinée
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-cream/80 mb-8 max-w-2xl mx-auto"
          >
            Donde cada bocado es una experiencia celestial. Hamburguesas gourmet, 
            postres exquisitos y yogurt griego artesanal.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Explorar Menú</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group px-8 py-4 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold/10 transition-all duration-300">
              <span className="flex items-center space-x-2">
                <span>Ver en 3D</span>
                <span className="text-xs bg-gold/20 px-2 py-1 rounded">Nuevo</span>
              </span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {[
              { value: '24+', label: 'Creaciones Únicas' },
              { value: '4.9', label: 'Rating Promedio' },
              { value: '100%', label: 'Ingredientes Frescos' },
              { value: '360°', label: 'Vista Interactiva' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-dark/50 backdrop-blur-sm rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-sm text-cream/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;