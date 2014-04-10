<!DOCTYPE html>
<html>
	<head>
		<noscript> <strong style="background-color:red"> STUDENT: CTU requires JavcaScript to be enables to be fully functional.</strong> </noscript>
		
		<script type="text/javascript" src="player.js" ></script>
		<script type="text/javascript" src="mine.js" ></script>
		<script type="text/javascript" src="wallet.js" ></script>
		<script type="text/javascript" src="market.js" ></script>		
		<script type="text/javascript" src="GameManager.js" ></script>	
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

	<h1>You have one mission. </h1>
	<p>
		 Are you a bad enough dude or dudette to ignore all your classes and lifetime responsibilities and focus on one thing? Of course you are. You're an engineering student. Your task is to mine BitCoin all day. Everyday. Your goal is make a billion USD before you graduate.
		<br><br>
		Your parent's always said you were "good with computers". This should be easy!
	</p>


		<form>
			<input type="button" onclick="newTest();" Value="JSTest"/> 
			<span id="mineStart">
				<input id ="mS" type="button" onclick="startMining();disableMineStart()" Value="Begin Mining Bitcoin!"/>
			</span>
			<img src="bcoin.gif" height="35" width="35">
			<input type="button" id="reset" Value="Reset"/>
		</form>

	<script type="text/javascript">
		function newTest(){
			confirm("Thankfully JS is working "+currWallet.bitcoin+" "+currWallet.dollars);
		}
	</script>

	<div id="FunNums">
		<fieldset>
			<legend> Your Digital Wallet</legend>
				<table>
				<thread>
					<tr>
						<th></th>
						<th>BitCoin</th>
						<th>$USD</th>
						<th>Miner-Rank</th>
						<th>&euro;</th>
					</tr>
				</thread>
				<tbody>
					<tr>
						<th>Curr Wallet</th>
						<td><div id='amount'>0.000</div></td>
						<td><div id='dols'>250.00</div></td>
						<td>junior</td>
					</tr>
					<tr>
						<th>Delta</th>
						<td><div id='delta'>0.000</div></td></td>
						<td>0.000</td>
						<td>-----</td>
					</tr>
					<tr>
						<th>Market Val</th>
						<td><div id="sellVal"></div></td>
						<td>USDVal</td>
						<td>-----</td>
					</tr>
				</tbody>
				</table>

		</fieldset>
		<fieldset>
			<legend> Stats </legend>
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
		</fieldset>	
		<fieldset>
			<legend>Miner Upgrades</legend>
			<form>
				<select id="minerChoice">
					<option value="-1">Select Item(s)</otpion>
					<option value="100">Basic BitCoin Miner $100.00 (+.005 BTC/s)</option>
					<option value="250">GPU++ BitCoin Miner $250.00 (+.010 BTC/s)</option>
				</select>

			</form>

			<input type="button" id="minerUpgrade" Value="Buy!" onlclick=""/>
		</fieldset>

		<fieldset>
			<legend>Bitcoin Market</legend>
			<input type="button" id="buyBitcoin" Value="Buy 1 Bitcoin!" onlclick=""/>
			<input type="button" id="sellBitcoin" Value="Sell 1 Bitcoin!" onlclick=""/>
		</fieldset>

	</div>


</html>