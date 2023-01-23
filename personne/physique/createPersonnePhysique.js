const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertPersonnesPhysiques(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

// insert().catch(console.dir);


async function insertPersonnesPhysiques(client) {
    await createManyPersonnes(client, [{
            _id: 1,
            nom: "Bodo",
            prenom: "Maxence",
            sexe: "M",
            age: 25,
            email: "bodo@gmail.com",
            adresse: {
                voie: "Rue abc",
                numero: 20,
                ville: "Villejuif",
                pays: "France",
                adresseComplementaire: ""
            },
            compteBancaire: [1]
        },
            {
                _id: 2,
                nom: "Coutanceau",
                prenom: "Fabien",
                sexe: "M",
                age: 23,
                email: "fabien@gmail.com",
                adresse: {
                    voie: "Rue abc",
                    numero: 13,
                    ville: "Paris",
                    pays: "France",
                    adresseComplementaire: ""
                },
                compteBancaire: [2]
            },
            {
                _id: 3,
                nom: "Joti",
                prenom: "Anxhela",
                sexe: "F",
                age: 23,
                email: "joti@gmail.com",
                adresse: {
                    voie: "Rue abc",
                    numero: 23,
                    ville: "Clichy",
                    pays: "France",
                    adresseComplementaire: ""
                },
                compteBancaire: [3]
            }]
    );

}


async function createManyPersonnes(client, valeur) {
    const result = await client.db("location").collection("personnesPhysiques").insertMany(valeur);
    console.log(`Inserted personnes ${result.insertedIds}`);

}

async function createPersonne(client, valeur) {
    const result = await client.db("location").collection("personnesPhysiques").insertOne(valeur);
    console.log(`La personne est inserée avec l'id: ${result.insertedId}`);
}

module.exports = {insertPersonnesPhysiques}