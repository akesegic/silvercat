/* Animate jump */
$(document).ready(function() {
 
	$(".js-jump").click(function(event){		
		event.preventDefault();
                $('html,body').animate({scrollTop:$('[name="'+this.hash.substring(1)+'"]').offset().top}, 700);
	});
});

/*Block toggle (diodes/motor/heater)*/
$(document).ready(function(){
	
	$(".js-block-toggle").click(function(){
		var block_id=$(this).children().first().attr("id");
		
		switch(block_id)
		{
			case "block-diode":
				var application_id="#application-diode";
				break;
			case "block-motor":
				var application_id="#application-motor";
				break;
			case "block-heater":
				var application_id="#application-heater";
				break;
			default:
				var application_id="#application-diode";
				break;
		}
		
		$(application_id).show().siblings("div").hide();
	});
	
});

/*Toggle diode tabs*/
$(document).ready(function(){
	
	$(".tabs div").click(function(){
		var tab=$(this).attr("class");
		
		switch(tab){
			
			case "tab-outputs":
				$(".diode-analog").hide();
				$(".diode-digital").show();
				break;
			case "tab-pwm":
				$(".diode-digital").hide();
				$(".diode-analog").show();
				break;
			case "tab-motor":
				$("#application-heater").hide();
				$("#application-motor").show();
				break;
			case "tab-heater":
				$("#application-motor").hide();
				$("#application-heater").show();
				break;
		}
	});
	
});

/*Toggle switch on/off*/
$(document).ready(function(){
	
	$(".switch").click(function(){
		$(this).toggleClass("switch-on");
	});
	
});

/*Switch on for diodes*/
$(document).ready(function(){

	$(".js-switch-diode").click(function(){
		var diode_id=$(this).attr("id");
		var diode_number=diode_id.substring(6,7);
		var diode_id="#diode"+diode_number;
		
		$(diode_id).toggleClass("diode-on");
	});	
	
});

/*Switch on for motor*/
$(document).ready(function(){
	
	$(".js-switch-motor").click(function(){
		$("#motor").toggleClass("motor-on motor-off");
	});
	
});

/*Switch on for heater*/

$(document).ready(function(){
	
	//set initial direction
	var direction="off";
	var temperature_min = 20;
	var temperature_max = 200;
	var heating_time=5000;
	var temperature_changer;
	
	var current_temperature=temperature_min;
	var full_temperature = current_temperature+"�C";
	var time_interval=heating_time/(temperature_max-temperature_min);
	
	function changeTemperature(current_temperature){
		full_temperature = current_temperature+"�C";
		$(".js-temperature").text(full_temperature);
		console.log(full_temperature);
	}
		
	$(".temperature span").text(full_temperature);
	
	
	
	$(".js-switch-heater").click(function(){
		$("#heater-motor").toggleClass("motor-on motor-off");
		
		clearInterval(temperature_changer);
		
		//toggle direction
		if (direction == "off") {
			direction = "on";
		}else{
			direction = "off";
		}		
		
		//show or hide heater-hot over time
		//change temperature
		if (direction == "on") {
			$("#heater").stop().animate({ opacity: 1 },heating_time);
			
			temperature_changer = setInterval(function(){
				changeTemperature(current_temperature);
				current_temperature++;
				if (current_temperature>=temperature_max+1) {
					clearInterval(temperature_changer);
				}
			},time_interval);
		}else{
			$("#heater").stop().animate({ opacity: 0 },heating_time);
			
			temperature_changer = setInterval(function(){
				changeTemperature(current_temperature);
				current_temperature--;
				if (current_temperature<=temperature_min-1) {
					clearInterval(temperature_changer);
				}
			},time_interval);
		}
		
	});
	
});

/*Clock*/
$(document).ready(function(){
	
	function startTime()
		{
		var today=new Date();
		var h=today.getHours();
		var m=today.getMinutes();
		// add a zero in front of numbers<10
		h=checkTime(h);
		m=checkTime(m);
		$(".time").text(h+":"+m);
		console.log(h+":"+m);
		t=setTimeout(function(){startTime()},2000);
		}
		
		function checkTime(i)
		{
		if (i<10)
		  {
		  i="0" + i;
		  }
		return i;
	}
	
	startTime();
});

/*Slider for analog diode*/
$(document).ready(function(){
	
	$( "#light-drager" ).draggable({ containment: "#light-axis", scroll: false })
	
})

/*Analog diode*/
$(document).ready(function(){
	
	var analog_min;
	var analog_max;
	
});