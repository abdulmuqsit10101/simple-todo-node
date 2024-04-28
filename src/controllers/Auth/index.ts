import jwt, { Secret } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { promisify } from 'util';
import User, { UserDocument } from '../../models/Users';

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
};

const signup = async (req: any, res: any) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signJWT(newUser._id.toString());

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 'error', message: error.message ?? 'Failed to sign up' });
  }
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'failed',
      message: 'Please provide email and password!',
    });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect email or password',
      });
    }

    // 2) check if the email and password is valid
    const user = ((await User.findOne({ email }).select(
      '+password'
    )) as unknown) as Document & UserDocument & { _id: ObjectId };
    if (
      !user ||
      !(await user.correctPassword(password, user.password.toString()))
    ) {
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect email or password',
      });
    }

    // 3 Send token in the response
    const token = signJWT(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 'error', message: error.message ?? 'Failed to sign up' });
  }
};

const protect = async (req: any, res: any, next: any) => {
  // checking for token if it is coming from the client

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'failed',
      message: 'You are not logged in! Please login to get access',
    });
  }

  // token verification
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user still exits which was assigned the following token
  // @ts-ignore
  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      status: 'failed',
      message: 'User belongs to this token does not exist!',
    });
  }

  // @ts-ignore
  req.userId = decoded.id;

  next();
};

const authRole = async (req: any, res: any, next: any) => {
  const user = await User.findById(req.userId);
  if (user?.role !== 'admin') {
    return res.status(404).json({
      status: 'Failed',
      message: 'Not Allowed!',
    });
  }

  next();
};

export { authRole, login, protect, signup };
