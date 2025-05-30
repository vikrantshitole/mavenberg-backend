// models/engineering-logs.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class EngineeringLogs extends Model {}

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
    modelName : 'EngineeringLogs',      // PascalCase for the JS class
    tableName : 'engineering_logs',     // EXACT table name in MySQL
    timestamps: true,
    createdAt : 'created_at',           // <-- correct timestamp option names
    updatedAt : 'updated_at',
  }
);

// ---- ASSOCIATIONS ----
EngineeringLogs.associate = models => {
  EngineeringLogs.belongsTo(models.Users,   { as: 'user',    foreignKey: 'user_id'   });
  EngineeringLogs.belongsTo(models.Regions, { as: 'region',  foreignKey: 'region_id' });
  EngineeringLogs.belongsTo(models.Statuses,{ as: 'status',  foreignKey: 'status_id' });
  EngineeringLogs.belongsTo(models.Projects,{ as: 'project', foreignKey: 'project_id'});
};

export default EngineeringLogs;
