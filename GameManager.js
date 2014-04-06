function GameManager()
{

	var jsName;
	var jsMajor;
	var miner;
	var display;
	var gamer;
	var currWallet;
	var currMarket;
	var saveInterval;
	begin();

	var mS = document.getElementById("mS");
	var resetEl = document.getElementById("reset");
	var minerUpgrade = document.getElementById("minerUpgrade");
	var minerChoice = document.getElementById("minerChoice");
	var buyButton = document.getElementById("buyBitcoin");
	var sellButton = document.getElementById("sellBitcoin");
	mS.onclick = function()
				{
					startMining();
					disableMineStart();

				}

	resetEl.onclick = function()
					{
						resetWallet();
					}

	minerUpgrade.onclick = function()
					{
						upgradeMiner();
					}
	buyButton.onclick = function()
					{
						buyBitcoin();
					}
	sellButton.onclick = function()
					{
						sellBitcoin();
					}

	function begin()
	{ //loading in read stats of Degree
		this.jsName = localStorage.getItem("name");
		this.jsMajor = localStorage.getItem("major");

		this.gamer = new player(this.jsName,this.jsMajor);
		baseStats(this.gamer);

		document.getElementById("MAJOR").innerHTML = this.gamer.fullMajor;
		document.getElementById("Hard").innerHTML = this.gamer.hardware;
		document.getElementById("Soft").innerHTML = this.gamer.software;
		document.getElementById("Alg").innerHTML = this.gamer.algo;
		document.getElementById("Goog").innerHTML = this.gamer.googfu;

		var temp = localStorage.getItem('playedBefore');
		if(temp == null || temp == "false")
		{
			alert("You have one mission. BitCoins.\n\nAre you a bad enough dude or dudette to ignore all your classes, real life responsibilities, and focus on one thing? Of course you are. You're an engineering student. Your task is to mine BitCoin all day. Everyday. Your goal is make a billion USD before you graduate.\n\nYour parent's always said you were \"good with computers\". This should be easy!");
			localStorage.setItem('playedBefore', true);
		}
		


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

		this.currMarket = new market(10, 10);

		this.saveInterval = setInterval(save, 100);
		this.display = this.currWallet.bitcoin.toString();
		this.display = this.display.substring(0,5);
		amount.innerHTML = this.display;
	}

	function save()
	{
		localStorage.setItem('wallet', JSON.stringify(this.currWallet));
	}

	function resetWallet()
	{
		this.currWallet.bitcoin = 0;
		this.currWallet.dollars = 250;
		displayUpdate();
	}

	function loadWallet(temp)
	{

		var btc = parseFloat(temp['bitcoin']);
		var dol = parseFloat(temp['dollars']);

		this.currWallet = new wallet(btc, dol);
	}

	function displayUpdate(){
			amount.innerHTML = this.display;
			dols.innerHTML   = this.currWallet.dollars;
			delta.innerHTML  = this.miner.mineRate;
			sellVal.innerHTML = this.currMarket.sellValue;
	}

	function startMining()
	{
		this.miner = new mine();
		setInterval(function(){

   			this.currWallet.bitcoin += this.miner.mineRate;
   			this.display = this.currWallet.bitcoin.toString();
			this.display = this.display.substring(0,5);

   			displayUpdate();
		},1000);
	}

	function upgradeMiner()
	{
			var price = parseInt(this.minerChoice.value);
			if(price < this.currWallet.dollars)
			{
				var temp = this.miner.upgrade(price);
				this.currWallet.dollars -= temp;
			}

	}

	function buyBitcoin()
	{
		if(this.currWallet.dollars > this.currMarket.buyValue)
		{
			this.currWallet.dollars -= this.currMarket.buyValue;
			this.currWallet.bitcoin += 1;
		}
	}

	function sellBitcoin()
	{
		if(this.currWallet.bitcoin > 1)
		{
			this.currWallet.bitcoin -= 1;
			this.currWallet.dollars += this.currMarket.sellValue;
		}
	}
}

function disableMineStart(){
		document.getElementById("mineStart").innerHTML = "Currently Mining!";
}