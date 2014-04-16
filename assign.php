<!DOCTYPE html>
<html>
	<head>
		<noscript> <strong style="background-color:red"> STUDENT: CTU requires JavcaScript to be enables to be fully functional.</strong> </noscript>
		
		<script type="text/javascript" src="player.js" ></script>
		<script type="text/javascript" src="GameManager.js" ></script>
		<script type="text/javascript" src="mine.js" ></script>
		<script type="text/javascript" src="seller.js" ></script>
		<script type="text/javascript" src="wallet.js" ></script>
		<script type="text/javascript" src="market.js" ></script>			
		<script type="text/javascript">
			//transferring over the gamer stuff is currently working
			//Local Storage works beautifully
			window.onload = function(){
				var gameManager = new GameManager();
			}

			//rebuilding our gamer stats
		
		</script>

		<link href="design.css" type="text/css" rel="stylesheet" />

	</head>
	<div id = "header">
		Super Bitcoin Trader 64
	</div>
	<div id="intro">
	
	</div>

		<form>
			<span id="mineStart">
				<input id ="mS" type="button" onclick="startMining();disableMineStart()" Value="Begin Mining Bitcoin!"/>
			</span>
			<img src="bcoin.gif" height="35" width="35">
			<input type="button" id="reset" Value="Reset"/>
		</form>

	<div id="walletDiv">
		Wallet <br><br>
		<span id="amount">0.000</span> BTC <br>
		<span id="dols">250.00</span>
	</div>

	<div id="minerDiv">
		Minerate <br><br>
		<span id="delta">0.000</span> 
	</div>

	<div id="sellerDiv">
		Sellrate <br><br>
		<span id="sellRate">0.000</span>
	</div>

	<div id="market">
		<span id="marketDiv">
			Market Value
			<span id="sellVal">0.000</span>
		</span>

		<canvas id="graphCanvas" width="600" height="300"></canvas>
	</div>

	<div id="playerStats">
		<table>
					<tr>
						<th><div id='MAJOR'>MAJOR</div></th>
					</tr>
					<tr>
						<th>Hardware: </th>
						<td><div id='Hard'>num</div></td>
					</tr>
					<tr>
						<th>Software: </th>
						<td><div id='Soft'>num</div></td>
					</tr>
					<tr>
						<th>Algorithms: </th>
						<td><div id='Alg'>num</div></td>
					</tr>
					<tr>
						<th>Google-Fu: </th>
						<td><div id='Goog'>num</div></td>
					</tr>
				</table>
	</div>
	<div id="upgrades">
		<div id="minerCSS">
			Miner Upgrades

			<form>
					<select id="minerChoice">
						<option value="-1">Select Item(s)</otpion>
						<option id = "mc1" value="1">Basic BitCoin Miner $100.00 (+.005 BTC/s)</option>
						<option id = "mc2" value="2">GPU++ BitCoin Miner $250.00 (+.020 BTC/s)</option>
						<option id = "mc3" value="3">Level 3 BitCoin Miner $1000.00 (+.100 BTC/s)</option>
						<option id = "mc4" value="4">Level 4 BitCoin Miner $5000.00 (+.750 BTC/s)</option>
						<option id = "mc5" value="5">Level 5 BitCoin Miner $25000.00 (+4.000 BTC/s)</option>

					</select>
					<input type="button" id="minerUpgrade" Value="Buy!" onlclick=""/>
			</form>
		</div>
		<div id="marketCSS">
			Bitcoin Market <br>
			<input type="text" id="buyAmount" value="0"/>
			<input type="button" id="buyBitcoin" Value="Buy Bitcoin!" onclick=""/>
			<input type="text" id="sellAmount" value="0"/>
			<input type="button" id="sellBitcoin" Value="Sell Bitcoin!" onclick=""/>
		</div>
		<div id="statCSS">
			Stat Upgrades
			<form>
					<select id="statChoice">
						<option value="-1">Select Stat to Upgrade</option>
						<option value="1"> Hardware +1 ($1000.00) </option>
						<option value="2"> Software +1 ($1000.00) </option>
						<option value="3"> Algorithms +1 ($1000.00) </option>
						<option value="4"> Google-Fu +1 ($1000.00) </option>
					</select>
					<input type="button" id="statUpgrade" value="Upgrade!"/>
			</form>

			
		</div>
		Auto-Sellers

		<form>
				<select id="sellerChoice">
					<option value="-1">Select Auto-Seller</option>
					<option id = "sc1" value="1">Level 1 Seller $100.00 (Sells .005 BTC/s)</option>
					<option id = "sc2" value="2">Level 2 Seller $250.00 (Sells .020 BTC/s)</option>
					<option id = "sc3" value="3">Level 3 Seller $1000.00 (Sells .100 BTC/s)</option>
					<option id = "sc4" value="4">Level 4 Seller $5000.00 (Sells .750 BTC/s)</option>
					<option id = "sc5" value="5">Level 5 Seller $25000.00 (Sells 4.000 BTC/s)</option>
				</select>
				<input type="button" id="sellerUpgrade" value="Purchase!"/>
			</form>

	</div>

</html>