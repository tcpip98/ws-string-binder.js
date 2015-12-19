# ws-string-binder.js  
Light-weight pure javascript plugin to bind string variables easily and browser-insensitively.  
=============================================================  


## Generals  
--------------------------------------  
The __ws-string-binder.js__ provides string binder methods to improve explicitness of your code.  
The string concatenating operation is very common technique in lots of business application practically.  
But many of times, this basic operation makes code dirty and chaotic.  
This is why I made this plugin.  

This plugin is designed as a prototype function of javascript String object so that can be used by any circumstances.  


## How to use  
--------------------------------------  
There are three types of binding function $bind(), appending function $append(), and prepending function $prepend() defined.  
And these are all supports method chaining.  

I am sure that you probably know all about this plugin as soon as see the following code fragments without any of API documents.  


#### Simple Binding

````javascript
var output = "The {} plugin requires that {} file is included."
             .$bind( "ws-string-binder.js" );
// output : The ws-string-binder.js plugin require ws-string-binder.js file is included.

var output = "The {} plugin requires that {} file is included."
             .$bind( "ws-string-binder.js( ver. {})" )
             .$bind( "1.0.0" );
// output : The ws-string-binder.js( ver. 1.0.0) plugin require ws-string-binder.js( ver. 1.0.0) file is included.
````


#### Indexical Binding with Array

````javascript
var bindings = [ "Seoul", "South Korea", "East Asia" ];
var output = "The {0} is the capital of {1}. {1} is located in {2}."
             .$bind( bindings );
// output : The Seoul is the capital of South Korea. South Korea is located in East Asia.
````


#### Associative Binding with JSON object

````javascript
var bindings = { "city" : "Seoul"
               , "country" : "South Korea"
               , "location" : "East Asia"
               };
var output = "The {city} is the capital of {country}. {country} is located in {location}."
             .$bind( bindings );
// output : The Seoul is the capital of South Korea. South Korea is located in East Asia.
````


#### Append strings

````javascript
var output = "My name is "
             .$append( "Jake Wonsang Lee." );
// output : My name is Jake Wonsang Lee.
````

### Prepend strings

````javascript
var output = " is his e-mail address."
             .$prepend( "tcpip98@gmail.com" );
// output : tcpip98@gmail.com is his e-mail address.
````
