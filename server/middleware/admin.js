
module.exports = function (req,res,next) {

    
    if(req.session.userId.isAdmin) next()
    else return res.status(401).send(`you are not admin`)
    




}