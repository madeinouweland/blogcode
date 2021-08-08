const horizontalPixels = 100;
let cellsize;
let characters;
let offsetX = 0;
let colors = ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871", "#008F7A"];
let pixels = [];
let characterPixels = [];
let message = "/// i love javascript and p5! ///";

function preload() {
  characters = getCharacters();
}

function setup() {
  message = message.toUpperCase().replaceAll(" ","_") + "___";
  for (let y = 0; y < 7; y++){
    pixels.push([]);
    for (let x = 0; x < horizontalPixels; x++){
      pixels[y].push(false);
    }
  }
  noStroke();
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  cellsize = windowWidth/ (horizontalPixels -1);
  fillMessageCharacter();
}

function update() {
  offsetX -= deltaTime * .2;
  if (offsetX < -cellsize){
    const c = colors[0];
    colors = colors.slice(1);
    colors.push(c);
    offsetX = 0;
    if (characterPixels[0].length === 0){
      fillMessageCharacter();
    }
    for (let y = 0; y < 7; y++){
      pixels [y] = pixels [y].slice(1);
      pixels [y].push(characterPixels[y][0]);
      characterPixels[y] = characterPixels[y].slice(1);
    }
  }
}

function fillMessageCharacter() {
  const char = message[0];
  message = message.slice(1);
  message += char;
  const p = characters.filter(x => x[0] === char)[0];
  characterPixels = [];
  for (let y = 0; y < 7; y++){
    characterPixels.push([]);
    for (let x = 0; x < p[y + 1].length; x++){
      const value = p[y + 1][x];
      if (value === "*"){
        characterPixels[y].push(true);
      } else{
        characterPixels[y].push(false);
      }
    }
    characterPixels[y].push(false);
  }
}

let time = 0;

function draw() {
  time += deltaTime * .001;
  update();
  background("#252525");
  for (let y = 0; y < 7; y++){
    for (let x = 0; x < horizontalPixels; x++){
      if (pixels[y][x]){
        color = colors[(y + x)% 6];
        fill(color);
        const s = (horizontalPixels / 2 - Math.abs(horizontalPixels/ 2 - x)) / horizontalPixels * 3;

        rect (offsetX + x * cellsize, Math.sin(time) * 50 + 200 + y * cellsize, cellsize * s, cellsize * s, 3);
      }
    }
  }
}

function getCharacters() {
  return `
A
.*****.
*.....*
*.....*
*.....*
*******
*.....*
*.....*
-------
B
*****..
.*...*.
.*....*
.*****.
.*....*
.*....*
******.
-------
C
..****.
.*....*
*.....*
*......
*......
.*....*
..****.
-------
D
*****..
..*..*.
..*...*
..*...*
..*...*
*.*...*
.*****.
-------
E
******
*.....
*.....
*****.
*.....
*.....
******
-------
F
*******
*......
*......
******.
*......
*......
*......
-------
G
..****.
.*....*
*......
*......
*..****
*.....*
.*****.
-------
H
*....*
*....*
*....*
******
*....*
*....*
*....*
-------
I
***
.*.
.*.
.*.
.*.
.*.
***
-------
J
..*****
......*
......*
......*
*.....*
.*...*.
..***..
-------
K
*....*.
*...*..
*..*...
***....
*..*...
*...*..
*....*.
-------
L
*......
*......
*......
*......
*......
*......
*******
-------
M
*.....*
**...**
*.*.*.*
*..*..*
*..*..*
*.....*
*.....*
-------
N
*.....*
**....*
*.*...*
*..*..*
*...*.*
*....**
*.....*
-------
O
..***..
.*...*.
*.....*
*.....*
*.....*
.*...*.
..***..
-------
P
*****..
*....*.
*.....*
******.
*......
*......
*......
-------
Q
..***..
.*...*.
*.....*
*..*..*
*...*.*
.*...*.
..***.*
-------
R
*****..
*....*.
*.....*
******.
*.**...
*...**.
*.....*
-------
S
.*****.
*.....*
*......
.****..
.....*.
*.....*
.*****.
-------
T
*******
...*...
...*...
...*...
...*...
...*...
...*...
-------
U
*.....*
*.....*
*.....*
*.....*
*.....*
*.....*
.*****.
-------
V
*.....*
*.....*
.*...*.
.*...*.
.*...*.
..***..
...*...
-------
W
*.....*
*.....*
*.....*
*.....*
.*.*.*.
.*.*.*.
..*.*..
-------
X
*.....*
.*...*.
..*.*..
...*...
..*.*..
.*...*.
*.....*
-------
Y
*.....*
*.....*
.*...*.
..*.*..
...*...
...*...
...*...
-------
Z
*******
.....*.
....*..
...*...
..*....
.*.....
*******
-------
_
.......
.......
.......
.......
.......
.......
.......
-------
?
.*****.
*.....*
....**.
...*...
...*...
.......
...*...
-------
!
..***..
..***..
..***..
...*...
...*...
.......
...*...
-------
,
.......
.......
.......
.......
.......
...*...
..**...
-------
/
.*...*.
***.***
.*****.
.*****.
..***..
...*...
.......
-------
5
*******
**.....
**.....
******.
.....**
.....**
******.
`.split("-------")
  .map(x => x.trim()
  .split("\n"));
}
