
// converts string to 64 bit or 32 bit integer.
function md5ToInt(string, bits) {
  
	// BENCHMARKING: 1M calls at 156,250 p/s.

	// NOTE: 64 bit duplicate collision did not occured in 10M tries, however 32 bit occurs at around 30K, so use 64 bit.

	if ( string == '' ) { return false; }

	// character and nunber map to integer.
	var charmap = {"a":0,"b":1,"c":2,"d":3,"e":4,"f":5,"g":6,"h":7,"i":8,"j":9,"k":0,"l":1,"m":2,"n":3,"o":4,"p":5,"q":6,"r":7,"s":8,"t":9,"u":0,"v":1,"w":2,"x":3,"y":4,"z":5,"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9};
	

	if ( md5hashing == 'hashlib' ) {
		var md5 = hashlib.md5(string);
	} else {
		var md5 = crypto.createHash('md5').update(string).digest("hex");						// using crypto (is a bit slower)
	}

	

											// using hashlib (is a bit faster)
	//md5 = '073911bef1beb05bf55685fbe138741e';	// 64 bit = 173911145114105
	//md5 = '973911bef1beb05bf55685fbe138741e';	// 64 bit = 973911145114105

	var str = '';
	var byte = '';
	var x = 0;
	
	// to 15 chars to match emac maximum (9007199254740992) 64 bit int see: http://ecma262-5.com/ELS5_HTML.htm#Section_8.5
	for ( x = 0; x < 15; x++ ) {
		byte = md5.substring(x, x + 1);
		if ( x === 0 && byte === "0" ) {
			byte = "1";					// if first char of md5 is 0 change to 1.
		}
		str = str + charmap[byte];
	}
	
	// 9 chars for 32 bits.
	if ( bits === 32 ) {
		str = str.substring(0, 9);
	}
	
	var n = Number(str);					// Number much faster then using eval with parseInt!

	// make sure is less then emac maximum of 9007199254740992
	if ( n > 9007199254740991 ) {
		n = 9007199254740992;
	}

	return n;							// return as integer.
	
}


// NOTE: need to benchmark md5ToInt() function over a 64 bit version (todo) of FNV below.
// 32 bit FNV-1a hash
// Ref.: http://isthe.com/chongo/tech/comp/fnv/
function fnv32a( str ) {
	var FNV1_32A_INIT = 0x811c9dc5;
	var hval = FNV1_32A_INIT;
	for ( var i = 0; i < str.length; ++i )
	{
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return hval >>> 0;
}
