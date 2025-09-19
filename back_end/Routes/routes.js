const express = require('express');
const router = express.Router();

// Homepage content endpoints
router.get('/api/homepage/content', (req, res) => {
  const language = req.query.language || 'en';
  
  // Mock data for homepage content
  const content = {
    stats: {
      users: '1M+',
      services: '50+',
      satisfaction: '98%'
    },
    vision: language === 'fr' ? 'Notre vision pour l\'avenir' : 'Our vision for the future',
    mission: language === 'fr' ? 'Notre mission est de servir' : 'Our mission is to serve',
    futureServices: language === 'fr' ? 'Services futurs' : 'Future services'
  };
  
  res.json({ success: true, data: content });
});

// FAQ endpoints
router.get('/api/homepage/faq', (req, res) => {
  const language = req.query.language || 'en';
  
  const faqs = [
    {
      id: 1,
      question: language === 'fr' ? 'Comment puis-je accéder aux services?' : 'How can I access the services?',
      answer: language === 'fr' ? 'Vous pouvez accéder aux services via notre plateforme en ligne.' : 'You can access services through our online platform.'
    },
    {
      id: 2,
      question: language === 'fr' ? 'Quels documents sont requis?' : 'What documents are required?',
      answer: language === 'fr' ? 'Les documents requis varient selon le service.' : 'Required documents vary by service.'
    },
    {
      id: 3,
      question: language === 'fr' ? 'Combien de temps prend le traitement?' : 'How long does processing take?',
      answer: language === 'fr' ? 'Le temps de traitement varie de 1 à 5 jours ouvrables.' : 'Processing time varies from 1 to 5 business days.'
    },
    {
      id: 4,
      question: language === 'fr' ? 'Comment puis-je suivre ma demande?' : 'How can I track my application?',
      answer: language === 'fr' ? 'Vous pouvez suivre votre demande via votre compte utilisateur.' : 'You can track your application through your user account.'
    },
    {
      id: 5,
      question: language === 'fr' ? 'Que faire en cas de problème?' : 'What to do in case of issues?',
      answer: language === 'fr' ? 'Contactez notre support client pour toute assistance.' : 'Contact our customer support for assistance.'
    }
  ];
  
  res.json({ success: true, data: faqs });
});

// News endpoints
router.get('/api/homepage/news', (req, res) => {
  const language = req.query.language || 'en';
  
  const news = [
    {
      id: 1,
      title: language === 'fr' ? 'Nouveaux services disponibles' : 'New services available',
      content: language === 'fr' ? 'Découvrez nos nouveaux services en ligne.' : 'Discover our new online services.',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Mise à jour de la plateforme' : 'Platform update',
      content: language === 'fr' ? 'Notre plateforme a été mise à jour avec de nouvelles fonctionnalités.' : 'Our platform has been updated with new features.',
      date: '2024-01-10'
    }
  ];
  
  res.json({ success: true, data: news });
});

// Testimonials endpoints
router.get('/api/homepage/testimonials', (req, res) => {
  const language = req.query.language || 'en';
  
  const testimonials = [
    {
      id: 1,
      name: 'Jean Dupont',
      message: language === 'fr' ? 'Service excellent et rapide!' : 'Excellent and fast service!',
      rating: 5
    },
    {
      id: 2,
      name: 'Marie Martin',
      message: language === 'fr' ? 'Très satisfaite de l\'expérience.' : 'Very satisfied with the experience.',
      rating: 5
    }
  ];
  
  res.json({ success: true, data: testimonials });
});

module.exports = router;