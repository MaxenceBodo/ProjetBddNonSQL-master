const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertContratLocation(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

// insert().catch(console.dir);

async function insertContratLocation(client) {
    await createManyContratLocations(client, [
            {
                _id: 1,
                dateDebut: new Date("2022-03-01").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-04-01").toISOString(),
                personne: {
                    idPersonne: 1,
                    typePersonne: "morale"
                },
                agence: 1,
                vehicule: {
                    "SUV": [10, 12, 17, 19],
                    "voiture": [],
                    "fourgonettes": []
                },
                etatContrat: "en cours",
                clauseLocation: "Texte tres long"
            }, {
                _id: 2,
                dateDebut: new Date("2021-10-13").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2021-10-15").toISOString(),
                personne: {
                    idPersonne: 2,
                    typePersonne: "morale"
                },
                agence: 1,
                vehicule: {
                    "SUV": [45],
                    "voiture": [68],
                    "fourgonettes": []
                },
                etatContrat: "en cours",
                clauseLocation: "Texte tres long"
            }, {
                _id: 3,
                dateDebut: new Date("2022-01-13").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-02-23").toISOString(),
                personne: {
                    idPersonne: 1,
                    typePersonne: "physique"
                },
                agence: 1,
                vehicule: {
                    "SUV": [32],
                    "voiture": [67],
                    "fourgonettes": []
                },
                etatContrat: "en cours",
                clauseLocation: "Texte tres long"
            }, {
                _id: 4,
                dateDebut: new Date("2021-11-23").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2021-11-28").toISOString(),
                personne: {
                    idPersonne: 1,
                    typePersonne: "physique"
                },
                agence: 4,
                vehicule: {
                    "SUV": [],
                    "voiture": [79, 80],
                    "fourgonettes": []
                },
                etatContrat: "en cours",
                clauseLocation: "Texte tres long"
            }, {
                _id: 5,
                dateDebut: new Date("2022-03-22").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-03-23").toISOString(),
                personne: {
                    idPersonne: 3,
                    typePersonne: "physique"
                },
                agence: 1,
                vehicule: {
                    "SUV": [],
                    "voiture": [81, 82, 83, 84, 85],
                    "fourgonettes": [252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263]
                },
                etatContrat: "en cours",
                clauseLocation: "Texte tres long"
            },{
                _id: 20,
                dateDebut: new Date("2021-10-25").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2021-10-27").toISOString(),
                personne: {
                    idPersonne: 3,
                    typePersonne: "physique"
                },
                agence: 1,
                vehicule: {
                    "SUV": [],
                    "voiture": [94],
                    "fourgonettes": [264]
                },
                etatContrat: "termine",
                clauseLocation: "Texte tres long"
            },{
                _id: 21,
                dateDebut: new Date("2021-11-05").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-11-06").toISOString(),
                personne: {
                    idPersonne: 3,
                    typePersonne: "physique"
                },
                agence: 1,
                vehicule: {
                    "SUV": [48],
                    "voiture": [],
                    "fourgonettes": []
                },
                etatContrat: "termine",
                clauseLocation: "Texte tres long"
            }
        ]
    );
}


async function createManyContratLocations(client, valeur) {
    const result = await client.db("location").collection("contratLocation").insertMany(valeur);
    console.log(`Les contrats ont été insérés`);

}

async function createContratLocations(client, valeur) {
    const result = await client.db("location").collection("contratLocation").insertOne(valeur);
    console.log(`Le contrat a été inséré avec l'id ${result.insertedId}`);
    return result.insertedId;

}

async function getTheMontantAPayer(dateDebut, dateFin, idVehicule) {

}

async function getPrixJourVehicule(idVehicule) {


}

module.exports = {insertContratLocation, createContratLocations}