import { sequelize } from "../models/index.js";
import Regions from "../models/regions.js";
import Sales from "../models/sales.js";
import Statuses from "../models/statuses.js";

export const getSalesMonthWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'name'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'sales']
        ],
        group: sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'),
        order: sequelize.literal('name ASC'),
        raw: true
    });
}

export const getSalesRegionWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'region_id',
            [sequelize.fn('COUNT', sequelize.col('region.id')), 'total'],
            [sequelize.col('region.name'), 'name']
        ],
        include: [{
            model: Regions,
            as: 'region',
            attributes: []
        }],
        group: ['region_id', 'region.name'],
        order: sequelize.literal('name ASC'),
        raw: true
    });
}

export const getSalesStatusWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'status_id',
            [sequelize.col('status.name'), 'name'],
            [sequelize.fn('COUNT', sequelize.col('status_id')), 'total']
        ],
        include: [{
            model: Statuses,
            as: 'status',
            attributes: []
        }],
        group: ['status_id', 'status.name'],
        order: sequelize.literal('name ASC'),
        raw: true
    });
}

export const getSalesAmountRegionWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'region_id',
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'sales'],
            [sequelize.col('region.name'), 'name']
        ],
        include: [{
            model: Regions,
            as: 'region',
            attributes: []
        }],
        group: ['region_id', 'region.name'],
        order: sequelize.literal('name ASC'),
        raw: true
    });
}

export const getSalesAmountStatusWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            'status_id',
            [sequelize.col('status.name'), 'name'],
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'total']
        ],
        include: [{
            model: Statuses,
            as: 'status',
            attributes: []
        }],
        group: ['status_id', 'status.name'],
        order: sequelize.literal('name ASC'),
        raw: true
    });
}

export const getSalesAmountMonthWiseData = async (user) => {
    return Sales.findAll({
        attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'name'],
            [sequelize.fn('SUM', sequelize.col('sales_amount')), 'sales']
        ],
        group: sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'),
        order: sequelize.literal('name ASC'),
        raw: true
    });
}