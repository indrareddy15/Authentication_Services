import jwt from "jsonwebtoken";

const generateJwtToken = (userId, res) => {
    if (!userId) {
        throw new Error('userId is required');
    }

    if (!res || typeof res.cookie !== 'function') {
        throw new Error('Valid response object is required');
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    })
    return token
}



export default generateJwtToken;