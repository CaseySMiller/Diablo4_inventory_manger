const db = require("../config/connection");
const { Aspect } = require("../models");
const cleanDB = require("./cleanDB");

const aspectData = require("./aspectData.json");

db.once("open", async () => {
    await cleanDB("Aspect", "aspects");

    await Aspect.insertMany(aspectData);

    console.log("Aspects seeded!");
    process.exit(0);
});
