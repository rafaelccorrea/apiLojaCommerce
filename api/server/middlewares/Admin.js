export default (req, res, next) => {
  if (req.dataReq && req.dataReq.admin) next();
  else
    return res
      .status(500)
      .send({ status: 'error', message: 'User not authorized.' });
};
