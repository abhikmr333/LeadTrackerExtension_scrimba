let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("savetab-btn");



//to add the key and values in localStorage area 
// localStorage.setItem("someURL", "www.someurl.com");

//to get item which will persist even after you refresh or comment the above code 
// console.log(localStorage.getItem("someURL"));

//to clear out the localStorage 
// localStorage.clear();

const leadsFromLocalStorage = JSON.parse(localStorage.getItem(("myLeads")));
//if there are any leads render them else do nothing
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


//tab button is for grabbing the url from current page and save it without using copy and paste manually everytime 

tabBtn.addEventListener("click", function () {
    //gettin current url using chrome api - chrome.tabs.query({obj},fubnction(tabs){})
    //remember this will only work in your extension bar not in a tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
});

function render(leads) {
    let listItem = "";

    for (let i = 0; i < leads.length; i++) {
        //listItem = <li>a</li><li>b</li><li>c</li><li>d</li>
        // listItem += "<li><a href='" + myLeads[i] + "'" + "target='_blank'>" + myLeads[i] + "</a></li>";
        //doing the above using template string/literal with ${js expression}
        //better readability
        listItem +=
            `<li>
                 <a href='${leads[i]}' target='_blank'> ${leads[i]} 
                 </a>
            </li>`;
    }

    ulEl.innerHTML = listItem;
    //clearing out the input field after the lead is saved 
    inputEl.value = "";
};

delBtn.addEventListener("dblclick", function () {
    //delete stored leads
    localStorage.clear();
    //assing the myLead array to empty 
    myLeads = [];
    //rerender leads but now it will be empty 
    render(myLeads);
});

inputBtn.addEventListener("click", function () {
    const text = inputEl.value;
    //adding new leads
    myLeads.push(text);
    //saving leads array in localstorage after converting it into a string 
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    /* Doing this with out for loop 
    //let recentlyAddedlead = myLeads.length - 1;
    //using innerHTML creating the list of leads
    //doing it without forloop 
    // ulEl.innerHTML += "<li>" + myLeads[recentlyAddedlead] + "</li>";
    
    //different way of doing the above 
    //creating element
    // const li = document.createElement("li");
    //setting text content 
    // li.textContent += myLeads[recentlyAddedlead];
    //appending to element +=
    // ulEl.append(li);
    */
    render(myLeads);

});














