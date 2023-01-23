const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert(){
    try{
        await client.connect();
        await insertVehicule(client);
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}

//insert().catch(console.dir);

async function insertVehicule(client){
    await createVehicule(client,[{
        anneMiseEnService: 2013,
        kilometrage: 35000,
        etatVehicule: "non loue",
        marque: "Audi",
        modele: {
            _id: 1,
            nom: "SUV",
            prixJour: 100
        },
        agence: 1
    }])
}

async function createVehicule(client, valeur) {
    const result = await client.db("location").collection("vehicule").insertMany(valeur);
    console.log(`Les vehicules ont été inseré ${result.insertedIds.toString()}`);
}

async function createVehiculeOne(client, valeur) {
    const result = await client.db("location").collection("vehicule").insertOne(valeur);
}

module.exports= {createVehiculeOne};