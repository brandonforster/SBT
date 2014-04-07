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

	var resetEl = document.getElementById("reset");
	var minerUpgrade = document.getElementById("minerUpgrade");
	var minerChoice = document.getElementById("minerChoice");
	var buyButton = document.getElementById("buyBitcoin");
	var sellButton = document.getElementById("sellBitcoin");

	// Set onclick for reset button
	resetEl.onclick = function()
					{
						resetGame();
					}
	// set onclick for "Buy!"
	minerUpgrade.onclick = function()
					{
						upgradeMiner();
					}
	// Set onclick for buy and sell bitcoin
	buyButton.onclick = function()
					{
						buyBitcoin();
					}
	sellButton.onclick = function()
					{
						sellBitcoin();
					}

	// Initializes game state
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


		// Checks if player has played before, and stops alerting them everytime
		var temp = localStorage.getItem('playedBefore');
		if(temp == null || temp == "false")
		{
			alert("You have one mission. BitCoins.\n\nAre you a bad enough dude or dudette to ignore all your classes, real life responsibilities, and focus on one thing? Of course you are. You're an engineering student. Your task is to mine BitCoin all day. Everyday. Your goal is make a billion USD before you graduate.\n\nYour parent's always said you were \"good with computers\". This should be easy!");
			localStorage.setItem('playedBefore', true);
		}
		


		startGame();
	}

	// Gets save info from localStorafe or creates data if new player
	function startGame()
	{
		// Get wallet save data
		var tempWallet = localStorage.getItem('wallet');
		if(tempWallet == null || tempWallet == undefined || tempWallet == "undefined" || tempWallet == "null")
		{
			// No save data, create new object
			this.currWallet = new wallet(0,250);
		}
		else
		{
			// valid save data, get values
			tempWallet = JSON.parse(tempWallet);
			loadWallet(tempWallet);
		}

		// Get market save data
		var tempMarket = localStorage.getItem('market');
		if(tempMarket == null || tempMarket == undefined || tempMarket == "undefined" || tempMarket == "null")
		{
			this.currMarket = new market(10,10);
		}
		else
		{
			tempMarket = JSON.parse(tempMarket);
			loadMarket(tempMarket);
		}


		this.marketUpdate = setInterval(function(){
			this.currMarket.updatePrice();
		}, 1000);

		this.trendUpdate = setInterval(function(){
			this.currMarket.newTrend(this.gamer.googfu);
		}, 5000);

		// Start autosave, every 1/10 of second
		// Set initial values on screen
		this.display = this.currWallet.bitcoin.toString();
		this.display = this.display.substring(0,5);
		amount.innerHTML = this.display;

		startMining();
		disableMineStart();
	}

	// Stores data in localStorage
	function save()
	{
		localStorage.setItem('wallet', JSON.stringify(this.currWallet));
		localStorage.setItem('market', JSON.stringify(this.currMarket));
		localStorage.setItem('miner', JSON.stringify(this.miner));
	}

	// Reset game (mostly for debugging)
	function resetGame()
	{
		this.currWallet.bitcoin = 0;
		this.currWallet.dollars = 250;
		this.miner.mineRate = .001;
		this.currMarket.sellValue = 10;
		this.currMarket.buyValue = 10;
		this.currMarket.trend = 1;
		displayUpdate();
	}

	// Parses info from localStorage into new game
	function loadWallet(temp)
	{

		var btc = parseFloat(temp['bitcoin']);
		var dol = parseFloat(temp['dollars']);

		this.currWallet = new wallet(btc, dol);
	}

	function loadMarket(temp)
	{
		var buy = parseFloat(temp['buyValue']);
		var sell = parseFloat(temp['sellValue']);

		if(buy == null || buy == "null" || isNaN(buy))
			buy = 10;
		if(sell == null || sell == "null" || isNaN(sell))
			sell = 10;

		this.currMarket = new market(sell, buy);
	}

	function displayUpdate(){
			amount.innerHTML = this.display;
			dols.innerHTML   = this.currWallet.dollars.toFixed(2);
			delta.innerHTML  = this.miner.mineRate.toFixed(3);
			sellVal.innerHTML = "$" + this.currMarket.sellValue.toFixed(2);
	}

	function startMining()
	{

		var tempMiner = localStorage.getItem('miner');
		if(tempMiner == null || tempMiner == undefined || tempMiner == "undefined" || tempMiner == "null")
		{
			// No save data, create new object
			this.miner = new mine(.001);
		}
		else
		{
			// valid save data, get values
			tempMiner = JSON.parse(tempMiner);
			loadMiner(tempMiner);
		}

		setInterval(function(){

   			this.currWallet.bitcoin += this.miner.mineRate;
   			this.display = this.currWallet.bitcoin.toString();
			this.display = this.display.substring(0,5);

   			displayUpdate();
		},1000);

		this.saveInterval = setInterval(save, 100);
	}

	function loadMiner(temp)
	{
		var mR = parseFloat(temp['mineRate']);

		this.miner = new mine(mR);
	}

	function upgradeMiner()
	{
			var price = parseInt(this.minerChoice.value);
			if(price <= this.currWallet.dollars)
			{
				var temp = this.miner.upgrade(price);
				this.currWallet.dollars -= temp;
			}

	}

	function buyBitcoin()
	{
		if(this.currWallet.dollars >= this.currMarket.buyValue)
		{
			this.currWallet.dollars -= this.currMarket.buyValue;
			this.currWallet.bitcoin += 1;
		}
	}

	function sellBitcoin()
	{
		if(this.currWallet.bitcoin >= 1)
		{
			this.currWallet.bitcoin -= 1;
			this.currWallet.dollars += this.currMarket.sellValue;
		}
	}
}

function disableMineStart(){
		document.getElementById("mineStart").innerHTML = "Currently Mining!";
}