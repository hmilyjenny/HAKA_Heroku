import Tb_Category from '../models/category'



export function getCategories(req,res) {
  Tb_Category.find(function(err,categories){
    if (err){
      return res.status(201).json({errCode:-1,errMsg:'品类查询错误',data:{error:err}});
    }else{
      res.status(201).json({errCode:0,errMsg:'',data:{categories}});
    }
  })
}
