'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Statuses extends Model { }

Statuses.init(
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
    modelName: 'Statuses',
    tableName: 'statuses',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
Statuses.associate = models => {
  Statuses.hasMany(models.Sales, {as:'sales', foreignKey: 'status_id' });
  Statuses.hasMany(models.EngineeringLogs, { as: 'engineering_logs', foreignKey: 'status_id' });
  };

export default Statuses;
