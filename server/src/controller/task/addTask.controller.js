

async function AddTask (req,res){
    try {
        const user=req.user;
        const {_id}=user;

        const {title,description,dueDate}=req.body;
        const assignedDate= new Date().toISOString().split('T')[0];
        const newTask= {
            title:title,
            description:description,
            assignDate:assignedDate,
            dueDate:dueDate,
            isCompleted:false
        }

        user.tasks.push(newTask);
        await user.save();

        res.status(201).json({msg:"Task added successfully"})
    } catch (error) {
        return res.status(500).json({msg:'Internal Server Error'});
    }

}

export default AddTask;