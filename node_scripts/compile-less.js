const fs = require('fs');
const path = require('path');
const less = require('less');

const scriptDirectory = __dirname; // Chemin du répertoire du script
const inputDirectory = path.join(scriptDirectory, '..', 'less'); // Chemin du répertoire "less"
const outputDirectory = path.join(scriptDirectory, '..', 'css'); // Chemin du répertoire "css"

// Lire tous les fichiers .less dans le répertoire d'entrée
fs.readdir(inputDirectory, (err, files) => {
    if (err) throw err;

    // Filtrer les fichiers .less
    const lessFiles = files.filter(file => path.extname(file) === '.less');

    // Compiler chaque fichier .less
    lessFiles.forEach(lessFile => {
        const inputFile = path.join(inputDirectory, lessFile);
        const outputFile = path.join(outputDirectory, path.basename(lessFile, '.less') + '.css');

        compileLess(inputFile, outputFile);
    });
});

// Fonction pour compiler un fichier .less en .css
function compileLess(inputFile, outputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;

        less.render(data, (error, output) => {
            if (error) throw error;

            fs.writeFile(outputFile, output.css, err => {
                if (err) throw err;
                console.log(`Fichier ${inputFile} compilé avec succès en ${outputFile}`);
            });
        });
    });
}
