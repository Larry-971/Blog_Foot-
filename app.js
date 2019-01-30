var express = require('express');

var app = express();
var bodyParser = require('body-Parser');
var mongodb = require('mongodb');

//Config gestion de fichier static
app.use('/asset', express.static('asset'));

//Config body-Parser
app.use(bodyParser.urlencoded({extended : true}));

//Config du gestionnaire de templates
app.set('views', './views');
app.set('view engine', 'ejs');

//Config de la connexion à la base de donnée
var mc = mongodb.MongoClient;
var url = "mongodb://localhost:27017/mesArticlesSport";

//Connexion à ma base de donnée
app.get("/", function(){
   mc.connect(url, {useNewUrlParser:true}, function(err, mongo_db) {
       if(err){
           console.log(err);
       }else{
           console.log("Connexion réussie à la base de donnée : " + mongo_db);
       };
       //Fermé la base de donnée
       mongo_db.close();
   }) 
});

//--------------------------Mes Différentes Reqêtes------------------------------

//Appel vers ma page Contact
app.get('/connexion', function(req, res){
    res.render('admin/connexion')
});

//Appel vers ma page admin.ejs
app.get('/admin', function(req, res){
    mc.connect(url, {useNewUrlParser:true}, function(err, mongo_db){
        var base = mongo_db.db("mesArticlesSport");
        base.collection("articles").find({}).toArray(function (err, resultats) {
            if(err){
                console.log(err);
            }else{
                console.log(resultats);
                res.render("admin/admin", {tabArticles : resultats});
                mongo_db.close();
            }
        });
    });
});

//Appel vers ma page Accueil et affichages des données sur ma page
app.get('/accueil', function(req, res){
    mc.connect(url, {useNewUrlParser:true}, function(err, mongo_db){
        var base = mongo_db.db("mesArticlesSport");
        base.collection("articles").find({}).toArray(function (err, resultats) {
            if(err){
                console.log(err);
            }else{
                console.log(resultats);
                res.render("accueil.ejs", {tabArticles : resultats}); //res.end() mieux ?
                mongo_db.close();
            }
        });
    });
});

//Appel vers ma page Presentation
app.get('/presentation', function(req, res){
    res.render('presentation');
});

//Appel vers ma page Contact
app.get('/contact', function(req, res){
    res.render('contact');
});

//Ajout de nouvel article au click sur le bouton "Ajouter"
app.get('/nouvel_article', function(req, res) {
    res.render('admin/nouvel_article');
});

//Envoie des données dans la base de donnée à la soumission du formulaire
app.post('/nouvel_article', function (req, res) {
    mc.connect(url, {useNewUrlParser:true}, function(err, mongo_db){
        var base = mongo_db.db("mesArticlesSport");
        //Instantion de l'objet(du document) à envoyer dans la base de donnée via un objet javascript
        var nouvelArticle = {
            titre : req.body.titre,
            url : req.body.url,
            contenu : req.body.contenu,
            auteur : req.body.auteur,
            parution : req.body.parution
        };
        //requête pour insérer un nouveau document
        base.collection('articles').insertOne(nouvelArticle, function(err, res){
            if(err){
                console.log(err);
            }else{
                console.log("Votre votre article à bien été ajouté dans la base de donnée !");
                //Fermer la base une fois la requête terminer 
                mongo_db.close();
            };
        }); 
    });
    //Rediriger la page vers la page "admin" une fois la requête effectué avec la methode redirect();
    res.redirect('/admin'); 
});

//Supression d'un article (a revoir)

app.get("/supprimer/:titre",function(req, res) {
    mc.connect(url, {useNewUrlParser:true}, function(err, mongo_db){
        var base = mongo_db.db("mesArticlesSport");
        //paramètre à récupéré afin de supprimer un article = (dcoument de la base de donnée)
        //titre : req.body.titre
        base.collection("articles").remove({titre : req.params.titre}, function(err, obj){
            if(err){
                console.log(err);
            }else{
                console.log("Votre article  à bien été supprimé !");
                mongo_db.close();
            }
        });
    });
    res.redirect('/admin');
});

app.get("/*", function(req, res) {
    res.render("admin/page404");
});

//Insérer un Id
// _id : 0,

//Connexion à notre serveur
app.listen(8082, function (err, res) {
    if(err){
        console.log(err);
    }else{
        console.log("Votre serveur est bien en marche...!");
    };
});