
// Get data of card and appending to the div:
let cartbag = JSON.parse(localStorage.getItem("cart")) || [];
let main = document.querySelector(".cartmain");
function displayitem() {
    main.innerHTML = null;
  cartbag.forEach((elem, index) => {
    let div1 = document.createElement("div");
    let img = document.createElement("img");
    img.src = elem.image;
    let name = document.createElement("h4");
    name.innerText = "Name:"+" "+elem.name;
    let price = document.createElement("h4");
    price.innerText = "Price:"+" "+elem.price;
    let des = document.createElement("h4");
    des.innerText = "Category:"+" "+elem.des;
    let imgdiv = document.createElement("div");
    div1.append(img);
    let txtdiv = document.createElement("div");
    txtdiv.append(name,price,des)
    div1.append(imgdiv, txtdiv);
    let div2 = document.createElement("div");
    let price2 = document.createElement("h3");
    price2.innerText = "Price:"+" "+"$"+elem.price;
    let qnt = document.createElement("span");
    qnt.innerText = elem.quantity;
    qnt.style.backgroundColor="whitesmoke"
    qnt.style.padding="10px";
    let subt = document.createElement("h3");
    subt.innerText = "Subtotal:"+" "+"$"+elem.quantity*elem.price;
    let plus = document.createElement("button");
    plus.innerText = "+";
    plus.addEventListener("click", ()=>{
        elem.quantity++;
        qnt.innerText = elem.quantity;
        subt.innerText = "Subtotal:"+" "+"$"+elem.quantity*elem.price;
        localStorage.setItem("cart",JSON.stringify(cartbag));
    })
    plus.setAttribute("class", "plus")
    let minus = document.createElement("button");
    minus.innerText = "-";
    minus.setAttribute("class", "minus");
    minus.addEventListener("click", ()=>{
        if(elem.quantity==1){
            return;
        }
        elem.quantity--;
        qnt.innerText = elem.quantity;
        subt.innerText = "Subtotal:"+" "+"$"+elem.quantity*elem.price;
        localStorage.setItem("cart",JSON.stringify(cartbag));
    })
    let del = document.createElement("i");
    del.setAttribute("class", "fa-solid fa-trash");
    del.addEventListener("click", ()=>{
        del_elem(cartbag, index);
    })
    div2.append(price2,minus,qnt,plus,subt, del);
    let bigdiv = document.createElement("div");
    bigdiv.append(div1, div2);
    bigdiv.setAttribute("class", "bigdiv")
    main.append(bigdiv);
  });
}
displayitem();

// deleting the element from dom and localstorage:

function del_elem(data, index){
    data.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(data));
    displayitem(data);
}

// total price:

let total = document.querySelector(".total");

let t =  cartbag.reduce((acc,elem,i)=>{
    return  acc + elem.quantity*(elem.price);
},0)

total.innerText = "Grand Total:"+" "+"$"+t;

const signupLogoAndText = document.getElementById("signup");
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