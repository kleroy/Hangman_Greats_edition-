
var game = {       
    idols: ["Michael-Jackson", "Prince", "Sade", "Beres-Hammond", "Quincy-Jones", "Tupac-Shakur", 
            "Patti-Labelle", "Phil-Collins", "Smokey-Robinson", "Marc-Anthony", "Notorious-Smalls", "Dean-Martin",],
    
    help: [ "Undeniably, the King of Pop", "The purple one", "Knows when this love isn't ordinary",
            "Jamaican lovers rock",
            "Wrote and composed 'The Secret Garden' featuring R&B singers Al B. Sure!, James Ingram, El DeBarge, and Barry White",
            "Over 12 years after his death and I still picture him rollin'.",
            "If only you knew how much I do, do love you.",
            "He can feel it in the air, tonight.",
            "You've really got a hold on me.",
            "Y hubo alguien",
            "Just call him Big Poppa",
            "King of Cool and a member of Frank Sinatra's Rat Pack",
            ],
  
    idolUp: "",
    idolGuess: [],
    idolNumber: 0,
    guesses: 5,
    wins: 0,
    winP: "",
    losses: 0,
    lossP: "",
    letter: "",
    letterUsed: [],
    letterResult: false,
    txtResult: false,
    idWord: document.getElementById("word"),
    idComment: document.getElementById("comment"),
    idLetter: document.getElementById("letterUsed"),
    idGuess: document.getElementById("guesses"),
    idWins: document.getElementById("wins"),
    idLosses: document.getElementById("losses"),
    idInfo: document.getElementById("info"),
    idName: document.getElementById("name"),
    idWordImg: document.getElementById("wordImg"),
    idWordBio: document.getElementById("wordBio"),
    idWorL: document.getElementById("WorL"),
    idhelp: document.getElementById("help"),
    idSound: document.getElementById("jamz"),

     //changes text on page to be in lobster
     lobster: function() {
      if(document.getElementById("lobster").checked) {
        document.getElementById('body').style.fontFamily = "lobsterFont";
        document.getElementById('body').style.fontSize = "16px";
      }
      else {
        document.getElementById('body').style.fontFamily = "";
        document.getElementById('body').style.fontSize = "";
      }
    },
   
    //sets up the info page for after win/lose
    info: function(){
      for (var i = 0; i < this.idols.length; i++){
        if(this.idolUp.join("") === this.idols[i]){ this.idolNumber = i}
      }

      this.idName.innerHTML = this.idolUp.join("");
      this.idWordImg.src = "assets/images/" + this.idolNumber + ".jpg";
      this.idWordBio.innerHTML = this.help[this.idolNumber];
      this.idSound.src = "assets/music/" + this.idolNumber + ".mp3";
    },

    //gets the win/loss percetages
    Percent: function(){
      this.winP = this.wins / (this.wins + this.losses) *100 ; 
      this.lossP = this.losses / (this.losses + this.wins) *100;
    },
    
    //code to start / restart the game
    start: function(){
      this.idInfo.style.display = "none";
      this.idolGuess = [];
      this.letterUsed = [];
      this.guesses = 8;
      this.idhelp.innerHTML = ""
      this.idComment.innerHTML = "";
      this.idWord.innerHTML = "";
      this.idGuess.innerHTML = "Guesses Remaining: " + 8;
      this.idLetter.innerHTML ="";

      //get random word
      this.random();

      // log name for game
      console.log("Game Word: " + this.idolUp);

      // word split into array
      this.idolUp = this.idolUp.split("");

      //places the dashes for the start on screen
      this.txtStart();
      this.idWord.innerHTML = this.idolGuess.join(" ");

      //places info into div
      this.info();
    },

    //gets randome word for game
    random: function(){
      this.idolUp = this.idols[Math.floor(Math.random() * this.idols.length)];
    },

    
    //checks to see if letter has already been used
    usedCheck: function() {
      console.log("usedCheck function");
      // console.log("letterResult:", this.letterResult);
      // for  (var i = 0; i < this.letterUsed.length && this.letterResult === false; i++) {
      //   for  (var i = 0; i < this.letterUsed.length; i++) {

      //   if (this.letter === this.letterUsed[i]){
      //     this.letterResult = true;
      //   }
      // }  

      if(this.letterUsed.indexOf(this.letter) != -1 && this.idolGuess.indexOf(this.letter) != -1){
        console.log(this.letter + " was already used");
        return;
      }

      // console.log("---------------------------");
      // console.log("Letter: " + this.letter);
      // console.log("Previously Used: " + this.letterResult);
    },

    //resets result to false
    resetResult: function(){
      this.letterResult = false;
    },

    //resets text check
    txtReset: function(){
      this.txtResult = false;
    },

    // fromats the guessed word into an array
    txtStart: function() {
      for (var i = 0; i < this.idolUp.length; i++){
        if (this.idolUp[i] === "-"){
          this.idolGuess[i] = "-";
        } 
        else { 
          this.idolGuess[i] = " _ ";
        }
      }
    },

    txtCheck: function() {
      for (var i = 0; i < this.idolUp.length && this.txtResult === false; i++){
        if (this.idolUp[i].toLowerCase() === this.letter.toLowerCase()){
          this.txtResult = true;
        }
      }
    },

    // putting the letters where they belong
    txtRun: function(){
      for (var i = 0; i < this.idolUp.length; i++){
        if (this.idolUp[i].toLowerCase() === this.letter.toLowerCase()){
          this.idolGuess[i] = this.letter;
        } 
      }
    },

    //checks to see if you won
    winCheck: function(){
      if (this.idolUp.join("") === this.idolGuess.join("")){
        this.wins = 1 + this.wins;
        this.Percent();
        this.idWins.innerHTML = "Wins: " + this.wins + " - (" + this.winP.toFixed() + "%)";
        this.idLosses.innerHTML = "Losses: " + this.losses + " - (" + this.lossP.toFixed() + "%)";
        this.idInfo.style.display = "block";
        this.idWorL.innerHTML = "You Won!";
        this.idSound.play();
        
        //resets 
        this.guesses = 8;
        this.idolGuess = [];
        setTimeout(delayStart , 10000);
      }
    },

    //checks to see if you lost
    lossCheck: function(){

      //check to see if you need a hint
      if(this.guesses < 5){
        this.idhelp.innerHTML = this.help[this.idolNumber];
      }

      if (this.guesses === 0){
        this.losses = this.losses + 1;
        this.Percent();
        this.idWins.innerHTML = "Wins: " + this.wins + " - (" + this.winP.toFixed() + "%)";
        this.idLosses.innerHTML = "Losses: " + this.losses + " - (" + this.lossP.toFixed() + "%)";
        this.idInfo.style.display = "block";
        this.idWorL.innerHTML = "You Lost!";
        this.idSound.play();

        //resets so you can't acciently run the function more than once
        this.guesses = 8;
        setTimeout(delayStart , 10000);
      }
    },

    txtLoweCase: function(){
      this.letter = String.fromCharCode(event.keyCode).toUpperCase();
    },

    keyRun: function(){
      console.log("keyRun function");

      // Determines which key was pressed and make lower case
      this.txtLoweCase();

      //checks to if you typed a letter
      if (this.letter.match(/[A-Z]/) != null) {


        //Checks to see if you have used letter previosly 
        this.usedCheck();   

        // if yes .....
        if (this.letterResult) {
    
          //place comment on page
          this.idComment.innerHTML = "You already used the letter " + this.letter + "!";
    
          //set result back to false
          this.resetResult() ;
        }

        // If not .....
        else { 
    
          // add the letter to the letters used array
          this.letterUsed.push(this.letter);
          console.log("letterUsed array:", this.letterUsed);

          //removes any comment placed 
          this.idComment.innerHTML = "";

          //join the letters used into string and place on page
          this.idLetter.innerHTML = this.letterUsed.join(" ");

          //check to see if letter is in chosen word
          this.txtCheck();
    
          //if yes .....
          if (this.txtResult) {

            this.txtRun();

            console.log("In Word: " + this.txtResult)
      
            //places the found letters on the page
            this.idWord.innerHTML = this.idolGuess.join(" ");

            //resets txt check to false
            this.txtReset();
          }

          // If not .....
          else {
     
            //minus guess from guesses
            this.guesses = this.guesses - 1;

            //place on page
            this.idGuess.innerHTML = "Guesses Remaining: " + this.guesses; 

            console.log("In Word: " + this.txtResult);
          }
        } 
      } 
    },
  }



// start the game on load
game.start();

//starts function when any key pressed
document.onkeyup = function(event) {

//see if letter was pressed   
game.keyRun();

//see if you won
game.winCheck();

//see if you lost
game.lossCheck();

}


//clocking restart game
function delayStart() {
game.start();
}