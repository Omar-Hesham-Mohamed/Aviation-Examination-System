const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      const decoded = await jwt.verify(req.headers.authorization.split(' ')[1], 'secretOrKey')
      if (decoded) {
        req.token = {
          id: decoded._id
        }
      }
      return next()
    } catch (exception) {
      return res.json({ msg: 'Unauthorized Please Log in' })
    }
  }
}
