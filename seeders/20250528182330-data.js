'use strict';

const { default: Users } = require('../models/users');
const { roles, regions, projects, statuses, users, sales, engineeringLogs } = require('../utils');
const BATCH_SIZE = 5000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', roles);
    await queryInterface.bulkInsert('Regions', regions);
    await queryInterface.bulkInsert('Projects', projects);
    await queryInterface.bulkInsert('Statuses', statuses);
    
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      await Users.bulkCreate( users.slice(i, i + BATCH_SIZE));
    }
    // await queryInterface.bulkInsert('Users', users);
    for (let i = 0; i < sales.length; i += BATCH_SIZE) {
      await queryInterface.bulkInsert('sales', sales.slice(i, i + BATCH_SIZE));
    }
    for (let i = 0; i < engineeringLogs.length; i += BATCH_SIZE) {
      await queryInterface.bulkInsert('Engineering_logs', engineeringLogs.slice(i, i + BATCH_SIZE));
    }
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Regions', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Statuses', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('sales', null, {});
    await queryInterface.bulkDelete('Engineering_logs', null, {});
  }
};
