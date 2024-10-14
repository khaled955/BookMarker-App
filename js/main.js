var formInput = document.getElementById("form-input")
var nameSiteInput = document.getElementById("site-name")
var urlSiteInput = document.getElementById("site-url")
var submitBtn = document.getElementById("submit-btn")
var rowContainer = document.getElementById("row-container")
var mainContainer = document.getElementById("my-container")
var alertBox = document.getElementById("alert-box")
var errorBtn = document.getElementById("error-btn")
var siteContainer;





var nameSiteInputRegex = /^\w{3,}$/
var urlSiteInputRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/






//  prevent default action of form
formInput.onsubmit = function(e){
    e.preventDefault()
}

//  remove alert box
window.onclick = function(e){
  if(e.target !== submitBtn) {
    alertBox.classList.add("d-none")
    mainContainer.classList.remove("opacity-25")

}
}


//  remove alert box
errorBtn.onclick = function(){
    alertBox.classList.add("d-none")
    mainContainer.classList.remove("opacity-25")
}



//  check if user has data before
if (localStorage.getItem("sites")) {
    siteContainer = JSON.parse(localStorage.getItem("sites"))
  
  for(var i = 0; i < siteContainer.length ; i++){
    displayData(i)
  }


}else{
siteContainer = []
}



//  main function to collect data from user
function getData(){

if (validationData(nameSiteInputRegex,nameSiteInput) && validationData(urlSiteInputRegex,urlSiteInput)) {
    
    var site ={
        name:nameSiteInput.value,
        url:urlSiteInput.value
    }
    
    siteContainer.push(site)
    localStorage.setItem("sites",JSON.stringify(siteContainer))
    displayData(siteContainer.length -1)
    formatInput()


}else{
alertBox.classList.remove("d-none")
mainContainer.classList.add("opacity-25")


}
  




   


}





//  display data for user
function displayData(index){
var siteHtml = `

            <div class="col-3 bg-white">
              <div class="inner text-dark text-center py-2">
                <h3>${index + 1}</h3>
              </div>
            </div>


            <div class="col-3 bg-primary">
              <div class="inner text-dark text-center py-2 text-capitalize">
                <h3>${siteContainer[index].name}</h3>
              </div>
            </div>


            <div class="col-3 bg-white">
              <div class="inner text-dark text-center py-2">
                <a target="_blank" href="${siteContainer[index].url}" class="text-decoration-none">
                  <button class="btn btn-dark d-block w-75 mx-auto fs-4"><i class="fa-regular fa-eye"></i> Visit</button>
                </a>
              </div>
            </div>

            
            <div class="col-3 bg-info">
              <div class="inner text-dark text-center py-2">
                <button onclick="deletData(${index})" class="btn btn-warning d-block w-75 mx-auto fs-4"><i class="fa-regular fa-trash-can"></i> Delet</button>


              </div>
            </div>`

rowContainer.innerHTML += siteHtml


}





//  delet data when need

function deletData(deletedIndex){
   
siteContainer.splice(deletedIndex , 1)
localStorage.setItem("sites" , JSON.stringify(siteContainer))
 rowContainer.innerHTML = ""

 for(var i = 0; i < siteContainer.length ; i++){
    displayData(i)
  }

}



//  format input after add data
function formatInput(){
    nameSiteInput.value = ""
    nameSiteInput.classList.remove("is-valid")

    urlSiteInput.value = ""
    urlSiteInput.classList.remove("is-valid")

}



//  validation data
function validationData(regex,element){
if (regex.test(element.value)) {
    
element.classList.add("is-valid")
element.classList.remove("is-invalid")



return true
} else {
    element.classList.remove("is-valid")
element.classList.add("is-invalid")

    return false
}



}



