  // READ ME: 

  // (This doc has all the validations in regular expression + storing data in local storage, except for login form)


const [form] = document.forms;
const [
  nameFeedback,
  lnameFeedback,
  phoneFeedback,
  emailFeedback,
  passwordFeedback,
  confirmPasswordFeedback
] = document.querySelectorAll('.feedback');

const isNameValid = name => {
 return name.length > 3 && /^[A-Za-z0-9_]*$/g.test(name);
    }

const isLNameValid = lname => {
return lname.length > 3 && /^[A-Za-z0-9_]*$/g.test(lname);
    }

const isPhoneValid = phone => {
return phone = /^\d{10}$/g.test(phone);
    }

const isEmailValid = email => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email);
}

const isPasswordValid = password => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,30}$/gm.test(password);
}

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;
}

const validation = (name,lname,phone, email, password, confirmPassword) => {
  return (
    isNameValid(name) &&
    isLNameValid(lname) &&
    isPhoneValid(phone) &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
  );
}

const toggleShowPassword = (toggler, elements) => {
  toggler.addEventListener('change', e => {
    elements.forEach(element => {
      element.setAttribute('type', e.target.checked ? 'text' : 'password');
    });
  });
};

const getElement = (name, e) => {
  return {
    name(e) {
      e.target.classList.toggle('border-danger', !isNameValid(e.target.value));
      nameFeedback.textContent = isNameValid(e.target.value) ? null : 'First Name must be at least 3 characters long and space is not allowed at starting and end';
    },
    lname(e) {
        e.target.classList.toggle('border-danger', !isLNameValid(e.target.value));
        lnameFeedback.textContent = isLNameValid(e.target.value) ? null : 'Last Name must be at least 3 characters long and space is not allowed at starting and end';
      },

    phone(e) {
        e.target.classList.toggle('border-danger', !isPhoneValid(e.target.value));
        phoneFeedback.textContent = isPhoneValid(e.target.value) ? null : 'Phone number should be 10 digits long and it should only contain numeric value';
      },
    email(e) {
      e.target.classList.toggle('border-danger', !isEmailValid(e.target.value));
      emailFeedback.textContent = isEmailValid(e.target.value) ? null : 'Provide a valid email address';
    },
    password(e) {
      e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value));
      passwordFeedback.textContent = isPasswordValid(e.target.value) ? null : 'Password must be at least 8 characters long and contain 1 capital letter and 1 symbol or number';

      form.confirmPassword.classList.toggle('border-danger', !isPasswordMatch(e.target.value, form.confirmPassword.value));
      confirmPasswordFeedback.textContent = isPasswordMatch(e.target.value, form.confirmPassword.value) ? null : 'Password do not match';
    },
    confirmPassword(e) {
      e.target.classList.toggle('border-danger', !isPasswordMatch(form.password.value, e.target.value));
      confirmPasswordFeedback.textContent = isPasswordMatch(form.password.value, e.target.value) ? null : 'Password do not match';
    }
  }[name](e);
}

const handleInput = e => {
  const { name: formName,lname:formLName, phone, email, password, confirmPassword, btn } = form;
  const { name } = e.target;
  
  getElement(name, e);
  
  btn.disabled = !validation(formName.value, formLName.value, phone.value, email.value, password.value, confirmPassword.value);
}


let login = document.getElementById("login").addEventListener('submit', redirect)

function redirect(){
    
}


document.addEventListener('DOMContentLoaded', () => {
  toggleShowPassword(form.showPassword, [form.password, form.confirmPassword]);
  
  form.name.addEventListener('input', handleInput);

  form.lname.addEventListener('input', handleInput);

  form.phone.addEventListener('input', handleInput);

  form.email.addEventListener('input', handleInput);

  form.password.addEventListener('input', handleInput);

  form.confirmPassword.addEventListener('input', handleInput);
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { name, lname, phone, email, password, confirmPassword } = e.target;
    const submittedValue = {
      name: name.value,
      lname: lname.value,
      phone : phone.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    
    console.log(submittedValue)

    localStorage.setItem("email", email.value) // store in local storage
    localStorage.setItem('password', password.value); //store in local storage

  });
});


