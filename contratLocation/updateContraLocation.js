const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Update() {
    try {
        await client.connect();
        await updateBySIRET(client, {_id: 1}, {dateDebut: "2022-02-14"});
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

// Update().catch(console.dir);

async function updateBySIRET(client, filtre, updatedDoc) {
    const res = await client.db('location').collection('contratLocation').updateOne(filtre, {$set: updatedDoc});
    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}

async function setEtatContratTermine(client, idContrat) {
    const res = await client.db("location").collection('contratLocation').updateOne({"_id": idContrat}, {$set: {"etatContrat": "termine"}});
    console.log(`L'etat du contrat ${idContrat} mis a jour -> ${res.acknowledged}`)
}

module.exports = {setEtatContratTermine};
