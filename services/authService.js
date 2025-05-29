import Roles from "../models/roles.js";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

export const login = async (email, password, role_id) => {
    if (!email || !password || !role_id) {
        throw new Error("Username, password, and role_id are required");
    }
    const user = await Users.findOne({
        where: { email, role_id , password},
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role_id'],
        include: [
            {
                attributes: ['id', 'name'], // Adjust attributes based on your Role model
                model: Roles, // Assuming you have a Role model associated with Users
                as: 'role' // Adjust the alias based on your association
            }
        ]

    });
    if (!user) {
        throw new Error("Invalid username or role_id or password");
    }

    const token = jwt.sign({ userId: user._id, }, 'MY_SECRET_KEY');
    return { message: "User logged in successfully", user: user, token: token };
}