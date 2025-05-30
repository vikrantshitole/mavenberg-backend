'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Roles extends Model { }

Roles.init(
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
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
Roles.associate = models => {
  Roles.hasMany(models.Users, { as: 'users', foreignKey: 'role_id' });
};

export default Roles;
