import jwt from 'jsonwebtoken';
import {prisma} from '../config/db.js'
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    let token;
    if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
   
    }
    
    else if(req.cookies && req.cookies.jwt) {
        const token = req.cookies.jwt;
    }
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.orm.public.user.first({ id: decoded.id });
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })};



  
}

export default authMiddleware;