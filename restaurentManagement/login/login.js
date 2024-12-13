// Select the form element
const form = document.getElementById("login-form");

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Get the values of the username and password fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if both fields are filled
    if (!username || !password) {
        alert("Please fill out both fields");
        return;
    }

    // Log the values (or handle them as needed)
    console.log("Username:", username);
    console.log("Password:", password);

    // You can add additional logic here, such as sending the data to a server
});
