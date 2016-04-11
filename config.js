const config = {
  mongoURL:'mongodb://haka:110701@ds019940.mlab.com:19949/haka',
  port: process.env.PORT || 8080,
  //secret:'gengshangyicenglou',
  token:{secret:'gengshangyicenglou',expires:10080}
};
export default config;
