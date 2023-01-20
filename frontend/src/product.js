const mainContainer = document.querySelector(".prodet");
const prodId = localStorage.getItem(prodId);
async function fetchData(){
    try {
        let res = await fetch(`http://localhost:3300/products/beauty/${prodId}`);
        let data = res.json();
        showData(data);
    } catch (error) {
        console.log(error);
    }
}

function showData(data){
    let arrdata = data.map((elem)=>{
        return `
        <div>
            <div>  
                <img src=${elem.image}></img>
            </div>
            <div>
                <h4>${elem.name}</h4>
                <p>${elem.des}</p>
                <span>${elem.price}</span>
                <button>Add to cart</button>
            </div>
        </div>
        `
    })

    mainContainer.innerHTML = arrdata.join("");
}
