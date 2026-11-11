import 'temporal-polyfill/full/global';
import { prisma } from '../config/db.js';   // see note below
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/generateToken.js';
 const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await prisma.orm.public.user.first({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user (fields go directly into create, no `data:`)
    const user = await prisma.orm.public.user.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await prisma.orm.public.user.first({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user.id,res);


    res.status(200).json({
    status: 'success',
    data: {
      user: { id: user.id, email: user.email },
    },
    token,
    })
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};


const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

export {register, login, logout};