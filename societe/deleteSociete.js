const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteBySIRET(client, 45218754132421);
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
//Delete().catch(console.dir);

async function deleteBySIRET(client, SIRET) {
    const res = await client.db("location").collection("societe").deleteOne({"SIRET": SIRET});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

async function deleteAll(client) {
    const res = await client.db("location").collection("societe").deleteOne({});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

module.exports = {deleteAll}