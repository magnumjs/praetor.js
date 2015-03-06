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
 return m('.content','This will be an admin UI editor for the Praetor.JS API and the two core usage methods, p() & p.proc()',
 'Praetor is a tier library to allow for altering JSON resultsets somewhere in between fetching the JSON and rendering it.',
 'a simple example: ','p.proc (getMovies (),[ \'$..title\' ],\'this.results[0].reverse ()\')')
)
}

m.module(document.getElementsByClassName('content-area')[0], app)


}( window, undefined ));
