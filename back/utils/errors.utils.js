exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: ''}

  if (err.name === 'SequelizeUniqueConstraintError' && Object.keys(err.fields)[0].includes('Users.email'))
  errors.email = 'Cet email est déjà enregistré';

  if (err.name === 'SequelizeUniqueConstraintError' && Object.keys(err.fields)[0].includes('Users.username'))
   errors.pseudo = 'Ce pseudo est déjà pris';

  return errors
}