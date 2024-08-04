from PIL import Image
import pyperclip, string

filename = "startMenu"
size = 16 # size of bitmap

im = Image.open(f"{filename}.png")
im.convert("RGBA")
width, height = im.size

colors = {
    (0, 0, 0): "0", # black
    (73, 80, 87): "L", #dark grey
    (145, 151, 155): "1", # grey
    (248, 249, 250): "2", # white
    (235, 43, 72): "3", # red
    (139, 65, 46): "C", # brown
    (27, 177, 248): "7", # cyan
    (19, 21, 224): "5", # blue
    (254, 230, 14): "6", # yellow
    (149, 140, 50): "F", # gold
    (45, 225, 63): "4", # light green
    (29, 148, 16): "D", # green
    (245, 109, 187): "8", # pink
    (170, 58, 197): "H", # purple
    (245, 113, 23): "9", # orange
    (10000, 10000, 10000): "." # transparent
}

output = ""

n = 0
for y in range(height//size):
    for x in range(width//size):
        bitmap = "\n"

        section = im.crop((x*size, y*size, (x+1)*size, (y+1)*size))

        for i in range(size):
            for j in range(size):
                try: r, g, b, a = section.getpixel((j, i))
                except: r, g, b = section.getpixel((j, i)); a = 1
                if a == 0:
                    bitmap += colors[(10000, 10000, 10000)]
                    continue

                cr, cg, cb = 248, 249, 250
                for key in colors:
                    if abs(key[0] - r) + abs(key[1] - g) + abs(key[2] - b) < abs(cr - r) + abs(cg - g) + abs(cb - b):
                        cr, cg, cb = key
                bitmap += colors[(cr, cg, cb)]
            bitmap += "\n"

        output += f"[ {filename}{n}, bitmap`{bitmap}` ],\n"
        n += 1

pyperclip.copy(output)
print(n)
input("Press Enter to continue...")
with open("game.js", "r") as f:
    lines = f.readlines()

characters = string.ascii_uppercase + string.ascii_lowercase + string.digits + "!#$%&'()*+,-/:;<=>?@[]^_{|}~©®℗™℠№ªº℔℥℆÷±"
charactersUsed = []
for line in lines:
    if '= "' in line: charactersUsed.append(line.split('"')[1])
charactersLeft = [c for c in characters if c not in charactersUsed]
print(len(charactersLeft))

output2 = ""
for i in range(n):
    output2 += f"const {filename}{i} = \"{charactersLeft[i]}\";\n"
pyperclip.copy(output2)