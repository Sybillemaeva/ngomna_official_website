const express = require('express');
const router = express.Router();

// Import controllers
const homeController = require('../controllers/homeController');
const menuController = require('../controllers/menuController');
const linkController = require('../controllers/linkController');
const pageController = require('../controllers/pageController');
const mediaController = require('../controllers/mediaController');
const sectionController = require('../controllers/sectionController');

// Homepage/Home routes
router.get('/api/homepage/content', homeController.getHomepageContent);
router.get('/api/homepage/faq', homeController.getFaqData);
router.get('/api/homepage/news', homeController.getNewsData);
router.get('/api/homepage/testimonials', homeController.getTestimonialsData);

// Menu routes
router.get('/api/menus', menuController.getAllMenus);
router.get('/api/menuitems/:menuId', menuController.getMenuItemsByMenuId);
router.post('/api/menuitems/:menuId', menuController.addMenuItem);
router.put('/api/menuitems/label/:label', menuController.updateMenuItemByLabel);
router.delete('/api/menuitems/label/:label', menuController.deleteMenuItemByLabel);

// Page routes
router.get('/api/pages', pageController.getAllPages);
router.put('/api/pages/:pageId', pageController.updatePage);

// Text content routes (legacy support)
router.get('/api/text/:pageId', mediaController.getTextByPageId);
router.put('/api/text/:pageId', mediaController.updateTextByPageId);

// Link routes
router.get('/api/links', linkController.getAllLinks);
router.get('/api/links/:menuId', linkController.getLinksByMenuId);
router.post('/api/links', linkController.addLink);
router.put('/api/links/:id', linkController.updateLink);
router.delete('/api/links/label/:label', linkController.deleteLinkByLabel);

// Media routes
router.get('/api/media', mediaController.getAllMedia);
router.post('/api/media', mediaController.addMedia);
router.put('/api/media/:id', mediaController.updateMedia);
router.delete('/api/media/:id', mediaController.deleteMedia);

// Section routes
router.get('/api/sections', sectionController.getAllSections);
router.post('/api/sections', sectionController.addSection);
router.put('/api/sections/:id', sectionController.updateSection);
router.delete('/api/sections/:id', sectionController.deleteSection);

module.exports = router;