'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Sales extends Model { }

Sales.init(
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
    sales_amount: {
      type: DataTypes.FLOAT
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
    modelName: 'Sales',
    tableName: 'sales',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
Sales.associate = models => {
Sales.belongsTo(models.Users, {as:'user', foreignKey: 'user_id' });
Sales.belongsTo(models.Regions, {as:'region', foreignKey: 'region_id' });
Sales.belongsTo(models.Statuses, {as: 'status', foreignKey: 'status_id' });
};

export default Sales;
