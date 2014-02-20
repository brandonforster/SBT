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

		<h2 style="background-color:orange"> <?php echo $_POST["userName"]; ?>'s CTU Portal </h2>
	
		Welcome <strong><?php echo $_POST["userName"]; ?> </strong><br>		
		We wish you luck in your studies of <?php echo $_POST["majors"]; ?>! <br>
	
		<br>

		<a style="background-color:red">You have <strong>1</strong> assignment(s) due </a>

	<div>
		<form action = "assign.php" method="POST"> <!--havent figured out the true action here-->
			<input type="submit" Value="Begin My Assignment(s)"/>
		</form>	

		<form action="sb64.html">
			<input type="submit" Value="LogOut">
			<input type="button" onclick="jsTest();" Value="My CTU Profile"/> 
		</form>
	</div>

		<ul>
			<li><a href="sb64.html">Student Profile </a></li>
			<li><a href="sb64.html">CTU News!</a></li>
			<li><a href="sb64.html">Your Custom Links!</a></li>
		<ul>

	</body>

	<script type="text/javascript">
		function jsTest(){
			//var jsName = "<?php echo $_POST["userName"]; ?>"; 
			//var jsMajor =  "<?php echo $_POST["majors"]; ?>";
			//var gamer = new player(jsName,jsMajor);
			//confirm("Hello "+gamer.name+ " of degree "+ gamer.major);

			alert("Stats: "+gamer.fullMajor+"\n\nHardware:"+gamer.hardware+"\nSoftware:"+gamer.software+"\nAlgorithms:"+gamer.algo+"\nGoogle-Fu:"+gamer.googfu);
		};

	</script>


</html>