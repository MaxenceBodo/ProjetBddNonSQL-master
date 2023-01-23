const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteByname(client, "Bodo");
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}

//Delete().catch(console.dir);

async function deleteByname(client, option) {
    const res = await client.db("location").collection("personnesPhysiques").deleteOne({nom: option});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

async function deleteAll(client) {
    const res = await client.db("location").collection("personnesPhysiques").deleteMany({});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}

module.exports = {deleteAll}