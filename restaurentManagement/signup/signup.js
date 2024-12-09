function addUser () { 
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (!username.value ||!email.value ||!password.value ||!confirmPassword.value) {
        alert('Please fill in all fields');
        return;
    }

    if(password.value || confirmPassword.value){
        alert('Please Enter correct Password');
    }
    
    if(password.value.length < 8 || confirmPassword.value.length < 8){
        alert('Password must be at least 8 characters long');
        return;
    }

    console.log(`
        User Values: 
            ${username}
            ${password}
            ${email}
        `)
}
addUser();