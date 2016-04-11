const config = {
  mongoURL:process.env.MONGOLAB_URI||'mongodb://localhost:27017/haka',
  port: process.env.PORT || 8080,
  //secret:'gengshangyicenglou',
  token:{secret:'gengshangyicenglou',expires:10080}
};
export default config;
