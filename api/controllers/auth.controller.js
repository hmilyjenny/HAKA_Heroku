import passport from 'passport';
import JWT from 'jsonwebtoken';
import serverConfig from '../../config';
import Tb_User from '../models/user'

export function signIn (req,res){
    Tb_User.findOne({
      email:req.body.email
    },function(err,user){
      if(err) {
         res.status(401).send('token认证失败');
      }
      if(!user){
        res.status(403).send('认证失败。用户名错误'+JSON.stringify(req.body.email));
      }else{
        user.comparePassword(req.body.password,function(err,isMatch){
          if(isMatch && !err){
            var token =JWT.sign(user,serverConfig.token.secret,{
              expiresIn:serverConfig.token.expires
            });
            res.status(200).json({token:token});
            //res.status(200).json(jwt_decode(token)._doc.email)
          }else{
            res.status(403).send('认证失败。密码错误');
          }
        });
      }
    });
}
export function register(req,res) {
      if(!req.body.email || !req.body.password) {
        res.status(400).send('Please enter email and password.');
      } else {
        var newUser = new Tb_User({
          email: req.body.email,
          password: req.body.password,
          inviteCode:req.body.inviteCode
        });


        newUser.save(function(err) {
          if (err) {
            return res.status(400).json('用户名存在');
          }
          res.status(201).json('注册成功');
        });
      }
    }
export function GetAllUser(req,res){
  Tb_User.find(function(err,users){
    if(err){
      res.status(401).send('没数据');
    }else{
      res.status(201).json({users:users});
    }
  })
}
