//routes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const linkController = require('../controllers/linkController');
const pageController = require('../controllers/pageController');
const mediaController = require('../controllers/mediaController'); // Import the text controller
const homeController = require('../controllers/homeController'); // Import the home controller

// Route to get all menus
router.get('/api/menus', menuController.getAllMenus);

// Routes for managing menu items
router.get('/api/menuitems/:menuId', menuController.getAllMenuItemsForMenu);
router.post('/api/menuitems/:menuId', menuController.addMenuItemToMenu);
router.delete('/api/menuitems/label/:label', menuController.deleteMenuItem);
router.put('/api/menuitems/label/:label', menuController.updateMenuItem);

// Link Routes
router.get('/api/links', linkController.getAllLinks);
router.get('/api/links/:menuId', linkController.getLinksByMenuId);
router.post('/api/links', linkController.addLink);
router.delete('/api/links/label/:label', linkController.deleteLink);
router.put('/api/links/:id', linkController.updateLink);

// Page Routes
router.get('/api/pages', pageController.getPages);
router.put('/api/:pageId', pageController.updatePage);

// Text Routes
router.get('/api/text/:pageId', mediaController.getTextByPageId); // Add this route
router.put('/api/text/:pageId', mediaController.updateTextByPageId); // Add this route for updating text

// Homepage Routes
router.get('/api/homepage/content', homeController.getHomepageContent); // Homepage stats, vision, mission, etc.
router.get('/api/homepage/news', homeController.getNewsArticles); // News articles
router.get('/api/homepage/faq', homeController.getFaqData); // FAQ data
router.get('/api/homepage/testimonials', homeController.getTestimonials); // User testimonials

module.exports = router;
