import Roles from "../models/roles.js";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
    
    const user = await Users.findOne({
        where: { email, password},
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
        throw {
            statusCode: 400,
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password. Please provide correct email and password!'
        };
    }

    const token = jwt.sign({ userId: user.id, }, process.env.JWT_SECRET);
    return { message: "User logged in successfully", user: user, token: token };
}