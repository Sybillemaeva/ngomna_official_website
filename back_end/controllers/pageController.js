const { Page, Section, Media, SectionMedia, Content, Feature, NewsArticle, Review, FAQ, CarouselItem } = require('../config/Database');

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const { published } = req.query;

    const whereClause = {};
    if (published !== undefined) {
      whereClause.published = published === 'true';
    }

    const pages = await Page.findAll({
      where: whereClause,
      include: [
        {
          model: Section,
          include: [
            {
              model: Media,
              through: {
                model: SectionMedia,
                attributes: ['mediaRole', 'order']
              },
              where: { published: true },
              required: false
            }
          ],
          where: { published: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get page by ID with full content
exports.getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findByPk(id, {
      include: [
        {
          model: Section,
          include: [
            {
              model: Media,
              through: {
                model: SectionMedia,
                attributes: ['mediaRole', 'order']
              },
              where: { published: true },
              required: false
            },
            {
              model: Content,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: Feature,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: NewsArticle,
              where: { published: true },
              required: false,
              order: [['publishedAt', 'DESC']]
            },
            {
              model: Review,
              where: { published: true },
              required: false,
              order: [['createdAt', 'DESC']]
            },
            {
              model: FAQ,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: CarouselItem,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            }
          ],
          where: { published: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ]
    });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get page by slug with full content
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({
      where: { slug, published: true },
      include: [
        {
          model: Section,
          include: [
            {
              model: Media,
              through: {
                model: SectionMedia,
                attributes: ['mediaRole', 'order']
              },
              where: { published: true },
              required: false
            },
            {
              model: Content,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: Feature,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: NewsArticle,
              where: { published: true },
              required: false,
              order: [['publishedAt', 'DESC']]
            },
            {
              model: Review,
              where: { published: true },
              required: false,
              order: [['createdAt', 'DESC']]
            },
            {
              model: FAQ,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            },
            {
              model: CarouselItem,
              where: { published: true },
              required: false,
              order: [['order', 'ASC']]
            }
          ],
          where: { published: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ]
    });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new page
exports.createPage = async (req, res) => {
  try {
    const pageData = req.body;

    const page = await Page.create(pageData);

    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update page
exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const page = await Page.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    await page.update(updateData);

    // Return updated page with sections
    const updatedPage = await Page.findByPk(id, {
      include: [
        {
          model: Section,
          include: [
            {
              model: Media,
              through: {
                model: SectionMedia,
                attributes: ['mediaRole', 'order']
              },
              where: { published: true },
              required: false
            }
          ],
          order: [['order', 'ASC']]
        }
      ]
    });

    res.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete page
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    await page.destroy();

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pages by type
exports.getPagesByType = async (req, res) => {
  try {
    const { pageType } = req.params;

    const pages = await Page.findAll({
      where: {
        pageType,
        published: true
      },
      include: [
        {
          model: Section,
          include: [
            {
              model: Media,
              through: {
                model: SectionMedia,
                attributes: ['mediaRole', 'order']
              },
              where: { published: true },
              required: false
            }
          ],
          where: { published: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages by type:', error);
    res.status(500).json({ message: 'Server error' });
  }
};