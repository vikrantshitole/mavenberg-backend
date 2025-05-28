import sequelize from '../db/sequelize.js';

// Initialize models
const models = {
};

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };
