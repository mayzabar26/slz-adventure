//Selecting the current URL of the page
const currentUrl = window.location.href; //Gets the full address of the current page.

//Splitting the URL into two parts at the "?" to identify the user's form data
const everything = currentUrl.split('?');

//Grabbing only the second half of the URL, which contains the user's form data
let formData = everything[1].split('&'); 
//everything[1]: Retrieves the second part containing the user's data (index 1 because indexing starts at 0).
//split('&'): The "&" symbol separates the data, so we use it to divide the data into an array of elements.

//Function to retrieve a specific key value from the form data
function show(key) {
    let result = ''; //Default value in case the key isn't found
    formData.forEach((element) => {
        if (element.startsWith(key)) {
            result = element.split('=')[1]
                .replace('%40', "@")
                .replace(/\+/g, " "); //Replace '+' with spaces
        }
    });
    return decodeURIComponent(result); //Decode URI components for proper formatting
}

//Function to format the date
function formatDate(input) {
    const [year, month, day] = input.split('-'); //Split the date into year, month, and day
    return `${month}-${day}-${year}`; //Return the date in MM-DD-YYYY format
}

//Function to format the time
function formatTime(input) {
    let timeRange = ''; // Variável para armazenar o intervalo de tempo
    
    // Mapeia os valores de tempo para os intervalos correspondentes
    switch(input) {
        case 'morning':
            timeRange = '9 AM - 12 PM';
            break;
        case 'afternoon':
            timeRange = '12 PM - 5 PM';
            break;
        case 'evening':
            timeRange = '5 PM - 9 PM';
            break;
        default:
            timeRange = input; // Se não for um valor esperado, apenas retorna o valor
    }

    return timeRange; // Retorna o intervalo de tempo formatado
}

//Function to format the current timestamp
function getFormattedTimestamp() {
    const now = new Date(); //Gets the current date and time
    const year = now.getFullYear(); //Extracts the year
    const day = String(now.getDate()).padStart(2, '0'); //Extracts the day (adds leading 0 if needed)
    const month = String(now.getMonth() + 1).padStart(2, '0'); //Extracts the month (adds leading 0 if needed)
    const hours = String(now.getHours()).padStart(2, '0'); //Extracts the hour (adds leading 0 if needed)
    const minutes = String(now.getMinutes()).padStart(2, '0'); //Extracts the minutes (adds leading 0 if needed)
    const seconds = String(now.getSeconds()).padStart(2, '0'); //Extracts the seconds (adds leading 0 if needed)

    //Returns the formatted timestamp in "MM-DD-YYYY HH:MM:SS" format
    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

//Displaying the retrieved information inside the <div id="results"></div>
const showInfo = document.querySelector('#results'); //Selects the <div> with id="results" to display the user's data.
showInfo.innerHTML = `
  <p><strong>First Name:</strong> ${show('first')}</p>
  <p><strong>Last Name:</strong> ${show('last')}</p>
  <p><strong>Email:</strong> <a href="mailto:${show('email')}">${show('email')}</a></p>
  <p><strong>Mobile Number:</strong> ${show('phone')}</p>
  <p><strong>Date:</strong> ${formatDate(show('date'))}</p>
  <p><strong>Time:</strong> ${formatTime(show('time'))}</p>
  <p><strong>Consultation Submitted:</strong> ${getFormattedTimestamp()}</p>
`;