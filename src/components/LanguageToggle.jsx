import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <motion.div 
      className="relative flex items-center bg-gray-100 rounded-full p-1 w-20 h-10"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background slider */}
      <motion.div
        className="absolute top-1 bottom-1 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md"
        animate={{
          x: language === 'en' ? 2 : 38
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      
      {/* Language options */}
      <motion.button
        onClick={toggleLanguage}
        className="relative z-10 flex items-center justify-center w-8 h-8 text-xs font-bold transition-colors duration-200"
        style={{
          color: language === 'en' ? 'white' : '#6b7280'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
      
      <motion.button
        onClick={toggleLanguage}
        className="relative z-10 flex items-center justify-center w-8 h-8 text-xs font-bold transition-colors duration-200"
        style={{
          color: language === 'fr' ? 'white' : '#6b7280'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        FR
      </motion.button>
    </motion.div>
  );
};

export default LanguageToggle;