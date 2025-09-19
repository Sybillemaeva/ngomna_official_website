import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, ArrowRight, Shield, Users, Globe, Mail, Smartphone, Bell, Lock, CheckCircle, Star, Settings, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';
import homeService from '../services/homeService';

const About = () => {
  const { t, language } = useLanguage();
  const [dynamicContent, setDynamicContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping
  const iconMap = {
    Users: <Users className="w-8 h-8" />,
    Globe: <Globe className="w-8 h-8" />,
    Star: <Star className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
    Bell: <Bell className="w-6 h-6" />,
    Lock: <Lock className="w-6 h-6" />,
    CheckCircle: <CheckCircle className="w-6 h-6" />,
    MessageCircle: <MessageCircle className="w-8 h-8" />,
    Settings: <Settings className="w-6 h-6" />
  };

  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        setLoading(true);
        const response = await homeService.getHomepageContent(language);
        setDynamicContent(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching homepage content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageContent();
  }, [language]);

  // Fallback data in case API fails
  const fallbackStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "10M+",
      label: t('about.stats.users'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "7+",
      label: t('about.stats.services'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: "4.8/5",
      label: t('about.stats.rating'),
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      number: "99.9%",
      label: t('about.stats.uptime'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  const fallbackVisionPoints = [
    {
      icon: <Users className="w-6 h-6" />,
      text: t('about.vision.point1')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      text: t('about.vision.point2')
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: t('about.vision.point3')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: t('about.vision.point4')
    }
  ];

  const fallbackMissionPoints = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      text: t('about.mission.point1')
    },
    {
      icon: <Bell className="w-6 h-6" />,
      text: t('about.mission.point2')
    },
    {
      icon: <Lock className="w-6 h-6" />,
      text: t('about.mission.point3')
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: t('about.mission.point4')
    }
  ];

  const fallbackFutureServices = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('about.future.service1.title'),
      description: t('about.future.service1.description'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('about.future.service2.title'),
      description: t('about.future.service2.description'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('about.future.service3.title'),
      description: t('about.future.service3.description'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  // Use dynamic content if available, otherwise fallback
  const stats = dynamicContent?.stats?.map(stat => ({
    ...stat,
    icon: iconMap[stat.icon] || <Users className="w-8 h-8" />
  })) || fallbackStats;

  const visionPoints = dynamicContent?.visionPoints?.map(point => ({
    ...point,
    icon: iconMap[point.icon] || <Users className="w-6 h-6" />
  })) || fallbackVisionPoints;

  const missionPoints = dynamicContent?.missionPoints?.map(point => ({
    ...point,
    icon: iconMap[point.icon] || <Smartphone className="w-6 h-6" />
  })) || fallbackMissionPoints;

  const futureServices = dynamicContent?.futureServices?.map(service => ({
    ...service,
    icon: iconMap[service.icon] || <MessageCircle className="w-8 h-8" />
  })) || fallbackFutureServices;

  if (loading) {
    return (
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('about.title')}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('about.description')}
          </motion.p>
        </AnimatedSection>

        {/* Mission and Vision Section */}
        <AnimatedSection className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('about.vision.title')}</h3>
              </div>
              
              <div className="space-y-4">
                {visionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {point.icon}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className=""
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('about.mission.title')}</h3>
              </div>
              
              <div className="space-y-4">
                {missionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                      {point.icon}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Future Perspectives */}
        <AnimatedSection className="mb-20">


          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('about.future.title')}</h3>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('about.future.description')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;