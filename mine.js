
function mine(){

		var amount = document.getElementById('amount')
		var current = 0.000000;
		var mineRate = .001;

		var display = current.toString();
		var display2 = display.substring(0,5);

		var delta = document.getElementById('delta')
		
		displayUpdate();


		function displayUpdate(){
			amount.innerHTML = display2;
			delta.innerHTML = mineRate;
		}


		setInterval(function(){
   			current += mineRate;
   			display = current.toString();
			display2 = display.substring(0,5);

   			displayUpdate();
		},1000);
}

function disableMineStart(){
		document.getElementById("mineStart").innerHTML = "Currently Mining!";
}
	
//may use this function later for USD ticker

/*function formatMoney(amount) { //coverting to money string--thx stack overflow!
    var dollars = Math.floor(amount).toString().split('');
    var cents = (Math.round((amount%1)*100)/100).toString().split('.')[1];
    if(typeof cents == 'undefined'){
        cents = '00';
    }else if(cents.length == 1){
        cents = cents + '0';
    }
    var str = '';
    for(i=dollars.length-1; i>=0; i--){
        str += dollars.splice(0,1);
        if(i%3 == 0 && i != 0) str += ',';
    }
    return '$' + str + '.' + cents;
}​
*/