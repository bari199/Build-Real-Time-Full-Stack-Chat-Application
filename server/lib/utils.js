import jwt from 'jsonwebtoken';

// Function to generate a token for a user
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token valid for 7 days
    });
    return token;
}