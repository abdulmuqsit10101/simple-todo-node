import Call from '../../models/Calls';

const getAllCalls = async (req: any, res: any) => {
  const calls = await Call.find({ userId: req.userId });
  res.status(200).json({
    status: 'success',
    data: {
      calls,
    },
  });
};

const createNewCall = async (req: any, res: any) => {
  const userId = req.userId;
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
  const callId = req.para.id;
  const userId = req.userId;
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
  const callId = req.params.id;
  const userId = req.userId;
  try {
    const call = await Call.findOneAndDelete({ _id: callId, userId: userId });
    res.status(401).json({
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

export { createNewCall, deleteCall, getAllCalls, getCall };
