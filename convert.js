const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const inputDir = "./public/frames"
const files = fs.readdirSync(inputDir)

files.forEach(file => {
  if (file.endsWith(".svg")) {
    const input = path.join(inputDir, file)
    const output = path.join(
      inputDir,
      file.replace(".svg", ".png")
    )

    sharp(input)
      .png()
      .toFile(output)
      .then(() => console.log("Converted:", file))
  }
})
