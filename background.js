let apikey="e15cc1674bfc81df0b50de4f46f12d4d";
window.onload=function(){
    document.getElementById("locbtn").addEventListener("click",appear_modalbox);
    document.getElementById("modalbox").addEventListener("click",close_modalbox);
}

function appear_modalbox(){
    document.getElementById("modalcontent").classList.remove("revanim");
    document.getElementById("modalcontent").classList.add("fwdanim");
    document.getElementById("modalbox").style.display="block";
    
    console.log("done");
}

function close_modalbox(ev){
    if(ev.target==document.querySelector("#close") || ev.target==document.querySelector("#cross") || ev.target==document.querySelector("#save") 
    || ev.target==document.querySelector("#modalbox"))
    {
        document.getElementById("modalcontent").classList.remove("fwdanim");
        document.getElementById("modalcontent").classList.add("revanim");
        setTimeout(function(){
            document.getElementById("modalbox").style.display="none";

        },500);
        if(ev.target==document.querySelector("#save"))
        {
            fetchWeatherData();
        }
    }
}

function fetchWeatherData(){
    let city=document.getElementById("city").value.trim();
    getWeatherDetails(city)
    .then(
        (wthr)=>{
            if(wthr.message=="city not found")
            {
                alertMessage(city);
            }
            else{
                    console.log(wthr);
                    displayData(wthr,city);
            }

        }
    );

}
async function getWeatherDetails(city){

    let response=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
    let responseobj= await response.json();
    return responseobj;
}
function displayData(wthr,city)
{
    const cels=(wthr.main.temp-273.15).toPrecision(4);
    const fah=(cels*(9/5)+32).toPrecision(4);
    document.getElementById("weathersummary").innerHTML=`<p id="citystate">${wthr.name}</p>
                                                         <p id="weather">${wthr.weather[0].description}</p>
                                                         <p id="temp">${fah}F <span id="celsius">(${cels}C)</span></p>
                                                         <p id="icon">icon here</p>`
    document.getElementById("humidity").innerHTML=`Humidity:${wthr.main.humidity}`;
    document.getElementById("pressure").innerHTML=`Pressure:${wthr.main.pressure}`;
    document.getElementById("feels").innerHTML=`Feels Like:${(wthr.main.feels_like-273.15).toPrecision(4)}C`;
    document.getElementById("wind").innerHTML=`Wind Speed:${wthr.wind.speed}`
    //Could have put the entire content dynamically using innerHTML instead of picking individual list elements
}
function alertMessage(city)
{
    console.log("alert");
    document.querySelector(".alert").classList.toggle("alertboxtrans");
    document.querySelector(".alert").style.height="auto";
    document.querySelector(".alert").innerHTML=`${city} not found. Please enter a valid city name`;
    setTimeout(()=> {
        document.querySelector(".alert").classList.toggle("alertboxtrans");
        setTimeout(()=>document.querySelector(".alert").style.height="",1000);
    },2000);

}
//api.openweathermap.org/data/2.5/weather?q='London'&appid='e15cc1674bfc81df0b50de4f46f12d4d'