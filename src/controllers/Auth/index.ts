import User from '../../models/Users';
import jwt, { Secret } from 'jsonwebtoken';

const signJWT = (id: string) => {
    const secretOrPrivateKey: Secret | undefined = process.env.JWT_SECRET;
    if (!secretOrPrivateKey) {
        throw new Error('JWT secret is not defined in environment variables');
    }
     // Define JWT options
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    };

    const token = jwt.sign({ id }, secretOrPrivateKey, options);
    return token;
}

const signup = async (req: any, res: any) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        })
    
        const token = signJWT(newUser._id.toString());
    
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message ?? 'Failed to sign up' });
    }
}

export {
    signup
}