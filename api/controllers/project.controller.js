import Tb_Project from '../models/project'

//mongoose-unique-validator还没有加入，后面完善
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
        return res.status(201).json({errCode:40002,errMsg:'项目名称',data:{error:err}});
      }
      res.status(201).json({errCode:0,errMsg:'',data:{}});
    });
  }
};
export function getProjectById(req,res){
  if(!req.body.id){
    res.status(201).json({errCode:40001,errMsg:'项目ID',data:{}});
  }else {
    Tb_Project.findOne({id: req.body.id}, function(err, project) {
      if (err) {
        return res.status(201).json({errCode:-1,errMsg:'项目查询错误',data:{error:err}});
      }
      if (project) {
        return res.status(201).json({errCode:0,errMsg:'',data:{project}});
      } else {
        return res.status(201).json({errCode:40003,errMsg:'项目',data:{}});
      }
    });
  }
}
export function getProjectByName(req,res){
  if(!req.body.name){
    res.status(201).json({errCode:40001,errMsg:'项目名称',data:{}});
  }else {
    Tb_Project.findOne({name: req.body.name}, function(err, project) {
      if (err) {
        return res.status(201).json({errCode:-1,errMsg:'项目查询错误',data:{error:err}});
      }
      if (project) {
        return res.status(201).json({errCode:0,errMsg:'',data:{project}});
      } else {
        return res.status(201).json({errCode:40003,errMsg:'项目',data:{}});
      }
    });
  }
}
