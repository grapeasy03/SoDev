 const adminAuth=
(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminauthorized=token==="xyz";
    if(!isAdminauthorized){
        res.status(401).json({message:"unauthorized"})
    }
    else{
        next();
    }
}
const userAuth=
(req,res,next)=>{
    console.log("user auth is getting checked");
    const token="xywz";
    const isAdminauthorized=token==="xyz";
    if(!isAdminauthorized){
        res.status(401).json({message:"unauthorized"})
    }
    else{
        next();
    }
}
module.exports={
    adminAuth:adminAuth,
    userAuth:userAuth

}