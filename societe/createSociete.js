const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertSociete(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

// insert().catch(console.dir);

async function insertSociete(client){
    await createSociete(client,{
        _id:1,
        SIRET:45218754132421,
        directeur:{
            nom:"Bojocou",
            prenom:"Mafajo",
            tel: "0612456812"
        },
        adresse:{
            voie:"Route du bonheur",
            numero:2,
            ville:"Paris",
            pays:"France",
            adresseComplementaire: ""
        },
        agence:[1,2,3,4]
    })
}

async function createSociete(client, valeur) {
    const result = await client.db("location").collection("societe").insertOne(valeur);
    console.log(`La societe est inserée avec l'id: ${result.insertedId}`);
}

module.exports = {insertSociete}