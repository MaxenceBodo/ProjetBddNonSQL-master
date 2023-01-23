const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const db = client.db('location').collection('vehicule');

async function Read() {
    try {
        await client.connect();

        console.log("Affiche tous les vehicules");
        // await findAll(client);
        console.log("___________________________________________________________")

        console.log("Affiche toutes les vehicules etant des voitures");
        // await findByModele(2);

        console.log("Affiche toutes les vehicules avec l'id X");
        // await findById(1);

        console.log("Affiche l'etat du vehicule avec l'id X");
        // await getEtatVehicule(1);
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}

// Read().catch(console.dir);

async function findAll(client) {
    const rx = await db.find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByModele(id) {
    const rx = await db.find({"modele": id});
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findById(id) {
    const res = await db.findOne({"_id": id});
    console.log(res)
}

async function getEtatVehicule(id) {
    await client.connect();
    // const db = client.db('location').collection('vehicule');
    return await client.db('location').collection('vehicule').findOne({"_id": id}, {
        projection: {
            "_id": 0,
            "etatVehicule": 1
        }
    });

}

async function getManyVehiculesById(client, arrayId) {
    const res = await client.db("location").collection("vehicule").find({"_id": {"$in": arrayId}});
    return res.toArray();
}

module.exports = {getEtatVehicule, getManyVehiculesById};