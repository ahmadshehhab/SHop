exports.isAuth = (req,res,next)=>{
    if(req.session.userId) next()
    else res.redirect("/login")
} 

exports.notAuth = (req,res,next)=>{
    if(!req.session.userId) next()
    else res.redirect("/")
} 



exports.notupdated = (req,res,next)=>{
    if(!req.session.userId.isupdated) next()
    else res.redirect("/login")
} 

exports.isupdated = (req,res,next)=>{
    if(req.session.userId.isupdated) next()
    else res.redirect("/")
} 

exports.verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        
        req.token=bearerToken
        next()
    }
    else res.sendStatus(403)
} 