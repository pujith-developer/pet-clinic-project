
document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVBAR

    const menuToggle = document.getElementById("menuToggle");
    const menuIcon = document.getElementById("menuIcon");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuIcon.innerHTML = "&times;";
            menuToggle.setAttribute("aria-expanded", "true");
        } else {
            menuIcon.innerHTML = "&#9776;";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

    // Close mobile menu after clicking a link

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");
            menuIcon.innerHTML = "&#9776;";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // 2. TOP ALERT

    const topAlert = document.getElementById("topAlert");
    const alertText = document.getElementById("alertText");
    const closeAlert = document.getElementById("closeAlert");

    let alertTimer;

    function showAlert(message, type) {

        alertText.textContent = message;

        topAlert.className = "top-alert " + type;
        topAlert.classList.add("show");

        clearTimeout(alertTimer);

        alertTimer = setTimeout(function () {
            topAlert.classList.remove("show");
        }, 4000);

    }

    closeAlert.addEventListener("click", function () {
        topAlert.classList.remove("show");
        clearTimeout(alertTimer);
    });


    // 3. DATE VALIDATION

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const localToday = year + "-" + month + "-" + day;

    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(function (input) {
        input.min = localToday;
    });


    // 4. PHONE NUMBER VALIDATION

    const phoneInput = document.getElementById("phone");
    const boardingPhone = document.getElementById("boardingPhone");

    phoneInput.addEventListener("input", function () {

        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);

    });

    boardingPhone.addEventListener("input", function () {

        boardingPhone.value = boardingPhone.value.replace(/\D/g, "").slice(0, 10);

    });


    // 5. COMMON VALIDATION FUNCTIONS

    function validName(name) {
        return /^[a-zA-Z\s.]+$/.test(name);
    }

    function validPhone(number) {
        return /^[6-9][0-9]{9}$/.test(number);
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    // 6. PET BREED DROPDOWN

    const dogBreeds = [
        "Labrador Retriever",
        "Golden Retriever",
        "German Shepherd",
        "Beagle",
        "Pug",
        "Rottweiler",
        "Doberman",
        "Shih Tzu",
        "Siberian Husky",
        "Indian Pariah",
        "Other"
    ];

    const catBreeds = [
        "Persian",
        "Siamese",
        "Maine Coon",
        "Bengal",
        "Ragdoll",
        "British Shorthair",
        "American Shorthair",
        "Indian Domestic Shorthair",
        "Other"
    ];

    function setupBreedDropdown(petId, breedId) {

        const petSelect = document.getElementById(petId);
        const breedSelect = document.getElementById(breedId);

        petSelect.addEventListener("change", function () {

            breedSelect.innerHTML = "";

            let breeds = [];

            if (petSelect.value === "Dog") {
                breeds = dogBreeds;
            } else if (petSelect.value === "Cat") {
                breeds = catBreeds;
            }

            const firstOption = document.createElement("option");

            firstOption.value = "";

            firstOption.textContent = breeds.length > 0
                ? "Select pet breed"
                : "Select pet type first";

            breedSelect.appendChild(firstOption);

            breeds.forEach(function (breed) {

                const option = document.createElement("option");

                option.value = breed;
                option.textContent = breed;

                breedSelect.appendChild(option);

            });

            breedSelect.disabled = breeds.length === 0;

        });

    }

    setupBreedDropdown("pet", "breed");
    setupBreedDropdown("boardingPet", "boardingBreed");


    // 7. CLINIC APPOINTMENT FORM

    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = phoneInput.value.trim();
        const email = document.getElementById("email").value.trim();
        const pet = document.getElementById("pet").value;
        const breed = document.getElementById("breed").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;

        if (name === "" || !validName(name)) {
            showAlert("Please enter a valid name.", "error");
            document.getElementById("name").focus();
            return;
        }

        if (!validPhone(phone)) {
            showAlert("Enter a valid 10-digit mobile number.", "error");
            phoneInput.focus();
            return;
        }

        if (!validEmail(email)) {
            showAlert("Enter a valid email address.", "error");
            document.getElementById("email").focus();
            return;
        }

        if (pet === "") {
            showAlert("Please select your pet type.", "error");
            document.getElementById("pet").focus();
            return;
        }

        if (breed === "") {
            showAlert("Please select your pet breed.", "error");
            document.getElementById("breed").focus();
            return;
        }

        if (service === "") {
            showAlert("Please select a service.", "error");
            document.getElementById("service").focus();
            return;
        }

        if (date === "" || date < localToday) {
            showAlert("Please select a valid appointment date.", "error");
            document.getElementById("date").focus();
            return;
        }

        showAlert("Appointment request submitted successfully!", "success");

        bookingForm.reset();

        document.getElementById("breed").innerHTML =
            '<option value="">Select pet type first</option>';

        document.getElementById("breed").disabled = true;

    });


    // 8. BOARDING FORM

    const boardingForm = document.getElementById("boardingForm");

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");


    // CHECK-OUT DATE

    checkIn.addEventListener("change", function () {

        checkOut.min = checkIn.value || localToday;

        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }

    });


    // BOARDING FORM SUBMIT

    boardingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("boardingName").value.trim();
        const phone = boardingPhone.value.trim();
        const email = document.getElementById("boardingEmail").value.trim();
        const pet = document.getElementById("boardingPet").value;
        const breed = document.getElementById("boardingBreed").value;
        const petName = document.getElementById("petName").value.trim();

        if (name === "" || !validName(name)) {
            showAlert("Please enter a valid owner name.", "error");
            document.getElementById("boardingName").focus();
            return;
        }

        if (!validPhone(phone)) {
            showAlert("Enter a valid 10-digit mobile number.", "error");
            boardingPhone.focus();
            return;
        }

        if (!validEmail(email)) {
            showAlert("Enter a valid email address.", "error");
            document.getElementById("boardingEmail").focus();
            return;
        }

        if (pet === "") {
            showAlert("Please select your pet type.", "error");
            document.getElementById("boardingPet").focus();
            return;
        }

        if (breed === "") {
            showAlert("Please select your pet breed.", "error");
            document.getElementById("boardingBreed").focus();
            return;
        }

        if (petName === "") {
            showAlert("Please enter your pet name.", "error");
            document.getElementById("petName").focus();
            return;
        }

        if (checkIn.value === "" || checkIn.value < localToday) {
            showAlert("Please select a valid check-in date.", "error");
            checkIn.focus();
            return;
        }

        if (checkOut.value === "") {
            showAlert("Please select check-out date.", "error");
            checkOut.focus();
            return;
        }

        if (checkOut.value <= checkIn.value) {
            showAlert("Check-out date must be after check-in date.", "error");
            checkOut.focus();
            return;
        }

        showAlert("Boarding reservation request submitted successfully!", "success");

        boardingForm.reset();

        document.getElementById("boardingBreed").innerHTML =
            '<option value="">Select pet type first</option>';

        document.getElementById("boardingBreed").disabled = true;

        checkIn.min = localToday;
        checkOut.min = localToday;

    });

});
