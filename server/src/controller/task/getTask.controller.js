
const GetTask=(req,res)=>{

    try {
        const user=req.user;

        const {fullName,tasks}=user;
    
        return res.status(200).json({name:fullName,allTasks:tasks});
    } catch (error) {
        return ;
    }
 

}

export default GetTask;