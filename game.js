/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Arcade runner
@author: Artem4852
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const ticket = "t";
const ticketUI = "T";
const ban = "b";
const bug = "B";
const bugUI = "G";

const bg = "g";
const rock = "k";
const sky = "s";
const sky2 = "S";
const sky3 = "c";
const sky4 = "C";

setLegend(
  [ player, bitmap`
................
................
..00000000.....0
.06666666000..00
0666666699900060
0666666699999990
0666699999999990
0669999999999990
0999999999999990
09999999999999F0
09999999999FFFF0
09999999FFFF00F0
.0000FFFFF00..00
....0000000....0
................
................` ],
  [ ticket, bitmap`
................
................
................
..8888....8888..
.88888333333333.
.88833322333333.
.88333232333333.
.83332332333333.
.33333332333333.
.33333332333333.
.333333323333CC.
.33333333333CCC.
..CCCC....CCCC..
................
................
................`], 
  [ ticketUI, bitmap`
................
................
................
................
................
................
..8888....8888..
.88888333333333.
.88833322333333.
.88333232333333.
.83332332333333.
.33333332333333.
.33333332333333.
.333333323333CC.
.33333333333CCC.
..CCCC....CCCC..`], 
  [ ban, bitmap`
................
................
.....888888.....
...8833333333...
...8322223333...
..833233323333..
..333233323333..
..333222233333..
..333233323333..
..333233323333..
..3332222333FF..
...33333333FF...
...3333333FFF...
.....FFFFFF.....
................
................`],
  [ bug, bitmap`
................
................
................
.......222222...
.00....22222....
..003322222233..
...033333333333.
..0033333333333.
.00093332222333.
...999922222333.
....9922222999..
......00.00.00..
.....00.00.00...
................
................
................`],
  [ bugUI, bitmap`
................
................
................
................
................
................
.......222222...
.00....22222....
..003322222233..
...033333333333.
..0033333333333.
.00093332222333.
...999922222333.
....9922222999..
......00.00.00..
.....00.00.00...`],
  
  [ rock, bitmap`
1111L11LLL111111
1222L1111L222211
2LLL1L2111LLLL22
LL111LL222L11LLL
11111LLLLLL11111
1111LL111L22222L
LLLLL1111LLLLLLL
11L2211111LL1111
11LL22221LL11111
1111LLLLLL1LLLL1
LLLLL11L111111LL
LL2221LLL2211111
1LLLLLL1LLL22211
111LL1111LLLLLLL
1111L2122LL11111
111LL22222LL1111`],
  [ bg, bitmap`
LLLL21111111L111
111L22111111L111
111LL2111111L111
1111L221111LL111
1111LL2211LL1111
11111LL2LLL11111
111111LLL1111111
222111LL11111122
LL221LLL111112LL
11LLLL1L22111LL1
111LL11LLL11LL11
1111L2111LLLL111
12211L2111L11111
1LL22LL111LL1111
1LLLLLL1111L2111
LL111111111LL111`],
  
  [ sky, bitmap`
7777777777777777
7777777777777777
2222222277777777
2222222227777777
2222222222227777
2222222222222277
2222222222222277
2222222222222277
2222222222227777
2222222222777777
2222222227777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ sky2, bitmap`
7777777777777777
7777777777777777
7777777777777772
7777777777777722
7222222277772222
7222222222222222
7222222222222222
7222222222222222
7772222222222222
7777777222222222
7777777722222222
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ sky3, bitmap`
7777777777777777
7777777777227777
7777777722222277
7777777222222277
7777777777777777
7777777777777777
2227777777777777
2222222227777777
2222222227777777
2222222222777777
2222222227777777
2222222277777777
2222777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ sky4, bitmap`
7777777777777777
7777777777777777
7722222277777777
7222222222777777
7722222222777777
7722222222777777
7772222277777722
7777777777777222
7777777722222222
7777777222222222
7777777222222222
7777777772222222
7777777777772222
7777777777777777
7777777777777777
7777777777777777`],

  [ road1, bitmap`
L11111111L111111
L11111111L111111
1LL11111LLDDDD11
11LL1111LLLLLDDD
111LL11LL111LLLD
1111LLLL111111LL
11111LL111111111
LLLLL11111111111
LLLL221111111111
1111L22111111111
1111LL2221111111
11111LL222111111
1111111LL2221111
11111111LL221111
11111111L1LLL111
11111111L111LLLL`]
)

setSolids([])

setBackground("k")

let level = map`
SsCcSsSsCc
sCcSsCcSsC
..........
p.........
..........
..........
..........
..........`;
setMap(level);

let menu = map`
T........B
..........
..........
..........
..........
..........
..........
..........`;

addSprite(0, 0, "T");
addSprite(9, 0, "G");

let banned = false;
const startTime = performance.now();
let lastSpawn = startTime - 1000;
let lastMove = startTime - 1000;
let malfunction = 0;
let score = 0;

onInput("w", () => {
  if (getFirst(player).y != 2 && Math.random() > malfunction * 0.2) {
    getFirst(player).y -= 1
  }
})

onInput("s", () => {
  if (Math.random() > malfunction * 0.2) {
    getFirst(player).y += 1
  }
})

function gameLoop() {
  if (!banned && malfunction < 5 && performance.now()-startTime <= 1000000) {
    // Spawning new tickets
    if (performance.now()-lastSpawn >= 500) {
      const x = 9;
      const y = Math.floor(Math.random()*6)+2;
      const rand = Math.random();
      console.log(rand, rand > 0.4, 0.4 > rand > 0.2);
      if (rand > 0.4) {
        addSprite(x, y, "t");
      } else if (rand > 0.05) {
        addSprite(x, y, "B");
      } else {
        addSprite(x, y, "b");
      }
      lastSpawn = performance.now();
    }

    // Moving everything
    if (performance.now()-lastMove >= 700) {
      const tickets = getAll("t");
      const bans = getAll("b");
      const bugs = getAll("B");
      const sprites = [...tickets, ...bans, ...bugs];
      const toRemove = [];
      sprites.forEach(sprite => {
        if (sprite.x == 0) {
          toRemove.push(sprite);
        } else {
        sprite.x -= 1; 
        }
      });
      toRemove.forEach(sprite => {
        sprite.remove();
      });
      lastMove = performance.now();
    }

    // Player collecting 'em
    const tickets = getAll("t");
    const bans = getAll("b");
    const bugs = getAll("B");
    const sprites = [...tickets, ...bans, ...bugs];
    const toRemove = [];
    sprites.forEach(sprite => {
      if (getTile(sprite.x, sprite.y).some(spriteC => spriteC.type === "p")) {
        if (sprite.type === "t") {
          score++;
        } else if (sprite.type === "B") {
          malfunction++;
        } else if (sprite.type === "b") {
          banned = true;
        }
        toRemove.push(sprite);
      }
    });
    toRemove.forEach(sprite => {
      sprite.remove();
    });

    // Updating score and bugs
    addText(`  ${score}`, {
      x: 1,
      y: 1, 
      color: color`3`
    });

    addText(`${malfunction}`, {
      x: 16,
      y: 1, 
      color: color`3`
    });

    setTimeout(gameLoop, 1000/60)
  }
  else if (banned) {
    setBackground(bg);
    setMap(menu);
    addText(`Womp womp. You were \nbanned and lost ${score} \ntickets. Better \nluck next time.`, {
      x: 1,
      y: 4, 
      color: color`3`
    });
  }
  else if (malfunction >= 5) {
    setBackground(bg);
    setMap(menu);
    addText(`Oh no, you collected too many \nbugs and now all your ${score} tickets \nflew away. Better luck \nnext time.`, {
      x: 1,
      y: 4, 
      color: color`3`
    });
  }
}

gameLoop();