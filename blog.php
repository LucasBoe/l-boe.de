<?php

include '../sql.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$post = $_GET['p'];
$showNav = $_GET['n'];

// Attempt select query execution
$sql = "SELECT * FROM lboeDeBlogposts WHERE post='$post'";
if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) > 0){


        while($row = mysqli_fetch_array($result)){
            $post = $row['post'];
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

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
	<?php include 'img/svgMarker.php'; ?>
    <link href="https://fonts.googleapis.com/css?family=Raleway:200,300,400" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    <title>Lucas B - <?php echo $displayName; ?></title>
</head>
<body>
    <div id="wrapper">
        <div id=blogPage>

            <!-- gets filled with header segment -->
            <div id="header">
                <a href="imprint.html" id="imprint">Imprint</a>
                <h1>Lucas B&oumldeker</h1>
				<ul id="navbar">
                    <li><a href="../../about">About</a></li>
                    <li><a href="https://l-boe.de">Work</a></li>
                    <li><a class="active">Blog</a></li>
                </ul>
                <div class="title">
                    <h1 id="subtitle">Game Design</h1>
                    <h1>Thoughts</h1>
                </div>
            </div>

            <ul id="blognav" class="content <?php if($showNav != "true") { echo "blognav_disabled"; } ?> ">
                <a id="toggle">show others</a>
                <ul>
                    <?php
                    $sql2 = "SELECT * FROM lboeDeBlogposts ORDER BY id DESC";
                    if($result = mysqli_query($conn, $sql2)){
                        if(mysqli_num_rows($result) > 0){


                            while($row = mysqli_fetch_array($result)){
                                $postid = $row['post'];
                                $buttonText = $row['displayName'];

                                echo "<li>read <a href=\"?p=" . $postid . '">' . $buttonText . '</a></li>';
                            }
                            mysqli_free_result($result);
                        } else{
                            //echo "No records matching your query were found.";
                            header("Location: 404.html");
                          die();
                        }
                    } else{
                        echo "ERROR: Could not able to execute $sql2. " . mysqli_error($conn);
                    }

                    $conn->close();
                    ?>
                </ul>
            </ul>

			<!-- holds the blogpost itself-->
			<div class="content">
				<?php echo $content; ?>
			</div>
		</div>
	</div>
</body>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src='https://code.jquery.com/jquery-3.3.1.min.js'></script>
	<!--<script type="text/javascript" src='../../js/blogstart.js'></script>-->
    <script type="text/javascript" src='js/blognav.js'></script>
	<script type="text/javascript" src="js/randomBackground.js"></script>
</html>