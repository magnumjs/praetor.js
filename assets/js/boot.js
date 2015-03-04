/**
 *  
 *
 *  @author Michael Glazer
 */

 (function( window, undefinef ) {
    "use strict";

   var app ={}

app.controller=function (){

}
app.view=function (){
 return m('.container','hello world!')
}

m.module(document.getElementById('praetor-ui'), app)


}( window, undefined ));
