// API service for connecting to the backend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses (like 204 No Content)
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Menu API methods
  async getAllMenus() {
    return this.request('/menus');
  }

  async getMenuItems(menuId) {
    return this.request(`/menuitems/${menuId}`);
  }

  async addMenuItem(menuId, label) {
    return this.request(`/menuitems/${menuId}`, {
      method: 'POST',
      body: JSON.stringify({ label }),
    });
  }

  async updateMenuItem(label, newLabel) {
    return this.request(`/menuitems/label/${label}`, {
      method: 'PUT',
      body: JSON.stringify({ label: newLabel }),
    });
  }

  async deleteMenuItem(label) {
    return this.request(`/menuitems/label/${label}`, {
      method: 'DELETE',
    });
  }

  // Page API methods
  async getAllPages() {
    return this.request('/pages');
  }

  async updatePage(pageId, data) {
    return this.request(`/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Text/Content API methods
  async getTextByPageId(pageId) {
    return this.request(`/text/${pageId}`);
  }

  async updateTextByPageId(pageId, data) {
    return this.request(`/text/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Link API methods
  async getAllLinks() {
    return this.request('/links');
  }

  async getLinksByMenuId(menuId) {
    return this.request(`/links/${menuId}`);
  }

  async addLink(data) {
    return this.request('/links', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLink(id, data) {
    return this.request(`/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLink(label) {
    return this.request(`/links/label/${label}`, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
