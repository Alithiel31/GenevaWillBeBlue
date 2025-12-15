import express from "express";

// Configuration du serveur Express
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static("public"));

// Configuration de EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Constantes factorisées
const pageTitle = "Gibliohtèque";
let total = `${movies.length}`;

//Route HOME
app.get("/", (req, res)=> {
   
    res.render("home", { 
        
        });
});

// Route MOVIES
app.get("/movies", (req, res)=> {
    const movieData = movies;
    res.render("movies", {
        pageTitle: pageTitle,
        movieData, total});
});

// Route MOVIE DETAIL
app.get("/movies/:id", (req, res)=> {
    const filmId = parseInt( req.params.id);
    const film = movies.find(f => f.id === filmId);
    if(!film){
        return res.status(404).render("404", {
            filmId: filmId,
            pageTitle: "Film non trouvé"
        });
    } else
    res.render("movie", {
        movie: film, pageTitle: pageTitle, total})
    });

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🚀 Listening at http://localhost:${port}`);
});
