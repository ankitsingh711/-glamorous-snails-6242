const showContainer = document.querySelector(".showproduct");

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