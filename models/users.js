
'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcrypt';

class Users extends Model {
  async comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return reject(err);
        if (!isMatch) return resolve(false);
        resolve(true);
      });
    });
  }
}


Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Roles',
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
    modelName: 'Users',
    tableName: 'users',
     created_at: 'created_at',
    updated_at: 'updated_at',
  }
);
// Hash password on individual create
Users.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Hash passwords on bulk create
Users.beforeBulkCreate(async (users, options) => {
  const saltRounds = 10;
  console.log('users', users);

  for (const user of users) {

    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  }
});

Users.associate = models => {
  Users.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' });
  Users.hasMany(models.Sales, { as: 'sales', foreignKey: 'user_id' });
  Users.hasMany(models.EngineeringLogs, { as: 'engineering_logs', foreignKey: 'user_id' });
};
export default Users;
