const slider = document.querySelector(".slider>img");
const img1 = "https://n4.sdlcdn.com/imgs/k/k/z/web_banner_07-092e2.jpg";
const img2 =
  "https://n3.sdlcdn.com/imgs/j/8/e/Health_ID_Snapdeal_ABDM_1300X410-6c79d.jpg";
const img3 =
  "https://n3.sdlcdn.com/imgs/k/f/v/12_april_WB_Breezy_Dresses_WEB-5febf.jpg";
const img4 =
  "https://n1.sdlcdn.com/imgs/k/f/v/12_april_WB_Festive_kurta_sets_WEB_1-9d9b7.jpg";
const img5 =
  "https://n1.sdlcdn.com/imgs/k/f/v/12_april_WB_Kitchen_Essentials_WEB-cca82.jpg";
const sliderArr = [img1, img2, img3, img4, img5];
const signupLogoAndText = document.getElementById("signup");
const scrollUp = document.querySelector("#scrollTop");
const navbar = document.querySelector(".nav");
const ad = document.querySelector(".ad");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signup = document.querySelector("#signup");
const modal = document.querySelector(".modals");
const closeModal = document.querySelector("#closemodal");
const signup_form = document.querySelector("#signupform");
const trend = document.querySelector(".trending");
const login_form = document.querySelector("#loginform");

let x = 0;
function sliderFunc() {
  if (x == sliderArr.length - 1) {
    x = 0;
  }
  slider.src = sliderArr[x];
  x++;
}

setInterval(sliderFunc, 2000);

async function fetchTrendData() {
  let res = await fetch("");
  let data = res.json();
  showTrending(data);
}

// scroll to top functionality
window.onscroll = () => {
  scroll_fun();
};
scrollUp.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function scroll_fun() {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
    navbar.style.marginTop = "0px";
    ad.style.display = "flex";
  }

  if (document.body.scrollTop > 10) {
    navbar.style.position = "fixed";
    ad.style.display = "none";
  } else {
    navbar.style.position = "relative";
    ad.style.display = "flex";
  }
}

function showTrending(data) {
  let returnData = data.map((element) => {
    return `
        <div>
            <img src=${element}></img>
        </div>
        `;
  });
}

// Signup and login function starts here

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signup.addEventListener("click", () => {
  modal.classList.add("showmodal");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("showmodal");
});

// Signup

signup_form.addEventListener("submit", (event) => {
  event.preventDefault();
  let signupDetails = {
    name: signup_form.name.value,
    email: signup_form.email.value,
    password: signup_form.password.value,
  };
  userSignup(signupDetails);
});

async function userSignup(data) {
  try {
    let res = await fetch("http://localhost:3300/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert(`${data.name} Signup Successful`);
    }
  } catch (error) {
    console.log(error);
  }
}

//Login Functionality:
login_form.addEventListener("submit", (event) => {
    event.preventDefault();
    let loginDetail = {
        email: login_form.email.value,
        password: login_form.password.value
    }
    userLogin(loginDetail);
})


async function userLogin(data){
    try {
        let res = await fetch("http://localhost:3300/users/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let token = res.json();
        token.then((token)=> {
          if(res.ok){
            modal.style.display = "none";
            localStorage.setItem("token", token.token);
            localStorage.setItem("userLogin", data.email);
            localStorage.setItem("isLogin", true);
              alert("Login Success");
              signupLogoAndText.innerText = localStorage.getItem("userLogin");
          }else{
            signupLogoAndText.innerText = "Signup";
              alert("Invalid credentials");
          }
        })
    } catch (error) {
        console.log(error);
    }
}

const logouts = document.querySelector("#logout");
logouts.addEventListener("click", ()=>{
  console.log("logout")
  modal.style.display = "none";
  window.location.reload();
  localStorage.clear();
})

let isLogin = localStorage.getItem("isLogin");
if(isLogin){
  modal.innerHTML = `
    <div class="logout_div">
      <button
        id="closemodal"
        style="margin-left:660px; position:absolute; z-index:200; background-color:#ff4266; border:none;font-size:18px;z-index:199">&cross;
      </button>
      <h2>Welcome!</h2>
      <h3> Hello ${localStorage.getItem("userLogin")}</h3>
      <button id="logout">LogOut</button>
    </div>
  `
}else{
  `
  <div class="modals">
        <button
        id="closemodal"
        style="margin-left:660px; position:absolute; z-index:200; background-color:#ff4266; border:none;font-size:18px">&cross;</button>
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form id="signupform" action="signup" method="post">
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input id="name" name="name" type="text" placeholder="Name" required/>
            <input id="email" name="email" type="email" placeholder="Email" required/>
            <input id="password" name="password" type="password" placeholder="Password" required/>
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="login" method="post" id="loginform">
            <h1>Log in</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" id="email" name="email" required/>
            <input type="password" placeholder="Password" id="password" name="password" required/>
            <a href="#">Forgot your password?</a>
            <button>Log In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

//Show username if logged in or not
function showUsername(){
  const isLogin = localStorage.getItem("isLogin");
  if(isLogin){
    signupLogoAndText.innerText = localStorage.getItem("userLogin");
  }
  else{
    signupLogoAndText.innerText = "SignUp";
  }
}
showUsername();




