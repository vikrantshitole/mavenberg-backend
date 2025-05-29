'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Engineering_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('(UUID())'), // Note: needs parentheses
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'projects',
          key: 'id',
        },
        onDelete: 'CASCADE',
      
      },
      status_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'statuses',
          key: 'id',
        },
        onDelete: 'CASCADE',
      
      },
      region_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'regions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      
      },
      date: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
   
    await queryInterface.addIndex('Engineering_logs', ['status_id']);
    await queryInterface.addIndex('Engineering_logs', ['region_id']);
    await queryInterface.addIndex('Engineering_logs', ['user_id']);
    await queryInterface.addIndex('Engineering_logs', ['project_id']);
 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Engineering_logs');
  }
};