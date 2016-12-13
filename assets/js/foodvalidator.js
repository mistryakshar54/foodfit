 $().ready(function () {
      $("#foodform").validate({
          rules: {
            fname:{
              required:true,
              minlength:2
            },
            calories:{
              required:true,
              number:true
            },/*
            calfat:{
              required:true,
              number:true
            },*/
            fat:{
              required:true,
              number:true
            },
            carbs:{
              required:true,
              number:true
            },
            fiber:{
              required:true,
              number:true
            },
            protein:{
              required:true,
              number:true
            },
            vitamin_a:{
              required:true,
              number:true
            },
            vitamin_c:{
              required:true,
              number:true
            },
            calcium:{
              required:true,
              number:true
            },
            iron:{
              required:true,
              number:true
            },
          /*  nutri_dens:{
              required:true,
              number:true
            },
            */serving:{
              required:true,
              number:true
            }
          },
          messages: {
            fname:{
                required:"Please enter Food name",
                minlength:"Food name should more than two latters"
            },
            serving:"Please enter serving"
          }
      });
   });
