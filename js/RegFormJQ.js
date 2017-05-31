$(document).ready(addHandlers());

function addHandlers(){
	createCaptcha();
	$(".name").bind("blur",checkWord);
	$(".name").bind("focus",clearErrors);
	
	
	$("#cpassword").bind("blur",checkPass);
	$("#cpassword").bind("focus",clearErrors);
	
	
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
	if(parseInt(parseInt($("#capval").val())) === parseInt(eval($("#captcha").html())))
	{
		$("button")[2].removeAttribute = "disabled";
		$("#capmssg").html(" &#10004 Captcha Input was Ok.You can Sign Up Now");
		$("#capmssg").css("color","Green");
		//document.getElementById("capmssg").style.animationName = "example";
		
	}
	else
	{
		$("#capmssg").html(" &#10006 Captcha input was incorrect.Please try again.");
		$("button")[2].setAttribute("disabled","true");
		$("#capmssg").css("color","Red");
		createCaptcha();
		
	}

}


function checkWord(){
		var c=0;
		
		for(var i=0 ; i<this.value.length; i++)
		{
			var unicode = this.value.charCodeAt(i);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
					c++;
		}
		if(this.value.length === 0)
		{
			console.log('Dosen\'t contains letters');
			generateErrors("Dosen't contains letters",this);	
		}
		else if(c === this.value.length)
			console.log('OK');

		else
		{
			console.log('Dosen\'t contains letters');
			generateErrors("Dosen't contains letters",this);	
		}
		return;
}

function checkPass()
{
	var pass = $(".pass");
	
	if(pass[0].value.length === 0 || pass[1].value.length === 0)
	{
		generateErrors("",pass[0]);
		generateErrors("",pass[1]);
	}
	else
	{
		if(pass[0].value === pass[1].value)
		{
			console.log("Passwords Ok");
		}
		else
		{
			console.log("Passwords don't match");
			generateErrors("Passwords don't match",pass[0]);
				
		}
		return;
	}
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
	var fs = document.getElementsByTagName('fieldset');
	for(var i =0 ; i<fs.length;i++)
	{
		for(var j =0;j<fs[i].childElementCount;j++)
		{
			
			if(fs[i].children[j] === this)
			{			
                if(fs[i].children[j].previousElementSibling.className === "errors")
				{
					fs[i].children[j].previousElementSibling.remove();
					console.log("Removed successfully");
				}
			}
		}
	}
	return;
}
function checkRest()
{
	if(this.value.length === 0)
		generateErrors("",this);
}