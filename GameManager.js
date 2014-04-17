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
	var currSeller;
	var graphX;
	// Start setup of game
	begin();

	var resetEl = document.getElementById("reset");
	var minerUpgrade = document.getElementById("minerUpgrade");
	var minerChoice = document.getElementById("minerChoice");
	var buyButton = document.getElementById("buyBitcoin");
	var sellButton = document.getElementById("sellBitcoin");
	var upgradeStat = document.getElementById("statUpgrade");
	var sellerUpgrade = document.getElementById("sellerUpgrade");
	var sellerChoice = document.getElementById("sellerChoice");
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
	sellerUpgrade.onclick = function()
					{
						upgradeSeller();
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
			var tempPrices = new Array();
			for(var i = 0; i < 300; i++)
				tempPrices[i] = 10;

			this.currMarket = new market(10,10, 1, tempPrices, 0);
		}
		else
		{
			tempMarket = JSON.parse(tempMarket);
			loadMarket(tempMarket);
		}

		initialGraph();

		this.marketUpdate = setInterval(function(){
			this.currMarket.updatePrice(this.currMarket.sellValue);
			updateGraph();
		}, 1000);

		this.trendUpdate = setInterval(function(){
			this.currMarket.newTrend(this.gamer.algo);
		}, 5000);

		setInterval(function(){
			randomEvent();
		}, 60000);

		// Start autosave, every 1/10 of second
		// Set initial values on screen
		this.display = this.currWallet.bitcoin.toString();
		this.display = this.display.substring(0,5);
		amount.innerHTML = this.display;

		startMining();

	}

	function randomEvent()
	{
		var ran = Math.random();
		ran *= (1 +(this.gamer.googfu/20.0));
		// Roughly 3% of market crash
		if(ran > 0.3 && ran < 0.33)
		{
			console.log("Crash!");
			if(this.currMarket.sellValue > 201)
			{
				this.currMarket.sellValue -= 200;
				this.currMarket.buyValue -= 200;
			}
		}
		else if(ran > 0.4 && ran < 0.45)
		{
			console.log("Crash!");
			if(this.currMarket.sellValue > 101)
			{
				this.currMarket.sellValue -= 100;
				this.currMarket.buyValue -= 100;
			}
		}
		else if(ran > 0.9 && ran < 0.95)
		{
			console.log("Spike!");
			this.currMarket.sellValue += 100;
			this.currMarket.buyValue += 100;
		}


	}
	function initialGraph()
	{
		var canvas = document.getElementById("graphCanvas");
		var context = canvas.getContext("2d");
		context.moveTo(0, this.currMarket.prices[0]);
		
		for(var i = 0; i < 300; i++)
		{
			context.lineTo(i, this.currMarket.prices[i]);
			context.stroke();
		}
	}

	function updateGraph()
	{
		var canvas = document.getElementById("graphCanvas");
		canvas.width = canvas.width;
		var context = canvas.getContext("2d");
		context.beginPath();
		for (var x = 0.5; x < 600; x += 10) {
  			context.moveTo(x, 0);
  			context.lineTo(x, canvas.height);
		}

		for (var y = 0.5; y < 425; y += 10) {
  			context.moveTo(0, y);
  			context.lineTo(canvas.width, y);
		}

		context.strokeStyle = "#eee";
		context.stroke();
		context.beginPath();


		var maxVal = findMaxVal();
		maxVal += 200;
		context.moveTo(0, this.currMarket.prices[this.currMarket.currIndex]);
		var j = 0;
		context.strokeStyle = "#000";
		for(var i = this.currMarket.currIndex; i < 300; i++)
		{
			context.lineTo(j, canvas.height - (canvas.height * (this.currMarket.prices[i]/maxVal)));
	
			context.stroke();
			j+= 2;
		}
		for(var i = 0; i  < this.currMarket.currIndex; i++)
		{

			context.lineTo(j, canvas.height - (canvas.height * (this.currMarket.prices[i]/maxVal)));
			context.stroke();
			j+=2;
		}
	}

	function findMaxVal()
	{
		var currMax = 0;
		for(var i = 0; i < 300; i++)
		{
			currMax = Math.max(currMax, this.currMarket.prices[i]);
		}
		return currMax;
	}

	// Stores data in localStorage
	function save()
	{
		localStorage.setItem('wallet', JSON.stringify(this.currWallet));
		localStorage.setItem('market', JSON.stringify(this.currMarket));
		localStorage.setItem('miner', JSON.stringify(this.miner));
		localStorage.setItem('gamer', JSON.stringify(this.gamer));
		localStorage.setItem('seller', JSON.stringify(this.currSeller));
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
		this.currSeller.sellRate = 0;
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

		var tempPrices = new Array();
		
		if(temp.prices == null || temp.prices == undefined || temp.prices == "undefined")
		{

			for(var i = 0; i<300; i++)
			{
				tempPrices[i] = 10;
			}
		}
		else
		{
			for(var i in temp.prices)
			{
				tempPrices[i] = temp.prices[i];
			}
		}
		var currIndex = parseInt(temp['currIndex']);
		if(isNaN(currIndex))
			currIndex = 0;
		this.currMarket = new market(sell, buy, trend, tempPrices, currIndex);
	}

	function displayUpdate(){
			// Show wallet values
			amount.innerHTML = this.currWallet.bitcoin.toFixed(3);
			dols.innerHTML   = "$" + this.currWallet.dollars.toFixed(2);

			// Show miner values
			delta.innerHTML  = this.miner.mineRate.toFixed(3);
			sellRate.innerHTML = this.currSeller.sellRate.toFixed(3);
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
			document.getElementById("mc3").innerHTML =
			"Level 3 BitCoin Miner $" + this.miner.getMinerPrice(1000, this.gamer.hardware).toFixed(2) + " (+.100 BTC/s)";
			document.getElementById("mc4").innerHTML =
			"Level 4 BitCoin Miner $" + this.miner.getMinerPrice(5000, this.gamer.hardware).toFixed(2) + " (+.750 BTC/s)";
			document.getElementById("mc5").innerHTML =
			"Level 5 BitCoin Miner $" + this.miner.getMinerPrice(25000, this.gamer.hardware).toFixed(2) + " (+4.000 BTC/s)";

			document.getElementById("sc1").innerHTML = 
			"Level 1 Seller $" + this.currSeller.getSellerPrice(100, this.gamer.software).toFixed(2) + " (Sells .005 BTC/s)";
			document.getElementById("sc2").innerHTML =
			"Level 2 Seller $" + this.currSeller.getSellerPrice(250, this.gamer.software).toFixed(2) + " (Sells .020 BTC/s)";
			document.getElementById("sc3").innerHTML =
			"Level 3 Seller $" + this.currSeller.getSellerPrice(1000, this.gamer.software).toFixed(2) + " (Sells .100 BTC/s)";
			document.getElementById("sc4").innerHTML =
			"Level 4 Seller $" + this.currSeller.getSellerPrice(5000, this.gamer.software).toFixed(2) + " (Sells .750 BTC/s)";
			document.getElementById("sc5").innerHTML =
			"Level 5 Seller $" + this.currSeller.getSellerPrice(25000, this.gamer.software).toFixed(2) + " (Sells 4.000 BTC/s)";

			document.getElementById("su1").innerHTML = 
			"Hardware +1 ($" + this.gamer.getStatUpgradePrice(this.gamer.hardware).toFixed(2) + ")";
			document.getElementById("su2").innerHTML = 
			"Software +1 ($" + this.gamer.getStatUpgradePrice(this.gamer.software).toFixed(2) + ")";
			document.getElementById("su3").innerHTML = 
			"Algorithms +1 ($" + this.gamer.getStatUpgradePrice(this.gamer.algo).toFixed(2) + ")";
			document.getElementById("su4").innerHTML = 
			"Google-Fu +1 ($" + this.gamer.getStatUpgradePrice(this.gamer.googfu).toFixed(2) + ")";
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

		var tempSeller = localStorage.getItem('seller');
		if(tempSeller == null || tempMiner == "null")
		{
			this.currSeller = new seller(0);
		}
		else
		{
			tempSeller = JSON.parse(tempSeller);
			loadSeller(tempSeller);
		}

		setInterval(function(){
			this.currWallet.bitcoin += this.miner.mineRate;
   			if(this.currWallet.bitcoin >= this.currSeller.sellRate)
   			{
   				this.currWallet.bitcoin -= this.currSeller.sellRate;
   				this.currWallet.dollars += (this.currSeller.sellRate * this.currMarket.sellValue);
   			}
   			displayUpdate();
		},1000);

		this.saveInterval = setInterval(save, 100);
	}

	function loadMiner(temp)
	{
		var mR = parseFloat(temp['mineRate']);

		this.miner = new mine(mR);
	}

	function loadSeller(temp)
	{
		var sR = parseFloat(temp['sellRate']);
		this.currSeller = new seller(sR);
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
			else
			{
				var mark = document.getElementById("minerCSS");
				var error = document.createElement("p");
				error.innerHTML = "You do not have that much money!"
				error.id = "err";
				mark.appendChild(error);
				setTimeout(function()
				{
					var hold = document.getElementById("minerCSS");
					var del = document.getElementById("err");
					hold.removeChild(del);
				}, 3000);
			}

	}

	function upgradeSeller()
	{
		var choice = parseInt(this.sellerChoice.value);
		var price = this.currSeller.getBasePrice(choice);
		price = this.currSeller.getSellerPrice(price, this.gamer.software);
		if(price <= this.currWallet.dollars)
		{
			var temp = this.currSeller.upgrade(choice, this.gamer.software);
			this.currWallet.dollars -= temp;
		}
		else
		{
			var mark = document.getElementById("aSCSS");
			var error = document.createElement("p");
			error.innerHTML = "You do not have that much money!"
			error.id = "err";
			mark.appendChild(error);
			setTimeout(function()
			{
				var hold = document.getElementById("aSCSS");
				var del = document.getElementById("err");
				hold.removeChild(del);
			}, 3000);	
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
		else
		{
			var mark = document.getElementById("marketCSS");
			var error = document.createElement("p");
			error.innerHTML = "You do not have that much money!"
			error.id = "err";
			mark.appendChild(error);
			setTimeout(function()
			{
				var hold = document.getElementById("marketCSS");
				var del = document.getElementById("err");
				hold.removeChild(del);
			}, 3000);

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
		else
		{
			var mark = document.getElementById("marketCSS");

			var error = document.createElement("p");
			error.innerHTML = "You do not have that much bitcoin!";
			error.id = "err";
			mark.appendChild(error);
			setTimeout(function()
			{
				var hold = document.getElementById("marketCSS");
				var del = document.getElementById("err");
				hold.removeChild(del);
			}, 3000);
		}
	}

	function modifyStat()
	{
		var hold = parseInt(this.statChoice.value);
		var errorFlag = 0;
		switch(hold)
		{
			case(1):
				if(this.gamer.hardware < 10)
				{
					if(this.gamer.getStatUpgradePrice(this.gamer.hardware) <= this.currWallet.dollars)
					{
						this.gamer.hardware++;
						this.currWallet.dollars -= this.gamer.getStatUpgradePrice(this.gamer.hardware);
					}
					else
					{
						errorFlag = 1;
					}
				}
				else
				{
					errorFlag = 2;
				}
				break;
			case(2):
				if(this.gamer.software < 10)
				{
					if(this.gamer.getStatUpgradePrice(this.gamer.software) <= this.currWallet.dollars)
					{
					this.gamer.software++;
					this.currWallet.dollars -= this.gamer.getStatUpgradePrice(this.gamer.software);
					}
					else
					{
						errorFlag = 1;
					}
				}
				else
				{
					errorFlag = 2;
				}
				break;
			case(3):
				if(this.gamer.algo < 10)
				{
					if(this.gamer.getStatUpgradePrice(this.gamer.algo) <= this.currWallet.dollars)
					{
					this.gamer.algo++;
					this.currWallet.dollars -= this.gamer.getStatUpgradePrice(this.gamer.algo);
					}
					else
					{
						errorFlag = 1;
					}
				}
				else
				{
					errorFlag = 2;
				}
				break;
			case(4):
				if(this.gamer.googfu < 10){
					if(this.gamer.getStatUpgradePrice(this.gamer.googfu) <= this.currWallet.dollars)
					{
					this.gamer.googfu++;
					this.currWallet.dollars -= this.gamer.getStatUpgradePrice(this.gamer.googfu);
					}
					else
					{
						errorFlag = 1;
					}	
				}
				else
				{
					errorFlag = 2;
				}
				break;
			default:
				break;
		}

		if(errorFlag === 1)
		{
			var mark = document.getElementById("statCSS");

			var error = document.createElement("p");
			error.innerHTML = "You do not have that much money!";
			error.id = "err";
			mark.appendChild(error);
			setTimeout(function()
			{
				var hold = document.getElementById("statCSS");
				var del = document.getElementById("err");
				hold.removeChild(del);
			}, 3000);
		}
		else if(errorFlag === 2)
		{
			var mark = document.getElementById("statCSS");

			var error = document.createElement("p");
			error.innerHTML = "10 is the maximum stat level!";
			error.id = "err";
			mark.appendChild(error);
			setTimeout(function()
			{
				var hold = document.getElementById("statCSS");
				var del = document.getElementById("err");
				hold.removeChild(del);
			}, 3000);
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
