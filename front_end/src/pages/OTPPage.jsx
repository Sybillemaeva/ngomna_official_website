import React from 'react';
import { motion } from 'framer-motion';
import { Key, Smartphone, Clock, Shield, Zap, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OTPPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Generation",
      description: "Generate secure OTP codes instantly for immediate authentication.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time-Based Security",
      description: "Time-sensitive codes that expire automatically for enhanced security.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Multi-Layer Protection",
      description: "Additional security layer for sensitive government transactions.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Integration",
      description: "Seamless integration with your mobile device for easy access.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const otpFeatures = [
    { icon: <CheckCircle />, title: "Secure Authentication", description: "Two-factor authentication for all transactions" },
    { icon: <AlertCircle />, title: "Fraud Prevention", description: "Advanced fraud detection and prevention systems" },
    { icon: <Settings />, title: "Custom Settings", description: "Personalize OTP delivery preferences" },
    { icon: <Key />, title: "Backup Codes", description: "Emergency backup codes for account recovery" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center">
                <Key className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              OTP Authentication
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Secure your government transactions with One-Time Password authentication. 
              Fast, reliable, and highly secure verification for all your important activities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate OTP
              </motion.button>
              
              <motion.button
                className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-yellow-200 hover:border-yellow-400 transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Setup OTP
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              OTP Security Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced one-time password system for secure government service authentication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enhanced Security
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional security measures to protect your account and transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {otpFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Secure Your Transactions
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Enable OTP authentication for enhanced security on all your government transactions
            </p>
            
            <motion.button
              className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Enable OTP Security
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OTPPage;