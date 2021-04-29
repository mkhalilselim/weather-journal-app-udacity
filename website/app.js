/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=1af538d2a4157367e9f035bda6940ade';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add functionality to generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeather(baseURL, newZip, apiKey)
        .then(function(data){
            console.log(data);
            postData('/add', {date:newDate, temp:data.main.temp, content:content})
            updateUI();
        })

};


//function to get API data
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    try{
        const data = await res.json();
        return data
    }catch(error){
        console.log("error", error);
    }
};

//function to post data
const postData = async ( url = '', data = {}) => {
    console.log(data);

    const req = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
    }),         
  });

    try {
      const newData = await req.json();
      console.log(newData);
      return newData;
      
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}


//function to update UI
const updateUI = async() => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;


    }catch(error){
        console.log("error", error);

    }
}
