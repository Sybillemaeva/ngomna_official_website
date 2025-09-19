//routes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const linkController = require('../controllers/linkController');
const pageController = require('../controllers/pageController');
const mediaController = require('../controllers/mediaController');
const sectionController = require('../controllers/sectionController');
const homeController = require('../controllers/homeController');

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

// Page Routes - Enhanced for multimedia support
router.get('/api/pages', pageController.getAllPages);
router.get('/api/pages/:id', pageController.getPageById);
router.get('/api/pages/slug/:slug', pageController.getPageBySlug);
router.get('/api/pages/type/:pageType', pageController.getPagesByType);
router.post('/api/pages', pageController.createPage);
router.put('/api/pages/:id', pageController.updatePage);
router.delete('/api/pages/:id', pageController.deletePage);

// Section Routes - Multimedia content sections
router.get('/api/sections/page/:pageId', sectionController.getSectionsByPage);
router.get('/api/sections/:id', sectionController.getSection);
router.get('/api/sections/type/:sectionType', sectionController.getSectionsByType);
router.post('/api/sections', sectionController.createSection);
router.put('/api/sections/:id', sectionController.updateSection);
router.delete('/api/sections/:id', sectionController.deleteSection);

// Section-Media Association Routes
router.post('/api/sections/:sectionId/media/:mediaId', sectionController.addMediaToSection);
router.delete('/api/sections/:sectionId/media/:mediaId', sectionController.removeMediaFromSection);

// Media Routes - Complete multimedia management
router.get('/api/media', mediaController.getAllMedia);
router.get('/api/media/:id', mediaController.getMediaById);
router.get('/api/media/section/:sectionId', mediaController.getMediaBySection);
router.get('/api/media/search', mediaController.searchMedia);
router.post('/api/media/upload', mediaController.uploadFile, mediaController.createMedia);
router.put('/api/media/:id', mediaController.updateMedia);
router.delete('/api/media/:id', mediaController.deleteMedia);

// Legacy Text Routes (for backward compatibility)
router.get('/api/text/:pageId', mediaController.getTextByPageId);
router.put('/api/text/:pageId', mediaController.updateTextByPageId);

// Homepage Routes - Updated for multimedia sections
router.get('/api/homepage/content', homeController.getHomepageContent);
router.get('/api/homepage/news', homeController.getNewsArticles);
router.get('/api/homepage/faq', homeController.getFaqData);
router.get('/api/homepage/testimonials', homeController.getTestimonials);
router.get('/api/homepage/features', homeController.getFeatures);

// Page Content Routes - Enhanced for multimedia
router.get('/api/pages/:pageSlug/content', homeController.getPageContent);
router.get('/api/sections/:sectionId/features', homeController.getSectionFeatures);

module.exports = router;