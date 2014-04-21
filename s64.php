<!DOCTYPE html>
<html>
	<head>
		<noscript> <strong style="background-color:red"> STUDENT: CTU requires JavaScript to be enables to be fully functional.</strong> </noscript>
		
		<script src="player.js" ></script>
		<!--Making our PLAYER who just arrived on this page -->
		<script type="text/javascript">			
			var jsName = "<?php echo $_POST["userName"]; ?>"; 
			var jsMajor =  "<?php echo $_POST["majors"]; ?>";
			var gamer = new player(jsName,jsMajor);
			baseStats(gamer);

			//attempting JSON(?) local storage solution to pass nam/maj
			//which works. 
			localStorage.setItem("name",jsName);
			localStorage.setItem("major",jsMajor);


		</script>

	</head>

	<body>
		<div id="mainBlock">
			<h2 style="background-color:orange"> <?php echo $_POST["userName"]; ?>'s CTU Portal </h2>
		
			Welcome <strong><?php echo $_POST["userName"]; ?> </strong><br>		
			We wish you luck in your studies of <?php echo $_POST["majors"]; ?>! <br>
		
			<br>

			<a style="background-color:red">You have <strong>1</strong> assignment(s) due </a>
		</div>
	<div>
		<form action = "assign.php" method="POST"> <!--havent figured out the true action here-->
			<input type="submit" Value="Begin My Assignment(s)"/>
		</form>	

		<form>
			<input type="button" Value="Log Out" onclick="errorMessage()">
		</form>
	</div>

	</body>

	<script type="text/javascript">
		function errorMessage()
		{
			var mainBlock = document.getElementById("mainBlock");
			var elem = document.createElement("p");
			elem.innerHTML = "Error: You must complete assignments before logging out.";
			elem.id = "error";
			elem.color = "red";
			mainBlock.appendChild(elem);			
		}
		function jsTest(){
			//var jsName = "<?php echo $_POST["userName"]; ?>"; 
			//var jsMajor =  "<?php echo $_POST["majors"]; ?>";
			//var gamer = new player(jsName,jsMajor);
			//confirm("Hello "+gamer.name+ " of degree "+ gamer.major);

			alert("Stats: "+gamer.fullMajor+"\n\nHardware:"+gamer.hardware+"\nSoftware:"+gamer.software+"\nAlgorithms:"+gamer.algo+"\nGoogle-Fu:"+gamer.googfu);
		};

	</script>


</html>