const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
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
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  // Menu endpoints
  async getMenus() {
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

  // Page endpoints
  async getPages() {
    return this.request('/pages');
  }

  async updatePage(pageId, data) {
    return this.request(`/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Text content endpoints
  async getTextByPageId(pageId) {
    return this.request(`/text/${pageId}`);
  }

  async updateTextByPageId(pageId, data) {
    return this.request(`/text/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Link endpoints
  async getLinks() {
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

const apiService = new ApiService();
export default apiService;