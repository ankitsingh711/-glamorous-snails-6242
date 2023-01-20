const showContainer = document.querySelector(".showproduct");
const signupLogoAndText = document.getElementById("signup");
const filterPrice = document.querySelector("#filterPrice");

async function fetchData(){
    let res = await fetch("http://localhost:3300/products/kitchen", {
        method:"GET",
        headers:{
            "Content-Type":"appilcation/json",
            Authorization: localStorage.getItem("token")
        }
    })
    let temp = await res.json();
    showData(temp);
}

fetchData()

function showData(data){
    let dataArr = data.map((elem)=>{
        return `
        <div>
            <img src=${elem.thumbnail}></img>
            <h5>${elem.name}</h5>
            <span>Rs.${elem.strike_price}</span>
            <h6>Rs.${elem.price}</h6>
            <h5>Offer:${elem.price_off}</h5>
            <button>Add to Cart</button>
        </div>
        `
    })
    showContainer.innerHTML = dataArr.join("");
}

//Show username if logged in or not:
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

  filterPrice.addEventListener("change", ()=>{
    if(filterPrice.value==="low to high"){
        ascendingPrice();
    }else if(filterPrice.value==="high to low"){
        descendingPrice();
    }
})

async function ascendingPrice(){
    showContainer.innerHTML = null;
    try {
        let res = await fetch("http://localhost:3300/products/kitchen?price=asc", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("token")
            }
        });
        let data = await res.json();
        console.log(data);
        showData(data);
    } catch (error) {
        console.log(error);
    }
}

async function descendingPrice(){
    showContainer.innerHTML = null;
    try {
        let res = await fetch("http://localhost:3300/products/kitchen?price=dsc",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("token")
            }
        });
        let data = await res.json();
        console.log(data);
        showData(data);
    } catch (error) {
        console.log(error);
    }
}