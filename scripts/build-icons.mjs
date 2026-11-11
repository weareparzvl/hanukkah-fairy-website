// Square icons and the social card image, made from the approved art.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const blue = "#1254cf";
const fairy = await sharp("src/assets/fairy-wand.png").trim().resize({ width: 400, height: 400, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
const icon = sharp({ create: { width: 512, height: 512, channels: 4, background: blue } }).composite([{ input: fairy, gravity: "center" }]);
await icon.clone().png().toFile("static/icon-512.png");
await sharp(await icon.clone().png().toBuffer()).resize(180).png().toFile("static/apple-touch-icon.png");
const png32 = await sharp(await icon.clone().png().toBuffer()).resize(32).png().toBuffer();
// A PNG inside an ICO container: header, one directory entry, then the image.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("static/favicon.ico", Buffer.concat([header, png32]));
await sharp("src/assets/cover.jpg").resize(1200, 1200).jpeg({ quality: 82, mozjpeg: true }).toFile("static/og-cover.jpg");
console.log("Icons and social image written to static/.");
