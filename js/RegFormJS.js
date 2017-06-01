window.onload = addHandlers();
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
	email.addEventListener("blur",checkRest);
	email.addEventListener("focus",clearErrors);

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
		var counter=0;
		var len = this.value.length;
		for(var iterator=0 ; iterator<len; iterator++)
		{
			var unicode = this.value.charCodeAt(iterator);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
					counter++;
		}
		
		if(len === 0)
			//generateErrors("",this);
		
		if(counter !== len)
			generateErrors("Does not contain letters",this);
			
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
		if(pass[0].value !== cpass[0].value)
			generateErrors("Passwords do not match",pass[0]);		
	
		return;
	}
}
function checkNumber()
{
	var counter = 0;
	var len = this.value.length;
	var pno = document.getElementsByName("phoneno");
	if(len === 0)
		generateErrors("",this);
	else if(len < 10)
		generateErrors("Field cannot be less than 10 digits" , this);
	else if(pno[0].value === pno[1].value)
		generateErrors("Number should be different form primary number",pno[1]);
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
	var em = document.createElement("p");
	if(name.classList.contains("required") && name.value.length === 0)
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
                if(fs[i].children[j].previousElementSibling.classList.contains("errors"))
					fs[i].children[j].previousElementSibling.remove();
			}
		}
	}
	return;
}
function createCaptcha()
{
	var cap = document.getElementById("captcha");
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
	cap.innerHTML = parseInt(Math.random()*10 + 1) + opvalue() + parseInt(Math.random()*10 + 1);
	document.getElementsByName('capval')[0].value = "";
	
}
function checkCaptcha()
{
	var capmssg = document.getElementById("capmssg");
	capmssg.style.visibility = "initial";
	capmssg.style.display = "block";

	if((document.getElementsByName("capval")[0].value) === parseInt(eval(document.getElementById("captcha").innerHTML)).toString())
	{
		document.getElementById('submitbttn').removeAttribute('disabled');
		capmssg.innerHTML = " &#10004 Captcha Input was Ok.You can Sign Up Now";
		capmssg.style.color = "Green";
	}
	else
	{
		document.getElementById("submitbttn").setAttribute("disabled","true");
		capmssg.innerHTML = " &#10006 Captcha input was incorrect.Please try again.";
		capmssg.style.color = "Red";
		createCaptcha();	
	}
	setTimeout(function(){
		capmssg.style.visibility = "hidden";
		capmssg.style.display = "none";
	},5000);	

}
function validate()
{
	var counter = 0;
	var lbl = document.getElementsByTagName('label');
	var inputs = document.getElementsByName("input");
	for(var iterator = 0;iterator<inputs.length;iterator++)
	{
		console.log('called');
		checkEmptyAndSpaces(inputs[iterator]);
	}
	for(var iterator = 0;iterator<lbl.length;iterator++)
	{
		if(lbl[iterator].classList.contains("required"))
		{
			if(lbl[iterator].nextElementSibling.classList.contains("errors"))
				counter++;
		}
	}
	
	if(counter === 0)
	{
		alert("Registered successfully");
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
function checkEmptyAndSpaces(name)
{
	//for(var iterator = 0;iterator < len ; iterator++)
	var val = name.value.trim();
	var len = val.length;
	
	if(len === 0)
	{
		name.value = val;
		generateErrors("",name);
	}
	else
	{
		name.value = val.substring(0,val.indexOf(" ")) + val.substring(val.lastIndexOf(" "),len);
	}
}    
