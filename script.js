
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

    // Menu link click pannina close aagum

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

    function showAlert(message, type) {

        alertText.textContent = message;

        topAlert.className = "top-alert " + type;
        topAlert.classList.add("show");

        setTimeout(function () {
            topAlert.classList.remove("show");
        }, 4000);

    }

    closeAlert.addEventListener("click", function () {
        topAlert.classList.remove("show");
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

    const phone = document.getElementById("phone");
    const boardingPhone = document.getElementById("boardingPhone");

    phone.addEventListener("input", function () {
        phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
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
            }
            else if (petSelect.value === "Cat") {
                breeds = catBreeds;
            }

            // Default option

            const firstOption = document.createElement("option");
            firstOption.value = "";
            firstOption.textContent = "Select pet breed";

            breedSelect.appendChild(firstOption);

            // Breed options

            breeds.forEach(function (breed) {

                const option = document.createElement("option");

                option.value = breed;
                option.textContent = breed;

                breedSelect.appendChild(option);

            });

            breedSelect.disabled = breeds.length === 0;

            if (breeds.length === 0) {
                firstOption.textContent = "Select pet type first";
            }

        });

    }

    // Clinic breed dropdown

    setupBreedDropdown("pet", "breed");

    // Boarding breed dropdown

    setupBreedDropdown("boardingPet", "boardingBreed");


    // 7. CLINIC APPOINTMENT FORM

    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const pet = document.getElementById("pet").value;
        const breed = document.getElementById("breed").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;


        // Name check

        if (name === "" || !validName(name)) {
            showAlert("Please enter a valid name.", "error");
            document.getElementById("name").focus();
            return;
        }

        // Phone check

        if (!validPhone(phone)) {
            showAlert("Enter a valid 10-digit mobile number.", "error");
            document.getElementById("phone").focus();
            return;
        }

        // Email check

        if (!validEmail(email)) {
            showAlert("Enter a valid email address.", "error");
            document.getElementById("email").focus();
            return;
        }

        // Pet type check

        if (pet === "") {
            showAlert("Please select your pet type.", "error");
            document.getElementById("pet").focus();
            return;
        }

        // Pet breed check

        if (breed === "") {
            showAlert("Please select your pet breed.", "error");
            document.getElementById("breed").focus();
            return;
        }

        // Service check

        if (service === "") {
            showAlert("Please select a service.", "error");
            document.getElementById("service").focus();
            return;
        }

        // Date check

        if (date === "" || date < localToday) {
            showAlert("Please select a valid appointment date.", "error");
            document.getElementById("date").focus();
            return;
        }

        // Success

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


    // Check-out date should be after check-in date

    checkIn.addEventListener("change", function () {

        checkOut.min = checkIn.value;

        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }

    });


    boardingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("boardingName").value.trim();
        const phone = document.getElementById("boardingPhone").value.trim();
        const email = document.getElementById("boardingEmail").value.trim();
        const pet = document.getElementById("boardingPet").value;
        const breed = document.getElementById("boardingBreed").value;
        const petName = document.getElementById("petName").value.trim();


        // Owner name check

        if (name === "" || !validName(name)) {
            showAlert("Please enter a valid owner name.", "error");
            document.getElementById("boardingName").focus();
            return;
        }

        // Phone check

        if (!validPhone(phone)) {
            showAlert("Enter a valid 10-digit mobile number.", "error");
            document.getElementById("boardingPhone").focus();
            return;
        }

        // Email check

        if (!validEmail(email)) {
            showAlert("Enter a valid email address.", "error");
            document.getElementById("boardingEmail").focus();
            return;
        }

        // Pet type check

        if (pet === "") {
            showAlert("Please select your pet type.", "error");
            document.getElementById("boardingPet").focus();
            return;
        }

        // Pet breed check

        if (breed === "") {
            showAlert("Please select your pet breed.", "error");
            document.getElementById("boardingBreed").focus();
            return;
        }

        // Pet name check

        if (petName === "") {
            showAlert("Please enter your pet name.", "error");
            document.getElementById("petName").focus();
            return;
        }

        // Check-in date

        if (checkIn.value === "" || checkIn.value < localToday) {
            showAlert("Please select a valid check-in date.", "error");
            checkIn.focus();
            return;
        }

        // Check-out date

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

        // Success

        showAlert("Boarding reservation request submitted successfully!", "success");

        boardingForm.reset();

        document.getElementById("boardingBreed").innerHTML =
            '<option value="">Select pet type first</option>';

        document.getElementById("boardingBreed").disabled = true;

        checkIn.min = localToday;
        checkOut.min = localToday;

    });

});
