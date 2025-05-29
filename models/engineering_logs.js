'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class EngineeringLogs extends Model { }

EngineeringLogs.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id:{
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    region_id:{
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Regions',
        key: 'id',
      },
    },
    status_id:{
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Statuses',
        key: 'id',
      },
    },
    project_id:{
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Projects',
        key: 'id',
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
    modelName: 'Engineering_logs',
    tableName: 'Engineering_logs',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
EngineeringLogs.associate = models => {
  EngineeringLogs.belongsTo(models.Users, { as: 'users', foreignKey: 'id' });
  EngineeringLogs.belongsTo(models.Regions, { as: 'regions', foreignKey: 'id' });
  EngineeringLogs.belongsTo(models.Statuses, { as: 'status', foreignKey: 'id' });
  EngineeringLogs.belongsTo(models.Projects, { as: 'project', foreignKey: 'id' });
};

export default EngineeringLogs;
