export const validateThis = (formDetails) => {
  const errors = {};
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (formDetails.hasOwnProperty('firstname')) {
    if (!formDetails.firstname) {
      errors['firstname'] = "First name can't be empty!";
    }
  }

  if (formDetails.hasOwnProperty('lastname')) {
    if (!formDetails.lastname) {
      errors.lastname = "Last name can't be empty!";
    }
  }

  if (formDetails.hasOwnProperty('email')) {
    if (!formDetails.email) {
      errors.email = "Email can't be empty!";
    } else if (!formDetails?.email.match(mailformat)) {
      errors.email = 'Invalid email!';
    }
  }

  if (formDetails.hasOwnProperty('phonenumber')) {
    if (!formDetails.phonenumber) {
      errors.phonenumber = "Phone number can't be empty!";
    }
  }

  if (formDetails.hasOwnProperty('birthday')) {
    if (!formDetails.birthday) {
      errors.birthday = "Birthday can't be empty!";
    }
  }

  if (formDetails.hasOwnProperty('password')) {
    if (!formDetails.password) {
      errors.password = "Password can't be empty!";
    }
  }

  return errors;
};
