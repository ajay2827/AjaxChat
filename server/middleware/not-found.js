const notfound=(req,res)=>{
    return res.status(401).send('Route does not exit')
}

module.exports=notfound