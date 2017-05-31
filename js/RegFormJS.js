window.onload = addHandlers()
function addHandlers()
{
	createCaptcha();
	var firstName = document.getElementsByTagName('input')['firstname'];
	firstName.addEventListener("blur",checkWord);	
	firstName.addEventListener("focus",clearErrors);

	var lastName = document.getElementsByTagName('input')['lastname'];
	lastName.addEventListener("blur",checkWord);
	lastName.addEventListener("focus",clearErrors);

	var pass = document.getElementsByName("user_password");
	var cpass = document.getElementsByName("user_confirm_password");
	cpass[0].addEventListener("blur" , checkPass);
	pass[0].addEventListener("focus" , clearErrors);
	cpass[0].addEventListener("focus" , clearErrors);
	
	var pno = document.getElementsByName("phoneno");
	pno[0].addEventListener("blur",checkNumber);
	pno[0].addEventListener("focus",clearErrors);

	pno[1].addEventListener("blur",checkNumber);
	pno[1].addEventListener("focus",clearErrors);


	var city = document.getElementsByName("city");
	city[0].addEventListener("blur",checkWord);
	city[0].addEventListener("focus",clearErrors);

	var email = document.getElementById("mail");
	email.addEventListener("blur",checkRest)
	email.addEventListener("focus",clearErrors);

//var geneder = document.getElementsByName('gender');
	var caddr = document.getElementsByName("caddress");
	caddr[0].addEventListener("blur",checkRest);
	caddr[0].addEventListener("focus",clearErrors);

	var paddr = document.getElementsByName("paddress");
	paddr[0].addEventListener("blur",checkRest);
	paddr[0].addEventListener("focus",clearErrors);

	var country = document.getElementsByName("country");
	country[0].addEventListener("blur",checkRest);
	country[0].addEventListener("focus",clearErrors);

	var state = document.getElementsByName("state");
	state[0].addEventListener("blur",checkRest);
	state[0].addEventListener("focus",clearErrors);
	
	return;
}
function checkWord(){
		var c=0;
		
		for(var i=0 ; i<this.value.length; i++)
		{
			var unicode = this.value.charCodeAt(i);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
					c++;
		}
		console.log(c === this.value.length);


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
	var pass = document.getElementsByName("user_password");
	var cpass = document.getElementsByName("user_confirm_password");
	
	if(pass[0].value.length === 0 || cpass[0].value.length === 0)
	{
		generateErrors("",pass[0]);
		generateErrors("",cpass[0]);
	}
	else
	{
		if(pass[0].value === cpass[0].value)
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
	var pno = document.getElementsByName("phoneno");
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
function generateErrors(errormssg , name)
{
	var em = document.createElement("p");
	if(name.hasAttribute("required") && name.value === "")
		em.appendChild(document.createTextNode("This field cannot be empty"));
	else	
		em.appendChild(document.createTextNode(errormssg));
	
	name.insertAdjacentElement('beforebegin',em);
	em.setAttribute("class" , "errors");
		
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
function createCaptcha()
{
	var cap = document.getElementById("captcha");
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
	cap.innerHTML = parseInt(Math.random()*10 + 1) + opvalue() + parseInt(Math.random()*10 + 1);
	document.getElementsByName('capval')[0].value = "";
	
}
function checkCaptcha()
{
	if(parseInt(parseInt(document.getElementsByName("capval")[0].value)) === parseInt(eval(document.getElementById("captcha").innerHTML)))
	{
		document.getElementsByTagName("button")[2].removeAttribute('disabled');
		document.getElementById("capmssg").innerHTML = " &#10004 Captcha Input was Ok.You can Sign Up Now";
		document.getElementById("capmssg").style.color = "Green";
		//document.getElementById("capmssg").style.animationName = "example";
		
	}
	else
	{
		document.getElementById("capmssg").innerHTML = " &#10006 Captcha input was incorrect.Please try again.";
		document.getElementsByTagName("button")[2].setAttribute("disabled","true");
		document.getElementById("capmssg").style.color = "Red";
		createCaptcha();
		
	}

}
function validate()
{
	console.log("validation called");
	var c = 0;
	var lbl = document.getElementsByTagName('label');
	for(var i = 0;i<lbl.length;i++)
	{
		if(lbl[i].className === "required")
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
function checkRest()
{
	if(this.value.length === 0)
		generateErrors("",this);
	
}    
