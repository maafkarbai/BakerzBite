import { auth } from '@config/firebase.js';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';

class AdminRoleService {
  
  // Get authorization headers with Firebase token
  async getAuthHeaders() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }
      
      const idToken = await currentUser.getIdToken();
      return {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      throw error;
    }
  }

  // Get all users with their roles
  async getAllUsers() {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Set user role (admin, staff, customer)
  async setUserRole(uid, email, role = 'customer') {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/set-role`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uid, email, role })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set user role');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error setting user role:', error);
      throw error;
    }
  }

  // Set admin role for a user (legacy method)
  async setAdminRole(uid, email, isAdmin = true) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/set-admin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uid, email, isAdmin })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set admin role');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error setting admin role:', error);
      throw error;
    }
  }

  // Set staff role for a user
  async setStaffRole(uid, email, isStaff = true) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/set-staff`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uid, email, isStaff })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set staff role');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error setting staff role:', error);
      throw error;
    }
  }

  // Remove admin role from a user
  async removeAdminRole(uid, email) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/remove-admin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uid, email })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to remove admin role');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error removing admin role:', error);
      throw error;
    }
  }

  // Get specific user's claims
  async getUserClaims(uid) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/user/${uid}`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch user claims');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user claims:', error);
      throw error;
    }
  }

  // Batch set roles for multiple users
  async batchSetRoles(operations) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/api/admin/roles/batch-set`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ operations })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to execute batch operations');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in batch role setting:', error);
      throw error;
    }
  }

  // Promote user to admin
  async promoteToAdmin(uid, email) {
    return this.setUserRole(uid, email, 'admin');
  }

  // Promote user to staff
  async promoteToStaff(uid, email) {
    return this.setUserRole(uid, email, 'staff');
  }

  // Demote user to customer
  async demoteToCustomer(uid, email) {
    return this.setUserRole(uid, email, 'customer');
  }

  // Legacy method - demote user from admin
  async demoteFromAdmin(uid, email) {
    return this.setUserRole(uid, email, 'customer');
  }

  // Check if user has a specific role
  async checkUserRole(uid, expectedRole) {
    try {
      const result = await this.getUserClaims(uid);
      if (result.success) {
        const userRole = result.claims.role || 'customer';
        return {
          success: true,
          hasRole: userRole === expectedRole,
          currentRole: userRole,
          claims: result.claims
        };
      }
      return result;
    } catch (error) {
      console.error('Error checking user role:', error);
      throw error;
    }
  }
}

export default new AdminRoleService();