// Toggle login role between doctor and patient
document.addEventListener("DOMContentLoaded", function () {
    let roleInput = document.getElementById("role");
    let patientBtn = document.getElementById("patientBtn");
    let doctorBtn = document.getElementById("doctorBtn");

    // Function to update active button styling
    function updateActiveButton(selectedBtn, unselectedBtn) {
        selectedBtn.classList.add("btn-primary");
        selectedBtn.classList.remove("btn-outline-primary");

        unselectedBtn.classList.add("btn-outline-primary");
        unselectedBtn.classList.remove("btn-primary");
    }

    // Default role (Patient selected)
    roleInput.value = "patient";
    updateActiveButton(patientBtn, doctorBtn);

    // Handle Patient Button Click
    patientBtn.addEventListener("click", function () {
        roleInput.value = "patient";
        updateActiveButton(patientBtn, doctorBtn);
    });

    // Handle Doctor Button Click
    doctorBtn.addEventListener("click", function () {
        roleInput.value = "doctor";
        updateActiveButton(doctorBtn, patientBtn);
    });
});

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    alert(`Logging in as ${role}...\nEmail: ${email}`);
    // Implement API call here using fetch()
});


// Handle signup form submission
document.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !phone || !password) {
        alert("All fields are required.");
        return;
    }

    alert(`Registering patient...\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    // Implement API call here using fetch()
});