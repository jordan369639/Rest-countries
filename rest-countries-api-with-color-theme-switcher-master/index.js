let mode = document.getElementById("mode");
let modetype = document.getElementById("modetype");
let modeicon = document.getElementById("modeicon");
let rootvariable = document.querySelector(':root');
let mapcontainer = Array.from(document.getElementsByClassName("container"));
let firstpage = document.getElementsByClassName("firstpage")[0];
let countrydetail = document.getElementsByClassName("countrydetail")[0];
let back = document.getElementById("back");
let search = document.getElementById("input");
let countryflag = document.getElementById("countryflag");
let population = document.getElementById("population");
let capital = document.getElementById("capital");
let selectregion = document.getElementById("Region");
let secondpage = document.getElementsByClassName("countrydetail")[0];

let cidx = 4;
back.addEventListener('click', () => {

    firstpage.style.visibility = "visible";
    secondpage.style.visibility = "hidden"

})




// hsl(200, 15%, 8%)
let bool = true;
mode.addEventListener('click', () => {

    if (bool) {
        rootvariable.style.setProperty('--blue', "hsl(0, 0%, 100%)");
        rootvariable.style.setProperty('--darkblue', "hsl(240, 3%, 94%)");
        rootvariable.style.setProperty('--whiite', "hsl(200, 15%, 8%)");
        rootvariable.style.setProperty('--span', "hsla(298, 0%, 17%, 1) ");
        modetype.innerHTML = "Light Mode"
        modeicon.innerHTML = `<i class="fa-solid fa-sun " style = "color:yellow"></i>`
        bool = false;
    } else {
        rootvariable.style.setProperty('--blue', "hsl(209, 23%, 22%)");
        rootvariable.style.setProperty('--darkblue', "hsl(207, 26%, 17%)");
        rootvariable.style.setProperty('--whiite', "hsl(0, 0%, 100%)");
        rootvariable.style.setProperty('--span', " hsl(0%, 13%, 74%)");
        modetype.innerHTML = "Dark Mode"
        modeicon.innerHTML = `<i class="fa-solid fa-moon "></i>`
        bool = true;
    }


})


fetch(`https://restcountries.com/v3.1/all`).then(res => res.json()).then(result => {
    console.log(result)

    result.forEach(element => {
        createcountry(element)



    })



})



function createcountry(element) {
    cidx++;
    let div = document.createElement("div");
    div.classList.add("container")
    div.innerHTML = `<img src= ${element.flags["png"]} id="countryflag${cidx}">
            <h1 id="countryname${cidx}" class ="name">${element.name["common"]}</h1>
            
            <p>population:  <span id="popolation+${cidx}">${element.population}</span></p>
            
            
            <p> region: <span class="regionname">${element.region}</span></p>
            
            <p> capital: <span id="capital${cidx} ">${element.capital}</span></p>`;


    document.getElementsByClassName("countrycontainer")[0].appendChild(div);

    div.addEventListener('click', (e) => {
        firstpage.style.display = "none"
        secondpage.style.visibility = "visible"
        document.getElementById("capital1").innerHTML = ` ${element.capital}`


        showdetail(element);

    })







}




let container = document.getElementsByClassName("container");
let dropdown = document.getElementById("Region");
let countryname = document.getElementsByClassName("name");
let region = document.getElementsByClassName("regionname");


dropdown.addEventListener('click', function (e) {

    Array.from(region).forEach(elem => {

        if (elem.innerHTML.toLowerCase().includes(this.value.toLowerCase())) {

            elem.parentElement.parentElement.style.display = "flex"

        } else {
            elem.parentElement.parentElement.style.display = "none"
        }



    })



})

search.addEventListener('input', () => {

    Array.from(countryname).forEach(elem => {

        if (elem.innerHTML.toLowerCase().includes(search.value.toLowerCase())) {

            elem.parentElement.style.display = "flex"

        } else {
            elem.parentElement.style.display = "none"
        }



    })
})


document.addEventListener('click',(e)=>{
if(e.keycode === 13 || e.keycode =="Enter"){

   
   console.log("worked")


}

})



function showdetail(data) {
    let nativename = Object.keys(data.name["nativeName"]);
    let currency = Object.keys(data.currencies);
    let topld = (data.tld);
    console.log(topld[0])
    let language = Object.keys(data.languages);
   


    document.getElementById("countryflag2").innerHTML = ` <img src= ${data.flags["png"]} alt="image" class="flag">`
    document.getElementById("countryname2").innerHTML = `${data.name["common"]}`
    document.getElementById("population2").innerHTML = `${data.population}`
    document.getElementById("region2").innerHTML = `${data.region}`
    document.getElementById("sub-region").innerHTML = `${data["subregion"]}`
    document.getElementById("rupees").innerHTML = `${data.currencies[`${currency}`]["name"]}`
    document.getElementById("language1").innerHTML = `${data.languages[language[0]]}`
    document.getElementById("topdomain").innerHTML = `${topld[0]}`
    document.getElementById("native").innerHTML = `${data.name["nativeName"][`${nativename[0]}`]["official"]}`
    document.getElementById("border1").innerHTML = `${data.borders[0] == "undefined" ?  '_':data.borders[0]}`
    document.getElementById("border2").innerHTML = `${data.borders[1]}`
    document.getElementById("border3").innerHTML = `${data.borders[2]}`




}







back.addEventListener('click', () => {
    firstpage.style.display = "block"
    secondpage.style.visibility = "hidden"

})