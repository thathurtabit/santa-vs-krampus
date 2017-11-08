// immediately-invoked function expression (IIFE)
(function () {

	// Set vars
	const elements = {
		stage: 							document.getElementsByClassName('stage')[0],
		header:  						document.getElementsByClassName('header')[0],
		santaHealthMeter: 	document.getElementsByClassName('healthbar__santa-meter')[0],
		krampusHealthMeter: document.getElementsByClassName('healthbar__krampus-meter')[0],
		result:  						document.getElementsByClassName('result')[0],
		resultTitle:  			document.getElementsByClassName('result__title')[0],
		resetFight:  				document.getElementsByClassName('reset')[0]
	}

	const attacks = {
		santaPunch1:     		'a',
		santaPunch2:     		's',
		krampusPunch1:     	'k',
		krampusPunch2:     	'l'
	}

	let health = {
		santa:   			1,
		krampus: 			1
	}

	let result = {
		sanataWins:   			'Santa wins!',
		krampusWins: 				'Krampus wins!',
		reset:  						'Who wins?'
	}

	const roundTo2 = (x, n) => {
    return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
	};

	const punch = function() {

		document.addEventListener('keydown', (event) => {
		  const keyName = event.key;

		  if (keyName === attacks.santaPunch1 || keyName === attacks.santaPunch2) {
		  	checkKrampusHealth();
		  } else if (keyName === attacks.krampusPunch1 || keyName === attacks.krampusPunch2) {
		  	checkSantaHealth();
		  }

		  console.log(`Key Press: ${keyName} | ${health.santa}`);
		});
	}

	// Krampus Health
	const checkKrampusHealth = function() {
		if (health.krampus > 0) {
			health.krampus = roundTo2((health.krampus -= 0.1), 2);
			elements.krampusHealthMeter.setAttribute('value', health.krampus);
		} else if (health.krampus <= 0) {
			sanataWins();
		}
	}

	// Santa Wins
	const sanataWins = function() {
		elements.stage.classList.add('fight-over', 'santa-wins');
		elements.result.setAttribute('aria-hidden', false);
		elements.resetTitle.innerHTML(result.sanataWins);
	}

	// Santa Health
	const checkSantaHealth = function() {
		if (health.santa > 0) {
			health.santa = roundTo2((health.santa -= 0.1), 2);
			elements.santaHealthMeter.setAttribute('value', health.santa);
		} else if (health.santa <= 0) {
			krampusWins();
		}
	}

	// Krampus Wins
	const krampusWins = function() {
		elements.stage.classList.add('fight-over', 'krampus-wins');
		elements.result.setAttribute('aria-hidden', false);
		elements.resetTitle.innerHTML(result.krampusWins);
	}

	// Start
	const start = function() {
		punch();
	}

	// Reset
	const reset = function() {
		health.santa 			= 1;
		health.krampus 		= 1;
		elements.resultTitle.innerHTML(result.reset);
		elements.result.setAttribute('aria-hidden', true);
	}

	window.onload = function () {
	  elements.stage.classList.add('ready');
	  console.log('Page loaded.');
	  start(); // Kick things off when we've loaded everything
	}	

}());