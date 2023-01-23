const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const utils = require("./../utils/utils");

async function insert() {
    try {
        await client.connect();
        // await insertPenalite(client);
        // await checkForPenalites(client);
        // await isVoitureLoue(client, 1);
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

// insert().catch(console.dir);


async function insertPenalite(client) {
    await createPenalite(client, [
            {
                _id: 1,
                sommePenalite: 5000,
                joursDeRetard: 2,
                idContrat:4
            },
            {
                _id: 2,
                sommePenalite: 1000,
                joursDeRetard: 1,
                idContrat:2
            }
        ]
    );

}


async function createPenalite(client, valeur) {
    const result = await client.db("location").collection("penalite").insertMany(valeur);
    console.log(`Les penalite ont été inserée`);

}

async function createOnePenalite(client, valeur) {
    const result = await client.db("location").collection("penalite").insertOne(valeur);
    console.log(`Les penalite ont été inserée ${result.insertedId}` );

}

async function checkForPenalites(client) {
    const res = await client.db("location").collection("contratLocation").find({"dateFin": {"$lt": new Date().toISOString()}});
    const tax = await res.toArray();
    let vehiculesPenalite = [];
    for (const result of tax) {
        // console.log(result);
        for (let i = 0; i < result.vehicule.SUV.length; i++) {
            // console.log(result.vehicule.SUV[i]);
            const suvResult = await client.db("location").collection("vehicule").findOne({"_id": result.vehicule.SUV[i]});
            if (suvResult.etatVehicule === "loue")
                vehiculesPenalite.push({
                    "idContrat": result._id,
                    "joursDeRetard" : utils.getDaysDifferenceFromToday(result.dateFin),
                    "vehicule": suvResult
                });
            // console.log(suvResult);
        }
        for (let i = 0; i < result.vehicule.voiture.length; i++) {
            // console.log(result.vehicule.SUV[i]);
            const voitureResult = await client.db("location").collection("vehicule").findOne({"_id": result.vehicule.voiture[i]});
            if (voitureResult.etatVehicule === "loue")
                vehiculesPenalite.push({
                    "idContrat": result._id,
                    "joursDeRetard" : utils.getDaysDifferenceFromToday(result.dateFin),
                    "vehicule": voitureResult
                });
            // console.log(voitureResult);
        }
        for (let i = 0; i < result.vehicule.fourgonettes.length; i++) {
            // console.log(result.vehicule.SUV[i]);
            const fourgResult = await client.db("location").collection("vehicule").findOne({"_id": result.vehicule.fourgonettes[i]});
            if (fourgResult.etatVehicule === "loue")
                vehiculesPenalite.push({
                    "idContrat": result._id,
                    "joursDeRetard" : utils.getDaysDifferenceFromToday(result.dateFin),
                    "vehicule": fourgResult
                });
            // console.log(fourgResult);
        }
    }
    console.log(vehiculesPenalite);
    return vehiculesPenalite;

}

async function isVoitureLoue(client, idVoiture) {
    const test = client.db('location').collection('vehicule').aggregate([
        {
            '$match': {
                'modele': 2
            }
        }, {
            '$group': {
                '_id': '$etatVehicule'
            }
        }
    ]);
    for await (let doc of test) {
        console.log(doc);
    }
}

module.exports = {insertPenalite, createOnePenalite};