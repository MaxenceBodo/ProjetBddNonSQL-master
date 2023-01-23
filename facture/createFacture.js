const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertFacture(client);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

//insert().catch(console.dir);

async function insertFacture(client) {
    await createManyFacture(client, [
        {
            _id: 1,
            idContrat: 1,
            montant: 500,
            dateFacture: new Date().toISOString()
        }, {
            _id: 2,
            idContrat: 2,
            montant: 1000,
            dateFacture: new Date().toISOString()
        }, {
            _id: 3,
            idContrat: 3,
            montant: 1500,
            dateFacture: new Date().toISOString()
        },{
            _id: 4,
            idContrat: 20,
            montant: 1500,
            dateFacture: new Date("2021-10-27").toISOString()
        },{
            _id: 5,
            idContrat: 21,
            montant: 2200,
            dateFacture: new Date("2022-11-06").toISOString()
        }
    ])
}

async function createManyFacture(client, valeur) {
    const result = await client.db("location").collection("facture").insertMany(valeur);
    console.log(`Les facture ont été inseré`);
}

async function createOneFacture(client, valeur) {
    const result = await client.db("location").collection("facture").insertOne(valeur);
    console.log(`La facture a été inseré -> ${result.insertedId}`);
}

module.exports = {insertFacture, createOneFacture};