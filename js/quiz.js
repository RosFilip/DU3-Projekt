const quiz_container = document.querySelector(".quiz_container");
const dog_image = document.querySelector("#dog_image_container");
const answers_container = document.querySelector("#answers_container");

function load_quiz_question() {
    const dog = fetch_server_response({}, "load new quiz question")
}

const test_button = document.querySelector("#test_button");

test_button.addEventListener("click", load_quiz_question)