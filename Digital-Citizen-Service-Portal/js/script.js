                                                                                      // ==========================================
// CITIZEN REGISTRATION
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const dob =
            document.getElementById("dob").value;

        const address =
            document.getElementById("address").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        // Password check

        if (password !== confirmPassword) {

            message.innerHTML = `
                <div class="error-message">
                    Passwords do not match.
                </div>
            `;

            return;
        }


        // Mobile validation

        if (!/^[0-9]{10}$/.test(mobile)) {

            message.innerHTML = `
                <div class="error-message">
                    Please enter a valid 10-digit mobile number.
                </div>
            `;

            return;
        }


        // Check existing users

        let users =
            JSON.parse(localStorage.getItem("citizenUsers")) || [];


        const existingUser =
            users.find(user => user.email === email);


        if (existingUser) {

            message.innerHTML = `
                <div class="error-message">
                    An account with this email already exists.
                </div>
            `;

            return;
        }


        // Create user

        const newUser = {

            id: "USR" + Date.now(),

            fullName: fullName,

            email: email,

            mobile: mobile,

            dob: dob,

            address: address,

            password: password,

            role: "citizen",

            createdAt: new Date().toISOString()

        };


        users.push(newUser);


        // Save to localStorage

        localStorage.setItem(
            "citizenUsers",
            JSON.stringify(users)
        );


        message.innerHTML = `
            <div class="success-message">
                <i class="fa-solid fa-circle-check"></i>
                Registration successful! Redirecting to login...
            </div>
        `;


        // Redirect

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    });

}
// ==========================================
// CITIZEN LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const identifier =
            document
                .getElementById("loginIdentifier")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        const message =
            document.getElementById("loginMessage");


        // Get registered users

        const users =
            JSON.parse(
                localStorage.getItem("citizenUsers")
            ) || [];


        // Find user

        const user = users.find(function (item) {

            return (
                item.email === identifier ||
                item.mobile === identifier
            );

        });


        // User not found

        if (!user) {

            message.innerHTML = `

                <div class="error-message">

                    <i class="fa-solid fa-circle-xmark"></i>

                    Account not found.
                    Please check your email/mobile number.

                </div>

            `;

            return;

        }


        // Password check

        if (user.password !== password) {

            message.innerHTML = `

                <div class="error-message">

                    <i class="fa-solid fa-lock"></i>

                    Incorrect password.

                </div>

            `;

            return;

        }


        // Login success

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        message.innerHTML = `

            <div class="success-message">

                <i class="fa-solid fa-circle-check"></i>

                Login successful!

            </div>

        `;


        // Redirect

        setTimeout(function () {

            window.location.href =
                "citizen-dashboard.html";

        }, 1000);

    });

}



// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

const togglePassword =
    document.getElementById("togglePassword");


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById("loginPassword");


            const icon =
                togglePassword.querySelector("i");


            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

            } else {

                password.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}
// ==========================================
// CITIZEN DASHBOARD
// ==========================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (
    window.location.pathname.includes(
        "citizen-dashboard.html"
    )
) {


    // Check login

    if (!loggedInUser) {

        window.location.href = "login.html";

    } else {


        // User name

        const userName =
            document.getElementById("userName");

        if (userName) {
            userName.textContent =
                loggedInUser.fullName;
        }


        // Profile

        document.getElementById("profileName")
            .textContent =
            loggedInUser.fullName;

        document.getElementById("profileEmail")
            .textContent =
            loggedInUser.email;

        document.getElementById("profileMobile")
            .textContent =
            loggedInUser.mobile;

        document.getElementById("profileAddress")
            .textContent =
            loggedInUser.address;


        // Applications

        const applications =
            JSON.parse(
                localStorage.getItem("applications")
            ) || [];


        const userApplications =
            applications.filter(
                app =>
                    app.userEmail ===
                    loggedInUser.email
            );


        document.getElementById(
            "applicationCount"
        ).textContent =
            userApplications.length;


        // Pending

        const pending =
            userApplications.filter(
                app =>
                    app.status === "Submitted" ||
                    app.status === "Under Verification"
            );


        document.getElementById(
            "pendingCount"
        ).textContent =
            pending.length;


        // Approved

        const approved =
            userApplications.filter(
                app =>
                    app.status === "Approved" ||
                    app.status === "Certificate Available"
            );


        document.getElementById(
            "approvedCount"
        ).textContent =
            approved.length;


        // Notifications

        const notifications =
            JSON.parse(
                localStorage.getItem("notifications")
            ) || [];


        const userNotifications =
            notifications.filter(
                notification =>
                    notification.userEmail ===
                    loggedInUser.email
            );


        document.getElementById(
            "notificationCount"
        ).textContent =
            userNotifications.length;

    }

}



// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
}