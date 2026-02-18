import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-dark to-dark/95 border-t border-gold/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-dark">D</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  Divinée
                </h3>
                <p className="text-sm text-cream/60">Experiencia Gourmet</p>
              </div>
            </div>
            <p className="text-cream/70 mb-6">
              Donde cada bocado es una experiencia celestial. Hamburguesas gourmet, 
              postres exquisitos y yogurt griego artesanal.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-dark/50 border border-gold/20 rounded-full flex items-center justify-center hover:bg-gold/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gold" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-serif font-bold text-cream mb-6">Contacto</h4>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: 'Av. Gourmet 123, Distrito Premium',
                  subtext: 'Ciudad Divinée'
                },
                {
                  icon: Phone,
                  text: '+1 (555) 123-4567',
                  subtext: 'Lun-Dom: 12:00 - 23:00'
                },
                {
                  icon: Mail,
                  text: 'reservas@divinee.com',
                  subtext: 'Respuesta en 24h'
                },
              ].map((contact, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream font-medium">{contact.text}</p>
                    <p className="text-cream/60 text-sm">{contact.subtext}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Menu Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-serif font-bold text-cream mb-6">Menú</h4>
            <ul className="space-y-3">
              {[
                'The Divine Collection',
                'Postres Exquisitos',
                'Yogurt Griego Bar',
                'Crea tu Burger',
                'Menú Degustación',
                'Especiales del Chef',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-cream/70 hover:text-gold transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xl font-serif font-bold text-cream mb-6">Newsletter</h4>
            <p className="text-cream/70 mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full bg-dark/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/50 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gold to-gold-dark text-dark px-4 py-1.5 rounded-lg hover:shadow-lg transition-shadow"
                >
                  Suscribir
                </button>
              </div>
              <p className="text-xs text-cream/50">
                Al suscribirte aceptas nuestra política de privacidad.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gold/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-cream/60 text-sm mb-4 md:mb-0">
              © {currentYear} Divinée. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                Política de Cookies
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {[
            { text: '⭐ Mejor Restaurante Gourmet 2024', color: 'text-gold' },
            { text: '🍔 Excelencia Culinaria', color: 'text-cyan-400' },
            { text: '🏆 3 Estrellas Michelin', color: 'text-red-400' },
          ].map((award, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-dark/50 backdrop-blur-sm rounded-full border border-gold/10"
            >
              <span className={`text-sm font-medium ${award.color}`}>{award.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;