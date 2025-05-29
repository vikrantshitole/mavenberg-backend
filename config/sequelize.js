import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'mysql',
  password: process.env.DB_PASSWORD || 'mysql',
  database: process.env.DB_NAME || 'mavenberg_db',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    created_at: 'created_at',
    updated_at: 'updated_at',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    multipleStatements: true,
  },
};

const sequelize = new Sequelize(config);

export default sequelize;
