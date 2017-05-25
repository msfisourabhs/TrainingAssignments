var firstName = document.getElementsByTagName('input')['firstname'];
firstName.addEventListener("blur",checkWord);
var lastName = document.getElementsByTagName('input')['lastname'];
lastName.addEventListener("blur",checkWord);
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
			console.log('Dosen\'t contains letters');
			document.getElementsByClassName('errors').innerHTML = "Dosen\'t contains letters";
		}
		
}



        
