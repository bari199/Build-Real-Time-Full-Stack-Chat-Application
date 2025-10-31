import express from 'express';
import { signup, login, checkAuth, updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/check-auth",protectRoute,checkAuth)
userRouter.put("/update-profile",protectRoute,updateProfile)

export default userRouter;
