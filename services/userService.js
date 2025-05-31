import Roles from "../models/roles.js";
import Users from "../models/users.js";
import { getEngineeringLogsMonthWiseData, getEngineeringLogsProjectMonthWiseData, getEngineeringLogsProjectRegionWiseData, getEngineeringLogsProjectStatusWiseData, getEngineeringLogsRegionWiseData, getEngineeringLogsStatusWiseData } from "./engineeeringLogsService.js";
import { getSalesAmountMonthWiseData, getSalesAmountRegionWiseData, getSalesAmountStatusWiseData, getSalesMonthWiseData, getSalesRegionWiseData, getSalesStatusWiseData } from "./saleService.js";
import { sequelize } from "../models/index.js";

export const getAllUsers = async (user) => {
    const roles = [];
    let where = {}
    if (user.role.name !== 'Admin') {
        roles.push(user.role.id);
        where = {role_id: roles}
    }
    const users = await Users.findAll({
        include: [
            {
                model: Roles,
                as: 'role',
                attributes: []
            }
        ],
        where,
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role_id', [sequelize.col('role.name'), 'role_name']],
        order:['first_name']
    })
    console.log("Users fetched:", users.length);

    return users;
}
export const getUserById = async (id) => {
    console.log(id);

    const user = await Users.findOne({
        where: { id },
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role_id'],
        include: [
            {
                model: Roles,
                as: 'role',
                attributes: ['id', 'name']
            }
        ]
    });

    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
export const getSalesVsEngineeringLogsData = async () => {
    try {
        const [engineering, sales] = await Promise.all([getEngineeringLogsMonthWiseData(), getSalesMonthWiseData()])
        const merged = {};
        
        sales.forEach(({ name, sales }) => {
            if (!merged[name]) merged[name] = { name:name, sales: 0, engineering: 0 };
            merged[name].sales = parseInt(sales);
        });

        engineering.forEach(({ name, engineering }) => {
            if (!merged[name]) merged[name] = { name:name, sales: 0, engineering: 0 };
            merged[name].engineering = parseInt(engineering);
        });

        
        const result = Object.values(merged).sort((a, b) => a.name.localeCompare(b.name));

        
        return result;
    } catch (error) {
        console.error("Error fetching Sales vs Engineering logs data:", error);
        throw new Error("Failed to fetch Sales vs Engineering logs data");

    }
}
export const getSalesVsEngineeringLogsRegionData = async (user) => {

    const [engineering, sales] = await Promise.all([getEngineeringLogsRegionWiseData(), getSalesRegionWiseData()]);

    const combined = {};

    for (const row of sales) {
        const region = row.region_id;
        const regionName = row['name'];
        if (!combined[region]) combined[region] = { name: regionName, sales: 0, engineering: 0 };
        combined[region].sales += parseInt(row.total, 10);
    }

    for (const row of engineering) {
        const region = row.region_id;
        
        const regionName = row['name'];
        if (!combined[region]) combined[region] = { name: regionName, sales: 0, engineering: 0 };
        combined[region].engineering += parseInt(row.total, 10);
    }

    const result = Object.values(combined);
    return result;
}
export const getSalesVsEngineeringLogsStatusData = async (user) => {
    try {
        const [engineering, sales] = await Promise.all([getEngineeringLogsStatusWiseData(), getSalesStatusWiseData()]);
        const allStatuses = [...sales, ...engineering];

        // Step 3: Group by status_id and count
        const statusCountMap = allStatuses.reduce((acc, curr) => {
            const statusName = curr['name'];
            acc[statusName] = (acc[statusName] || 0) + 1;
            return acc;
        }, {});
        console.log(Object.entries(statusCountMap));
        

        // Step 4: Convert the map to an array
        const result = Object.entries(statusCountMap).map(([name, total]) => ({
            name,
            total
        }));
        return result;
    } catch (error) {
        console.error("Error fetching Sales vs Engineering logs status data:", error);
        throw new Error("Failed to fetch Sales vs Engineering logs status data");
    }
}
export const getSalesData = async (user) => {
    try {
        const [line_chart, bar_chart, pie_chart] = await Promise.all([
            getSalesAmountMonthWiseData(user), 
            getSalesAmountRegionWiseData(user), 
            getSalesAmountStatusWiseData(user)
        ]);
        
        if (!line_chart || !bar_chart || !pie_chart) {
            throw new Error("Failed to fetch one or more data sets");
        }

        return {
            line_chart: { name: 'Sales Trend Over Time', data: line_chart },
            pie_chart: { name: "Status Distribution of Sales", data: pie_chart },
            bar_chart: { name: 'Total Sales by Region', data: bar_chart }
        };
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw new Error("Failed to fetch sales data: " + error.message);
    }
}
export const getEngineeringLogsData = async (user) => {
    const [line_chart,bar_chart,pie_chart] = await Promise.all([getEngineeringLogsProjectMonthWiseData(user),getEngineeringLogsProjectRegionWiseData(),getEngineeringLogsProjectStatusWiseData()]);
    return {line_chart: {name: 'Project Count over Time', data: line_chart}, pie_chart: {name: "Project Status Distribution ",data: pie_chart}, bar_chart: {name: 'Total Projects by Region', data: bar_chart} };
}