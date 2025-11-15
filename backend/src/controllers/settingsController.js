import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get system settings (including language)
export const getSystemSettings = async (req, res) => {
  try {
    // Get or create default settings
    let settings = await prisma.systemSettings.findFirst();

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.systemSettings.create({
        data: {
          defaultLanguage: 'en',
          defaultDirection: 'ltr',
        }
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching system settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching system settings',
      error: error.message
    });
  }
};

// Update system language (ADMIN only)
export const updateSystemLanguage = async (req, res) => {
  try {
    const { language } = req.body;

    if (!language || !['en', 'ar'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Must be "en" or "ar"'
      });
    }

    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Get existing settings or create new
    let settings = await prisma.systemSettings.findFirst();

    if (settings) {
      // Update existing settings
      settings = await prisma.systemSettings.update({
        where: { id: settings.id },
        data: {
          defaultLanguage: language,
          defaultDirection: direction,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new settings
      settings = await prisma.systemSettings.create({
        data: {
          defaultLanguage: language,
          defaultDirection: direction,
        }
      });
    }

    res.json({
      success: true,
      message: `System language updated to ${language === 'ar' ? 'Arabic' : 'English'}`,
      data: settings
    });
  } catch (error) {
    console.error('Error updating system language:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating system language',
      error: error.message
    });
  }
};
