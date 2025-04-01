import api from './AxiosApi';

export default class BaseService {
  constructor(entityName) {
    this.entityName = entityName;
  }

  async getAll() {
    await api.get(this.entityName).then((data) => {
      this.data = data.data;
    });
    return this.data;
  }

  async get(id) {
    await api.get(`${this.entityName}/${id}`).then((data) => {
      this.data = data.data;
    });
    return this.data;
  }

  async insert(entity) {
    await api.post(this.entityName, entity);
  }

  async update(entity) {
    await api.put(`${this.entityName}/${entity.id}`, entity);
  }

  async delete(id) {
    await api.delete(`${this.entityName}/${id}`);
  }
}
