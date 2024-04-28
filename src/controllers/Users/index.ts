import User from '../../models/Users';

export const getAllUsers = async (req: any, res: any) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    users,
  });
};
