const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// The replacement was duplicated!
code = code.replace('cat_campaign: "Campaña",\n    gallery_subtitle: "Una selección de proyectos en los que trabajé como Director, Diseñador de Sonido y Editor."\n    gallery_subtitle: "Una selección de proyectos en los que trabajé como Director, Diseñador de Sonido y Editor."', 'cat_campaign: "Campaña",\n    gallery_subtitle: "Una selección de proyectos en los que trabajé como Director, Diseñador de Sonido y Editor."');

code = code.replace('cat_campaign: "Campaign",\n    gallery_subtitle: "A curated selection of projects where I served as a Director, Sound Designer and Editor."\n    gallery_subtitle: "A curated selection of projects where I served as a Director, Sound Designer and Editor."', 'cat_campaign: "Campaign",\n    gallery_subtitle: "A curated selection of projects where I served as a Director, Sound Designer and Editor."');

code = code.replace('cat_campaign: "Campanha",\n    gallery_subtitle: "Uma seleção de projetos onde atuei como Diretor, Designer de Som e Editor."\n    gallery_subtitle: "Uma seleção de projetos onde atuei como Diretor, Designer de Som e Editor."', 'cat_campaign: "Campanha",\n    gallery_subtitle: "Uma seleção de projetos onde atuei como Diretor, Designer de Som e Editor."');

fs.writeFileSync('script.js', code);
