const prefix = "https://teaching.maumt.se/apis/access/";
const overlay = document.querySelector(".overlay");
const overlay_message = document.querySelector(".overlay > div > p");
const close_overlay_button = document.querySelector(".closer_overlay_button");

close_overlay_button.addEventListener("click", ()=>{
    overlay.classList.add("hidden")
})

async function fetch_server_response(credentials_object, user_action) {
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


    try {
        const server_response = await fetch(request);
        const user_resource = await server_response.json();
        console.log(user_resource);
        return server_response;
    } catch (error) {
        overlay_message.textContent = "Sorry an unexpetced error has occured :( please wait and try again in a minute.";
        close_overlay_button.classList.remove("hidden");
    }
}

/*
    if (user_action === "register user") {

        try {
            const register_request_post = new Request(prefix, options)
            const server_response = await fetch(register_request_post);
            console.log(server_response);
            if (server_response.status === 200) {
                overlay_message.textContent = "Registration successful! Proceed to login";
                close_overlay_button.classList.remove("hidden");
            }
            if (server_response.status === 409) {
                overlay_message.textContent = "We're sorry that username is already in use, please try another";
                close_overlay_button.classList.remove("hidden");
            }
            
        } catch (error) {
            overlay_message.textContent = "Sorry an unexpetced error has occured :( please wait and try again in a minute.";
            close_overlay_button.classList.remove("hidden");
        }

    }

    if (user_action === "login user") {
        let request_url = prefix + `?action=check_credentials&user_name=${attepmpted_user_name}&password=${attempted_password}`;
        console.log(request_url);
        const server_response = await fetch(request_url);
        console.log(server_response);
        const test = await server_response.json();
        console.log(test);
        if (server_response.status === 200) {
            overlay_message.textContent = "Whoopsie the server thinks it's a teapot :d";
            close_overlay_button.classList.remove("hidden");


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
}
*/

/*
test_user
test123

{
action: “register”,
user_name: string, username to register
password: string, password to register
}

*/