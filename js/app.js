// fetch doctor and show start 
document.addEventListener("DOMContentLoaded", function () {
    console.log("🌍 DOM fully loaded");

    const homeDoctors = document.getElementById("doctors-container");
    const allDoctors = document.getElementById("all-doctors-container");

    if (homeDoctors) {
        console.log("🏠 Home page detected. Fetching 5 doctors...");
        fetchDoctors(4, homeDoctors);
    }

    if (allDoctors) {
        console.log("📄 Doctors page detected. Fetching all doctors...");
        fetchDoctors(null, allDoctors);
    }

    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            window.location.href = "doctors.html";
        });
    }
});

function fetchDoctors(limit = null, container) {
    let url = "https://smart-care-backend-hgly.onrender.com/doctor/doctors/";
    if (limit) url += `?limit=${limit}`;

    console.log("🔗 Fetching doctors from:", url);

    fetch(url)
        .then(response => response.json())
        .then(doctors => {
            console.log("📜 API Response:", doctors);

            if (!container) {
                console.error("❌ Container not found in DOM");
                return;
            }

            container.innerHTML = ""; // Clear existing doctors

            doctors.forEach(doctor => {
                console.log("👨‍⚕️ Processing doctor:", doctor);

                if (!doctor.user || !doctor.image_url) {
                    console.error("❌ Missing properties:", doctor);
                    return;
                }

                let designation = doctor.designation.length > 0 ? doctor.designation[0].name : "General Doctor";
                let specialization = doctor.specialization.length > 0
                    ? doctor.specialization.map(s => s.name).join(", ")
                    : "No Specialization";
                let imageUrl = doctor.image_url || "images/default.jpg";

                const doctorHTML = `
                    <div class="col-md-4 col-lg-3 d-flex justify-content-center">
                        <div class="card doctor-card mb-4" data-id="${doctor.id}">
                            <div class="card-img" style="background-image: url('${imageUrl}');"></div>
                            <div class="card-body text-center">
                                <h4 class="card-title">${doctor.first_name} ${doctor.last_name}</h4>
                                <p class="doctor-designation">${designation}</p>
                                <p class="doctor-specialization">${specialization}</p>
                                <div class="social-icons">
                                    <a href="#" class="social-icon"><i class="fa fa-twitter"></i></a>
                                    <a href="#" class="social-icon"><i class="fa fa-facebook"></i></a>
                                    <a href="#" class="social-icon"><i class="fa fa-google"></i></a>
                                    <a href="#" class="social-icon"><i class="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.innerHTML += doctorHTML;
            });

            // Add click event to each card to go to details page
            document.querySelectorAll(".doctor-card").forEach(card => {
                card.addEventListener("click", function () {
                    const doctorId = this.getAttribute("data-id");
                    window.location.href = `details.html?id=${doctorId}`;
                });
            });

            console.log("✅ Doctors rendered successfully");
        })
        .catch(error => console.error("❌ Error fetching doctors:", error));
}
// fetch doctor and show end 


// doctor details start
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get("id");

    if (!doctorId) {
        console.error("❌ Doctor ID not found in URL");
        return;
    }

    fetch(`https://smart-care-backend-hgly.onrender.com/doctor/doctors/${doctorId}/`)
        .then(response => response.json())
        .then(doctor => {
            console.log("📜 Doctor Details:", doctor);

            document.getElementById("doctor-image").src = doctor.image_url || "images/default.jpg";
            document.getElementById("doctor-name").textContent = `${doctor.first_name} ${doctor.last_name}`;
            document.getElementById("doctor-designation").textContent = doctor.designation.length > 0 ? doctor.designation[0].name : "General Doctor";

            const specializationContainer = document.getElementById("doctor-specialization");
            specializationContainer.innerHTML = ""; // Clear previous content

            if (doctor.specialization.length > 0) {
                doctor.specialization.forEach(specialty => {
                    let badge = document.createElement("span");
                    badge.classList.add("specialization-badge");
                    badge.textContent = specialty.name;
                    specializationContainer.appendChild(badge);
                });
            } else {
                specializationContainer.innerHTML = `<span class="specialization-badge">No Specialization</span>`;
            }

            document.getElementById("doctor-description").textContent = doctor.description;
            document.getElementById("doctor-fee").textContent = doctor.fee;
            document.getElementById("doctor-phone").textContent = doctor.phone_number;
            document.getElementById("doctor-email").textContent = doctor.email;
            document.getElementById("doctor-meet-link").href = doctor.meet_link || "#";
        })
        .catch(error => console.error("❌ Error fetching doctor details:", error));
});


// doctor details end