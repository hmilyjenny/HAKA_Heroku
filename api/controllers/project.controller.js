import Tb_Project from '../models/project'
//import fs from 'fs';
var fs = require('fs');
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
};
export function  createProjectChannels(req,res) {
  if(!req.body.channels||!req.body.currentStep){
    res.status(201).json({errCode:40001,errMsg:'项目渠道或当前步骤',data:{}});
  }else{
    //let category = JSON.parse(req.body.category);
    let channels = req.body.channels;
    Tb_Project.findByIdAndUpdate(req.body.projectId,
      {channels:channels,step:parseInt(req.body.currentStep)+1},{new:true},
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
};
export function createProjectAudioFile(req,res){
  if(!req.file.filename||!req.body.currentStep){
      res.status(201).json({errCode:40001,errMsg:'项目音频文件或当前步骤',data:{}});
  }
  else{//重构时应提炼方法为中间件
    var gridfs =req.app.get("gridfs");
    var writestream = gridfs.createWriteStream({
      filename: req.file.originalname
    });
    fs.createReadStream("./uploads/" + req.file.filename)
    .on("end", function(){
      fs.unlink("./uploads/"+ req.file.filename, function(err){
        Tb_Project.findByIdAndUpdate(req.body.projectId,
          {audioFile:{audioId:writestream.id,audioName:req.file.originalname},
            step:parseInt(req.body.currentStep)+1},{new:true},
          function(err,newProject){
            if (err) {
              return res.status(201).json({errCode:40002,errMsg:'项目',data:{error:err}});
            }
            else {
              res.status(201).json({errCode:0,errMsg:'',data:{newProject}});//考虑节省带宽问题是否不需要返回当前项目
            }
          }
        );
        //res.send("success")
      });
    })
    .on("err", function(err){
    return res.status(201).json({errCode:40002,errMsg:'项目上传音频文件失败',data:{error:err}});
    })
    .pipe(writestream);
  }
};
export function createProjectImageFiles(req,res){
  if(!req.files||!req.body.currentStep){
      res.status(201).json({errCode:40001,errMsg:'项目图像文件或当前步骤',data:{}});
  }
  else{//重构时应提炼方法为中间件
    var images= [] ;
    var gridfs =req.app.get("gridfs");
    req.files.forEach(function(file){
      var writestream = gridfs.createWriteStream({
        filename: file.originalname
      });
      images.push({imageId:writestream.id,imageName:file.originalname});
      fs.createReadStream("./uploads/" + file.filename)
      .on("end", function(){
        fs.unlink("./uploads/"+ file.filename, function(err){
        });
      })
      .on("err", function(err){
      return res.status(201).json({errCode:40002,errMsg:'项目上传图像文件失败',data:{error:err}});
      })
      .pipe(writestream);
    });//有可能存在存储文件的表浪费的情况，如在更新project发生错误，而存文件时没发生，所以应增加事务性
    Tb_Project.findByIdAndUpdate(req.body.projectId,
      {imageFiles:images,
        state:'finished'},{new:true},
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
};
