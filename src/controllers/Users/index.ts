import User from '../../models/Users';

export const getAllUsers = async (req: any, res: any) => {
  const role = req.user.role;
  if (role !== 'admin') {
    return res
      .status(401)
      .json({ status: 'Not Found!', message: 'Access Denied' });
  }
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    users,
  });
};

export const deleteUser = async (req: any, res: any) => {
  const role = req.user.role;
  const userId = req.params.id;
  if (req.params.id !== userId && role !== 'admin') {
    return res
      .status(401)
      .json({ status: 'Not Found!', message: 'Access Denied' });
  }
  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    return res
      .status(401)
      .json({ status: 'Failed!', message: 'User Not Found!' });
  }
  res.status(200).json({
    status: 'Successfully deleted!',
    user,
  });
};
