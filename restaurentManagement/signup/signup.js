const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get values from the form inputs
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const signupData = {
        username,
        email,
        password,
    };

    try {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Send data as JSON
            },
            body: JSON.stringify(signupData), // Convert data to JSON string
        });

        const responseData = await response.json();

        if (response.ok) {
            alert("Signup successful!");
            signupForm.reset();
            window.location.href = "../login/login.html"; // Redirect to login page
        } else {
            alert(`Error: ${responseData.message || "Signup failed"}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
    }
});
