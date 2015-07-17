//run this file and it will print out a randomly generated story
//print it multiple times for maximum effect!

let fs = require('fs');

class Warrior {
  constructor() {
    this.name = `nameless`;
    this.strength = 20;
    this.weapon = `fists`;
  }

  attack() {
    console.log(`You attack with your ${this.weapon}! You do ${calculateDamage(this.strength)} damage. Your attack cleaves through the monster splitting it in two. You win!`);
  }


  warcry() {
    console.log(`You roar at the top of your lungs "${this.saying}" This was a foolish move on your part because the monster hears you yell and immediately swipes at you first. Every bone in your body has been pulverized. As you lie on the ground bleeding to death, you look to your coin and wonder "why did I trust in a stupid coin!". You agonizingly die with deep regret.`);
  }
}

class Knight extends Warrior {
  constructor(strength) {
    super(strength);
    this.name = `Arthur`;
    this.weapon = `Sword of 1000 Truths`;
    this.jobClass = `Knight`;
    this.saying = `I am ${this.name}, and I will destroy you!`;
  }
}

class Viking extends Warrior {
  constructor(strength) {
    super(strength);
    this.name = `Ragnar`;
    this.weapon = `Axe of the Dragon Slayer`;
    this.jobClass = `Viking`;
    this.saying = `With my ${this.weapon}, I will slay you`;
  }
}

//promise function that reads files
function readStory(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

//prints story with the help of promises
readStory(`./story/prologue.txt`).then((data) => {
  console.log(data.toString());
  let myHero = pickclass();
  if(myHero.jobClass === `Viking`){
    readStory(`./story/viking.txt`).then((data) => {
      console.log(data.toString());
      attackDecision(myHero);

    });
  } else if (myHero.jobClass === `Knight`) {
    readStory(`./story/knight.txt`).then((data) => {
      console.log(data.toString());
      attackDecision(myHero);
    });
  }
})

//helper functions

function coinFlip() {
  let flip = Math.round(Math.random());
  return (flip) ? `heads`: `tails`;
}

function flipEvent() {
  let flip = coinFlip();
  console.log(`You flip your coin`);
  console.log(`it's ${flip}! \n`);
  return flip;
}

//calculate damage with the help of default
function calculateDamage(str , critMultiplier = 2, critChance = Math.round(Math.random())) {
  return str + (str * critMultiplier * critChance);
}

function pickclass() {
  let flip = flipEvent();

  if (flip === `heads`) {
    console.log(`you choose to be a knight \n`);
    return new Knight();

  }else{
    console.log(`you choose to be a viking \n`);
    return new Viking();
  }
}

function attackDecision(myHero) {
  let flip = flipEvent();
  if (flip === `heads`) {
    myHero.attack();
  }else{
    myHero.warcry();
  }
}
