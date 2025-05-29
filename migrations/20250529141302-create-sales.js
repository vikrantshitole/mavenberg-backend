'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('(UUID())'), // Note: needs parentheses
        primaryKey: true,
      },
      sales_amount: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE
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
      region_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'regions',
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
    await queryInterface.addIndex('Sales', ['status_id']);
    await queryInterface.addIndex('Sales', ['region_id']);
    await queryInterface.addIndex('Sales', ['user_id']);
    // await queryInterface.addIndex('Sales', ['sale_id']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};