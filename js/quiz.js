const quiz_container = document.querySelector(".quiz_container");
const dog_image = document.querySelector("#dog_image_container");
const answers_container = document.querySelector("#answers_container");

function load_quiz_question() {
    Math.floor(math.random() * ALL_BREEDS.length)

    const dog = fetch_server_response({}, "load new quiz question")
}

const test_button = document.querySelector("#test_button");

test_button.addEventListener("click", load_quiz_question)

function test___load_quiz_question() {
    const dog_breeds_picked = [];
    console.log(ALL_BREEDS.length);

    let i = 0;
    while (i < 4) {
        let random_dog_breed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

        
        if (dog_breeds_picked.includes(random_dog_breed)) {
            
        } else {
            dog_breeds_picked.push(random_dog_breed);
            i++
        }
    }

    console.log(dog_breeds_picked);

}

test___load_quiz_question();