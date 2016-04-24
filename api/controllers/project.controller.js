import Tb_Project from '../models/project'

//mongoose-unique-validator还没有加入，后面完善

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
};

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
};

export function createProjectName(req,res){
  if(!req.body.name||!req.body.currentStep) {
    res.status(201).json({errCode:40001,errMsg:'项目名称或当前步骤',data:{}});
  }else{
    let project = new Tb_Project({
      _user:req.user._id,
      name:req.body.name,
      step:parseInt(req.body.currentStep)+1
    });
    project.save(function(err,newProject) {
      if (err) {
        return res.status(201).json({errCode:40002,errMsg:'项目名称',data:{error:err}});
      }
      res.status(201).json({errCode:0,errMsg:'',data:{newProject}});//考虑节省带宽问题是否只传递id
    });
  }
};

export function createProjectCategories(req,res){
  if(!req.body.category||!req.body.currentStep){
    res.status(201).json({errCode:40001,errMsg:'项目品类或当前步骤',data:{}});
  }else{
    //let category = JSON.parse(req.body.category);
    let category = req.body.category;
    Tb_Project.findByIdAndUpdate(req.body.projectId,
      {category:category,step:parseInt(req.body.currentStep)+1},{new:true},
      function(err,newProject){
        if (err) {
          return res.status(201).json({errCode:40002,errMsg:'项目',data:{error:err}});
        }
        else {
          res.status(201).json({errCode:0,errMsg:'',data:{newProject}});//考虑节省带宽问题是否不需要返回当前项目
        }
      }
    );
  }
}
