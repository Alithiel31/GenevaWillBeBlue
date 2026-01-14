import express from "express";
import "dotenv/config"; 


// Importations des données
import anomalyFaqs from "./data/dataAnomalyFaq.js";
import travelRawData from "./data/dataComingGva.js";
import generalFaqs from "./data/dataGeneralFaq.js";

const app = express();
// Utilisez la variable d'environnement ou 3000 par défaut
const port = process.env.PORT || 3000;

// Configuration
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const pageTitle = "Geneva Will Be Blue";

// --- ROUTES ---

// 1. Accueil
app.get("/", (req, res) => {
    res.render("home", { pageTitle });
});

// 2. Coming to Geneva (Transformation des données complexes en HTML)
app.get("/coming-to-geneva", (req, res) => {
    const travelOptions = travelRawData.map(option => {
        let htmlContent = "";
        if (option.content.paragraphs) {
            htmlContent = option.content.paragraphs.map(p => `<p>${p}</p>`).join("");
        } else if (option.id === "stay") {
            htmlContent = `<p>${option.content.intro}</p>
                           <p>${option.content.pricing_info}</p>
                           <ul>` + 
                           option.content.budget_options.map(h => `<li><a href="${h.url}" target="_blank">${h.name}</a></li>`).join("") + 
                           `</ul>
                           <p><strong>Campsite:</strong> <a href="${option.content.camping.url}" target="_blank">${option.content.camping.name}</a> : ${option.content.camping.description}</p>
                           ${option.content.benefits.map(b => `<p>${b}</p>`).join("")}
                           <p>${option.content.commute_info}</p>`;
        }
        return {
            id: option.id,
            icon: option.icon,
            label: option.title,
            content: htmlContent
        };
    });

    res.render("travel", { pageTitle: "Travel Info", travelOptions });
});

// 3. Anomaly FAQ (Gestion de l'état 'active' pour l'accordéon)
app.get("/anomaly-faq", (req, res) => {
    const faqs = anomalyFaqs.map((item, index) => ({
        ...item,
        active: index === 0 // Ouvre la première question par défaut
    }));
    res.render("anomalyFaq", { pageTitle: "Anomaly FAQ", faqs });
});

// 4. General FAQ
app.get("/general-faq", (req, res) => {
    res.render("generalFaq", { pageTitle: "General FAQ", generalFaqs });
});

// Route générique pour tout ce qui est en construction
app.get('/coming-soon', (req, res) => {
    res.render('wip'); 
});

// 5. Gestion de l'erreur 404
app.use((req, res) => {
    res.status(404).render("404", { pageTitle: "404 - Portal Severed" });
});

app.listen(port, () => {
    console.log(`
    -------------------------------------------
    🚀 Serveur lancé : http://localhost:${port}
    📂 Mode : Ingress Anomaly Geneva 2026
    -------------------------------------------
    `);
});


