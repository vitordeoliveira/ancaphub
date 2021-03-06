const jwt = require("jsonwebtoken");

module.exports = function(req){
    const token = req.header('x-auth-token')
    
	if (!token) {
		return false
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		return  decoded.user
	} catch (err) {
		return false
	}
}
