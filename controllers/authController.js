import * as authService from '../services/authService.js';
export const login = async(req,res,next) => {
    const { email, password, role_id } = req.body;
    if (!email || !password || !role_id) {
        return res.status(400).json({ error: "Email, password, and role_id are required" });
    }
    try {
        const response = await authService.login(email, password, role_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
        
    }

}