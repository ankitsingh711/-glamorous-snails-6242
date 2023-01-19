const showContainer = document.querySelector(".showproduct");

async function fetchData(){
    let res = await fetch("http://localhost:3300/products/women", {
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
            <img src=${elem.images}></img>
            <h5>${elem.name}</h5>
            <span>${elem.category}</span>
            <h6>Rs.${elem.price}</h6>
            <h5>Offer: Rs.${elem.discount}</h5>
            <button>Add to Cart</button>
        </div>
        `
    })
    showContainer.innerHTML = dataArr.join("");
}