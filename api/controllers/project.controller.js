import Tb_Project from '../models/project'


export function createProjectName(req,res){
  if(!req.body.name||!req.body.currentStep) {
    res.status(201).json({errCode:40001,errMsg:'项目名称或当前步骤',data:{}});
  }else{
    let project = new Tb_Project({
      _user:req.user._id,
      name:req.body.name,
      step:req.body.currentStep+1
    });
    project.save(function(err) {
      if (err) {
        return res.status(201).json({errCode:40002,errMsg:'项目名称',data:{}});
      }
      res.status(201).json({errCode:0,errMsg:'',data:{}});
    });
  }
}
