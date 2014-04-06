function GameManager()
{

	var mS = document.getElementById("mS");

	mS.onclick = function()
				{
					startMining();
					disableMineStart();

				}

	var jsName;
	var jsMajor;
	var miner = null;
	var display;
	var gamer;
	var currWallet;
	var saveInterval;
	begin();

	function begin()
	{ //loading in read stats of Degree
		//console.log("loaded");
		this.jsName = localStorage.getItem("name");
		this.jsMajor = localStorage.getItem("major");

		this.gamer = new player(this.jsName,this.jsMajor);
		baseStats(this.gamer);

		//console.log(this.gamer);
		document.getElementById("MAJOR").innerHTML = this.gamer.fullMajor;
		document.getElementById("Hard").innerHTML = this.gamer.hardware;
		document.getElementById("Soft").innerHTML = this.gamer.software;
		document.getElementById("Alg").innerHTML = this.gamer.algo;
		document.getElementById("Goog").innerHTML = this.gamer.googfu;

		alert("You have one mission. BitCoins.\n\nAre you a bad enough dude or dudette to ignore all your classes, real life responsibilities, and focus on one thing? Of course you are. You're an engineering student. Your task is to mine BitCoin all day. Everyday. Your goal is make a billion USD before you graduate.\n\nYour parent's always said you were \"good with computers\". This should be easy!");
		startGame();
	}

	function startGame()
	{
		var temp = localStorage.getItem('wallet');
		if(temp == null || temp == undefined || temp == "undefined" || temp == "null")
		{
			this.currWallet = new wallet(0,250);
		}
		else
		{
			temp = JSON.parse(temp);
			loadWallet(temp);
		}

		this.saveInterval = setInterval(save, 100);
	}

	function save()
	{
		localStorage.setItem('wallet', JSON.stringify(this.currWallet));
	}

	function loadWallet(temp)
	{

		var btc = parseFloat(temp['bitcoin']);
		var dol = parseFloat(temp['dollars']);
		//console.log(btc);
		//console.log(dol);
		this.currWallet = new wallet(btc, dol);
	}

	function displayUpdate(){
			amount.innerHTML = this.display;
	}
	function startMining()
	{
		this.miner = new mine();

		setInterval(function(){
			console.log(this.miner.mineRate);
   			this.currWallet.bitcoin += this.miner.mineRate;
   			this.display = this.currWallet.bitcoin.toString();
			this.display = this.display.substring(0,5);

   			displayUpdate();
		},1000);
	}
}

function disableMineStart(){
		document.getElementById("mineStart").innerHTML = "Currently Mining!";
}