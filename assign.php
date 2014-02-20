<!DOCTYPE html>
<html>
	<head>
		<noscript> <strong style="background-color:red"> STUDENT: CTU requires JavcaScript to be enables to be fully functional.</strong> </noscript>
		
		<script src="player.js" ></script>
		<script src="mine.js" ></script>
		<script src="wallet.js" ></script>	
		<script type="text/javascript">
			//transferring over the gamer stuff is currently working
			//Local Storage works beautifully
			var jsName = localStorage.getItem("name");
			var jsMajor = localStorage.getItem("major");
			//rebuilding our gamer stats
			var gamer = new player(jsName,jsMajor);
			baseStats(gamer);

			var currWallet = new wallet(0,250);

			window.onload = function(){ //loading in read stats of Degree
				document.getElementById("MAJOR").innerHTML = gamer.fullMajor;
				document.getElementById("Hard").innerHTML = gamer.hardware;
				document.getElementById("Soft").innerHTML = gamer.software;
				document.getElementById("Alg").innerHTML = gamer.algo;
				document.getElementById("Goog").innerHTML = gamer.googfu;

				alert("You have one mission. BitCoins.\n\nAre you a bad enough dude or dudette to ignore all your classes, real life responsibilities, and focus on one thing? Of course you are. You're an engineering student. Your task is to mine BitCoin all day. Everyday. Your goal is make a billion USD before you graduate.\n\nYour parent's always said you were \"good with computers\". This should be easy!");

			}
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
				<input type="button" onclick="mine();disableMineStart()" Value="Begin Mining Bitcoin!"/>
			</span>
			<img src="bcoin.gif" height="35" width="35">
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
						<td>250.00</td>
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
						<td>bitVal</td>
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
			<legend>BitCoin R' Us</legend>
			<select>
				<option value="-1">Select Item(s)</otpion>
				<option value="level1">Basic BitCoin Miner $250.00</option>
				<option value="level2">GPU++ BitCoin Miner $500.00</option>
			</select>

			<input type="button" Value="Buy!" onlclick=""/>
		</fieldset>

	</div>


</html>