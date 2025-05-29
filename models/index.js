import sequelize from '../config/sequelize.js';
import EngineeringLogs from './engineering_logs.js';
import Projects from './projects.js';
import Regions from './regions.js';
import Roles from './roles.js';
import Sales from './sales.js';
import Statuses from './statuses.js';
import Users from './users.js';

// Initialize models
const models = {
  Roles,
  Users,
  Projects,
  Regions,
  Sales,
  EngineeringLogs,
  Statuses
};

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };
