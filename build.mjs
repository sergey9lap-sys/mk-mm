import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/src", { recursive: true });
await mkdir("dist/public", { recursive: true });
await mkdir("dist/thanks", { recursive: true });
await mkdir("dist/spasibo", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("src", "dist/src", { recursive: true });
await cp("public", "dist/public", { recursive: true });
await cp("thanks/index.html", "dist/thanks/index.html");
await cp("spasibo/index.html", "dist/spasibo/index.html");
await cp("public/alexandra-hero.png", "dist/alexandra-hero.png");
await cp("public/alexandra-author.jpg", "dist/alexandra-author.jpg");
console.log("Static build completed: dist/");
