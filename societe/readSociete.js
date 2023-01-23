const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();

        console.log("Affiche toutes les societes");
        await findAll(client);
        console.log("___________________________________________________________")

        console.log("Affiche toutes les societes en France");
        await findByPays(client)
        
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);

async function findAll(client) {
    const rx = await client.db('location').collection('societe').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByPays(client, pays) {
    const rx = await client.db('location').collection('societe').find({"adresse.pays":agence});
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}