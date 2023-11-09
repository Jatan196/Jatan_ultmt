//--------------------------------------FUNCTION TO MASK PASSWORD--------------------------
function mask(pass){
      let str = ""
      for (let index = 0; index < pass.length; index++) {
          str  += "*"
      }
      return str
  }
  
//------------------------------------------------------DELETE AND COPY BUTTON----------------------------------------------------
const deletePassword= (Website)=>{
    let data=localStorage.getItem("passwords")
    let arr=JSON.parse(data)

    arrUpdated=arr.filter((e)=>{
             return e.Website!=Website
    })
    // Now storing the updated array of passwords 
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))

    alert(`Successfully Deleted password for ${Website} website`)
    showPasswords();

}

// CODE TO UPDATE TABLE AS THE ENTRIES ARE SUBMITTED BY USER 
const showPasswords = () => {

      let tb = document.querySelector("table")
      let data = localStorage.getItem("passwords");

      if (data === null) {
            tb.innerHTML = "No data to show";
      }
      else {
            tb.innerHTML=`<tr>
            <td>Website</td>
            <td >User Name</td>
            <td >Password </td>
            <td rowspan="2">Actions To Be Performed</td>
        </tr>`
           // here we will reintialise tb ki inner html , taki jab next time show password call  hoye to tb.inner html ek dum fresh ho , last call se effected na ho
            try {
                  let arr = JSON.parse(data);
                  let str = "";
                  for (let index = 0; index < arr.length; index++) {
                        const element = arr[index];
                        // Your code to create the HTML table rows
                        str+=`<tr>
                          <td>${element.Website}   <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'><rect width='40' height='20' rx='5' fill=' rgb(248, 239, 143)' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='black      ' font-size='16'>Copy</text></svg>", alt="Copy" , onclick="copyToClipboard('${element.Website}')" , style="cursor: pointer;">

                          </td>
                          <td>${element.username}   <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'><rect width='40' height='20' rx='5' fill=' rgb(248, 239, 143)' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='black     ' font-size='16'>Copy</text></svg>", alt="Copy" , onclick="copyToClipboard('${element.username}')" , style="cursor: pointer;">

                          </td>
                          <td>${mask(element.password)}    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'><rect width='40' height='20' rx='5' fill=' rgb(248, 239, 143)' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='black    ' font-size='16'>Copy</text></svg>", alt="Copy" , onclick="copyToClipboard('${element.password}')" , style="cursor: pointer;">

                          </td>
                          <td><button class="delete_button" onclick="deletePassword('${element.Website}')">Delete</button></td>  
                        </tr>`      
                  }

                  // adding event listener type class and value in <td> button data cell
                  tb.innerHTML = tb.innerHTML + str;
            } catch (error) {
                  console.error("Error parsing JSON:", error);
                  // Handle the error here, e.g., display an error message to the user.
            }
      }
}

document.querySelector(".button1").addEventListener("click",(e)=> {
      showPasswords();
})
document.querySelector(".button").addEventListener("click", (e) => {
      e.preventDefault()//to prevent from submission of form

      console.log("clicked....");
      console.log(Website.value, username.value, password.value)
      let passwords = localStorage.getItem("passwords");
      console.log(passwords)
      if (passwords == null) {
            let json = []
            json.push({ Website: Website.value  , username: username.value, password: password.value })
            console.log("saved password")
            localStorage.setItem("passwords", JSON.stringify(json))// takes as key value, so key -> passwords  , and value as stringfy form of json

      }
      else {
            let json = JSON.parse(localStorage.getItem("passwords"))
            json.push({ username: username.value, password: password.value, Website: Website.value })
            console.log("saved password")
            localStorage.setItem("passwords", JSON.stringify(json))// takes as key value, so key -> passwords  , and value as stringfy form of json
      }
      
      showPasswords();
      //Reseting the input fields after submitting the entry
      document.getElementById("Website").value = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
   

  }

)
// copy function


  function copyToClipboard(txt){  
    // Copy text to clipboard (You can replace 'Your text to copy' with the actual text you want to copy)
     navigator.clipboard.writeText(txt).then(
      () =>  {
          // copy operation is successfull
          // Display a message
           const message = document.createElement('div');
           message.textContent = 'Copied!';
           message.style.position = 'fixed';
           message.style.background =  'rgb(248, 239, 143)';
           message.style.color = 'black';
           message.style.padding = '5px 10px';  
           message.style.borderRadius = '5px';
           message.style.top = '20px';
           message.style.left = '50%';
           message.style.transform = 'translateX(-50%)';
           message.style.zIndex = '9999';
           document.body.appendChild(message);

           // Remove the message after a short delay (e.g., 2 seconds)
           setTimeout(() => {
            document.body.removeChild(message);
        }, 2000);
      },
      () => {
            alert("Copy Failed")
      },
     );
  }

// Conforamtion Message for successful compilatin of JS file

console.log("JS RUN !!!")












