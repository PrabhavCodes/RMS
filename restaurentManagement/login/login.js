const login = () => {
    const username = document.getElementById("username");

    const password = document.getElementById("password");

    if(!username || !password){
        alert("Please fill out both fields");
        return;
    }

    console.log(username, password);
}