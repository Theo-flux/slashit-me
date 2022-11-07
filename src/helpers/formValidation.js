export const validateThis = (formDetails) => {
  const errors = {};
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!formDetails?.email) {
    errors['email'] = "Email can't be empty!";
  } else if (!formDetails?.email.match(mailformat)) {
    errors['email'] = 'Inavlid email!';
  }

  if (!formDetails?.password) {
    errors['password'] = "Password can't be empty!";
  }

  return errors;
};
