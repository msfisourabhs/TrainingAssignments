var firstName = document.getElementsByTagName('input')['firstname'];
firstName.addEventListener("blur",checkWord(firstName));
var lastName = document.getElementsByTagName('input')['lastname'];
lastName.addEventListener("blur",checkWord(lastName));

function checkWord(name){
		var c;
		//console.log(firstName.value);
		for(var i=0 ; i<name.value.length ; i++)
		{
			
			//console.log((firstName.value.charCodeAt(i)));
			var unicode = name.value.charCodeAt(i);
			if((unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122))
					c = 1;
			else
				c = -1;
		}
		if(c === 1)
			console.log('OK');
		else
		{
			console.log('Dosen\'t contains letters');
			document.getElementsByClassName('errors').innerHTML = "Dosen\'t contains letters";
		}	
}



        
