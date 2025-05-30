import Roles from "../models/roles.js";
import Users from "../models/users.js";

export const getAllUsers = async(user) => {
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
export const getUserById = async(id) => {
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