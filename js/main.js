// globale variable

var logEmail= document.getElementById("logEmail");
var logPass=document.getElementById("logPass");
var signName=document.getElementById("signName");
var signEmail=document.getElementById("signEmail");
var signPass=document.getElementById("signPass");
var btnLogin=document.getElementById("btnLogin");
var btnSignup=document.getElementById("btnSignup");
var confirmFailed = document.getElementById("confirmFailed");
var confirmSuccess = document.getElementById("confirmSuccess");

// all validations 
function validationName(){
    var str = signName.value;
    var nameRegex = /^[a-z A-Z0-9]{3,10}$/;
    if(!nameRegex.test(str)){
        signName.classList.add("is-invalid");
        signName.classList.remove("is-valid");
        console.log("false");
        return false;
    }else{
        signName.classList.add("is-valid");
        signName.classList.remove("is-invalid");
        console.log("True");
        return true;
    }
}

function validationEmail(){
    var str = signEmail.value;
    var nameRegex = /^[a-zA-Z]{3,15}[0-9]{0,}(@)[a-z]{4,8}\.(com)$/;
    if(!nameRegex.test(str)){
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
        console.log("false");
        return false;
    }else{
        signEmail.classList.add("is-valid");
        signEmail.classList.remove("is-invalid");
        console.log("True");
        return true;
    }
}

function validationPass(){
    var str = signPass.value;
    var nameRegex = /^[A-Za-z0-9][_]?\w{6,10}$/;
    if(!nameRegex.test(str)){
        signPass.classList.add("is-invalid");
        signPass.classList.remove("is-valid");
        console.log("false");
        return false;
    }else{
        signPass.classList.add("is-valid");
        signPass.classList.remove("is-invalid");
        console.log("True");
        return true;
    }
}

// check the local storge is empty or not 
if (localStorage.getItem("allUsers") == null) {
    var userList = [];
  } else {
    var userList = JSON.parse(localStorage.getItem("allUsers"));
  }

  //for check inputs is empty or not
function isEmpty() {

    if (signName.value == "" || signEmail.value == "" || signPass.value == "") {
        return false
    } else {
        return true
    }
}
  
function signUP(){

    if (isEmpty() == false) {
        let exist = document.getElementById('exist')
        exist.classList.replace('d-none', 'd-block');
        return false
    }
    validationName();
    validationEmail();
    validationPass();
   // excistUser();
    if(validationName()==true && validationEmail()==true && validationPass()==true && excistUser()==false){
   var users = {
       userName: signName.value,
       userEmail: signEmail.value,
       userPass: signPass.value,
   };
   userList.push(users);
localStorage.setItem("allUsers", JSON.stringify(userList));

 //when sign up sucess show this massage     
confirmSuccess.classList.replace("d-none", "d-block");
existAccount.classList.replace('d-block', 'd-none');
confirmFailed.classList.replace("d-block", "d-none");

}else{

// when sign up Failed show this massage   
confirmFailed.classList.replace("d-none", "d-block");
confirmSuccess.classList.replace("d-block", "d-none");
    }
}


// to check id the user already signed or not 
var existAccount = document.getElementById("existAccount");
function excistUser(){
  
   for(var i=0; i<userList.length; i++){
       if(userList[i].userName.toLowerCase() == signName.value.toLowerCase() ||
        userList[i].userEmail.toLowerCase() == signEmail.value.toLowerCase()){
            
            existAccount.classList.replace('d-none', 'd-block');
            signName.classList.remove("is-valid");
             signEmail.classList.remove("is-valid");
             signPass.classList.remove("is-valid")
           
          return true;  
       }
    }
    return false;
}

var showUserName = localStorage.getItem("ShowUser");
var errorMsg = document.getElementById("errorMsg");

function logIN(){
    if (logEmail.value == "" || logPass.value == "" ){
        var fillInp = document.getElementById("fillInp");
        fillInp.classList.replace('d-none', 'd-block');
        
    }else{
        for(var i= 0 ; i<userList.length; i++){

            if(userList[i].userEmail.toLowerCase() == logEmail.value.toLowerCase()
            && userList[i].userPass.toLowerCase() == logPass.value.toLowerCase() )
            {
        
            localStorage.setItem("ShowUser", userList[i].userName)
            btnLogin.setAttribute("href","welcome.html");

            errorMsg.classList.replace("d-block", "d-none");
            
             }else{
          
            errorMsg.classList.replace("d-none", "d-block");
        }
    
}
    }
}

// display welcome to user
function displayUser(){
   document.getElementById("WelcomUser").innerHTML= "Welcome "+ showUserName;

}

function logout(){
    localStorage.removeItem("ShowUser");
}