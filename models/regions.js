'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Regions extends Model { }

Regions.init(
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
    modelName: 'Regions',
    tableName: 'regions',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
Regions.associate = models => {
  Regions.hasMany(models.Sales, { as: 'sales', foreignKey: 'region_id' });
  Regions.hasMany(models.EngineeringLogs, { as: 'engineering_logs', foreignKey: 'region_id' });
};

export default Regions;
