import express from "express";

// Configuration du serveur Express
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static("public"));

// Configuration de EJS
app.set("view engine", "ejs");
app.set("views", "./views");


//Route HOME
app.get("/", (req, res)=> {
   
    res.render("home", { 
        
        });
});

// Road Coming in Geneva



// Road Discover Geneva
app.get("/discover", (req, res)=> {
    res.render("", {
       
    });
});


// Road Discover Locals foodies 

app.get("/foodie", (req, res)=> {
    res.render("", {
       
    });
});

// Road Inscription
app.get("/inscription", (req, res)=> {
  
      res.render("", {
       
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🚀 Listening at http://localhost:${port}`);
});
