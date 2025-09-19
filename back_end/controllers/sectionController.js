const { Section, Media, SectionMedia, Page } = require('../config/Database');

// Get all sections for a page with multimedia content
exports.getSectionsByPage = async (req, res) => {
  try {
    const { pageId } = req.params;

    const sections = await Section.findAll({
      where: {
        pageId,
        published: true
      },
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
    });

    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific section with multimedia content
exports.getSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id, {
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
          model: Page,
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get sections by type (e.g., herosection, about, etc.)
exports.getSectionsByType = async (req, res) => {
  try {
    const { sectionType } = req.params;
    const { pageId } = req.query;

    const whereClause = {
      sectionType,
      published: true
    };

    if (pageId) {
      whereClause.pageId = pageId;
    }

    const sections = await Section.findAll({
      where: whereClause,
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
          model: Page,
          attributes: ['id', 'name', 'slug']
        }
      ],
      order: [['order', 'ASC']]
    });

    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections by type:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update section content (for admin dashboard)
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await section.update(updateData);

    // Fetch updated section with media
    const updatedSection = await Section.findByPk(id, {
      include: [
        {
          model: Media,
          through: {
            model: SectionMedia,
            attributes: ['mediaRole', 'order']
          }
        }
      ]
    });

    res.json(updatedSection);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new section
exports.createSection = async (req, res) => {
  try {
    const sectionData = req.body;

    const section = await Section.create(sectionData);

    res.status(201).json(section);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await section.destroy();

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Associate media with section
exports.addMediaToSection = async (req, res) => {
  try {
    const { sectionId, mediaId } = req.params;
    const { mediaRole = 'primary', order = 1 } = req.body;

    const section = await Section.findByPk(sectionId);
    const media = await Media.findByPk(mediaId);

    if (!section || !media) {
      return res.status(404).json({ message: 'Section or Media not found' });
    }

    await SectionMedia.create({
      sectionId,
      mediaId,
      mediaRole,
      order
    });

    res.json({ message: 'Media associated with section successfully' });
  } catch (error) {
    console.error('Error associating media with section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove media from section
exports.removeMediaFromSection = async (req, res) => {
  try {
    const { sectionId, mediaId } = req.params;

    await SectionMedia.destroy({
      where: {
        sectionId,
        mediaId
      }
    });

    res.json({ message: 'Media removed from section successfully' });
  } catch (error) {
    console.error('Error removing media from section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};