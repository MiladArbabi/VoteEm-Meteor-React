Accounts.onCreateUser((options, user) => {
  if(options.email === 'arbabi@gmail.com') {
    user.roles = ['admin'];
  }
  return user;
});