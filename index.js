const express = require('express');
const fs = require('fs');
const app = express();
const ambulances = require('./data/ambulances.json');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ambulances', (req, res) => {
    res.status(200).json(ambulances);
});

app.get('/ambulances/:id', (req, res) => {
    const id = req.params.id;
    const ambulance = ambulances.find((ambulance) => ambulance.id === id);
    if (ambulance) {
        res.status(200).json(ambulance);
    } else {
        res.status(404).json({ error: 'Ambulance not found' });
    }
});

app.post('/ambulances', (req, res) => {
    const newAmbulance = req.body;
    ambulances.push(newAmbulance);
    saveAmbulancesToFile();
    res.status(201).json(ambulances);
});

app.put('/ambulances/:id', (req, res) => {
    const id = req.params.id;
    const ambulanceIndex = ambulances.findIndex(
        (ambulance) => ambulance.id === id
    );
    if (ambulanceIndex !== -1) {
        ambulances[ambulanceIndex] = req.body;
        saveAmbulancesToFile();
        res.status(200).json(ambulances[ambulanceIndex]);
    } else {
        res.status(404).json({ error: 'Ambulance not found' });
    }
});

app.delete('/ambulances/:id', (req, res) => {
    const id = req.params.id;
    const ambulanceIndex = ambulances.findIndex(
        (ambulance) => ambulance.id === id
    );
    if (ambulanceIndex !== -1) {
        ambulances.splice(ambulanceIndex, 1);
        saveAmbulancesToFile();
        res.status(200).json(ambulances);
    } else {
        res.status(404).json({ error: 'Ambulance not found' });
    }
});

function saveAmbulancesToFile() {
    fs.writeFileSync('./data/ambulances.json', JSON.stringify(ambulances, null, 2), 'utf8');
}

app.listen(8080, () => {
    console.log('Server Running On Port 8080');
});