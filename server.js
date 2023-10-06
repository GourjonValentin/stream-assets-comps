const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");


const app = express();
const port = 3002;


app.use(bodyParser.json());

let  current_line;
let json;

function centerString(str, size) {
    let str_size = str.length;
    let str_space = size - str_size;
    let str_space_left = Math.floor(str_space / 2);
    let str_space_right = str_space - str_space_left;
    return " ".repeat(str_space_left) + str + " ".repeat(str_space_right);
}

function log(type, msg, ip) {
    let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    let date = new Date().toLocaleDateString("fr-FR", options);
    // Center IP on 22 characters
    if (ip != null) {
        ip = centerString(ip, 22)
    } else {
        ip = " ".repeat(22);
    }
    type = centerString(type, 6)
    let full_log = "["  + date + "] [" + ip + "] ["+ type + "] : " + msg;
    console.log(full_log);
    fs.appendFile("logs.txt", full_log + "\n", function (err) {
        if (err) throw err;
    });
}

async function csvToJson(filePath) {
    const csv = require('csvtojson');
    return await csv()
        .fromFile(filePath)
        .then((jsonObj) => {
            return jsonObj;
        });
}

app.get('/js/script.js', (req, res) => {
    log("INIT", "Requête /js/script.js", "localhost")
    res.sendFile(__dirname + '/script.js');
});

app.get('/css/style.css', (req, res) => {
    log("INIT", "Requête /css/style.css", "localhost")
    res.sendFile(__dirname + '/stylesheet.css');
});

app.get('/', async (req, res) => {
    log("INIT", "Requête /", req.ip)
    return res.sendFile(__dirname + '/index.html');
});

app.get('/initVars', async (req, res) => {
    json = await csvToJson(__dirname + '/order.csv');
    current_line = 0;
    log("INFO", "initVars", req.ip)
    return res.json(json[current_line]);
});

app.get('/precedent', async (req, res) => {
    log("INFO", "Requête /precedent", req.ip)
    if (current_line === undefined) {
        current_line = 0;
    } else {
        current_line -= 1;
    }
    if (current_line < 0) {
        current_line = json.length - 1;
    }
    return res.json(json[current_line]);
});

app.get('/suivant', async (req, res) => {
    log("INFO", "Requête /suivant", req.ip)
    if (current_line === undefined) {
        current_line = 0;
    } else {
        current_line += 1;
    }
    if (current_line >= json.length) {
        current_line = 0;
    }
    return res.json(json[current_line]);
});

app.listen(port, () => {
    log("START", `App listening on port ${port}!`, "localhost");
});
