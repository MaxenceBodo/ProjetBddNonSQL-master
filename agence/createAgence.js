const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertAgence(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

//insert().catch(console.dir);

async function insertAgence(client){
    await createSociete(client,[{
        _id:1,
        representant:{
            nom:"Robert",
            prenom:"California",
            tel:"0612714845"
        },
        adresse:{
            voie:"Avenue des papillons",
            numero:41,
            ville:"Rungis",
            pays:"France",
            adresseComplementaire:""
        }
    },{
        _id:2,
        representant:{
            nom:"Mickael",
            prenom:"Scott",
            tel:"0645126354"
        },
        adresse:{
            voie:"place des genéraux",
            numero:13,
            ville:"Londre",
            pays:"Royaume-Uni",
            adresseComplementaire:""
        }
    },{
        _id:3,
        representant:{
            nom:"Jimm",
            prenom:"Halper",
            tel:"0612214845"
        },
        adresse:{
            voie:"Rue des étoiles",
            numero:31,
            ville:"Rungis",
            pays:"France",
            adresseComplementaire:"Etage 4"
        }
    },{
        _id:4,
        representant:{
            nom:"Schrute ",
            prenom:"Dwight",
            tel:"0612710245"
        },
        adresse:{
            voie:"Avenue des grand hommes",
            numero:10,
            ville:"Houilles",
            pays:"France",
            adresseComplementaire:""
        }
    }])
}

async function createSociete(client, valeur) {
    const result = await client.db("location").collection("agence").insertMany(valeur);
    console.log(`Les agences ont été inséré`);
}

module.exports= {insertAgence};