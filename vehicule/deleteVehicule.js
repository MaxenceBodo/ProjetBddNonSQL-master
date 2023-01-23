const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteFiltre(client, {kilometrage:76530});
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
//Delete().catch(console.dir);

async function deleteFiltre(client, filtre) {
    const res = await client.db("location").collection("vehicule").deleteOne(filtre);
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

async function deleteAll(client) {
    const res = await client.db("location").collection("vehicule").deleteMany({});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

module.exports = {deleteAll}