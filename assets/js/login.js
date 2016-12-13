

        var name = null;
    //    alert("adminpanel login");
        if (sessionStorage.getItem("isLoggedIn") == null || typeof(Storage) == null || sessionStorage.getItem("isLoggedIn") != "admin") {
                window.location.replace('/admin/login.html');
                // alert("storage is null");
            }

      
     
    /*    
        function setSession(){

        // alert("session"+sessionStorage.getItem("isLoggedIn"));
                        if (typeof(Storage) !== "undefined") {
                            
                                if(sessionStorage.getItem("isLoggedIn") == "0")
                                {
                                  window.location.replace('/login.html');
                                }
                                else
                                {
                                    document.getElementById("navfirst").style.display="none";
                                    document.getElementById("navsecond").style.display="inline-block";
                                    document.getElementById("uname").innerHTML = sessionStorage.getItem("isLoggedIn");
                                 //   data-dismiss="modal";
                                }

                        }
                        else
                        {
                            //alert("Sorry, your browser does not support Web Storage.\nPlease change/update browser to use this website.");
                        }
        }
    */    
        $('#logout').click(function (){
              //  //alert("logout cfunc");
                 sessionStorage.removeItem("isLoggedIn");
                 window.location.replace('/admin/login.html');
                /* document.getElementById("navsecond").style.display="none";
                 document.getElementById("navfirst").style.display="inline-block";*/
             });
        $('#home').click(function () {
            window.location.replace('/admin');
        });
        $('#food').click(function () {
            window.location.replace('/admin/food');
        });
        $('#rest').click(function () {
            window.location.replace('/admin/rest');
        });
        $('#feedback').click(function () {
            window.location.replace('/admin/feedback');
        });

             
           
