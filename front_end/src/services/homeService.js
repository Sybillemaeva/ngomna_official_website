// homeService.js - API service for homepage content

const API_BASE_URL = 'http://localhost:5000/api';

class HomeService {
  // Get homepage content (stats, vision, mission, future services)
  async getHomepageContent(language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage/content?language=${language}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      throw error;
    }
  }

  // Get news articles
  async getNewsArticles(language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage/news?language=${language}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw error;
    }
  }

  // Get FAQ data
  async getFaqData(language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage/faq?language=${language}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      throw error;
    }
  }

  // Get testimonials data
  async getTestimonials(language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage/testimonials?language=${language}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }

  // Get all homepage data at once
  async getAllHomepageData(language = 'en') {
    try {
      const [contentResponse, newsResponse, faqResponse, testimonialsResponse] = await Promise.all([
        this.getHomepageContent(language),
        this.getNewsArticles(language),
        this.getFaqData(language),
        this.getTestimonials(language)
      ]);

      return {
        content: contentResponse.data,
        news: newsResponse.data,
        faq: faqResponse.data,
        testimonials: testimonialsResponse.data
      };
    } catch (error) {
      console.error('Error fetching all homepage data:', error);
      throw error;
    }
  }
}

// Export a singleton instance
const homeService = new HomeService();
export default homeService;