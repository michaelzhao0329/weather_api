<?php?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> New Document </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
 </HEAD>
 <?
 $test = $_POST['q_name'];
 ?>
 <BODY>
 <form name = "test" method = "POST">
<input type='text' name='q_name' value = <?echo $test?>>

<INPUT TYPE="submit" value = "Submit">
</form>
 </BODY>
</HTML>
