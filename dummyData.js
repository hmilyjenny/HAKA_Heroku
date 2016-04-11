import Tb_User from './api/models/user';
import bcrypt from 'bcrypt';

export default function () {
  Tb_User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    var psw='123456';
    bcrypt.hash(psw, 10, function(err, hash) {
      psw = hash;
    });
    const user = new Tb_User(
      { email: 'jason@gmail.com', password: psw}
    );

    Tb_User.create(user, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
