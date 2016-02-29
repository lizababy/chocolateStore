#!/usr/bin/perl  

use DBI;
use CGI;
use CGI::Cookie

$q = new CGI;


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $cookie = $q->cookie(-name=>'jadrn007',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn007";
my $username = "jadrn007";
my $password = "floor";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Cookie Reader</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
</head>

<body>
    <div>
            <h1>Confirmation</h1>
END_CONTENT

#### Parameters



use DateTime;

my $dt = DateTime->today;

my $date =  $dt->date;


my %cookies = $ENV{COOKIE};

my ($key, $value);
     
%cookies = CGI::Cookie->fetch;
    
my $v = $q->cookie('jadrn007');  
@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
my $statement = 
    "INSERT INTO sale VALUES(id,'$sku','$qty','$date');";
    

my $count = $dbh->do($statement);

if($count == 1) {
    print "You ordered, $sku of $qty nos \n";
    }
else {
    print "ERROR: ".$dbh->errstr()."<br />\n";
    print "ERROR: ".$dbh->state()."\n";    
    }
    } 

print "<h1>Order Information:</h1>\n";
my ($key, $value);


print "<table>\n";                
foreach $key ($q->param) {
    print "<tr>\n";
    print "<td>$key</td>\n";
    foreach $value ($q->param($key)) {
        print "<td>$value</td>";
        }
    print "</tr>\n";
}
print "</table>\n";
print "</div>\n";
print "</body>\n";
$dbh->disconnect();
print "</html>\n";


