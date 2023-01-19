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
const login_form = document.querySelector("#loginform")

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
            signupLogoAndText.innerText = data.email;
            localStorage.setItem("token", token.token);
              alert("Login Success");
          }else{
            signupLogoAndText.innerText = "Signup";
              alert("Invalid credentials");
          }
        })
    } catch (error) {
        console.log(error);
    }
}



