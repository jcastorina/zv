const readlineSync = require('readline-sync');
const chalk = require('chalk')
const { table } = require('./tableDo')

let HEIGHT = 14
let WIDTH = 8

let ember = {str:1},
pos = [0,0],
testUp = pos[0]-1,
testRight = pos[1]+1,
testDown = pos[0]+1,
testLeft = pos[1]-1;

let v = chalk.yellow('create:')+' new character\n'+chalk.green('play:')+' existing character'
console.clear();
console.log(v)

let game = new Object({

    prompt(){
        console.clear();
        //console.log(chalk.yellow('create:')+' new character\n'+chalk.green('play:')+' existing character')
        console.log(v)
    },//end prompt
    create(/*target, into*/) {
     // console.log(target + ' is added into ' + into + '.');
    
        let key;
        let attr = 'Strength' 
        let value = game.slider(attr);
        console.log('\n'+(new Array(24)).join(' ') +attr+' is '+chalk.yellowBright(value))
        ember.str = value;
        console.log(chalk.green('\n' + (new Array(19)).join(' ') + chalk.yellow('[SPACE]')+ ' to return to prompt'));
        key = readlineSync.keyIn('',
            {hideEchoBack: true, mask: '', limit: ' '});
        while(true){
            if(key === ' '){game.prompt(); break}
        }
    },//end slider
    slider(attr){
        let MAX = 60, MIN = 0, value = 30, key;
        console.clear();  
      console.log('Set '+chalk.yellowBright(attr)+'\n\n' + (new Array(20)).join(' ') +
        '[A] <- -> [D]  FIX: [SPACE]\n');
      while (true) {
        console.log(chalk.blueBright('\x1B[1A\x1B[K|' +
          (new Array(value + 1)).join('-') + 'O' +
          (new Array(MAX - value + 1)).join('-') + '| '+chalk.whiteBright(value)));
            key = readlineSync.keyIn('',
          {hideEchoBack: true, mask: '', limit: 'ad '});
        if (key === 'a') { if (value > MIN) { value--; } }
        else if (key === 'd') { if (value < MAX) { value++; } }
        else if (key === ' ') { return value }
        else { break; }
        
      }
     game.prompt();
    },//end slider
    play() {
        game.show();
        let key;

        while (true) {

            key = readlineSync.keyIn('',
            {hideEchoBack: true, mask: '', limit: 'wasd '});
            if (key === 'w') {     
                if(testUp > -1 && testUp < HEIGHT){
                    pos[0] = testUp;
                }
                console.clear();
                game.show();
                refresh();
                }
            else if (key === 'd') { 
                if(testRight < WIDTH && testRight > 0){
                    pos[1] = testRight;
                }
                console.clear();
                game.show();
                refresh();
                }
            else if (key === 's') { 
                if(testDown < HEIGHT && testDown > 0){
                    pos[0] = testDown;
                }
                console.clear();
                game.show();
                refresh();
                }
            else if (key === 'a') { 
                if(testLeft > -1 && testLeft < WIDTH){
                    pos[1] = testLeft;
                }
                console.clear();
                game.show();
                refresh();
                }
            else { game.prompt(); break; }
        }
    },
    show(){
    
        let level = table(WIDTH,HEIGHT)
        level[pos[0]][pos[1]] = ember;
        console.clear();
        console.table(level)
        console.log(chalk.green('\n\n' + (new Array(30)).join(' ') + '   '+chalk.yellow('[W] [A] [S] [D]')+' to move'));
        console.log(chalk.green('\n' + (new Array(31)).join(' ') + chalk.yellow('[SPACE]')+ ' to return to prompt'));
    },
    bye() { return true; }, quit() { return true; }, exit() { return true; }

})

readlineSync.promptCLLoop(game);
console.log('Bye! :)');

function refresh(){
    testUp = pos[0]-1;
    testRight = pos[1]+1;
    testDown = pos[0]+1;
    testLeft = pos[1]-1;
}
