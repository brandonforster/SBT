<!DOCTYPE HTML>
	<head>
		<title> Super Bit 64 </title>

		<noscript> <strong style="background-color:red"> STUDENT: CTU requires JavaScript to be enables to be fully functional.</strong> </noscript>

		<script>
		var temp = localStorage.getItem('playedBefore');
		if(temp == true || temp == "true")
		{
			window.location.href = "assign.php";
		}

		</script>

	</head>
	<body style=>
		<h1 style="background-color:orange">Central Technological University</ht>
		<h2>Student Login Portal </h2>
		<form name="submitter" action="s64.php" onsubmit="return(validate());" method="POST">
			Name:
			<input type="text" name="userName" placeholder="Ima Knight">

			<br>
			Major:
			<select name="majors">
				<option value="-1">Choose One</option>
				<option value="CS">Computer Science</option>
 				<option value="CPE">Computer Engineering</option>
  				<option value="IT">Infomation Technology</option>
  				<option value="EE">Electrical Engineering</option>
			</select>
			<input type="submit" Value="Submit">
			<input type="reset" name="Clear">

		</form>

		<script type="text/javascript">
		
			function validate(){
				//confirm("Hello "+document.submitter.majors.value);
				if(document.submitter.userName.value == "" && document.submitter.majors.value == "-1"){
					alert("Please enter your name and select your major.");
					return false;
				}
				if(document.submitter.userName.value == ""){
					alert("Please enter your name.")
					return false;
				}
				if(document.submitter.majors.value == "-1"){
					alert("Please select a major.");
					return false; 
				}

			}
		</script>
	</body>
</HTML>