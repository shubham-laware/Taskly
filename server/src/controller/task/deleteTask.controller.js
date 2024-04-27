// import Todos from "../../db/model/User.model"


// console.log("helloaaaaaaaaaaaaaa");


 function DeleteTask(req,res){
    const user = req.user;
    

    const{tasks} = user;
    // console.log(tasks);
const IdToDelete = req.params.id;
console.log(IdToDelete);

    console.log(tasks);

Todos.findByIdAndDelete(IdToDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });

}

export default DeleteTask;