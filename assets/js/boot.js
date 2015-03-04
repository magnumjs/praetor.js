/**
 *  
 *
 *  @author Michael Glazer
 */

 (function( window, undefined ) {
    "use strict";

   var app ={}

app.controller=function (){

}
app.view=function (){
 return m('.container','hello world!')
}

m.module(document.body, app)


}( window, undefined ));
