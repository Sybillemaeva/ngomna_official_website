const { Media, SectionMedia, Section } = require('../config/Database');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create subdirectory based on media type
    let subDir;
    if (file.mimetype.startsWith('image/')) {
      subDir = 'images';
    } else if (file.mimetype.startsWith('video/')) {
      subDir = 'videos';
    } else if (file.mimetype.startsWith('audio/')) {
      subDir = 'audio';
    } else {
      subDir = 'documents';
    }

    const fullDir = path.join(uploadDir, subDir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }

    cb(null, fullDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images, videos, audio, and documents
  const allowedMimes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg',
    'audio/mpeg', 'audio/wav', 'audio/ogg',
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Upload single file
exports.uploadFile = upload.single('file');

// Create media entry after file upload
exports.createMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const {
      alt, altEn, altFr,
      caption, captionEn, captionFr,
      category, description,
      published = true
    } = req.body;

    // Determine media type based on mimetype
    let mediaType;
    if (req.file.mimetype.startsWith('image/')) {
      mediaType = 'image';
    } else if (req.file.mimetype.startsWith('video/')) {
      mediaType = 'video';
    } else if (req.file.mimetype.startsWith('audio/')) {
      mediaType = 'audio';
    } else {
      mediaType = 'document';
    }

    // Create relative URL path
    const relativePath = req.file.path.replace(path.join(__dirname, '../'), '').replace(/\\/g, '/');
    const url = '/' + relativePath;

    const mediaData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: relativePath,
      url: url,
      alt: alt || req.file.originalname,
      altEn: altEn || alt || req.file.originalname,
      altFr: altFr || alt || req.file.originalname,
      caption: caption || '',
      captionEn: captionEn || caption || '',
      captionFr: captionFr || caption || '',
      mediaType: mediaType,
      category: category || 'general',
      description: description || '',
      published: published
    };

    const media = await Media.create(mediaData);

    res.status(201).json(media);
  } catch (error) {
    console.error('Error creating media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all media
exports.getAllMedia = async (req, res) => {
  try {
    const {
      mediaType,
      category,
      published = true,
      page = 1,
      limit = 20
    } = req.query;

    const whereClause = {};

    if (mediaType) whereClause.mediaType = mediaType;
    if (category) whereClause.category = category;
    if (published !== undefined) whereClause.published = published === 'true';

    const offset = (page - 1) * limit;

    const { count, rows } = await Media.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      media: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get media by ID
exports.getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findByPk(id, {
      include: [
        {
          model: Section,
          through: {
            model: SectionMedia,
            attributes: ['mediaRole', 'order']
          },
          attributes: ['id', 'name', 'sectionType']
        }
      ]
    });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update media metadata
exports.updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    await media.update(updateData);

    res.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete media
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../', media.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from database
    await media.destroy();

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get media by section
exports.getMediaBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { mediaRole } = req.query;

    const whereClause = { sectionId };
    if (mediaRole) whereClause.mediaRole = mediaRole;

    const sectionMedia = await SectionMedia.findAll({
      where: whereClause,
      include: [
        {
          model: Media,
          where: { published: true }
        }
      ],
      order: [['order', 'ASC']]
    });

    const media = sectionMedia.map(sm => ({
      ...sm.Media.toJSON(),
      mediaRole: sm.mediaRole,
      order: sm.order
    }));

    res.json(media);
  } catch (error) {
    console.error('Error fetching media by section:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search media
exports.searchMedia = async (req, res) => {
  try {
    const { q, mediaType, category } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }

    const whereClause = {
      published: true,
      [Op.or]: [
        { originalName: { [Op.iLike]: `%${q}%` } },
        { alt: { [Op.iLike]: `%${q}%` } },
        { caption: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } }
      ]
    };

    if (mediaType) whereClause.mediaType = mediaType;
    if (category) whereClause.category = category;

    const media = await Media.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json(media);
  } catch (error) {
    console.error('Error searching media:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Legacy text routes for backward compatibility
exports.getTextByPageId = async (req, res) => {
  try {
    const { pageId } = req.params;

    // For backward compatibility, return a simple text response
    // This could be enhanced to fetch actual page content later
    const textData = {
      pageId: pageId,
      content: "This is a legacy text endpoint for backward compatibility.",
      lastUpdated: new Date()
    };

    res.json(textData);
  } catch (error) {
    console.error('Error fetching text by page ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTextByPageId = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { content } = req.body;

    // For backward compatibility, return a simple success response
    // This could be enhanced to update actual page content later
    const updatedData = {
      pageId: pageId,
      content: content || "Updated content",
      lastUpdated: new Date()
    };

    res.json(updatedData);
  } catch (error) {
    console.error('Error updating text by page ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};