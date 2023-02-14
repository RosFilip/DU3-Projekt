function check_if_alerady_logged_in() {
    const logged_in_username = localStorage.getItem("username");
    const logged_in = localStorage.getItem("logged_in")

    if (logged_in === "true") {
        login_page.classList.add("hidden");
        register_page.classList.add("hidden");
        quiz_container.classList.remove("hidden");
        user_nav.classList.remove("hidden");
        user_name_display.textContent = logged_in_username;

        test___load_quiz_question();
    }
}

check_if_alerady_logged_in();