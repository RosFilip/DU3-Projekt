const prefix = "https://teaching.maumt.se/apis/access/";
const overlay = document.querySelector(".overlay");
const overlay_message = document.querySelector(".overlay > div > p");
const close_overlay_button = document.querySelector(".close_overlay_button");

close_overlay_button.addEventListener("click", ()=>{
    overlay.classList.add("hidden")
})

async function fetch_server_response(credentials_object, user_action, random_dog_breed_url) {
    overlay_message.textContent = "Contacting server..."
    close_overlay_button.classList.add("hidden")
    overlay.classList.remove("hidden");
    const attepmpted_user_name = credentials_object.user_name
    const attempted_password = credentials_object.password
    let request;

    if (user_action === "register user") {
        const body_post = {
            action: "register",
            user_name: attepmpted_user_name,
            password: attempted_password,
        }

        const options = {
            method: 'POST',
            body:JSON.stringify(body_post),
            headers: {"Content-type": "application/json; charset=UTF-8"},
        }
        request = new Request(prefix, options)
    }

    if (user_action === "login user") {
        request = prefix + `?action=check_credentials&user_name=${attepmpted_user_name}&password=${attempted_password}`;
    }

    if (user_action === "load new quiz question") {
        overlay_message.textContent = "Loading new question"
        request = `https://dog.ceo/api/breed/${random_dog_breed_url}/images` 
    }


    try {
        const server_response = await fetch(request);
        const resource = await server_response.json();
        if (user_action === "load new quiz question") {
            return resource
        } else {
            return server_response;
        }
    } catch (error) {
        overlay_message.textContent = "Sorry an unexpetced error has occured :( please wait and try again in a minute.";
        close_overlay_button.classList.remove("hidden");
    }
}