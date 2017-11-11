// immediately-invoked function expression (IIFE)
(function () {

	// Set vars
	const elements = {
		stage: 								document.getElementsByClassName('stage')[0],
		header:  							document.getElementsByClassName('header')[0],
		santaHealthMeter: 		document.getElementsByClassName('healthbar__santa-meter')[0],
		krampusHealthMeter: 	document.getElementsByClassName('healthbar__krampus-meter')[0],
		result:  							document.getElementsByClassName('result')[0],
		resultTitle:  				document.getElementsByClassName('result__title')[0],
		resetFight:  					document.getElementsByClassName('reset')[0],
		santaKey1:  					document.getElementsByClassName('santa-key-a')[0],
		santaKey2:  					document.getElementsByClassName('santa-key-s')[0],
		krampusKey1:  				document.getElementsByClassName('krampus-key-k')[0],
		krampusKey2:  				document.getElementsByClassName('krampus-key-l')[0]
	}

	const colors = {
		white:  							'#fff',
		dark: 								'#333',
		transparent: 					'transparent'
	}

	const btnDownStyles = `background-color: ${colors.white}; color: ${colors.dark}`;
	const btnUpStyles = 	`background-color: ${colors.transparent}; color: ${colors.white}`;

	const attacks = {
		santaPunch1:     		'a',
		santaPunch2:     		's',
		krampusPunch1:     	'k',
		krampusPunch2:     	'l',
		punchPower:  				0.05,
	}

	let canPunch = {
		santaP1:  						true,
		santaP2:  						true,
		krampusP1:  					true,
		krampusP2:  					true
	}

	// helper
	const roundTo2 = (x, n) => {
    return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
	};

	let health = {
		santa:   			1,
		krampus: 			1
	}

	let result = {
		sanataWins:   			'Santa wins!',
		krampusWins: 				'Krampus wins!',
		reset:  						'Who wins?'
	}

	const punch = function() {

		// Key Down
		document.addEventListener('keydown', keyDown = function() {
		  const keyName = event.key;

		  switch (keyName) {
			  case attacks.santaPunch1:
			  	pressedA();
		    break;
			  case attacks.santaPunch2:
			  	pressedS();
		    break;
		    case attacks.krampusPunch1:
		    	pressedK();
		    break;
			  case attacks.krampusPunch2:
		    	pressedL();
		    break;
			  default:
			    break;
			}
		});

		// Key Up
		document.addEventListener('keyup', keyUp = function() {
		  const keyName = event.key;

		  switch (keyName) {
			  case attacks.santaPunch1:
			  	leftA();
		    break;
			  case attacks.santaPunch2:
					leftS();
		    break;
		    case attacks.krampusPunch1:
		    	leftK();
		    break;
			  case attacks.krampusPunch2:
		    	leftL();
		    break;
			  default:
			    break;
			}
		});
	}

	// Krampus Health
	const checkKrampusHealth = function() {
		if (health.krampus > attacks.punchPower) {
			health.krampus = roundTo2((health.krampus -= attacks.punchPower), 2);
			elements.krampusHealthMeter.setAttribute('value', health.krampus);
			console.log(`Krampus health: ${health.krampus}%`);
		} else {			
			elements.krampusHealthMeter.setAttribute('value', 0);
			sanataWins();
		}
	}

	// Santa Wins
	const sanataWins = function() {
		elements.stage.classList.add('fight-over', 'santa-wins');
		elements.resultTitle.innerHTML = result.sanataWins;
		removeEvents();
	}

	// Santa Health
	const checkSantaHealth = function() {
		if (health.santa > attacks.punchPower) {
			health.santa = roundTo2((health.santa -= attacks.punchPower), 2);
			elements.santaHealthMeter.setAttribute('value', health.santa);
			console.log(`Santa health: ${health.santa}%`);
		} else {
			elements.santaHealthMeter.setAttribute('value', 0);
			krampusWins();
		}
	}

	// Krampus Wins
	const krampusWins = function() {
		elements.stage.classList.add('fight-over', 'krampus-wins');
		elements.resultTitle.innerHTML = result.krampusWins;
		removeEvents();
	}

	const pressedA = function() {
		elements.santaKey1.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.santaP1) {
  		checkKrampusHealth();
  		canPunch.santaP1 = false; // turn off
  	}
	}

	const leftA = function() {
		elements.santaKey1.style.cssText = btnUpStyles;
		canPunch.santaP1 = true; // Turn on
	}

	const pressedS = function() {
		elements.santaKey2.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.santaP2) {
  		checkKrampusHealth();
  		canPunch.santaP2 = false; // turn off
  	}
	}

	const leftS = function() {
		elements.santaKey2.style.cssText = btnUpStyles;
		canPunch.santaP2 = true; // Turn on
	}

	const pressedK = function() {
		elements.krampusKey1.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.krampusP1) {
  		checkSantaHealth();
  		canPunch.krampusP1 = false; // turn off
  	}
	}

	const leftK = function() {
		elements.krampusKey1.style.cssText = btnUpStyles;
		canPunch.krampusP1 = true; // turn on
	}

	const pressedL = function() {
		elements.krampusKey2.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.krampusP2) {
  		checkSantaHealth();
  		canPunch.krampusP2 = false; // turn off
  	}
	}

	const leftL = function() {
		elements.krampusKey2.style.cssText = btnUpStyles;
		canPunch.krampusP2 = true; // turn on
	}

	// Reset fight...
	elements.resetFight.addEventListener("click", function() {
		reset();
	});

	// Remove event listenters
	const removeEvents = function() {
		document.removeEventListener('keydown', keyDown);
		document.removeEventListener('keyup', keyUp);
		elements.result.setAttribute('aria-hidden', 'false');
	}

	// Reset
	const reset = function() {
		health.santa 			= 1;
		health.krampus 		= 1;
		elements.krampusHealthMeter.setAttribute('value', health.krampus);
		elements.santaHealthMeter.setAttribute('value', health.santa);
		elements.resultTitle.innerHTML = result.reset;
		elements.result.setAttribute('aria-hidden', 'true');
		elements.stage.classList.remove('fight-over', 'krampus-wins', 'santa-wins');
		elements.santaKey1.style.cssText = btnUpStyles;
		elements.santaKey2.style.cssText = btnUpStyles;
		elements.krampusKey1.style.cssText = btnUpStyles;
		elements.krampusKey2.style.cssText = btnUpStyles;
		punch();
	}

	// Start
	const start = function() {
		punch();
	}

	window.onload = function () {
	  elements.stage.classList.add('ready');
	  console.log('Page loaded.');
	  start(); // Kick things off when we've loaded everything
	}	

}());