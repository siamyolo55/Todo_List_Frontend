// globals & variables

let login_form = document.getElementById('loginForm')
let sign_up = document.getElementById('signUp')

// handle modals

// signup modal

let show_modal_button = document.getElementById('show_modal')
let modal_form_signup = document.getElementById('show_form')
let cross_signup = document.getElementsByClassName('close')[0]


show_modal_button.onclick = function(){
    console.log('clicked')
    modal_form_signup.style.display = 'block'
}

cross_signup.onclick = function() {
    modal_form_signup.style.display = "none"
}

window.onclick = function(event) {
    if (event.target == modal_form_signup) {
      modal_form_signup.style.display = "none"
    }
}

// functions

// logs in & saves userdata to local storage
async function userInfo(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log(email,password)

    // TO BE COMMENTED OUT AFTER FRONTEND IS FINISHED

    let result = await axios.post("http://127.0.0.1:4000",{
        email : email,
        password : password
    })
    console.log(result)
    if(result.status==201){
        console.log('reached here')
        localStorage.clear()
        localStorage.setItem("user-info",JSON.stringify(result.data.userData))
        setTimeout(() => {
            window.location.href = "pages/home.html"
        },1500)
    }
    else{
        console.log("wrong info")
        document.getElementById('wrong').style.display = "block"
    }
}


// event listeners

login_form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await userInfo()
})

sign_up.addEventListener('click',async (e)=>{
    e.preventDefault()
    let name = document.getElementById('sname').value
    let email = document.getElementById('semail').value
    let password = document.getElementById('spassword').value

    console.log(name,email,password)
    
    // TO BE COMMENTED OUT AFTER FRONTEND IS FINISHED

    let result = await axios.post("http://127.0.0.1:4000/signup",{
        name : name,
        email : email,
        password : password
    })
    console.log(result)

    modal_form_signup.style.display = "none"

    if(result.status!=201 || result.data.length<=0){
        document.getElementById('status').style.display = "block"
        return setTimeout(() => {
            document.getElementById('status').style.display = "none"
        }, 2000);
    }
    else{
        let change = document.getElementById('status')
        change.textContent = 'SignUp successful'
        document.getElementById('status').style.display = "block"
        return setTimeout(() => {
            document.getElementById('status').style.display = "none"
        },2000)
    }
})