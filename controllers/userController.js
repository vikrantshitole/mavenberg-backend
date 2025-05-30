import * as userController from '../services/userService.js';
export const getAllUsers = async(req, res) => {
    try {
        // Assuming you have a User model imported
        const users = await userController.getAllUsers(req.user); // Fetch all users from the database
        return res.status(200).json(users); // Return the users in JSON format
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}