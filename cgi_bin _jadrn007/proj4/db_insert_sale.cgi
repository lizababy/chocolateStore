#!/usr/bin/perl 
#	Sample perl cgi script.  This script inserts new data
#       into the jadrn007 database on opatija.
#	Code by Alan Riggins
#
   
use DBI;
use CGI;

my $q = new CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn007";
my $username = "jadrn007";
my $password = "floor";
my $database_source = "dbi:mysql:$database:$host:$port";

	
#my $dbh = DBI->connect($database_source, $username, $password) 
#or die 'Cannot connect to db';

print <<EOC;
Content-type:  text/html

<!DOCTYPE html>
<html>
<head>
	<title>A Database Insertion Example with Perl</title>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
        <style type="text/css">
            h1 { text-align: center; }
            table { width: 40%; margin: 0 auto 0 auto; border-collapse: collapse; }
            td { border: 1px solid blue; background-color: #DDD; }
        </style>

</head>
<body>
EOC
#### Parameters

my $sku = $q->param('sku');
my $qty = $q->param('quantity');

use DateTime;

my $dt = DateTime->today;

my $date =  $dt->date;

my $statement = 
    "INSERT INTO sale VALUES('$sku','$qty','$date');";
    
print "The SQL statement is:\n";
print "$statement\n";


#my $count = $dbh->do($statement);


print "<h1>Result of Insertion</h1>\n";
if($count == 1) {
    print "SUCCESS, the number of rows affected is $count\n";
    }
else {
#    print "ERROR: ".$dbh->errstr()."<br />\n";
#    print "ERROR: ".$dbh->state()."\n";    
    }
 
print "</body></html>";

#$dbh->disconnect();

    	



