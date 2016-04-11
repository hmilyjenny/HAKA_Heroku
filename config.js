const config = {
  mongoURL:'mongodb://localhost:27017/haka',
  port: process.env.PORT || 8000,
  //secret:'gengshangyicenglou',
  token:{secret:'gengshangyicenglou',expires:10080}
};
export default config;
