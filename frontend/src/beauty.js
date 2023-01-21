const showContainer = document.querySelector(".showproduct");
const signupLogoAndText = document.getElementById("signup");
const filterPrice = document.querySelector("#filterPrice");
var alldata;
async function fetchData(){
    let res = await fetch("http://localhost:3300/products/beauty", {
        method:"GET",
        headers:{
            "Content-Type":"appilcation/json",
            Authorization: localStorage.getItem("token")
        }
    })
    let temp = await res.json();
    alldata = temp;
    showData(temp);
}
fetchData()

function showData(data){
    let dataArr = data.map((elem)=>{
        return `
        <div class="beautyProduct">
            <img class="showimg" src=${elem.image}></img>
            <h5>${elem.name}</h5>
            <h5>Rating:${elem.rating}</h5>
            <span>${elem.category}/</span></br></br>
            <button onclick=addToCart(${elem.id})>Add to Cart</button>
        </div>
        `
    })
    showContainer.innerHTML = dataArr.join("");
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
        let res = await fetch("http://localhost:3300/products/beauty?price=asc", {
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
        let res = await fetch("http://localhost:3300/products/beauty?price=dsc",{
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

//Addtocart:
let addToCartArr = JSON.parse(localStorage.getItem("cart")) || [];
async function addToCart(id){
    let isLogin = localStorage.getItem("isLogin");
    try{
        if(isLogin){
            let res = await fetch(`http://localhost:3300/products/beauty/${id}`);
            let data = await res.json();
            for(datas of addToCartArr){
                if(datas.id === data.id){
                    alert("Product already in the cart");
                    return;
                }
            }
            addToCartArr.push({...data,quantity:1});
            localStorage.setItem("cart", JSON.stringify(addToCartArr));
            alert("Added to the cart");
        }else{
            alert("Login first to add product");
        }
    }catch(err){
        console.log(err);
    }
}

//Filter between the range of price:
const high = document.getElementsByName("prices");
for(value of high){
    let highprice, lowprice;
    value.addEventListener("click", (e)=>{
        console.log(value.value)
        if(value.value==="100-199"){
            lowprice=100;
            highprice=199;
        }else if(value.value==="200-299"){
            lowprice=200;
            highprice=299;
        }else if(value.value==="300-399"){
            lowprice=300;
            highprice=399;
        }else if(value.value==="700-799"){
            lowprice=700;
            highprice=799;
        }
        rangeFilter(lowprice,highprice);
    })
}
async function rangeFilter(low,high){
    try {
        let res = await fetch(`http://localhost:products/beauty?low=${low}&high=${high}`);
        let data = res.json();
        showData(data);
    } catch (error) {
        console.log(error);
    }
}

// filter the data by input field :

let input = document.querySelector("#search");
input.addEventListener("input", () => {
  let newdata = alldata.filter((elem) => {
    return elem.name.toLowerCase().includes(input.value.toLowerCase());
  });
  showData(newdata);
});

