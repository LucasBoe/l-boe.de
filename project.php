<?php

include '../sql.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$project = $_GET['p'];

// Attempt select query execution
$sql = "SELECT * FROM lboeDeProjects WHERE project='$project'";
if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) > 0){


        while($row = mysqli_fetch_array($result)){
            $headerURL = $row['headerURL'];
            $displayName = $row['displayName'];
            $content = $row['content'];
        }
        mysqli_free_result($result);
    } else{
        //echo "No records matching your query were found.";
        header("Location: 404.html");
      die();
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Raleway:200,300,400" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <link rel="stylesheet" type="text/css" href="css/projects.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	<title><?php echo $displayName; ?></title>
</head>
<body>
	<div id="projectPage">
		<div id='header'>
      <div id='headerImageContainer'>
        <img id ="headerImage" class="blurOnScroll" src = "<?php echo $headerURL; ?>">
        <div id="imageFade"></div>
      </div>
      <!--<div id='img' style="background-image:
    linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
    url('');">-->
    </div>

    <div id='content'>
    <h1 id='title'><?php echo $displayName; ?><section id='start' style='transform: translate(0,-20vh)'></section></h1>
    <?php echo $content; ?>
    </div>
  </div>
  <div id="close" class="icon"><a href="https://l-boe.de"><<span class="label">Back</span></a></div>
</body>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src='https://code.jquery.com/jquery-3.3.1.min.js'></script>
    <script type="text/javascript" src='js/randomBackground.js'></script>
    <script type="text/javascript" src='js/blurOnScroll.js'></script> 
</html>