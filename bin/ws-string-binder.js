/*************************************************************************************************************
 * ws-string-binder.js
 *
 *   Version : 1.1.0
 *   Author : Jake Wonsang Lee. ( mailto://tcpip98@gmail.com )
 *
 *   GitHub : https://github.com/tcpip98/ws-string-binder.js
 *   GitPage : http://tcpip98.github.io/ws-string-binder.js
 *   NPM : https://www.npmjs.com/package/ws-string-binder.js
 *
 *   License :
 *      The MIT License (MIT)
 *
 *      ws-string-binder.js
 *      Copyright (c) 2015 Jake Wonsang Lee( tcpip98@gmail.com )
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all
 *      copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *      SOFTWARE.
 *
 *************************************************************************************************************/
( function() {
	/************************************************************************
	 * Main object of ws-string-binder.js
	 ************************************************************************/
	var wsStringBinder = {

	  // Internal prefix
	  $prefix: "-ws-string-bind-"

	  // For debug
	, $debugEnabled: false

	  // Regular Expression for making template String
	, $regxTemplate: /(\{)(\s*)([\w-]*)(\s*)(\})/g

	  /*
	   * Log util for debuging
	   */
	, log: function( desc, obj ) {
		try {
			if( this.$debugEnabled ) {
				console.log( this.normalizeString( desc ).concat( " : " ) );
				console.log( obj );
			}
		} catch( ex ) {
			// For ancient browsers
			alert( obj );
		}
		return obj;
	  }

	  /*
	   * Bind arguemnts to template baseString
	   */
	, bind: function( baseString, bindings ) {
		var template = null
		  , bindingObject = null
		  , bindResult = null
		  , regex = null
		;

		// Migrate binding variables into internal object type.
	  	this.log( "Migrated binding object", bindingObject = this.migrateBindings( bindings ) );

	  	// Generate template String from original base String.
	  	this.log( "Template string", bindResult = this.generateTemplate( baseString ) );

	  	// Replace binding variables in template String using migrated binding object.
	  	for( var binding in bindingObject ) {
	  		if( bindingObject.hasOwnProperty( binding ) ) {
	  			regx = new RegExp( "\\{" + binding + "\\}", "g" );
	  			bindResult = this.log( "Binding sequence", bindResult.replace( regx, bindingObject[ binding ] ) );
	  		}
	  	}

		// Restore migrated binding variables which has not been bound.
		bindResult = bindResult.replace( this.$prefix, "" );

		// Return bind result
	  	return this.log( "Bind result", bindResult );
	  }

	  /*
	   * Migrate bind variable content to wsStringBind's type.
	   */
	, generateTemplate: function( baseString ) {
		return baseString.replace( this.$regxTemplate, "$1" + this.$prefix + "$3$5" );
	  }

	  /*
	   * Normalize undefined or null to empty String
	   */
	, normalizeString: function( passedString ) {
		return ( passedString === undefined || passedString === null ) ? "" : passedString;
	  }

	  /*
	   * Migrate binding object to named key-value map.
	   * Input could be single String, String array, and map<String, String> object.
	   */
	, migrateBindings: function( unknownObject ) {
		var migratedBindings = {};

		if( unknownObject instanceof Array ) {
			// Indexical Binding
			// Template Type : {0} {1} {2} {0} ...
			for( var i = 0 ; i < unknownObject.length ; i++ ) {
				migratedBindings[ this.$prefix.concat( i ) ] = unknownObject[i];
			}
		} else if( unknownObject instanceof Object ) {
			// Associative Binding
			// Template Type : {variableName1} {variableName2} {variableName3} ...
			for( var key in unknownObject ) {
				if( unknownObject.hasOwnProperty( key ) ) {
					migratedBindings[ this.$prefix.concat( key ) ] = unknownObject[ key ];
				}
			}
		} else {
			// Simple binding
			// Template Type : {} {} {} ...
			migratedBindings[ this.$prefix ] = unknownObject;
		}

		return migratedBindings;
	  }

	  /*
	   * Append as suffix
	   */
	, append: function( baseString, suffix ) {
		return baseString.concat( this.normalizeString( suffix ) );
	  }

	  /*
	   * Append as prefix
	   */
	, prepend: function( baseString, prefix ) {
		return this.normalizeString( prefix ).concat( baseString );
	  }

	};
	
	
	/************************************************************************
	 * Assign ws-string-binder methods to prototype of the String.
	 ************************************************************************/

	// Define prototype method of $append 	
	String.prototype.$append = function( suffix ) {
		return wsStringBinder.append( this, suffix );
	}
	
	// Define prototype method of $append
	String.prototype.$prepend = function( prefix ) {
		return wsStringBinder.prepend( this, prefix );
	}
	
	// Define prototype method of $bind
	String.prototype.$bind = function( bindings ) {
		return wsStringBinder.bind( this, bindings );
	}
})();