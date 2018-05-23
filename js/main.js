// just save all these different events in a string variable
var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";


$(document).ready(function() {


function toggle_menu(){
	if (menu.style.height == "100vh") {
			menu.style.height = "0vh";
	} else {
		menu.style.height = "100vh";
	};
	var hamb = document.getElementById("hamb");
	hamb.classList.toggle("rotationeffect");
};

        // moving to step 2

		$(".SignUp").click(function(event){
			$(".steps").addClass("moving-to-step2");
		});



    // click to open modal
    $(".open-modal").on("click", function(e) {
        e.preventDefault();

        // add lass to <body> = starting animations of modal opening
        $("body").addClass("modal-showing");

        // START: ADD
        // wait to the animation of the modal opening to finish, then focus on something in the modal
        $(".modal-container .modal").one(transEnd, function () {

            // get the first input-field or link, and put focus on it
            $(this).find("input, a").eq(0).trigger("focus");
            $(this).off(transEnd);
        });
        // END: ADD

    });

    // click to close the modal
    $(".modal-container, .modal a.close").on("click", function(e) {
        e.preventDefault();

        $("body").addClass("closing");

        // this event happens when a transition-event on this element ends.
        // we could use a selector for #site-container or .modal-container as well
        // - just something we know is going to transition
        $(".modal-container .modal").one(transEnd, function () {
            $("body").removeClass("modal-showing closing");
            $(this).off(transEnd); // JS has no idea if the "end transition" is for when the modal opens or closes so make sure to remove the event-check again after it has run once
        });

    });

    // ... but not when the click is inside the modal
    $(".modal-container .modal").on("click", function(e) {
        e.stopPropagation();
    });


    // show/hide stuff based on if user is student or not
   // $("#iam").change( function() {
   //     var val = $(this).find("option:selected").attr("value");

        // hide the student-only div
     //   $(".students-only").removeClass("show");

        // START: ADD
        // "hide" inputs from the tab order
      //  $(".students-only input, .students-only a").attr("tabindex", "-1");
        // END: ADD

        // only show the student-only div again if "student" is the selected option
     //   if ( val == "student" ) {
    //        $(".students-only").addClass("show");

        // START: ADD
            // "show" inputs from the tab order
     //       $(".students-only input, .students-only a").removeAttr("tabindex");
        // END: ADD
      //  }
    //} );


// moving to step 3

    $(".continue").click(function(event){
            $(".steps").removeClass("moving-to-step2").addClass("moving-to-step3");
        });

    $(".back").click(function(event){
            $(".steps").removeClass("moving-to-step2").addClass("moving-to-step1");
        });


    // form validation
    $("form").submit(function(e) {
        var form = $(this);
        var postform = true;
        var fields = $(this).find("*[required]");;

        // alright, go through the fields one by one
        fields.each(function() {

            var valid = validateField( $(this) );

            // was the field validated?
            if ( !valid ) {

                // no!
                postform = false;

            }
        });

        // so what's the result of the POST???
        if ( !postform ) {

            // if any field wasn't validated, stop the POST of the form
            e.preventDefault();

        } else {

            // the validation was successful! But.. still stop the submit of the form and do it via AJAX
            e.preventDefault();

            // send all variables from the form to register.json and wait for the response
            // Note! this is a fake register-file for this example, woudn't work in real life
            // The file-call, would have to have to have functionality in the back-end to handle the sign up

            // save all data from the form fields into an array/json-object
            var formData = form.serializeArray();

            // call a json-file and include the form field data in the request
            $.ajax({
                url: "thank-you.html",
                dataType: "html"
            })

            // function to execute if the AJAX-call succeeds
            .done(function( data ) {

                // weeeey, we got a response!
                // now, save the html-as-atext-string inte a jQuery-object and exclude the markup we don't want
                var thankYouMessage = $("<div></div>").html(data).find("#container");

                // get this modal
                var container = $(".modal");

                // add the fetched Thank you-message to the modal
                thankYouMessage.appendTo( container );

            })

            // function to execute if the AJAX-call fails
            .fail(function( jqXHR, textStatus ) {

                // there was an error of some sort, show the error in an alert
                alert( "Request failed: " + textStatus );
            });
        }
    });

    // Validate fields on BLUR IF they showed an error the first time (when trying to submit)
    $(document.body).on("blur", "label.error input[required]", function(e) {

        // validate this one TEXT field
        validateField( $(this) );
    });
    $(document.body).on("change", "label.error select[required]", function(e) {

        // validate this one selectbox
        validateField( $(this) );
    });


    // check against existing email addresses
    $("#username").blur(function() {
        var val = $(this).val();
        var field = $(this);

        // remove any classes from previous validation
        field.closest("label").removeClass("error not-exist exists");

        // first, validate as email address - otherwise, no need to check against existing email addresses
        if ( validateEmail(val) ) {

            // get existing email addresses
            $.ajax({
                url: "js/users.json",
                dataType: "JSON"
            })
            .done(function( data ) {

                // ok we got an answer - turn array and given email to lowercase
                data = data.map(v => v.toLowerCase());
                val = val.toLowerCase();

                // find the email in the returned array
                var exists = data.indexOf(val);

                // did the email address exist?
                if ( exists == -1 ) {

                    // weeey it didn't exist1
                    field.closest("label").addClass("not-exist");
                } else {

                    // damn, it was taken!
                    field.closest("label").addClass("exists");
                }
            });
        } else {
            field.closest("label").addClass("error");
        }
    });

});

function validateField( field ) {

    // remove error messages from eventual earlier validation attempts
    field.closest("label").removeClass("error");

    // save/set some values
    var type = field.attr("type");
    var val = field.val();
    var valid = true;

    // is it a <select>?
    if ( field.is('select') ) {
        val = field.find("option:selected").attr("value");
        if (val == undefined || val == null || val == "") {
            valid = false;
        }

    // is it a normal text field?
    } else if ( type == "text" && (val == undefined || val == null || val == "") ) {
        valid = false;

    // is is an email field?
    } else if ( type == "email" && !validateEmail(val) ) {
        valid = false;
    }

    // was the field validated?
    if ( !valid ) {
        // no - add the error-appareance
        field.closest("label").addClass("error");
    }

    return valid;
}

// function to check if email has correct syntax (using regex)
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
