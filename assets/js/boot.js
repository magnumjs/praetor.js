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
 return m('.content','hello world!')
}

m.module(document.getElementsByClassName('content-area')[0], app)


}( window, undefined ));
