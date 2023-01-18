const slider = document.querySelector(".slider>img");
const img1 = "https://n4.sdlcdn.com/imgs/k/k/z/web_banner_07-092e2.jpg";
const img2 = "https://n3.sdlcdn.com/imgs/j/8/e/Health_ID_Snapdeal_ABDM_1300X410-6c79d.jpg";
const img3 = "https://n3.sdlcdn.com/imgs/k/f/v/12_april_WB_Breezy_Dresses_WEB-5febf.jpg";
const img4 = "https://n1.sdlcdn.com/imgs/k/f/v/12_april_WB_Festive_kurta_sets_WEB_1-9d9b7.jpg";
const img5 = "https://n1.sdlcdn.com/imgs/k/f/v/12_april_WB_Kitchen_Essentials_WEB-cca82.jpg";

const sliderArr = [img1,img2,img3,img4,img5];

let x = 0;
function sliderFunc(){
    if(x==sliderArr.length-1){
        x=0;
    }
    slider.src = sliderArr[x];
    x++;
}

setInterval(sliderFunc, 2000);

async function fetchTrendData(){
    let res = await fetch("");
    let data = res.json();
    showTrending(data);
}

// scroll to top functionality
window.onscroll = ()=>{
    scroll_fun()
}
let scrollUp = document.querySelector("#scrollTop");
let navbar = document.querySelector(".nav");
let ad = document.querySelector(".ad");
scrollUp.addEventListener("click", ()=>{
    document.body.scrollTop=0;
    document.documentElement.scrollTop = 0;
})

function scroll_fun(){
    if(document.body.scrollTop>25 || document.documentElement.scrollTop>25){
        scrollUp.style.display = "block";
    }else{
        scrollUp.style.display = "none";
        navbar.style.marginTop = "0px";
        ad.style.display = "flex";
    }

    if(document.body.scrollTop>10){
        navbar.style.marginTop = -"20px";
        ad.style.display = "none";
    }else{
        navbar.style.marginTop = "0px";
        ad.style.display = "flex";
    }
}


function showTrending(data){
    let returnData = data.map(element => {
        return `
        <div>
            <img src=${element}></img>
        </div>
        `
    });
}