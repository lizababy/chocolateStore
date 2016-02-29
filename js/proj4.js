
var proj4_data;
$(document).ready( function() {
    proj4_data = new Array();
    $.get('/perl/jadrn007/proj4/get_products.cgi', storeData); 
   
    var cart = new shopping_cart("jadrn007");
     $('#count').text(cart.size());
    $('#shop').on('click', function() {
        
            launchProducts();
        });
   
    $('#navigation-right li#order a').on('click', function() {
        
        updateDisplay();
        });
    $('#navigation-right li#products a').on('click', function() {
             launchProducts();
         });
     $(document).on('click','#milk', function() {
        load_data("Milk chocolate");
        })
    
    $(document).on('click','#dark', function() {
        load_data("Dark chocolate");
        })
        
    $(document).on('click','#nuts', function() {
        load_data("Nuts and chews");
        }) 
        
    $(document).on('click','#truffle', function() {
        load_data("Truffles");
        })  
        
    $(document).on('click','#gift', function() {
        load_data("Gifts");
        })           
        
    $(document).on('click','#holiday', function() {
            load_data("Holiday assortments");
       
        })           
        
    $(document).on('click','#brittle', function() {
            load_data("Brittles and toffies");
       
        })  
    $(document).on('click', ".buy", function() {  
        var sku = this.id;
        cart.add(sku,1);
        $('#count').text(cart.size());  
        $(this).next().fadeIn(50).fadeOut(2000);
        });     
    $('#counter a').on('click', function() {
        
        updateDisplay();
        });
        
        
    $(document).on('click', ".showButton", function() {  
       
        updateDisplay();
        //loadModal()
        }); 
    $(document).on('click','#order_button', function($e) {   
        
            $("#dialog-modal").dialog('open');
            //updateDisplay();
            });  
     $(document).on('click', ".deleteButton", function() {  
         var sku = this.id;
        cart.delete(sku);
        updateDisplay();
        });   
    $(document).on('click', ".changeButton", function() {  
         var sku = this.id;
        cart.setQuantity(sku, $('#qty').val());
        updateDisplay();
        });   
                 
   function getTitle(sku){
        for (var i =0 ; i < proj4_data.length ; i++){
            if(proj4_data[i][0] == sku) {
                
                return proj4_data[i][2];
            }
        }
    }
    function getPrice(sku){
        for (var i =0 ; i < proj4_data.length ; i++){
            if(proj4_data[i][0] == sku) {
                return proj4_data[i][5];
            }
        }
    }
     
      
    function launchProducts(){
        toWrite = '<div id="button_panel">' +
            '<input type="button" value="Milk Chocolate" id="milk"/>'+
            '<input type="button" value="Dark Chocolate" id="dark" />' +
            '<input type="button" value="Nuts and Chews" id="nuts" />'+
            '<input type="button" value="Brittles and Toffies" id="brittle" />'+
            '<input type="button" value="Truffles" id="truffle" />'+
            '<input type="button" value="Gifts" id="gift" />'+
            '<input type="button" value="Holiday assortments" id="holiday" />'+
        '</div><br> <div id="content">Shop By Category</div>';
        $('#main_content').html(toWrite);
    }
    function updateDisplay() {
        
        var cartArray = cart.getCartArray();
         $('#count').text(cart.size());     
        if(cart.size() == 0 ) {
            toWrite =  ' No items are added to shopping cart!';
            $('#main_content').html(toWrite);
            return;
        }
        var toWrite = "<table>";
        toWrite += "<tr><th>SKU</th><th>Title</th><th>Unit Price</th><th>Quantity</th><th>Total</th><th><input type='text' id='qty' placeholder='Enter new quantity' /></th></tr>";
        total = 0;
        for(i=0; i < cartArray.length; i++) {
            individual_total = getPrice(cartArray[i][0]) * cartArray[i][1];
            toWrite += "<tr>";
            
            toWrite += "<td>"+cartArray[i][0]+"</td>";
            toWrite += "<td>"+getTitle(cartArray[i][0])+"</td>";
            toWrite += "<td>"+getPrice(cartArray[i][0])+"</td>";
            toWrite += "<td>"+cartArray[i][1]+"</td>"; 
            toWrite += "<td>"+individual_total.toFixed(2)+"</td>"; 
            toWrite += "<td><input type='button' value='Change Quantity' class='changeButton' + id='" + cartArray[i][0]+"' /></td>";
            toWrite += "<td><input type='button' value='Delete from Cart' class='deleteButton' id='" + cartArray[i][0]+"' /></td>";

            toWrite += "</tr>";
            total += individual_total;
            }
            toWrite += "<tr></tr><tr><td></td><td></td><td></td><td>Shipping:</td><td>$2.00</td></tr>";
            toWrite += "<tr></tr><tr><td></td><td></td><td></td><td>Tax (8%):</td><td>$" + (total * .08).toFixed(2) + "</td></tr>";
            toWrite += "<tr></tr><tr></tr><tr><td></td><td></td><td></td><td>Grand Total:</td><td>$" + (total +total * .08 + 2).toFixed(2) + "</td></tr>";

            toWrite += "</table><br /><br /><input type='button' value='Order Now' id='order_button' />"; 
        $('#main_content').html(toWrite);
      
       
    } 
        
    

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

function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1;
}

tempArray[Count]=tempString;
return tempArray;
}     
$("#dialog-modal" ).dialog({
            height: 350,
            width: 500,
            modal: true,
            autoOpen: false
    });
                   
    });
 