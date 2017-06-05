$(document).ready(addHandlers());

function addHandlers(){
	createCaptcha();
	$(".name").bind("blur",checkWord);
	$(".name").bind("focus",clearErrors);
	
	
	$("#cpassword").bind("blur",checkPass);
	$("#cpassword").bind("focus",clearErrors);
	$("#password").bind("focus",clearErrors);
	
	$("#mail").bind("blur",checkRest);
	$("#mail").bind("focus",clearErrors);
	
	
	$(".phoneno").bind("blur",checkNumber);
	$(".phoneno").bind("focus",clearErrors);
	
	

	$(".addr").bind("blur",checkRest);
	$(".addr").bind("focus",clearErrors);

	
	$("#countryId").bind("blur",checkRest);
	$("#countryId").bind("focus",clearErrors);
	
	
	$("#stateId").bind("blur",checkRest);
	$("#stateId").bind("focus",clearErrors);
	
	
	$("#city").bind("blur",checkWord);
	$("#city").bind("focus",clearErrors);

}


function createCaptcha()
{
	var cap = $("#captcha");
	var opvalue = function(){
		var op = parseInt(Math.random() * (5 - 1) + 1);
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
	//$("#capval").html("   ");
}


function checkCaptcha()
{
	var capmssg = $("#capmssg");
	capmssg.css("visibility","initial");
	capmssg.css("display","block");

	if(($("#capval").val()) === parseInt(eval($("#captcha").html())).toString())
	{
		$("button")[2].removeAttribute = "disabled";
		capmssg.html(" &#10004 Captcha Input was Ok.You can Sign Up Now");
		capmssg.css("color","Green");
		//document.getElementById("capmssg").style.animationName = "example";
		
	}
	else
	{
		$("button")[2].setAttribute("disabled","true");
		capmssg.html(" &#10006 Captcha input was incorrect.Please try again.");
		capmssg.css("color","Red");
		createCaptcha();
		
	}
	setTimeout(function(){
		capmssg.css("visibility","hidden");
		capmssg.css("display","none");
	},5000);
}


function checkWord()
{
		if(checkEmptyAndSpaces(this))
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
	checkEmptyAndSpaces(this);
	if(pass[0].value !== pass[1].value)
		generateErrors("Passwords do not match",pass[1]);		
	
	return;
	
}	
	

function checkNumber()
{
	var c = 1; 
	var pno = $(".phoneno");
	if(this.value.length === 0)
		generateErrors("",this);
	else if(this.value.length < 10)
		generateErrors("Field cannot be less than 10 digits" , this);
	else if(pno[0].value === pno[1].value)
		generateErrors("Number should be different form primary number",pno[1]);
	else
	{
		for(var i = 0; i<this.value.length;i++)
		{
			
			var unicode = this.value.charCodeAt(i);
			if(unicode >=48 && unicode <= 57)
				c++;
		}
		if(c === this.value.length)
			console.log("Phone Number OK");
		else
		{
			console.log("Phone Number dosen't contains number");
			generateErrors("Phone Number dosen't contains number",this);
		}
	}
	return;
}
function generateErrors(errormssg,name)
{
	if(name.hasAttribute("required") && name.value === "")
		$(name).before("<p class=\"errors\"> This field cannot be empty </p>");
	else	
		$(name).before("<p class=\"errors\">" + errormssg + "</p>");
		
	
	return;
}
function clearErrors()
{
	var err = $("fieldset").find("p");
	for(var i =0 ; i<err.length;i++)
	{
		if(err.eq(i).next()[0] === this)
		{			
			err[i].remove();
			console.log("Removed successfully");
		}
		
	}
	return;
}
function checkRest()
{
	if(this.value.length === 0)
		generateErrors("",this);
}

function validate()
{
	console.log("validation called");
	var c = 0;
	//var lbl = document.getElementsByTagName('label');
	var err  = $("fieldset").find("p");
	for(var i = 0;i<err.length;i++)
	{
		if(err[i].className === "required")
		{
			if(lbl[i].nextElementSibling.className === "errors")
			{
				
				c++;
			}
			
		}
	}
	if(c === 0)
	{
		alert("Registered successfully");
		console.log("Valodation successful");
		return true;	
		
	}
	else
	{
		document.getElementById("val").innerHTML = "There were errors in your submission";
		document.getElementById("val").setAttribute("class","valmssg");
		document.body.scrollTop = "0";
	
		return false;
	}
}
function checkEmptyAndSpaces(name)
{
	
	var val = name.value;
	var len = name.value.length;
	var temp = "";
	for(iterator = 0 ; iterator < len ; iterator++)
	{
		if(val.charAt(iterator) !== " ")
			temp +=  val.charAt(iterator).toString();
	}
	name.value = temp;
	if(temp.length === 0)
	{	
		generateErrors("",name);
		return true;
	}
	else
		return false;
	
}


