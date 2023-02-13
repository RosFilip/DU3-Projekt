const go_to_register_page_button = document.querySelector("#to_register_page_button");
const go_to_login_page_button = document.querySelector("#to_login_page_button");
const login_button = document.querySelector("#login_button");
const register_button = document.querySelector("#register_button");
const user_nav = document.querySelector(".user_nav_container");
const user_name_display = document.querySelector("#user_name_display");

go_to_register_page_button.addEventListener("click", change_login_register_format);
go_to_login_page_button.addEventListener("click", change_login_register_format);

function change_login_register_format() {
    document.querySelector(".login_page").classList.toggle("hidden");
    document.querySelector(".register_page").classList.toggle("hidden");

    if (document.querySelector(".login_page").classList.contains("hidden")) {
        document.body.style.transition = "1.5s"
        document.body.style.backgroundColor = "rgba(49, 168, 122, 0.926)";
    } else{
        document.body.style.transition = "1.5s"
        document.body.style.backgroundColor = "rgba(50, 134, 208, 0.818)";
    }
}


login_button.addEventListener("click", login_user);
register_button.addEventListener("click", register_user);



async function login_user() {
    const server_response = await fetch_server_response({
        user_name: document.querySelector("#login_username_input").value,
        password: document.querySelector("#login_password_input").value,
    },
    "login user")
    console.log(server_response);

    if (server_response.status === 200) {
        user_nav.classList.remove("hidden");
        document.querySelector(".login_page").classList.add("hidden");
        user_name_display.textContent = document.querySelector("#login_username_input").value;
        load_quiz_question();
    }

    if (server_response.status === 404) {
        overlay_message.textContent = "No user found, please check your username and password again";
        close_overlay_button.classList.remove("hidden");
    }

    if (server_response.status === 418) {
        overlay_message.textContent = "Whoopsie the server thinks it's a teapot :d";
        close_overlay_button.classList.remove("hidden");
    }

}



async function register_user() {
    const server_response = await fetch_server_response({
        user_name: document.querySelector("#login_username_input").value,
        password: document.querySelector("#login_password_input").value,
    },
    "register user")
    console.log(server_response);

    if (server_response.status === 200) {
        overlay_message.textContent = "Registration successful! Proceed to login";
        close_overlay_button.classList.remove("hidden");
    }
    if (server_response.status === 409) {
        overlay_message.textContent = "We're sorry that username is already in use, please try another";
        close_overlay_button.classList.remove("hidden");
    }

    if (server_response.status === 418) {
        overlay_message.textContent = "Whoopsie the server thinks it's a teapot :d";
        close_overlay_button.classList.remove("hidden");
    }
}