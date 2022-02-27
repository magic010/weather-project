// api key and the url
const apiKey = "c9b3bc08a7e3f26f863de06234f2665d&units=imperial";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// function to check zip code validity
function CheckZip(z) {
  // if there is no zip code
  if (!z) return alert("Please enter zip code first.");
  // check for valid zip code of 5 numbers
  else if (z <= 9999 || z >= 99999)
    return alert("Please enter a valid zip code.");
  // check if the zip code is not a valid number
  else if (z == isNaN) return alert("Please enter a valid zip code.");
  // return true if the zip code is valid
  else return true;
}
const updateUI = (e) => {
  e.preventDefault();
  // Get the zip input value
  let zip = document.getElementById("zip").value;
  // if the zip code is valid it will contain to get server data function
  CheckZip(zip) &&
    getServerData(zip)
      // destructing the data coming from the server
      .then(function ({ main, cod, message }) {
        let feeling = document.getElementById("feelings").value;
        // check if response coming from the server not successful
        cod != 200
          ? // then it will return error message as a promise
            promise.reject(message)
          : // otherwise it will post data to the client
            postData("http://localhost:8000/post", {
              temperature: main.temp,
              date: new Date().toDateString(),
              content: feeling,
            });
      })
      // updating the UI with the data from the server
      .then(getProjectData());
};
// async helper function to get the data from the server
const getServerData = async (zip) => {
  const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// async helper function to post data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  try {
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// async helper function to get the data from the server received to /allData route
const getProjectData = async () => {
  const response = await fetch("http://localhost:8000/allData");
  try {
    const data = await response.json();
    // destructing the project data
    ({ temperature, date, content } = data);

    document.querySelector("#date").innerHTML = `Date: ${date}`;
    document.querySelector("#temp").innerHTML = `Temperature: ${Math.round(
      temperature
    )} &#176`;
    document.querySelector("#content").innerHTML = `Content: ${content}`;
  } catch (err) {
    console.log(err.message);
  }
};
//event handler function to update the user interface
document.getElementById("generate").addEventListener("click", updateUI);
