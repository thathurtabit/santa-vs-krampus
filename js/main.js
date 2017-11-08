// immediately-invoked function expression (IIFE)
(function () {

	// Set vars
	const stage = document.getElementsByClassName('stage')[0];
	const header = document.getElementsByClassName('header')[0];


	const punch = function() {
		document.addEventListener('keydown', (event) => {
		  const keyName = event.key;
		  const keyCoded = event.keyCode;
		  console.log(`Key Press: ${keyName} | ${keyCoded}`);
		});
	}

	// Start
	const start = function() {
		punch();
	}

	// Reset
	const reset = function() {

	}




	window.onload = function () {
	  stage.classList.add('ready');
	  console.log('Page loaded.');
	  start(); // Kick things off when we've loaded everything
	}	

  console.log('Welcome to the Internet. Please follow me.');
}());