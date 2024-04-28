import Call from '../../models/Calls';

const getAllCalls = async (req: any, res: any) => {
  const userId = req.user._id;
  const role = req.user.role;
  let calls;
  if (role !== 'admin') {
    calls = await Call.find({ userId });
  } else {
    calls = await Call.find();
  }
  res.status(200).json({
    status: 'success',
    data: {
      calls,
    },
  });
};

const createNewCall = async (req: any, res: any) => {
  const userId = req.user._id;
  try {
    const calls = await Call.create({ ...req.body, userId });
    res.status(201).json({
      status: 'success',
      data: calls,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getCall = async (req: any, res: any) => {
  const callId = req.params.id;
  const userId = req.user._id;
  try {
    const call = await Call.findOne({
      _id: callId,
      userId,
    });
    res.status(201).json({
      status: 'success',
      data: call,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteCall = async (req: any, res: any) => {
  const role = req.user.role;
  const callId = req.params.id;
  const userId = req.user._id;

  try {
    let call;
    if (role !== 'admin') {
      call = await Call.findOneAndDelete({ _id: callId, userId });
    } else {
      call = await Call.findByIdAndDelete(callId);
    }
    if (!call) {
      return res
        .status(404)
        .json({ status: 'Not Found!', message: 'Failed to delete the call!' });
    }
    res.status(401).json({
      status: 'Successfully deleted!',
      data: call,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export { createNewCall, deleteCall, getAllCalls, getCall };
