import { sequelize } from "../models/index.js";
import Regions from "../models/regions.js";
import Sales from "../models/sales.js";
import Statuses from "../models/statuses.js";

export const getSalesMonthWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'period'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'sales']
        ],
        group: ['period'],
        order: [['period', 'ASC']], // Ensure the periods are in ascending order
        raw: true
    });
}
export const getSalesRegionWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'region_id',
            [sequelize.fn('COUNT', sequelize.col('*')), 'total'],

            [sequelize.col('region.id'), 'region.id'],
            [sequelize.col('region.name'), 'region.name']

        ],
        group: ['sales.region_id'],
        include: [
            {
                model: Regions, // Assuming you have a Regions model
                as: 'region', // Adjust the alias based on your association
                attributes: [] // Adjust attributes based on your Region model
            }
        ],
        order: [['region.name', 'ASC']], // Order by region name
        raw: true
    });
}

export const getSalesStatusWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'status_id',
        ],
        include: [
            {
                model: Statuses, // Assuming you have a Statuses model
                as: 'status', // Adjust the alias based on your association
                attributes: ['id', 'name'] // Adjust attributes based on your Status model
            }
        ],
        order: [['status.name', 'ASC']], // Order by status name
        raw: true
    });
}
export const getSalesAmountRegionWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'region_id',
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'total_sales'],
            [sequelize.col('region.id'), 'region.id'],
            [sequelize.col('region.name'), 'region.name']
        ],
        include: [
            {
                model: Regions,
                as: 'region',
                attributes: []
            }
        ],
        group: ['sales.region_id', 'region.id'], // <-- include all non-aggregated select columns here
        order: [['region.name', 'ASC']], // Order by region name
        raw: true
    });
}
export const getSalesAmountStatusWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'status_id',
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'total_sales']
        ],
        include: [
            {
                model: Statuses,
                as: 'status',
                attributes: ['id', 'name']
            }
        ],
        group: ['sales.status_id', 'status.id'], // <-- include all non-aggregated select columns here
        order: [['status.name', 'ASC']], // Order by status name
        raw: true
    });
}
export const getSalesAmountMonthWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'period'],
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'total_sales']
        ],
        group: ['period'],
        order: [['period', 'ASC']], // Ensure the periods are in ascending order
        raw: true
    });
}