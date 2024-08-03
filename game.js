/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Arcade runner
@author: Artem4852
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const ticket = "t"
const road = "r"

setLegend(
  [ player, bitmap`
................
................
..00000000.....0
.06666666000..06
0666666699900069
0666666699999999
0666699999999999
0669999999999999
099999999999999F
09999999999999FF
09999999999FFFFF
09999999FFFF00FF
.0000FFFFF00..0F
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
................` ],
  [ road, bitmap`
1DDDDD1111111111
11DDDD1111LLL111
110CCL1111CCLL11
1100CLL111CC1111
1110LLL1111C1111
111111111D111111
1111111DDDD11111
1111111LLLL11D11
111111LL00111LD1
1D1111110111DLDL
LL111DD11111DLLL
LL1DDLL11111CCCL
LLLLLLLL11111CC1
1111LL1111111111
1111111111111111
1DDDD11111111111` ]
)

setSolids([])

let level = 0
const levels = [
  map`
rrrrrrrrr.
rrrrrrrrr.
rrrrrrrrr.
rrrrrrrrr.
prrrrrrrr.
rrrrrrrrr.
rrrrrrrrr.
rrrrrrrrr.`
];

let playing = true;
const startTime = performance.now();
let lastSpawn = startTime - 5000;
let lastMove = startTime - 5000;
let score = 0;

function gameLoop() {
  if (playing && performance.now()-startTime <= 1000000) {
    // Spawning new tickets
    if (performance.now()-lastSpawn >= 2000) {
      addSprite(9, Math.floor(Math.random()*6)+2, "t");
      lastSpawn = performance.now();
    }

    // Moving everything
    if (performance.now()-lastMove >= 1000) {
      const tickets = getAll("t");
      const toRemove = [];
      tickets.forEach(ticket => {
        if (ticket.x == 0) {
          toRemove.push(ticket);
        } else {
        ticket.x -= 1; 
        }
      });
      toRemove.forEach(ticket => {
        ticket.remove();
      });
      lastMove = performance.now();
    }

    // Player collecting 'em
    const tickets = getAll("t");
    const toRemove = [];
    tickets.forEach(ticket => {
      if (getTile(ticket.x, ticket.y).some(sprite => sprite.type === "p")) {
        score++;
        toRemove.push(ticket);
      }
    });
    toRemove.forEach(ticket => {
      ticket.remove();
    });

    // Updating score
    addText("Tickets: " + score, {
      x: 5,
      y: 1, 
      color: color`3`
    });

    setTimeout(gameLoop, 1000/60)
  }
}

gameLoop();