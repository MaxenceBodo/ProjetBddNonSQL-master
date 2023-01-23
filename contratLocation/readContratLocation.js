const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const ObjectID = require('mongodb').ObjectID;


let db = client.db('location').collection("contratLocation");

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les contrats de locations");
        await FindAll(client);

        console.log("___________________________________________________________")

        console.log("Affiche les contrats de location entre deux dates");
        // await findByDate(client, "2022-01-01","2022-03-20");

        console.log("find by id");
        await findById(id);
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}

// Read().catch(console.dir);

async function FindAll(client) {
    const rx = await db.find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function FindAll(client, filtre) {
    const rx = await client.db('location').collection('contratLocation').find(filtre);
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByDate(client, dateDebut, dateFin) {
    const res = await db.find({"dateDebut": {"$gte": dateDebut}, "dateFin": {"$lte": dateFin}});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}

async function findById(idContrat) {
    await client.connect();
    let res = await db.findOne({"_id": idContrat});
    console.log(res);
    return res;
}

async function getEtatContrat(idContrat) {
    await client.connect();
    const res = await db.findOne({"_id": idContrat}, {projection: {"etatContrat": 1}});
    return res.etatContrat
}

module.exports = {findById, getEtatContrat};