$(document).ready(addHandlers());

function addHandlers(){
	createCaptcha();
	$("#fname").bind("blur",checkWord);
	$("#fname").bind("focus",clearErrors);
	
	$("#lname").bind("blur",checkWord);
	$("#lname").bind("focus",clearErrors);
	
	
	$("#cpassword").bind("blur",checkPass);
	$("#cpassword").bind("focus",clearErrors);
	
	$("#password").bind("blur",checkEmptyAndSpaces);
	$("#password").bind("focus",clearErrors);
	
	$("#mail").bind("blur",checkEmail);
	$("#mail").bind("focus",clearErrors);
	
	$("#phoneno_1").bind("blur",checkNumber);
	$("#phoneno_1").bind("focus",clearErrors);
	
	$("#phoneno_2").bind("blur",checkNumber);
	$("#phoneno_2").bind("focus",clearErrors);
		

	$("#corrsp_p").bind("blur",checkEmptyAndSpaces);
	$("#corrsp_p").bind("focus",clearErrors);

	$("#corrsp_c").bind("blur",checkEmptyAndSpaces);
	$("#corrsp_c").bind("focus",clearErrors);

	
	$("#countryId").bind("blur",checkEmptyAndSpaces);
	$("#countryId").bind("focus",clearErrors);
	
	
	$("#stateId").bind("blur",checkEmptyAndSpaces);
	$("#stateId").bind("focus",clearErrors);
	
	
	$("#city").bind("blur",checkWord);
	$("#city").bind("focus",clearErrors);

}


function createCaptcha()
{
	var cap = $("#captcha");
	var opvalue = function(){
		var op = parseInt(Math.random() * (4) + 1);
		if(op === 1)
			return "+";
		else if(op === 2)
			return "-";
		else if(op === 3)
			return "*";
		else
			return "/";
	};
	cap.text(parseInt(Math.random()*10 + 1) + opvalue() + parseInt(Math.random()*10 + 1)); 	
	
	document.getElementById('capval').value = "";
}


function checkCaptcha()
{
	var capmssg = $("#capmssg");
	capmssg.css("visibility","initial");
	capmssg.css("display","block");

	if(($("#capval").val()) === parseInt(eval($("#captcha").html())).toString())
	{
		$("#submitbttn")[0].removeAttribute("disabled");
		capmssg.html(" &#10004 Captcha Input was Ok.You can Sign Up Now");
		capmssg.css("color","Green");
		
	}
	else
	{
		$("#submitbttn")[0].setAttribute("disabled","true");
		capmssg.html(" &#10006 Captcha input was incorrect.Please try again.");
		capmssg.css("color","Red");
		createCaptcha();
		
	}
	capmssg.hide(3000);
	
}


function checkWord()
{
	if(checkEmptyAndSpaces.call(this))
		return;
	var counter=0;
	var len = this.value.length;
	for(var iterator=0 ; iterator<len; iterator++)
	{
		var unicode = this.value.charCodeAt(iterator);
		if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
				counter++;
	}
		
	if(counter !== len)
		generateErrors("Does not contain letters",this);
			
	return;
}

function checkPass()
{
	var pass = $(".pass");
	if(checkEmptyAndSpaces.call(this));
		return;

	if(pass[0].value !== pass[1].value)
		generateErrors("Passwords do not match",pass[1]);		
	return;
	
}	

function checkNumber()
{
	
	var counter = 0;
	var len = this.value.length;
	var pno_1 = $("#phoneno_1")[0];
	var pno_2 = $("#phoneno_2")[0];
	
	if(checkEmptyAndSpaces.call(this))
		return;
	if(len < 10 && len > 0)
		generateErrors("Field cannot be less than 10 digits" , this);
	else if(pno_1.value === pno_2.value && len > 0)
		generateErrors("Number should be different form primary number",pno_2);
	else
	{
		for(var iterator = 0; iterator<len ; iterator++)
		{
			
			var unicode = this.value.charCodeAt(iterator);
			if(unicode >=48 && unicode <= 57)
				counter++;
		}
		if(counter !== len)
			generateErrors("Phone Number does not contain numbers",this);
		
	}
	return;
}
function generateErrors(errormssg,name)
{
	$(name).before("<p class=\"errors\"></p>");
	var errorElement = $(name).prev();
	if(name.classList.contains("required"))
		errorElement.hide();
	if(name.classList.contains("required") && errormssg.length === 0)
		errorElement.text("This field cannot be empty");
		
	else	
		errorElement.text(errormssg);
	errorElement.show("slow");	
	
	return;
}
function clearErrors()
{
	var err = $("fieldset").find("p");
	for(var iterator =0 ; iterator<err.length;iterator++)
	{
		if(err.eq(iterator).next()[0] === this)		
			err[iterator].remove();
	}
	return;
}
function validate()
{
	var counter = 0;
	var lbl = $('label');
	var inputs = $("input");
	for(var iterator = 0;iterator<inputs.length;iterator++)
	{
		clearErrors.call(inputs[iterator]);
		checkEmptyAndSpaces.call(inputs[iterator]);
	}
	for(var iterator = 0;iterator<lbl.length;iterator++)
	{
		if(lbl[iterator].classList.contains("required"))
		{
			if(lbl[iterator].nextElementSibling.classList.contains("errors"))
			{	
				counter++;
				console.log(lbl[iterator]);
			}	
		}
	}
	$("#val").hide();
	if(counter === 0)
	{
		alert("Registered successfully");
		
		return true;	
		
	}
	else
	{
		$("#val").html("There were errors in your submission");
		$("#val")[0].setAttribute("class","valmssg");
		$("#val").toggle("slow");
		document.body.scrollTop = "0";
	
		return false;
	}
	
}

function checkEmptyAndSpaces()
{
	var val = this.value;
	var len = this.value.length;
	var temp = "";
	for(iterator = 0 ; iterator < len ; iterator++)
	{
		if(val.charAt(iterator) !== " ")
			temp +=  val.charAt(iterator).toString();
	}
	this.value = temp;
	if(temp.length === 0)
	{	
		generateErrors("",this);
		return true;
	}
	else
		return false;
	
}
function checkEmail()
{
	
	if(checkEmptyAndSpaces.call(this))
		return;
	var counter_d=0,counter_p=0;
	var val = this.value;
	var atloc = val.indexOf("@");
	var charAllowed = ["!","#","$","%","&","'","*","+","-","/","=","?","^","_","`","{","}","|","~"];
	if(atloc === 0 || atloc === val.length-1 || atloc !== val.lastIndexOf("@") || atloc === -1)
	{
		generateErrors("Invalid Email Address",this);
		return;
	}
	var personalInfo = val.split("@")[0];
	var domainInfo = val.split("@")[1];
	var checkPinfo = function(){
		for(var iterator = 0 ; iterator<personalInfo.length ; iterator++)
		{
			var unicode = personalInfo.charCodeAt(iterator);
		
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122) || (charAllowed.indexOf(personalInfo[iterator]) !== -1) || (unicode>=48 && unicode<=57))
			
				counter_p++;
			
			if(unicode === 46)
			{
				
				if(iterator !== 0 && iterator !== personalInfo.length-1 && personalInfo[iterator+1] !== ".")
					counter_p++;	
			}
		}
		if(counter_p !== personalInfo.length)
			return false;
		else
			return true;
	};
	
	
	var checkDinfo = function(){
		for(var iterator = 0 ; iterator<domainInfo.length ; iterator++)
		{
			var unicode = domainInfo.charCodeAt(iterator);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122) || (unicode === 45) || (unicode>=48 && unicode<=57))
				counter_d++;
			
			if(unicode === 46)
			{
				if(iterator !== 0 && iterator !== domainInfo.length-1 && (domainInfo[iterator+1] !== ".") &&iterator !== domainInfo.length-2 && (domainInfo[iterator+2] !== "."))
					counter_d++;
			}
			
		
		}
		if(counter_d !== domainInfo.length)
			return false;
		else
			return true;
	};
	
	if(checkDinfo() === false || checkPinfo() === false)
		generateErrors("Invalid Email Address",this);
		
	
	return;
}

