import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Users, Star, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.fast.title'),
      description: t('features.fast.desc'),
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('features.friendly.title'),
      description: t('features.friendly.desc'),
      color: "from-green-400 to-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.community.title'),
      description: t('features.community.desc'),
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: t('features.quality.title'),
      description: t('features.quality.desc'),
      color: "from-green-600 to-green-700"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t('features.platform.title'),
      description: t('features.platform.desc'),
      color: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('features.title')}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('features.subtitle')}
          </motion.p>
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              direction="up"
            >
              <motion.div
                className="group bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200 h-full"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 sm:mb-6`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;