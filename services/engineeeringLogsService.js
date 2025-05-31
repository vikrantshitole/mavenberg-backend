import { sequelize } from "../models/index.js";
import EngineeringLogs from "../models/engineering_logs.js";
import Regions from "../models/regions.js";
import Statuses from "../models/statuses.js";

export const getEngineeringLogsMonthWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'name'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'engineering']
        ],
        group: ['name'],
        order: [['name', 'ASC']], // Ensure the periods are in ascending order
        raw: true
    });
}

export const getEngineeringLogsRegionWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            'region_id',
            [sequelize.fn('COUNT', sequelize.col('*')), 'total'],
            // [sequelize.col('region.id'), 'region.id'],
            [sequelize.col('region.name'), 'name']
        ],
        include: [
            {
                model: Regions,
                as: 'region',
                attributes: []
            }
        ],
        group: ['EngineeringLogs.region_id', 'region.id'],  // <-- include all non-aggregated select columns here
        order:['name'], // <-- include all non-aggregated select columns here
        raw: true
    });
}
export const getEngineeringLogsStatusWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            // 'status_id',
            [sequelize.col('status.name'), 'name'],
        ],
  include: [
    { model: Statuses, as: 'status', attributes: ['id', 'name'] }
  ],
  order: [['name', 'ASC']], // Order by status name
  raw: true
});
}
export const getEngineeringLogsProjectRegionWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            // 'region_id',
            [sequelize.fn('COUNT', sequelize.col('*')), 'total'],
            // [sequelize.col('region.id'), 'region.id'],
            [sequelize.col('region.name'), 'name']
        ],
        include: [
            {
                model: Regions,
                as: 'region',
                attributes: []
            }
        ],
        group: [ 'EngineeringLogs.region_id', 'region.id'], 
        order:['name'], // <-- include all non-aggregated select columns here
        raw: true
    });
}
export const getEngineeringLogsProjectStatusWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            // 'status_id',
            [sequelize.fn('COUNT', sequelize.col('*')), 'total'],
            // [sequelize.col('status.id'), 'status.id'],
            [sequelize.col('status.name'), 'name']
        ],
        include: [
            {
                model: Statuses,
                as: 'status',
                attributes: []
            }
        ],
        group: ['EngineeringLogs.status_id', 'status.id'],  // <-- include all non-aggregated select columns here
        order:['name'], // <-- include all non-aggregated select columns here
        raw: true
    });
}
export const getEngineeringLogsProjectMonthWiseData = async (user) => {
    return EngineeringLogs.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'name'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'engineering']
        ],
        group: ['name'],
        order: [['name', 'ASC']], // Ensure the periods are in ascending order
        raw: true
    });
}