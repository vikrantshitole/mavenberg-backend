import * as userService from '../services/userService.js';
export const getAllUsers = async(req, res) => {
    try {
        // Assuming you have a User model imported
        const users = await userService.getAllUsers(req.user); // Fetch all users from the database
        return res.status(200).json(users); // Return the users in JSON format
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}

export const getSalesVsEngineeringLogsData = async(req, res) => {
    try {
        const user = req.user; // Get the authenticated user from the request
        let response = {};
        if (user.role.name === 'Admin') {
            const [line_chart,bar_chart,pie_chart] = await Promise.all([userService.getSalesVsEngineeringLogsData(),userService.getSalesVsEngineeringLogsRegionData(),userService.getSalesVsEngineeringLogsStatusData()]); // Fetch the sales vs engineering logs data
            response = {line_chart,bar_chart,pie_chart};
        }else if (user.role.name === 'Sales') {
            const {line_chart,bar_chart,pie_chart} = await userService.getSalesData()
            response = {line_chart,bar_chart,pie_chart};
        } else if (user.role.name === 'Engineering') {
            const {line_chart,bar_chart,pie_chart} = await userService.getEngineeringLogsData()
            response = {line_chart,bar_chart,pie_chart};
        } else {
            return res.status(403).json({ error: "Forbidden: You do not have permission to access this resource." });
        }
        return res.status(200).json(response); // Return the data in JSON format
    } catch (error) {
        console.error("Error fetching sales vs engineering logs data:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}