// This file has NO regular expressions involved

const regForm = document.querySelector("#reg-form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const number = document.querySelector("#number");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const passwordError = document.querySelector("#password-error");
const nameError = document.querySelector("#name-error");
const registerBtn = document.querySelector("#register-btn");
const selectGender = document.querySelectorAll('input[type="radio"][name="radio"]')

const validateName = (name) => {
    const errors = []

    if (name.length < 3) {
        errors.push("Your name should atleast contain 3 chars.")
    }

    if (name.charAt(0) == " " || name.charAt(name.length - 1) == " ") {
        errors.push("Your name should not contain spaces.")
    }

    if (errors.length > 0) {
        alert(errors.join("<br>"))
        console.log(errors);
        return false;
    }
    return true;

}

const validateNumber = (number) => {
    if (number.length !== 10) {
        alert("Enter valid Number");
        return false
    } else {
        return true
    }
}

const validatePassword = (password, confirmPassword) => {
    var pass = password.value
    var errors = []

    if (pass.length < 8) {
        errors.push("Your password must be at least 8 characters")
    }
    if (pass.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
    if (pass.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.")
    }
    if (pass.indexOf(' ') >= 0) {
        errors.push("Your password should not contain space.")
    }
    if (pass.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]/) < 0) {
        errors.push("Your password must contain at least one special character.")
    }
    if (pass !== confirmPassword.value) {
        errors.push("Your password does not match.")

    }
    if (errors.length == 0) {
        return true
    }
    if (errors.length > 0) {
        alert(errors.join("<br>"))
        console.log(errors);
        return false;
    }
}

const getGender = () => {
    // console.log(document.querySelector('input[name="gender"]:checked').value)
    if (document.querySelector('input[name="gender"]:checked') == null) {
        alert("Choose a gender");
    } else {
        return true
    }
}


// const validateEmail = (s) => {
//     const split_at_dot = s.split(".");
//     const split_at_at = s.split("@");
//     if (split_at_at.filter(s => s.length == 0).length > 0 || split_at_dot.filter(s => s.length == 0).length > 0 || split_at_at.length <= 1) {
//         return false
//     }
//     let c = split_at_at[split_at_at.length - 1];
//     console.log("split at:: ", split_at_at)
//     console.log("c:: ", c)
//     let domains = c.split('.');
//     let len = domains.length;
//     console.log("domains:: ", domains)
//     return split_at_at.filter(x => Array.from(x).filter(ch => isLetter(ch) || isCharNumber(ch) || ch === '.' || ch === '_').length === x.length).length === split_at_at.length &&
//     domains.slice(0, len-1).filter(c => c.length >= 2).length === (len - 1);
// };

// const email = document.getElementById('email');
//     if (!email.value || !validateEmail(email.value)) {
//     alert("email is invalid");
// }

const registerFunction = (e) => {
    e.preventDefault()


    const conditionsArray = [
        validateName(fname.value),
        validateName(lname.value),
        validateNumber(number.value),
        validatePassword(password, confirmPassword),
        getGender()
    ]

    if (conditionsArray.indexOf(true) === -1) {
        console.log("error");
    } else {
        const FirstName = fname.value;
        const LastName = lname.value;
        const regNumber = number.value;
        const regEmail = email.value;
        const regPassword = password.value
        const selectedgender = document.querySelector('input[name="gender"]:checked').value;

        const data = { FirstName, LastName, regEmail, regNumber, selectedgender, regPassword }
        console.log(data);
        localStorage.setItem('userData', JSON.stringify(data));

    }


}

registerBtn.addEventListener("click", registerFunction)

const loginBtn = document.querySelector("#login-btn");
const loginemail = document.querySelector("#login-email");
const loginpassword = document.querySelector("#login-password");

const loginForm = (e) => {
    const data = JSON.parse(localStorage.getItem('userData'))
    e.preventDefault()
    console.log(data.regPassword);
    if (loginemail.value == data.email || loginpassword.value == data.regPassword) {
        alert("logged in" + " Welcome " + data.FirstName)
    } else {
        alert("Invalid Email or Password")
    }

}
loginBtn.addEventListener("click", loginForm)