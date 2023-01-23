const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const createV = require('./vehicule/createVehicule');
const createA = require('./agence/createAgence');
const createCB = require('./compteBancaire/createCompte');
const createCL = require('./contratLocation/createContratLocation');
const createPena = require('./penalite/createPenalite');
const createPersMo = require('./personne/morale/createPersonneMorale');
const createPersoPh = require('./personne/physique/createPersonnePhysique');
const createSociete = require('./societe/createSociete');
const createF = require('./facture/createFacture');

const deleteV = require('./vehicule/deleteVehicule');
const deleteA = require('./agence/deleteAgence');
const deleteCB = require('./compteBancaire/deleteCompte');
const deleteCL = require('./contratLocation/deleteContratLocation');
const deletePena = require('./penalite/deletePenalite');
const deletePersMo = require('./personne/morale/deletePersonneMorale');
const deletePersoPh = require('./personne/physique/deletePersonnePhysique');
const deleteSociete = require('./societe/deleteSociete');
const deleteF = require('./facture/deleteFacture');

const operations = require('./operations/clientOperations');

async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();
        //Delete toutes les données pour eviter les problèmes lors d'un premier lancement
        console.log("-----------------------------------------")
        console.log("Suppression des tables")
        await deleteV.deleteAll(client);
        await deleteA.deleteAll(client);
        await deleteCB.deleteAll(client);
        await deleteCL.deleteAll(client);
        await deletePena.deleteAll(client);
        await deletePersMo.deleteAll(client);
        await deletePersoPh.deleteAll(client);
        await deleteSociete.deleteAll(client);
        await deleteF.deleteAll(client);
        
        console.log('\n');
        console.log('\n');

        // //Creation dans la table
        console.log("-----------------------------------------");
        console.log("Creation des tables");
        await ajoutVehicule(client);
        await createA.insertAgence(client);
        await createCB.insertComptesBancaires(client);
        await createPersMo.insertPersonnesMorales(client);
        await createPersoPh.insertPersonnesPhysiques(client);
        await createSociete.insertSociete(client);
        await createF.insertFacture(client)
        console.log('\n');
        console.log('\n');

        //LOUER VEHICULE
        await operations.louerVehicule(client, 1, 1, "morale", [3, 125, 192, 260], "2022/03/20", "2022/04/01", 1);
        await operations.louerVehicule(client, 2, 2, "morale", [4, 126, 193, 260, 261, 262], "2022/03/20", "2022/04/10", 1);
        await operations.louerVehicule(client, 3, 3, "morale", [2, 100], "2022/01/14", "2022/03/25", 1);
        await operations.louerVehicule(client, 4, 1, "physique", [6, 105, 255], "2022/03/14", "2022/04/20", 1);
        await operations.louerVehicule(client, 5, 1, "physique", [7, 107, 256, 257], "2022/03/14", "2022/04/20", 1);

        //L'ENTREPRISE "ABC" PERSONNE MORALE AVEC L'ID -> 4
        await operations.louerVehicule(client, 6, 4, "morale", [30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 60, 61, 62, 63, 64], "2022/03/01", "2022/03/25", 1);

        //RENDRE VEHICULE
        await operations.rendreVehicule(client, 1);
        await operations.rendreVehicule(client, 2);
        await operations.rendreVehicule(client, 3);
        await operations.rendreVehicule(client, 4);
        await operations.rendreVehicule(client, 5);

        // //L'ENTREPRISE "ABC" PERSONNE MORALE AVEC L'ID -> 4
        //EXERCICE 5 (d)
        await operations.rendreVehicule(client, 6);

        console.log("-----------------------------------------");
        console.log("Fonction agregation", "\n");

        console.log("Deux premiers mois");
        await profitDeuxPremiersMois(client);
        console.log("\n");

        console.log("Deux derniers mois");
        await profitDeuxDerniersMois(client);
        console.log("\n");

        console.log("Cout total du client ABC");
        await coutTotal(client, 6);
        console.log("\n");


    } catch (error) {
        console.log(error)
    } finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);

/*
  3. Mettre en place un petit générateur des données pour permettre d'insérer uniquemenet les données des voitures
*/
async function ajoutVehicule(client) {
    let ajout;
    //Ajout SUV
    for (let i = 1; i < 51; i++) {
        ajout = {
            _id: i,
            anneMiseEnService: entierAleatoire(2011, 2021),
            kilometrage: entierAleatoire(20000, 150000),
            etatVehicule: "non loue",
            marque: choixMarque(),
            modele: {
                _id: 1,
                nom: "SUV",
                prixJour: 100
            },
            agence: 1
        };
        await createV.createVehiculeOne(client, ajout)
    }

    //Ajout voiture
    for (let i = 51; i < 251; i++) {
        ajout = {
            _id: i,
            anneMiseEnService: entierAleatoire(2011, 2021),
            kilometrage: entierAleatoire(20000, 150000),
            etatVehicule: "non loue",
            marque: choixMarque(),
            modele: {
                _id: 2,
                nom: "voiture",
                prixJour: 70
            },
            agence: 1
        };
        await createV.createVehiculeOne(client, ajout)
    }

    //Ajout Fourgonette
    for (let i = 251; i < 271; i++) {
        ajout = {
            _id: i,
            anneMiseEnService: entierAleatoire(2011, 2021),
            kilometrage: entierAleatoire(20000, 150000),
            etatVehicule: "non loue",
            marque: choixMarque(),
            modele: {
                _id: 3,
                nom: "fourgonette",
                prixJour: 120
            },
            agence: 1
        };
        await createV.createVehiculeOne(client, ajout)
    }
}

//Sert pour varier les donnes dans les vehicules
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Sert a choisir aleatoirement une marque pour une plus grande variete dans vehicule
function choixMarque() {
    let marque = ["BMW", "Audi", "Tesla", "Peugeot"]
    return marque[entierAleatoire(0, 3)]
}

/*
  4.En utilisant un Drivers (Au choix, Java ou NodeJS), ecrire les differentes fonctions qui permettent de faire 
  les operations du CRUD sur le loueur, le reservant et sur le contrat de location.
*/
//Voir dossier './agence', './personne' et './contratLocation'


/*
  5. En utilisant les operateurs d’agregations, ecrire des fonctions via des drivers qui permettent de faire les operations ci-apres
*/

//Agregation 1 : Permet aux loueurs de pouvoir calculer ses profits cumul´es sur les deux premiers mois.
async function profitDeuxPremiersMois(client) {
    const test = client.db('location').collection('facture').aggregate([
        {
            '$match': {
                'dateFacture': {
                    '$gte': '2021-10-01',
                    '$lte': '2021-11-31'
                }
            }
        }, {
            '$group': {
                '_id': 0,
                'total': {
                    '$sum': '$montant'
                }
            }
        }
    ])
    for await (const doc of test) {
        console.log(doc);
    }
}

//Agregation 2 : Permet aux loueurs de pouvoir calculer ses profits cumul´es sur les deux derniers mois.
async function profitDeuxDerniersMois(client) {
    const test = client.db('location').collection('facture').aggregate([
        {
            '$match': {
                'dateFacture': {
                    '$gte': decalageDate(2)
                }
            }
        }, {
            '$group': {
                '_id': 0,
                'total': {
                    '$sum': '$montant'
                }
            }
        }
    ])
    for await (const doc of test) {
        console.log(doc);
    }
}

function decalageDate(decalage) {
    let date = new Date();
    date.setMonth(date.getMonth() - decalage);
    return date.toISOString();
}


//Agregation 4 :

async function coutTotal(client, idContrat) {
    const test = client.db('location').collection('facture').aggregate([
        {
            '$match': {
                'idContrat': idContrat
            }
        },
        {
            '$lookup': {
                'from': 'penalite',
                'localField': 'idContrat',
                'foreignField': 'idContrat',
                'as': 'penalite'
            }
        },
        {
            '$unwind': {
                'path': '$penalite',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            "$group": {
                _id: 0,
                amount: {$sum: {$add: ['$montant', {$ifNull: ['$penalite.sommePenalite', 0]}]}}
            }
        }
    ])
    for await (const doc of test) {
        console.log(doc);
    }
}

async function agregation(client, idLocation) {
    const test1 = client.db('location').collection('contratLocation').find({_id: idLocation}, {_id: 0, vehicule: 1});
    const priceSUV = await client.db('location').collection('modele').find({nom: "SUV"});
    const priceVoiture = client.db('location').collection('modele').find({nom: "voiture"});
    const priceFourgonette = client.db('location').collection('modele').find({nom: "fourgonette"});

    let listeVoiture;
    let prixSuv;
    let prixVoiture;
    let prixFourgonette;

    for await (const doc of test1) {
        listeVoiture = doc["vehicule"]
    }

    for await (const doc of priceSUV) {
        prixSuv = doc["prixModele"]
    }
    for await (const doc of priceVoiture) {
        prixVoiture = doc["prixModele"]
    }
    for await (const doc of priceFourgonette) {
        prixFourgonette = doc["prixModele"]
    }

    let totalSansPenalite = listeVoiture["SUV"].length * prixSuv + listeVoiture["voiture"].length * prixVoiture + listeVoiture["fourgonettes"].length * prixFourgonette;
    console.log("total =", total)
}