<?
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:: A simple incremental counter at fixed or random intervals
	//:: Author: Mark Hayden
	//:: Author Site: http://markhayden.me
	//:: License: Free General Public License (GPL)
	//:: Version: 1.0.0
	//:: Date: 12.23.2013
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	$new_increment = $_POST['increment'];
	$file = $_POST['file'];
	$count_pull = file_get_contents($file);
	$count_push = $new_increment+$count_pull;
	file_put_contents($file, $count_push);
	echo $count_push;
?>