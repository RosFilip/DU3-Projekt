function check_if_alerady_logged_in() {
    const logged_in_username = localStorage.getItem("username");
    const logged_in = localStorage.getItem("logged_in")

    if (logged_in === "true") {

        login_successful(logged_in_username);
        test___load_quiz_question();
    }
}

check_if_alerady_logged_in();