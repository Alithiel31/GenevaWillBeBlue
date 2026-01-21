// build.js
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';

// Import your data
import anomalyFaqData from './data/dataAnomalyFaq.js';
import generalFaqData from './data/dataGeneralFaq.js';
import comingData from './data/dataComingGva.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CONFIGURATION
const distDir = path.join(__dirname, 'dist');
const viewsDir = path.join(__dirname, 'views');

// Define pages to build
const pages = [
    {
        template: 'home.ejs',
        output: 'index.html',
        data: {}
    },
    {
        template: 'anomalyFaq.ejs',
        output: 'anomaly-faq.html',
        data: { faqs: anomalyFaqData }
    },
    {
        template: 'generalFaq.ejs',
        output: 'general-faq.html',
        data: { generalFaqs: generalFaqData }
    },
    {
        template: 'travel.ejs',
        output: 'coming-to-geneva.html',
        data: { travelOptions: comingData.map(item => {
            let content;
            if (item.content.paragraphs) {
                content = item.content.paragraphs.map(p => `<p>${p}</p>`).join('');
            } else {
                // for stay
                content = `<p>${item.content.intro}</p><p>${item.content.pricing_info}</p>` +
                    item.content.budget_options.map(opt => `<p><a href="${opt.url}">${opt.name}</a></p>`).join('') +
                    `<p><a href="${item.content.camping.url}">${item.content.camping.icon} ${item.content.camping.name}</a>: ${item.content.camping.description}</p>` +
                    item.content.benefits.map(b => `<p>${b}</p>`).join('');
            }
            return { ...item, label: item.title, content };
        }) }
    },
    {
        template: '404.ejs',
        output: '404.html',
        data: {}
    }
];

async function build() {
    try {
        // Create dist directory
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // Build each page
        for (const page of pages) {
            const templatePath = path.join(viewsDir, page.template);
            const outputPath = path.join(distDir, page.output);

            // Check if template exists
            if (!fs.existsSync(templatePath)) {
                console.error(`Error: Template not found at ${templatePath}`);
                continue;
            }

            // Read the EJS template
            const template = fs.readFileSync(templatePath, 'utf-8');

            // Render HTML with data
            const html = ejs.render(template, page.data, { root: viewsDir, filename: templatePath });

            // Write the static HTML file
            fs.writeFileSync(outputPath, html);

            console.log(`✅ Generated: ${page.output}`);
        }

        // Copy static assets
        const publicDir = path.join(__dirname, 'public');
        const picDir = path.join(__dirname, 'pic');

        if (fs.existsSync(publicDir)) {
            fse.copySync(publicDir, path.join(distDir, 'public'));
            console.log('✅ Copied public assets');
        }

        if (fs.existsSync(picDir)) {
            fse.copySync(picDir, path.join(distDir, 'pic'));
            console.log('✅ Copied pic assets');
        }

        console.log(`\n🎉 Full static website generated successfully in: ${distDir}`);
        console.log('You can now host the entire dist/ folder on any static server.');

    } catch (error) {
        console.error('Build failed:', error);
    }
}

build();
