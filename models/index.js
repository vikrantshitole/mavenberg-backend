import sequelize from '../config/sequelize.js';
import Roles from './roles.js';
import Users from './users.js';

// Initialize models
const models = {
  Roles,
  Users
};

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };
