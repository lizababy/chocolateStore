/*  We load the global array proj4_data once, then use it as needed
    to retrieve product information.
     
    Alan Riggins
    CS545
    Fall 2015
*/    


var proj4_data;

$(document).ready(function() {
   
    proj4_data = new Array();
    $.get('/perl/jadrn007/proj4/get_products.cgi', storeData); 
    
    var cart = new shopping_cart("jadrn007");
    
    $('#milk').on('click', function() {
        load_data("Milk chocolate");
        })
    
    $('#dark').on('click', function() {
        load_data("Dark chocolate");
        })
        
    $('#nuts').on('click', function() {
        load_data("Nuts and chews");
        }) 
        
    $('#truffle').on('click', function() {
        load_data("Truffles");
        })  
        
    $('#gift').on('click', function() {
        load_data("Gifts");
        })           
        
    $('#holiday').on('click', function() {
            load_data("Holiday assortments");
       
        })           
        
    $('#brittle').on('click', function() {
            load_data("Brittles and toffies");
       
        })  
    $(document).on('click', ".buy", function() {  
        var sku = this.id;
        cart.add(sku,1);
        $('#count').text(cart.size());  
        $(this).next().fadeIn(50).fadeOut(2000);
        });     
        
    });  
    
 
        
                    
   
function load_data(title){
    tmpString = "<table>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == title) {
                tmpString += "<tr><td>";
                tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br/>SKU: " + proj4_data[i][0]+"</td>";     
                tmpString += "<td><p id='title'> <b>" + proj4_data[i][2] + "</b> : ";
                tmpString +=  proj4_data[i][3] + "</p><br/><p>";
                tmpString +=  proj4_data[i][4] + "</p><br/>";
                tmpString +=  "<p id='price'>$" + proj4_data[i][5] + " only </p>";
                tmpString += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
                tmpString += "<span class='cart'>  Added to Cart</span></br>";  
                tmpString += "<br/><hr></td></tr>";                
                }
            }
        tmpString += "</table>";
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
}
function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
    }

    
    
// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}     
