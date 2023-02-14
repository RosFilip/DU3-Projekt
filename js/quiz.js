const dog_image = document.querySelector("#dog_image_container");
const answers_container = document.querySelector("#answers_container");
const one_more_question_button = document.querySelector(".next_question_button");
const overlay_message_container = document.querySelector("#overlay_message_container")

function load_quiz_question() {
    Math.floor(math.random() * ALL_BREEDS.length)

    const dog = fetch_server_response({}, "load new quiz question")
}

const test_button = document.querySelector("#test_button");

test_button.addEventListener("click", load_quiz_question);
one_more_question_button.addEventListener("click", test___load_quiz_question);

async function test___load_quiz_question() {
    document.querySelector("#dog_image_container > img").src = "./media/logo.png"
    overlay_message_container.style.backgroundColor = "white"
    one_more_question_button.classList.add("hidden");
    const dog_breeds_picked = [];

    let i = 0;
    while (i < 4) {
        let random_dog_breed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
        if (dog_breeds_picked.includes(random_dog_breed)) {} 
        
        else {
            dog_breeds_picked.push(random_dog_breed);
            i++
        }
    }
    
    const random_right_answer = dog_breeds_picked[Math.floor(Math.random() * 4)];
    answers_container.innerHTML = ""
    for (const dog_breed of dog_breeds_picked) {
        const quiz_answer_dom = document.createElement("button");
        quiz_answer_dom.textContent = dog_breed.name
        if (dog_breed.name === random_right_answer.name) {
            quiz_answer_dom.classList.add("RIGHT_ANSWER")
        }

        quiz_answer_dom.addEventListener("click", ()=> {
            one_more_question_button.classList.remove("hidden");
            overlay.classList.remove("hidden");

            if (quiz_answer_dom.classList.contains("RIGHT_ANSWER")) {
                overlay_message_container.style.backgroundColor = "rgb(59, 180, 59)"
                overlay_message.textContent = "Correct!"
            } else {
                overlay_message_container.style.backgroundColor = "orange"
                overlay_message.textContent = "I'm afraid not... :("
            }

        })
        answers_container.append(quiz_answer_dom);
    }


    console.log(random_right_answer);
    const dog_images = await fetch_server_response({}, "load new quiz question", random_right_answer.url)
    overlay.classList.add("hidden");


    const random_dog_image_url = dog_images.message[Math.floor(Math.random() * dog_images.message.length)];
    document.querySelector("#dog_image_container > img").src = random_dog_image_url;

}