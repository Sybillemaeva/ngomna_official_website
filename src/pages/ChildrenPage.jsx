import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Heart, Shield, BookOpen, Users, Calendar, FileText, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChildrenPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Birth Registration",
      description: "Register births and obtain official birth certificates for your children.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Education Services",
      description: "Access educational resources and school enrollment information.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Records",
      description: "Maintain comprehensive health records and vaccination schedules.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Child Protection",
      description: "Access child protection services and safety resources.",
      color: "from-green-500 to-green-600"
    }
  ];

  const childServices = [
    { icon: <Calendar />, title: "Vaccination Schedule", description: "Track and manage vaccination appointments" },
    { icon: <Award />, title: "Achievement Records", description: "Document educational and developmental milestones" },
    { icon: <Users />, title: "Family Services", description: "Access family support and counseling services" },
    { icon: <BookOpen />, title: "Educational Resources", description: "Learning materials and educational guidance" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl flex items-center justify-center">
                <Baby className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Children Services
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive services for children's welfare, education, health, and development. 
              Everything you need to ensure your child's well-being and bright future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Access Child Services
              </motion.button>
              
              <motion.button
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-pink-200 hover:border-pink-400 transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Child
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
              Child Welfare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and services to support your child's development and well-being
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

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Child Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Supporting services to ensure comprehensive child care and development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {childServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Secure Your Child's Future
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Access comprehensive child services and ensure your child's well-being and development
            </p>
            
            <motion.button
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started with Child Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChildrenPage;