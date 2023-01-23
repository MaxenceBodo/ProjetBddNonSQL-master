const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les agences");
        await Find(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);

async function findAll(client) {
    const rx = await client.db('location').collection('agence').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function find(client,filtre) {
    const rx = await client.db('location').collection('agence').find(filtre);
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}