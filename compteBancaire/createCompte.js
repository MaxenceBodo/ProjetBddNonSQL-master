const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function insert() {
    try {
        await client.connect();
        await insertComptesBancaires(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

//insert().catch(console.dir);

async function insertComptesBancaires(client) {
    await createManyComptes(client, [
        {
            _id:1,
            nomBanque: "BNP",
            IBAN: "FR24 1432 5356 9729 9842 0929 Z15",
            BIC: "CRYPLTK"
        },
        {
            _id:2,
            nomBanque: "Credit Mutuel",
            IBAN: "FR24 1432 9537 9729 7894 1235 S13",
            BIC: "CRYGBJT"
        },
        {
            _id:3,
            nomBanque: "LCL",
            IBAN: "FR24 2456 8765 3445 7653 2346 Z15",
            BIC: "ASDFGJH"
        },
        {
            _id:4,
            nomBanque: "BNP",
            IBAN: "FR24 6543 2343 2345 8764 4342 Z15",
            BIC: "GHYBRE"
        },
        {
            _id:5,
            nomBanque: "BNP",
            IBAN: "FR24 6765 2343 5433 3453 7675 Z15",
            BIC: "JHTRERW"
        },
        {
            _id:6,
            nomBanque: "La Societe Generale",
            IBAN: "FR24 3243 4565 6234 8767 4342 Z15",
            BIC: "SDFGHHTR"
        },
        {
            _id:7,
            nomBanque: "La Caisse d'Epargne",
            IBAN: "FR24 3456 6456 2344 9876 4342 Z15",
            BIC: "DFHGYYR"
        }
    ])

}


async function createManyComptes(client, valeur) {
    const result = await client.db("location").collection("compteBancaire").insertMany(valeur);
    console.log(`Les comptes ont été inséré`);

}

module.exports = {insertComptesBancaires}