// immediately-invoked function expression (IIFE)
(function () {

	// Set vars
	const elements = {
		stage: 										document.getElementsByClassName('stage')[0],
		header:  									document.getElementsByClassName('header')[0],
		santaHealthMeter: 				document.getElementsByClassName('healthbar__santa-meter')[0],
		krampusHealthMeter: 			document.getElementsByClassName('healthbar__krampus-meter')[0],
		result:  									document.getElementsByClassName('result')[0],
		resultTitle:  						document.getElementsByClassName('result__title')[0],
		resetFight:  							document.getElementsByClassName('reset')[0],
		santaKey1:  							document.getElementsByClassName('santa-key-a')[0],
		santaKey2:  							document.getElementsByClassName('santa-key-s')[0],
		krampusKey1:  						document.getElementsByClassName('krampus-key-k')[0],
		krampusKey2:  						document.getElementsByClassName('krampus-key-l')[0]
	}

	const fighters = {
		santa: 										document.getElementsByClassName('santa-body')[0],
		santaHead: 								document.getElementsByClassName('santa-body__head')[0],
		santaLeftUpperArm: 				document.getElementsByClassName('santa-l-arm__upper')[0],
		santaLeftLowerArm: 				document.getElementsByClassName('santa-l-arm__lower')[0],
		santaRightUpperArm: 			document.getElementsByClassName('santa-r-arm__upper')[0],
		santaRightLowerArm: 			document.getElementsByClassName('santa-r-arm__lower')[0],
		krampus: 									document.getElementsByClassName('krampus-body')[0],
		krampusHead: 							document.getElementsByClassName('krampus-body__head')[0],
		krampusLeftUpperArm: 			document.getElementsByClassName('krampus-l-arm__upper')[0],
		krampusLeftLowerArm: 			document.getElementsByClassName('krampus-l-arm__lower')[0],
		krampusRightUpperArm: 		document.getElementsByClassName('krampus-r-arm__upper')[0],
		krampusRightLowerArm: 		document.getElementsByClassName('krampus-r-arm__lower')[0]
	}

	const colors = {
		white:  							'#fff',
		dark: 								'#333',
		transparent: 					'transparent'
	}

	const animation = {
		armRotate:            45,
		headRotate:  					20,
		punchDuration: 				10
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
  		// Animate punch
			fighters.santaLeftUpperArm.animate(santaUpperArmPunch, punchOps);
			fighters.santaLeftLowerArm.animate(santaLowerArmPunch, punchOps);
			fighters.krampusHead.animate(krampusHeadWhack, punchOps);
  		checkKrampusHealth();
  		canPunch.santaP1 = false; // turn off
  	}
	}

	const leftA = function() {
		elements.santaKey1.style.cssText = btnUpStyles;
		// Animate return punch
		fighters.santaLeftUpperArm.animate(santaUpperArmPunch, punchReturnOps);
		fighters.santaLeftLowerArm.animate(santaLowerArmPunch, punchReturnOps);
		fighters.krampusHead.animate(krampusHeadWhack, punchReturnOps);
		canPunch.santaP1 = true; // Turn on
	}

	const pressedS = function() {
		elements.santaKey2.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.santaP2) {
  		// Animate punch
			fighters.santaRightUpperArm.animate(santaUpperArmPunch, punchOps);
			fighters.santaRightLowerArm.animate(santaLowerArmPunch, punchOps);
			fighters.krampusHead.animate(krampusHeadWhack, punchOps);
  		checkKrampusHealth();
  		canPunch.santaP2 = false; // turn off
  	}
	}

	const leftS = function() {
		elements.santaKey2.style.cssText = btnUpStyles;
		// Animate return punch
		fighters.santaRightUpperArm.animate(santaUpperArmPunch, punchReturnOps);
		fighters.santaRightLowerArm.animate(santaLowerArmPunch, punchReturnOps);
		fighters.krampusHead.animate(krampusHeadWhack, punchReturnOps);
		canPunch.santaP2 = true; // Turn on
	}

	const pressedK = function() {
		elements.krampusKey1.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.krampusP1) {
  		// Animate punch
			fighters.krampusLeftUpperArm.animate(krampusUpperArmPunch, punchOps);
			fighters.krampusLeftLowerArm.animate(krampusLowerArmPunch, punchOps);
			fighters.santaHead.animate(santaHeadWhack, punchOps);
  		checkSantaHealth();
  		canPunch.krampusP1 = false; // turn off
  	}
	}

	const leftK = function() {
		elements.krampusKey1.style.cssText = btnUpStyles;
		// Animate return punch
		fighters.krampusLeftUpperArm.animate(krampusUpperArmPunch, punchReturnOps);
		fighters.krampusLeftLowerArm.animate(krampusLowerArmPunch, punchReturnOps);
		fighters.santaHead.animate(santaHeadWhack, punchReturnOps);
		canPunch.krampusP1 = true; // turn on
	}

	const pressedL = function() {
		elements.krampusKey2.style.cssText = btnDownStyles;
		// Throttle attach
  	if (canPunch.krampusP2) {
  		// Animate punch
			fighters.krampusRightUpperArm.animate(krampusUpperArmPunch, punchOps);
			fighters.krampusRightLowerArm.animate(krampusLowerArmPunch, punchOps);
			fighters.santaHead.animate(santaHeadWhack, punchOps);
  		checkSantaHealth();
  		canPunch.krampusP2 = false; // turn off
  	}
	}

	const leftL = function() {
		elements.krampusKey2.style.cssText = btnUpStyles;
		// Animate return punch
		fighters.krampusRightUpperArm.animate(krampusUpperArmPunch, punchReturnOps);
		fighters.krampusRightLowerArm.animate(krampusLowerArmPunch, punchReturnOps);
		fighters.santaHead.animate(santaHeadWhack, punchReturnOps);
		canPunch.krampusP2 = true; // turn on
	}


	// WEB API ANIMATIONS
	// Settings
	let santaBobOps = {
	  iterations: Infinity,
	  iterationStart: 0,
	  delay: 0,
	  endDelay: 0,
	  direction: 'alternate',
	  duration: 700,
	  fill: 'forwards',
	  easing: 'ease-in-out'
	}

	let krampusBobOps = {
		iterations: Infinity,
	  iterationStart: 0,
	  delay: 300,
	  endDelay: 0,
	  direction: 'alternate',
	  duration: 700,
	  fill: 'forwards',
	  easing: 'ease-in-out'
	}

	let fighterBob = [
	  { 
	    transform: 'translateY(10px)', 
	    transformOrigin: '50% 50%'
	  },
	  { 
	    transform: 'translateY(0)',
	    transformOrigin: '50% 50%'
	  }
	];

	let punchOps = {
	  iterationStart: 0,
	  delay: 0,
	  endDelay: 0,
	  duration: animation.punchDuration,
	  fill: 'forwards',
	  easing: 'ease-in-out'
	}

	let punchReturnOps = {
	  iterationStart: 0,
	  delay: 0,
	  endDelay: 0,
	  direction: 'reverse',
	  duration: animation.punchDuration,
	  fill: 'forwards',
	  easing: 'ease-in-out'
	}

	// SANTA PUNCHES
	const santaUpperArmPunch = [
	  { 
	    transform: `translateY(0) rotate(${animation.armRotate}deg)`,
	    transformOrigin: '0 50%'
	  },
	  { 
	    transform: `translateY(-30px) rotate(-20deg)`,
	    transformOrigin: '0 50%'
	  }
	];

	const santaLowerArmPunch = [
	  { 
	    transform: `translate(60%, 560%) rotate(-${animation.armRotate}deg)`,
	    transformOrigin: '0 50%'
	  },
	  { 
	    transform: `translate(80%, -340%) rotate(-${animation.armRotate / 2}deg)`,
	    transformOrigin: '0 50%'
	  }
	];

	// KRAMPUS PUNCHES
	const krampusUpperArmPunch = [
	  { 
	    transform: `translate(10%, 0) rotate(-${animation.armRotate}deg)`,
	    transformOrigin: '100% 50%'
	  },
	  { 
	    transform: `translate(10%, -90%) rotate(25deg)`,
	    transformOrigin: '100% 50%'
	  }
	];

	const krampusLowerArmPunch = [
	  { 
	    transform: `translate(-25%, 40%) rotate(${animation.armRotate}deg)`,
	    transformOrigin: '0 50%'
	  },
	  { 
	    transform: `translate(-65%, -700%) rotate(${animation.armRotate / 2}deg)`,
	    transformOrigin: '0 50%'
	  }
	];

	const santaHeadWhack = [
	  { 
	    transform: `rotate(0deg)`,
	    transformOrigin: '50% 100%'
	  },
	  { 
	    transform: `rotate(-${animation.headRotate}deg)`,
	    transformOrigin: '50% 100%'
	  }
	];

	const krampusHeadWhack = [
	  { 
	    transform: `rotate(0deg)`,
	    transformOrigin: '50% 100%'
	  },
	  { 
	    transform: `rotate(${animation.headRotate}deg)`,
	    transformOrigin: '50% 100%'
	  }
	];


	// WEB API ANIMATIONS TRIGGER
	// GO GO GO
	fighters.santa.animate(fighterBob, santaBobOps);
	fighters.krampus.animate(fighterBob, krampusBobOps);


	// RESET
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
		// Animate return punch
		fighters.santaRightUpperArm.animate(santaUpperArmPunch, punchReturnOps);
		fighters.santaRightLowerArm.animate(santaLowerArmPunch, punchReturnOps);
		fighters.santaLeftUpperArm.animate(santaUpperArmPunch, punchReturnOps);
		fighters.santaLeftLowerArm.animate(santaLowerArmPunch, punchReturnOps);
		fighters.krampusRightUpperArm.animate(krampusUpperArmPunch, punchReturnOps);
		fighters.krampusRightLowerArm.animate(krampusLowerArmPunch, punchReturnOps);
		fighters.krampusLeftUpperArm.animate(krampusUpperArmPunch, punchReturnOps);
		fighters.krampusLeftLowerArm.animate(krampusLowerArmPunch, punchReturnOps);
		fighters.santaHead.animate(santaHeadWhack, punchReturnOps);
		fighters.krampusHead.animate(krampusHeadWhack, punchReturnOps);
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