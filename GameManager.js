function GameManager()
{
	// Private variables
	var jsName;
	var jsMajor;
	var miner;
	var display;
	var gamer;
	var currWallet;
	var currMarket;
	var saveInterval;
	// Start setup of game
	begin();

	var resetEl = document.getElementById("reset");
	var minerUpgrade = document.getElementById("minerUpgrade");
	var minerChoice = document.getElementById("minerChoice");
	var buyButton = document.getElementById("buyBitcoin");
	var sellButton = document.getElementById("sellBitcoin");
	var upgradeStat = document.getElementById("statUpgrade");
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

	upgradeStat.onclick = function()
					{
						modifyStat();
					}

	// Initializes game state
	function begin()
	{ //loading in read stats of Degree
		this.jsName = localStorage.getItem("name");
		this.jsMajor = localStorage.getItem("major");

		var hold = localStorage.getItem('gamer');
		if(hold == null)
		{
			this.gamer = new player(this.jsName,this.jsMajor);
			baseStats(this.gamer);
		}
		else
		{
			loadGamer(JSON.parse(hold));
		}

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
			this.currMarket = new market(10,10, 1);
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
		localStorage.setItem('gamer', JSON.stringify(this.gamer));
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
		baseStats(this.gamer);
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
		var trend = parseFloat(temp['trend']);
		if(buy == null || buy == "null" || isNaN(buy))
			buy = 10;
		if(sell == null || sell == "null" || isNaN(sell))
			sell = 10;



		this.currMarket = new market(sell, buy, trend);
	}

	function displayUpdate(){
			// Show wallet values
			amount.innerHTML = this.display;
			dols.innerHTML   = this.currWallet.dollars.toFixed(2);

			// Show miner values
			delta.innerHTML  = this.miner.mineRate.toFixed(3);

			// Show market values
			sellVal.innerHTML = "$" + this.currMarket.sellValue.toFixed(2);

			// Show player stats
			document.getElementById("Hard").innerHTML = this.gamer.hardware;
			document.getElementById("Soft").innerHTML = this.gamer.software;
			document.getElementById("Alg").innerHTML = this.gamer.algo;
			document.getElementById("Goog").innerHTML = this.gamer.googfu;

			document.getElementById("mc1").innerHTML = 
			"Basic BitCoin Miner $" + this.miner.getMinerPrice(100, this.gamer.hardware).toFixed(2) + " (+.005 BTC/s)";
			document.getElementById("mc2").innerHTML =
			"GPU++ BitCoin Miner $" + this.miner.getMinerPrice(250, this.gamer.hardware).toFixed(2) + " (+.020 BTC/s)";
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
			var choice = parseInt(this.minerChoice.value);
			var price = this.miner.getBasePrice(choice);
			price = this.miner.getMinerPrice(price, this.gamer.hardware);
			if(price <= this.currWallet.dollars)
			{
				var temp = this.miner.upgrade(choice, this.gamer.hardware);
				this.currWallet.dollars -= temp;
			}

	}

	function buyBitcoin()
	{
		var amount = parseFloat(buyAmount.value);
		if(this.currWallet.dollars >= (this.currMarket.buyValue * amount))
		{
			this.currWallet.dollars -= (this.currMarket.buyValue * amount);
			this.currWallet.bitcoin += amount;
		}
	}

	function sellBitcoin()
	{
		var amount = parseFloat(sellAmount.value);
		if(this.currWallet.bitcoin >= amount)
		{
			this.currWallet.bitcoin -= amount;
			this.currWallet.dollars += (this.currMarket.sellValue * amount);
		}
	}

	function modifyStat()
	{
		var hold = parseInt(this.statChoice.value);

		if(1000 <= this.currWallet.dollars)
		{
			switch(hold)
			{
				case(1):
					this.gamer.hardware++;
					this.currWallet.dollars -= 1000;
					break;
				case(2):
					this.gamer.software++;
					this.currWallet.dollars -= 1000;
					break;
				case(3):
					this.gamer.algo++;
					this.currWallet.dollars -= 1000;
					break;
				case(4):
					this.gamer.googfu++;
					this.currWallet.dollars -= 1000;
					break;
				default:
					break;
			}
		}
	}

	function loadGamer(temp)
	{
		this.gamer = new player(temp['name'], temp['major']);
		this.gamer.fullMajor= temp['fullMajor'];
		this.gamer.hardware = parseInt(temp['hardware']);
		this.gamer.software = parseInt(temp['software']);
		this.gamer.algo     = parseInt(temp['algo']);
		this.gamer.googfu   = parseInt(temp['googfu']);
	}
}

function disableMineStart(){
		document.getElementById("mineStart").innerHTML = "Currently Mining!";
}