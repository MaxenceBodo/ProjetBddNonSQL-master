const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les personnes");
        await FindAll(client);

        console.log("___________________________________________________________")

        console.log("Affiche les personnes en pays");
        await findByPays(client, "France");

        console.log("Filtrer par id");
        await findById(client, 111);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}

// Read().catch(console.dir);


async function FindAll(client) {
    const rx = await client.db('location').collection('personnesMorales').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function Find(client, filtre) {
    const rx = await client.db('location').collection('personnesMorales').find(filtre);
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}


async function findByPays(client, pays) {
    const res = await client.db('location').collection("personnesMorales").find({"adresse.pays": pays});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}

async function findById(client, idPersonne) {
    return await client.db('location').collection('personnesMorales').findOne({"_id": idPersonne});

}

async function checkIfPersonneExists(client, idPersonne) {
    return await findById(client, idPersonne) !== null;
}

module.exports = {checkIfPersonneExists};