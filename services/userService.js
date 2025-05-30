import Roles from "../models/roles.js";
import Users from "../models/users.js";
import { getEngineeringLogsMonthWiseData, getEngineeringLogsProjectMonthWiseData, getEngineeringLogsProjectRegionWiseData, getEngineeringLogsProjectStatusWiseData, getEngineeringLogsRegionWiseData, getEngineeringLogsStatusWiseData } from "./engineeeringLogsService.js";
import { getSalesAmountMonthWiseData, getSalesAmountRegionWiseData, getSalesAmountStatusWiseData, getSalesMonthWiseData, getSalesRegionWiseData, getSalesStatusWiseData } from "./saleService.js";

export const getAllUsers = async (user) => {
    const roles = [];
    user
    if (user.role.name !== 'Admin') {
        roles.push(user.role.id);
    }
    const users = await Users.findAll({
        include: [
            {
                model: Roles,
                as: 'role',
                attributes: ['name']
            }
        ],
        where: {
            role_id: roles.length > 0 ? roles : undefined
        },
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role_id'],
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

        sales.forEach(({ period, sales }) => {
            if (!merged[period]) merged[period] = { period, sales: 0, engineering: 0 };
            merged[period].sales = parseInt(sales);
        });

        engineering.forEach(({ period, engineering }) => {
            if (!merged[period]) merged[period] = { period, sales: 0, engineering: 0 };
            merged[period].engineering = parseInt(engineering);
        });

        const result = Object.values(merged).sort((a, b) => a.period.localeCompare(b.period));
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
        const regionName = row['region.name'];
        if (!combined[region]) combined[region] = { region: regionName, sales_count: 0, engineering_count: 0 };
        combined[region].sales_count += parseInt(row.total, 10);
    }

    for (const row of engineering) {
        const region = row.region_id;
        const regionName = row['region.name'];
        if (!combined[region]) combined[region] = { region: regionName, sales_count: 0, engineering_count: 0 };
        combined[region].engineering_count += parseInt(row.total, 10);
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
            const statusName = curr['status.name'];
            acc[statusName] = (acc[statusName] || 0) + 1;
            return acc;
        }, {});

        // Step 4: Convert the map to an array
        const result = Object.entries(statusCountMap).map(([status_name, total]) => ({
            status_name: parseInt(status_name),
            total
        }));
        return result;
    } catch (error) {
        console.error("Error fetching Sales vs Engineering logs status data:", error);
        throw new Error("Failed to fetch Sales vs Engineering logs status data");
    }
}
export const getSalesData = async (user) => {
    const [line_chart,bar_chart,pie_chart] = await Promise.all([getSalesAmountMonthWiseData(user), getSalesAmountRegionWiseData(user),getSalesAmountStatusWiseData()]);
    return {line_chart, pie_chart, bar_chart};
}
export const getEngineeringLogsData = async (user) => {
    const [line_chart,bar_chart,pie_chart] = await Promise.all([getEngineeringLogsProjectMonthWiseData(user),getEngineeringLogsProjectRegionWiseData(),getEngineeringLogsProjectStatusWiseData()]);
    return {line_chart, pie_chart, bar_chart};
}