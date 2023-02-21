const go_to_register_page_button = document.querySelector("#to_register_page_button");
const go_to_login_page_button = document.querySelector("#to_login_page_button");
const login_button = document.querySelector("#login_button");
const register_button = document.querySelector("#register_button");
const user_nav = document.querySelector(".user_nav_container");
const user_name_display = document.querySelector("#user_name_display");
const logout_button = document.querySelector("#logout_button");
const quiz_container = document.querySelector(".quiz_container");
const login_page = document.querySelector(".login_page");
const register_page = document.querySelector(".register_page");
const login_failed_message = document.querySelector(".login_failed_message");

const login_user_name_input = document.querySelector("#login_username_input");
const login_user_password_input = document.querySelector("#login_password_input");
const register_user_name_input = document.querySelector("#register_username_input");
const register_user_password_input = document.querySelector("#register_password_input");

go_to_register_page_button.addEventListener("click", change_login_register_format);
go_to_login_page_button.addEventListener("click", change_login_register_format);
login_button.addEventListener("click", login_user);
register_button.addEventListener("click", register_user);
logout_button.addEventListener("click", ()=> {
    localStorage.removeItem("username");
    localStorage.removeItem("logged_in");
    user_nav.classList.add("hidden");
    quiz_container.classList.add("hidden");
    login_page.classList.remove("hidden");

})

function change_login_register_format() {
    document.querySelector(".login_page").classList.toggle("hidden");
    document.querySelector(".register_page").classList.toggle("hidden");
    login_failed_message.classList.add("hidden")

    if (document.querySelector(".login_page").classList.contains("hidden")) {
        document.body.style.transition = "1.5s"
        document.body.style.backgroundColor = "rgba(49, 168, 122, 0.926)";
    } else{
        document.body.style.transition = "1.5s"
        document.body.style.backgroundColor = "rgba(50, 134, 208, 0.818)";
    }
}



async function login_user() {
    const server_objekt = await fetch_server_response({
        user_name: login_user_name_input.value,
        password: login_user_password_input.value,
    },"login user")
    let server_response_status = server_objekt.server_response.status

    if (server_response_status === 200) {
        let user_name = server_objekt.resource.data.user_name
        login_successful(user_name);
    }

    if (server_response_status === 404) {
        overlay.classList.add("hidden");
        login_failed_message.classList.remove("fade")
        login_failed_message.classList.remove("hidden");
        login_failed_message.style.opacity = "1s";
        setTimeout(()=>{
            login_failed_message.classList.add("fade")
        }, 6000)
    }

    if (server_response_status === 418) {
        overlay_message.textContent = "Whoopsie the server thinks it's a teapot :d";
        close_overlay_button.classList.remove("hidden");
    }

}


function login_successful(user_name) {
    localStorage.setItem("username", `${user_name}`)
    localStorage.setItem("logged_in", `true`);
    user_nav.classList.remove("hidden");
    login_page.classList.add("hidden");
    quiz_container.classList.remove("hidden");
    user_name_display.textContent = user_name;
    login_user_name_input.value = "";
    login_user_password_input.value = "";
    register_user_password_input.value = "";
    register_user_name_input.value = "";

    load_quiz_question();
}



async function register_user() {
    const server_objekt = await fetch_server_response({
        user_name: register_user_name_input.value,
        password: register_user_password_input.value,
    },
    "register user")
    console.log(server_objekt);
    let server_response_status = server_objekt.server_response.status
    console.log(server_response_status);

    if (server_response_status === 200) {
        overlay_message.textContent = "Registration successful! Proceed to login";
        close_overlay_button.classList.remove("hidden");
    }
    if (server_response_status === 409) {
        overlay_message.textContent = "We're sorry that username is already in use, please try another";
        close_overlay_button.classList.remove("hidden");
    }

    if (server_response_status === 418) {
        overlay_message.textContent = "Whoopsie the server thinks it's a teapot :d";
        close_overlay_button.classList.remove("hidden");
    }
}