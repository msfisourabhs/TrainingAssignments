var firstName = document.getElementsByTagName('input')['firstname'];
firstName.addEventListener("blur",checkWord);
firstName.addEventListener("focus",clearErrors);

var lastName = document.getElementsByTagName('input')['lastname'];
lastName.addEventListener("blur",checkWord);
lastName.addEventListener("focus",clearErrors);

var pass = document.getElementsByName("user_password");
var cpass = document.getElementsByName("user_confirm_password");
cpass[0].addEventListener("blur" , checkPass);
var pno = document.getElementsByName("phoneno");
pno[0].addEventListener("blur",checkNumber);
pno[1].addEventListener("blur",checkNumber);
var city = document.getElementsByName("city");
city[0].addEventListener("blur",checkWord);
//console.log('Once');
function checkWord(){
		var c;
		//console.log(this.value);
		for(var i=0 ; i<this.value.length; i++)
		{
			
			//console.log((firstName.value.charCodeAt(i)));
			var unicode = this.value.charCodeAt(i);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
					c = 1;
			else
				c = -1;
		}
		if(c === 1)
			console.log('OK');
		else
		{
			//clearErrors(this);
			console.log('Dosen\'t contains letters');
			//document.getElementsByClassName('errors').innerHTML = "Dosen\'t contains letters";
			generateErrors("Dosen't contains letters",this);
			//this.focus();
			//clearErrors(this);
				
		}
		return;
}
function checkPass()
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
function checkNumber()
{
	for(var i = 0; i<this.value.length;i++)
	{
			var c = 1; 
			var unicode = this.value.charCodeAt(i);
			if(unicode >=48 && unicode <= 57)
				c=1;
			else 
				c=-1
	}
	if(c === 1)
					console.log("Phone Number OK");
	else
	{
						console.log("Phone Number dosen't contains number");
						generateErrors("Phone Number dosen't contains number",this);
	}
	return;
}
function generateErrors(errormssg , name)
{
			
					var em = document.createElement("p");
					em.appendChild(document.createTextNode(errormssg));
			
					name.insertAdjacentElement('beforebegin',em);
					em.setAttribute("class" , "errors");
		
			
			return;
}
function clearErrors()
{
			var fs = document.getElementsByTagName('fieldset');
			//console.log("Entered");
            
			for(var i =0 ; i<fs.length;i++)
			{
			//		console.log(fs[i]);
				for(var j =0;j<fs[i].childElementCount;j++)
				{
			//		console.log(fs[i].children[j],this);
					if(fs[i].children[j] === this)
					{
						console.log(fs[i].children[j].previousElementSibling);
						
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
        
