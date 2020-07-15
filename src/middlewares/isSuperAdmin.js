const isSuperAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'super_admin') {
    return res.status(403).json({
      status: 403,
      error: 'Only super admins have access',
    });
  }
  next();
};
export default isSuperAdmin;
