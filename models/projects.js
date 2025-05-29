'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Projects extends Model { }

Projects.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Projects',
    tableName: 'projects',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
Projects.associate = models => {
  Projects.hasMany(models.EngineeringLogs, {as: 'engineering_logs', foreignKey: 'project_id' });
};

export default Projects;
