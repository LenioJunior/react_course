import BaseService from './BaseService';
import mockUsers from './mockUsers';

// Flag para usar mock ou API real
const USE_MOCK = false;

class UserService extends BaseService {
  constructor() {
    super('users');
    this.mockUsers = [...mockUsers];
    this.useMock = USE_MOCK;
  }

  async getAll() {
    if (this.useMock) {
      return Promise.resolve([...this.mockUsers]);
    }
    
    try {
      await super.getAll();
      return this.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async get(id) {
    if (this.useMock) {
      const user = this.mockUsers.find(user => user.id === Number(id));
      return Promise.resolve(user || null);
    }
    
    try {
      await super.get(id);
      return this.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  }

  async insert(user) {
    if (this.useMock) {
      // Simular inserção com novo ID
      const newUser = {
        ...user,
        id: Math.max(...this.mockUsers.map(u => u.id), 0) + 1
      };
      this.mockUsers.push(newUser);
      return Promise.resolve(newUser);
    }
    
    try {
      return await super.insert(user);
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }

  async update(user) {
    if (this.useMock) {
      const index = this.mockUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.mockUsers[index] = { ...user };
        return Promise.resolve(this.mockUsers[index]);
      }
      throw new Error('User not found');
    }
    
    try {
      return await super.update(user);
    } catch (error) {
      console.error(`Error updating user with id ${user.id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    if (this.useMock) {
      const index = this.mockUsers.findIndex(user => user.id === Number(id));
      if (index !== -1) {
        const deletedUser = this.mockUsers[index];
        this.mockUsers.splice(index, 1);
        return Promise.resolve(deletedUser);
      }
      throw new Error('User not found');
    }
    
    try {
      return await super.delete(id);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }

  // Métodos específicos para usuários
  async validateEmail(email) {
    if (this.useMock) {
      return Promise.resolve(!this.mockUsers.some(user => user.email === email));
    }
    
    try {
      const response = await this.getAll();
      return !response.some(user => user.email === email);
    } catch (error) {
      console.error('Error validating email:', error);
      throw error;
    }
  }
}

export default new UserService();