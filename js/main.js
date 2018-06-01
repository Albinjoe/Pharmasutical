// just save all these different events in a string variable
var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

$(document).ready(function() {

			//The hamburger Menu

			$("#hamburger").click(function(){

					$(this).toggleClass("close-symbol");

					if($("#hamburger").hasClass("close-symbol")){
							$(".main-menu-first").css("width", "70vw");
							$(".main-menu-first").css("opacity", "1");
							$(".main-menu").css("width", "70vw");
							$(".main-menu").css("opacity", "1");
					}else{
							$(".main-menu-first").css("width", "0vw");
							$(".main-menu-first").css("opacity", "0");
							$(".main-menu").css("width", "0vw");
							$(".main-menu").css("opacity", "0");
					}
			});

			$(".arrow").click(function(){

					$(this).toggleClass("rotated-arrow");
					$(".sub-menu").toggleClass("expand-sub-menu");

			});

				var WindowWidth = $(window).width();

		    if(WindowWidth > 960) {
		        $('.steps').addClass("moving-to-step2");
				}else{
		        $('.steps').removeClass("moving-to-step2");
				}

        // moving to step 2

		$(".SignUp").click(function(event){
			event.preventDefault();
			$(".steps").addClass("moving-to-step2");
			$(".progress-bar").css("display", "block");
			$(".nr-one").css("background-color", "#fff89d");
		});


    $(".open-modal").on("click", function(e) {
        e.preventDefault();
				if(WindowWidth > 960) {
		        $(".progress-bar").css("display", "block");
				}

        $("body").addClass("modal-showing");

        $(".modal-container .modal").one(transEnd, function () {

            $(this).find("input, a").eq(0).trigger("focus");
            $(this).off(transEnd);
        });

    });


		$(".modal-container, .modal a.close").on("click", function(e) {
				e.preventDefault();


				if (confirm("Are you sure you want to quit the process?")){
						$("body").addClass("closing");
				 		$(".modal-container .modal").one(transEnd, function () {

					 	$(".steps").removeClass("moving-to-step2 moving-to-step3 moving-to-step4");
						$("body").removeClass("modal-showing closing");
						$(this).off(transEnd);
				 });

				}else{
				   e.preventDefault();
				}

		});

		$(".modal-container .modal").on("click", function(e) {
				e.stopPropagation();
		});

		if ($(".steps").hasClass("moving-to-step2")) {
				$(".nr-one").css("background-color", "#fff89d");
		}

				//opens infosida
				$('.info').on('click', function(){
				        $('.infosida').toggle();
				});

				$('.closeinfo').on('click', function(){
		        	$('.infosida').toggle();
		    });

		    // form validation
				$(".step3validate").submit(function(e) {
						e.preventDefault();
				});


// moving to step 3

		    $(".back").click(function(event){
					event.preventDefault();
		            $(".steps").removeClass("moving-to-step2").addClass("moving-to-step1");
								$(".progress-bar").css("display", "none");
		    });

				$('.closeload').on('click', function(){
				        $('.loadsida').toggle();
								$(".steps").removeClass("moving-to-step3").addClass("moving-to-step4");
								$(".nr-two").css("background-color", "#26ad8f");
								$(".nr-three").css("background-color", "#fff89d");
				});

// moving to step 4

				$("#iam").change( function() {
							var val = $(this).find("option:selected").attr("value");
							$(".step3validate-second").removeClass("show");
							$(".step3validate").removeClass("show");

							if ( val == "nurse" ) {
									$(".step3validate-second").addClass("show");
							} else if( val == "doctor" ){
								$(".step3validate").addClass("show");
							}
				});

				$(".step2validate").submit(function(e) {
						e.preventDefault();
						var option = $('#iam').val();
						var field = $("#iam");

						field.closest("label").removeClass("error");

								if (option === null) {

											field.closest("label").addClass("error");
											return false;

								} else {

									$(".steps").removeClass("moving-to-step2").addClass("moving-to-step3");
									$(".nr-one").css("background-color", "#26ad8f");
									$(".nr-two").css("background-color", "#fff89d");
								}
				});

				$(".back2").click(function(event){
					event.preventDefault();
								$(".steps").removeClass("moving-to-step3").addClass("moving-to-step2");
								$(".nr-one").css("background-color", "#fff89d");
								$(".nr-two").css("background-color", "lightgrey");
				});


				$(".step3validate").submit(function(e) {

		        e.preventDefault();

		                var field = $(this);

		                var fields = $(this).find("*[required]");
		                var validated = true;
		                fields.each(function() {
		                  var field = $(this);
		                  if ( !validateField( field ) ) { validated = false; }
		                });

		                if ( validated ) {

												var firstFieldValue = $("#firstname").val();
					              var lastFieldValue = $("#lastname").val();
												var svFieldValue = $("#svnumber").val();

		                    $.ajax({
		                      url: "js/users.json",
		                      dataType: "json"
		                    })

		                    .done(function( data ) {

		                        var field = $(this).find("*[required]");
		                            var found = false;
		                            for (i = 0; i < data.length; i++) {
		                                var fromFile1 = data[i].firstName;
																		var fromFile2 = data[i].lastName;
																		var fromFile3 = data[i].svnumber;

		                                if ( fromFile1 == firstFieldValue && fromFile2 == lastFieldValue && fromFile3 == svFieldValue) {

		                                  found = true;
		                                }
		                            }
		                        if( found ) {

																	$('.loadsida').show();
																	setTimeout(function(){

																			$(".steps").removeClass("moving-to-step3").addClass("moving-to-step4");
																			$(".nr-two").css("background-color", "#26ad8f");
																			$(".nr-three").css("background-color", "#fff89d");
																			$(".step5").show();
																			$(".step5-error").hide();
																	}, 1500);

																	setTimeout(function(){
																				$('.loadsida').hide();
																	}, 2000);
		                        }

		                        if ( !found ) {
															$('.loadsida').show();
															setTimeout(function(){

																	$(".steps").removeClass("moving-to-step3").addClass("moving-to-step4");
																	$(".nr-two").css("background-color", "#26ad8f");
																	$(".nr-three").css("background-color", "red");
																	$(".steps").removeClass("moving-to-step3");
																	$(".step5").hide();
																	$(".step5-error").show();

															}, 1500);

															setTimeout(function(){
																		$('.loadsida').hide();
															}, 2000);
		                        }
		                    });//DONE

		                }//IF VALIDATED
		    });//SUBMIT



				$(".step3validate-second").submit(function(e) {

		        e.preventDefault();

		                var field = $(this);

		                var fields = $(this).find("*[required]");
		                var validated = true;
		                fields.each(function() {
		                  var field = $(this);
		                  if ( !validateField( field ) ) { validated = false; }
		                });

		                if ( validated ) {

												var firstFieldValue = $("#firstname2").val();
					              var lastFieldValue = $("#lastname2").val();
												var cityFieldValue = $("#city").val();
												var workFieldValue = $("#work").val();

		                    $.ajax({
		                      url: "js/users.json",
		                      dataType: "json"
		                    })

		                    .done(function( data ) {

		                        var field = $(this).find("*[required]");
		                            var found = false;
		                            for (i = 0; i < data.length; i++) {
		                                var fromFile1 = data[i].firstName;
																		var fromFile2 = data[i].lastName;
																		var fromFile3 = data[i].city;
																		var fromFile4 = data[i].workplace;

		                                if ( fromFile1 == firstFieldValue && fromFile2 == lastFieldValue && fromFile3 == cityFieldValue && fromFile4 == workFieldValue) {

		                                  found = true;
		                                }
		                            }
		                        if( found ) {

																	$('.loadsida').show();
																	setTimeout(function(){

																			$(".steps").removeClass("moving-to-step3").addClass("moving-to-step4");
																			$(".nr-two").css("background-color", "#26ad8f");
																			$(".nr-three").css("background-color", "#fff89d");
																			$(".step5").show();
																			$(".step5-error").hide();
																	}, 1500);

																	setTimeout(function(){
																				$('.loadsida').hide();
																	}, 2000);
		                        }

		                        if ( !found ) {
															$('.loadsida').show();
															setTimeout(function(){

																	$(".steps").removeClass("moving-to-step3").addClass("moving-to-step4");
																	$(".nr-two").css("background-color", "#26ad8f");
																	$(".nr-three").css("background-color", "lightred");
																	$(".steps").removeClass("moving-to-step3");
																	$(".step5").hide();
																	$(".step5-error").show();

															}, 1500);

															setTimeout(function(){
																		$('.loadsida').hide();
															}, 2000);
		                        }
		                    });//DONE

		                }//IF VALIDATED
		    });//SUBMIT


// moving to step 5

				$(".step5validate").submit(function(e) {

						e.preventDefault();

									 var field = $(this);
									 var fields = $(this).find("*[required]");
									 var validated = true;

									 fields.each(function() {
										 		var field = $(this);

												if ( !validateField( field ) ) {
													  validated = false;
												}
									 });

									 	if ( validated ) {
												$(".wrong-password").removeClass("show");

												var FirstPass = $("#password1").val();
												var SecondPass = $("#password2").val();

												if(FirstPass == SecondPass){
														$(".steps").removeClass("moving-to-step4").addClass("moving-to-step5");
														$(".nr-three").css("background-color", "#26ad8f");
														$(".nr-four").css("background-color", "#fff89d");
												} else {
														$(".wrong-password").addClass("show");
												}

										};
					});


				$(".back3").click(function(event){
					event.preventDefault();
								$(".steps").removeClass("moving-to-step4").addClass("moving-to-step3");
								$(".nr-two").css("background-color", "#fff89d");
								$(".nr-three").css("background-color", "lightgrey");
				});

// moving to step 6

				$(".toFinish").click(function(event){
					event.preventDefault();
								$(".steps").removeClass("moving-to-step5").addClass("moving-to-step6");
								$(".nr-four").css("background-color", "#26ad8f");
								$(".nr-five").css("background-color", "#26ad8f");
				});


    $(document.body).on("blur", "label.error input[required]", function(e) {
        validateField( $(this) );
    });

    $(document.body).on("change", "label.error select[required]", function(e) {
        validateField( $(this) );
    });

});

function validateField(field){

    field.closest("label").removeClass("error");

    var type = field.attr("type");
    var val = field.val();
    var valid = true;

    if ( field.is('select') ) {
        val = field.find("option:selected").attr("value");
        if (val == undefined || val == null || val == "") {
            valid = false;
        }

    } else if ( type == "text" && (val == undefined || val == null || val == "") ) {
        valid = false;

    } else if ( type == "email" && !validateEmail(val) ) {
        valid = false;
    } else if ( type == "password" && (val == undefined || val == null || val == "") ) {
        valid = false;
    }

    if ( !valid ) {
        field.closest("label").addClass("error");
    }

    return valid;
}


function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
