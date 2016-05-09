import md5 from 'md5';

login(email, password) {
  return super.post('/auth', {
      email: email,
      password: md5(password)
    });
}
