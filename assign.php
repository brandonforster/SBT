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

	<div id="infoValues">
		<div id="walletDiv" class="info" title="This keeps track of the current amount of bitcoin and US dollars in your wallet.">
			Wallet <br><br>
			<span id="amount">0.000</span> BTC <br>
			<span id="dols">250.00</span>
		</div>

		<div id="minerDiv" class="info" title="This is how much bitcoin you gain every second.">
			Minerate <br><br>
			<span id="delta">0.000</span> BTC/s
		</div>

		<div id="sellerDiv" class="info" title="This is how much bitcoin you automatically sell every second.">
			Sellrate <br><br>
			<span id="sellRate">0.000</span> BTC/s
		</div>
	</div>
	<div id="market" class="info">
		<span id="marketDiv">
			Market Value
			<span id="sellVal">0.000</span>
		</span>

		<canvas id="graphCanvas" width="600" height="425"></canvas>
	</div>

	<div id="playerStats" class="info">
		<table>
					<tr>
						<th><div id='MAJOR'>MAJOR</div></th>
					</tr>
					<tr>
						<th>Hardware: </th>
						<td><div id='Hard' title="The hardware stat affects the price of miners.">num</div></td>
					</tr>
					<tr>
						<th>Software: </th>
						<td><div id='Soft' title="The software stat affects the price of auto-sellers.">num</div></td>
					</tr>
					<tr>
						<th>Algorithms: </th>
						<td><div id='Alg'>num</div></td>
					</tr>
					<tr>
						<th>Google-Fu: </th>
						<td><div id='Goog' title="The google-fu stat affects how likely the market price is to go up.">num</div></td>
					</tr>
				</table>
	</div>
	<div id="upgrades">
		<div id="minerCSS" class="upgradeCSS">
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
					<input type="button" class="buttonCSS" id="minerUpgrade" Value="Buy!" onlclick=""/>
			</form>
		</div>
		<div id="marketCSS" class="upgradeCSS">
			Bitcoin Market <br>
			<input type="text" class="textBox" id="buyAmount" value="0"/>
			<input type="button" class="buttonCSS" id="buyBitcoin" Value="Buy!" onclick=""/>
			<input type="text" class="textBox" id="sellAmount" value="0"/>
			<input type="button" class="buttonCSS" id="sellBitcoin" Value="Sell!" onclick=""/>
		</div>
		<div id="statCSS" class="upgradeCSS">
			Stat Upgrades
			<form>
					<select id="statChoice">
						<option value="-1">Select Stat to Upgrade</option>
						<option value="1"> Hardware +1 ($1000.00) </option>
						<option value="2"> Software +1 ($1000.00) </option>
						<option value="3"> Algorithms +1 ($1000.00) </option>
						<option value="4"> Google-Fu +1 ($1000.00) </option>
					</select>
					<input type="button" class="buttonCSS"  id="statUpgrade" value="Upgrade!"/>
			</form>

			
		</div>
		<div id="aSCSS" class="upgradeCSS">
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
				<input type="button" class="buttonCSS"  id="sellerUpgrade" value="Purchase!"/>
			</form>
		</div>
		<input type="button" class="buttonCSS"  id="reset" Value="Reset"/>
		</div>

</html>