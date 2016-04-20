import mongoose from 'mongoose';

/*
文字：长度不得超过600字。
图片：大小不超过2M，格式：bmp,png,jpeg,jpg,gif。
语音：大小不超过5M，长度不超过60s，格式：mp3,wma,wav,amr。
视频：大小不超过20M, 格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4。
文件：大小不超过10M，格式：txt,xml,pdf,zip,doc,ppt,xls,docx,pptx,xlsx。
*/
const Schema = mongoose.Schema;

var channel = new Schema({
  name: {type:String},
  code: {type:String}
});

var category = new Schema({
  name: {type:String},//名称
  code: {type:String}//编码
});

var audioFile = new Schema({
  // name:{type:String},
  // content:{type:Buffer},
  audioId:{type:Schema.ObjectId},//Gridfs的id
  track:{type:Number}
});
//mongoose.model('Tb_AudioFile', audioSchema);

var imageFile = new Schema({
  imageId:{type:Schema.ObjectId}//Gridfs的id
});
//mongoose.model('Tb_ImageFile',imageSchema);

const tbProjectSchema = new Schema({
  _user:{ type: Schema.ObjectId, ref: 'Tb_User',required:true },//ref
  name :{type:String,required:true,unique:true},
  category:{type:category,required:false}, //embed
  channels:{type:[channel],required:false},//embed
  audioFile:{type:audioFile,required:false},//embed 5分钟左右128kbps大概是5兆左右
  imageFiles:{type:[imageFile],required:false}, //emded
  step: {type: Number,default: 1,required: false },//1为添加了项目名称2为添加了项目品类3为添加了渠道4为上传了音频文件5为上传了图片文件
  //unfinished为完成创建音码文件所需上传的文件没有上传完成状态，finished为完成文件上传后状态，release为发布状态
  state: {type: String,enum: ['unfinished', 'finished', 'release'],default: 'unfinished',required: false },
},{timestamps:true});


export default mongoose.model('Tb_Project', tbProjectSchema);
