        if(sessionStorage.getItem("isLoggedIn") == null || 
            sessionStorage.getItem("isLoggedIn") == "0" || 
            sessionStorage.getItem("isLoggedIn") == undefined)
        {
            window.location.replace('/');
        }
        else
        {
            console.log("loggedin");
            document.getElementById("uname").innerHTML = sessionStorage.getItem("isLoggedIn");
        }
$('#logout').click(function (){
        sessionStorage.removeItem("isLoggedIn");
        window.location.replace('/');
    });
     