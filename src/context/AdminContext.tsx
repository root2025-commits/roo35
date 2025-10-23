import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/context/AdminContext.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/context/AdminContext.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const createContext = __vite__cjsImport3_react["createContext"]; const useContext = __vite__cjsImport3_react["useContext"]; const useReducer = __vite__cjsImport3_react["useReducer"]; const useEffect = __vite__cjsImport3_react["useEffect"];
const EMBEDDED_CONFIG = {
  "version": "2.1.0",
  "prices": {
    "moviePrice": 80,
    "seriesPrice": 300,
    "transferFeePercentage": 10,
    "novelPricePerChapter": 5
  },
  "deliveryZones": [
    {
      "name": "Santiago de Cuba > Vista Hermosa",
      "cost": 400,
      "id": 1759549448776,
      "createdAt": "2025-10-04T03:44:08.776Z",
      "updatedAt": "2025-10-04T03:44:08.776Z"
    },
    {
      "name": "Santiago de Cuba > Antonio Maceo",
      "cost": 400,
      "id": 1759549461376,
      "createdAt": "2025-10-04T03:44:21.376Z",
      "updatedAt": "2025-10-04T03:44:21.376Z"
    },
    {
      "name": "Santiago de Cuba > Centro de la ciudad",
      "cost": 250,
      "id": 1759549473488,
      "createdAt": "2025-10-04T03:44:33.488Z",
      "updatedAt": "2025-10-04T03:44:33.488Z"
    },
    {
      "name": "Santiago de Cuba > Versalles Hasta el Hotel",
      "cost": 500,
      "id": 1759549486736,
      "createdAt": "2025-10-04T03:44:46.736Z",
      "updatedAt": "2025-10-04T03:44:46.736Z"
    },
    {
      "name": "Santiago de Cuba > Carretera del Morro",
      "cost": 300,
      "id": 1759549499552,
      "createdAt": "2025-10-04T03:44:59.552Z",
      "updatedAt": "2025-10-04T03:44:59.552Z"
    },
    {
      "name": "Santiago de Cuba > Altamira",
      "cost": 400,
      "id": 1759549511664,
      "createdAt": "2025-10-04T03:45:11.664Z",
      "updatedAt": "2025-10-04T03:45:11.664Z"
    },
    {
      "name": "Santiago de Cuba > Cangrejitos",
      "cost": 350,
      "id": 1759549521424,
      "createdAt": "2025-10-04T03:45:21.424Z",
      "updatedAt": "2025-10-04T03:45:21.424Z"
    },
    {
      "name": "Santiago de Cuba > Trocha",
      "cost": 250,
      "id": 1759549534560,
      "createdAt": "2025-10-04T03:45:34.560Z",
      "updatedAt": "2025-10-04T03:45:34.560Z"
    },
    {
      "name": "Santiago de Cuba > Veguita de Galo",
      "cost": 300,
      "id": 1759549546912,
      "createdAt": "2025-10-04T03:45:46.912Z",
      "updatedAt": "2025-10-04T03:45:46.912Z"
    },
    {
      "name": "Santiago de Cuba > Plaza de Martes",
      "cost": 250,
      "id": 1759549558e3,
      "createdAt": "2025-10-04T03:45:58.000Z",
      "updatedAt": "2025-10-04T03:45:58.000Z"
    },
    {
      "name": "Santiago de Cuba > Portuondo",
      "cost": 300,
      "id": 1759549569112,
      "createdAt": "2025-10-04T03:46:09.112Z",
      "updatedAt": "2025-10-04T03:46:09.112Z"
    },
    {
      "name": "Santiago de Cuba > Sta Barbara",
      "cost": 300,
      "id": 1759549580560,
      "createdAt": "2025-10-04T03:46:20.560Z",
      "updatedAt": "2025-10-04T03:46:20.560Z"
    },
    {
      "name": "Santiago de Cuba > Sueño",
      "cost": 250,
      "id": 1759549592112,
      "createdAt": "2025-10-04T03:46:32.112Z",
      "updatedAt": "2025-10-04T03:46:32.112Z"
    },
    {
      "name": "Santiago de Cuba > San Pedrito",
      "cost": 150,
      "id": 1759549603696,
      "createdAt": "2025-10-04T03:46:43.696Z",
      "updatedAt": "2025-10-04T03:46:43.696Z"
    },
    {
      "name": "Santiago de Cuba > Agüero",
      "cost": 100,
      "id": 1759549615848,
      "createdAt": "2025-10-04T03:46:55.848Z",
      "updatedAt": "2025-10-04T03:46:55.848Z"
    },
    {
      "name": "Santiago de Cuba > Distrito Jose Martí",
      "cost": 150,
      "id": 1759549627504,
      "createdAt": "2025-10-04T03:47:07.504Z",
      "updatedAt": "2025-10-04T03:47:07.504Z"
    },
    {
      "name": "Santiago de Cuba > Los Pinos",
      "cost": 200,
      "id": 1759549638272,
      "createdAt": "2025-10-04T03:47:18.272Z",
      "updatedAt": "2025-10-04T03:47:18.272Z"
    },
    {
      "name": "Santiago de Cuba > Quintero",
      "cost": 500,
      "id": 1759549649480,
      "createdAt": "2025-10-04T03:47:29.480Z",
      "updatedAt": "2025-10-04T03:47:29.480Z"
    },
    {
      "name": "Santiago de Cuba > 30 de noviembre bajo",
      "cost": 400,
      "id": 1759549660904,
      "createdAt": "2025-10-04T03:47:40.904Z",
      "updatedAt": "2025-10-04T03:47:40.904Z"
    },
    {
      "name": "Santiago de Cuba > Rajayoga",
      "cost": 600,
      "id": 1759549668800,
      "createdAt": "2025-10-04T03:47:48.800Z",
      "updatedAt": "2025-10-04T03:47:48.800Z"
    },
    {
      "name": "Santiago de Cuba > Pastorita",
      "cost": 600,
      "id": 1759549676760,
      "createdAt": "2025-10-04T03:47:56.760Z",
      "updatedAt": "2025-10-04T03:47:56.760Z"
    },
    {
      "name": "Santiago de Cuba > Vista Alegre",
      "cost": 300,
      "id": 1759549686896,
      "createdAt": "2025-10-04T03:48:06.896Z",
      "updatedAt": "2025-10-04T03:48:06.896Z"
    },
    {
      "name": "Santiago de Cuba > Caney",
      "cost": 1e3,
      "id": 1759549696240,
      "createdAt": "2025-10-04T03:48:16.240Z",
      "updatedAt": "2025-10-04T03:48:16.240Z"
    },
    {
      "name": "Santiago de Cuba > Nuevo Vista Alegre",
      "cost": 100,
      "id": 1759549706888,
      "createdAt": "2025-10-04T03:48:26.888Z",
      "updatedAt": "2025-10-04T03:48:26.888Z"
    },
    {
      "name": "Santiago de Cuba > Marimón",
      "cost": 100,
      "id": 1759549715521,
      "createdAt": "2025-10-04T03:48:35.521Z",
      "updatedAt": "2025-10-04T03:48:35.521Z"
    },
    {
      "name": "Santiago de Cuba > Versalle Edificios",
      "cost": 800,
      "id": 1759549729736,
      "createdAt": "2025-10-04T03:48:49.736Z",
      "updatedAt": "2025-10-04T03:48:49.736Z"
    },
    {
      "name": "Santiago de Cuba > Ferreiro",
      "cost": 300,
      "id": 1759549738720,
      "createdAt": "2025-10-04T03:48:58.720Z",
      "updatedAt": "2025-10-04T03:48:58.720Z"
    },
    {
      "name": "Santiago de Cuba > 30 de noviembre altos",
      "cost": 500,
      "id": 1759549747952,
      "createdAt": "2025-10-04T03:49:07.952Z",
      "updatedAt": "2025-10-04T03:49:07.952Z"
    }
  ],
  "novels": [
    {
      "titulo": "Alaca",
      "genero": "Drama",
      "capitulos": 120,
      "año": 2024,
      "descripcion": "La vida de una joven se ve destrozada cuando le roban un riñón durante un violento secuestro, organizado por su rico padre biológico, que necesita un donante. Mientras busca respuestas, descubre el secreto que cambió su vida y se enfrenta a la traición de Kenan, el amor de su vida, cuyas complicadas lealtades ponen a prueba su vínculo.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/alaca2.jpg",
      "estado": "finalizada",
      "id": 1759547587158,
      "createdAt": "2025-10-04T03:13:07.158Z",
      "updatedAt": "2025-10-12T01:07:19.900Z"
    },
    {
      "titulo": "Salvaje (Yabani)",
      "genero": "Drama",
      "capitulos": 20,
      "año": 2023,
      "descripcion": "Salvaje novela turca, Yaman es un joven que ha vivido en las calles desde que tiene uso de razón. Ha tenido una vida dura, teniendo que luchar para sobrevivir y encontrar comida. Afortunadamente, siempre ha tenido a su lado tres amigos que se convirtieron en su familia, Cesur, Asi y Umut.\n\nSe cruzaron cuando eran apenas unos niños y a partir de ahí no se separaron. De manera inexplicable ninguno sabe nada de su pasado o porque están en la calle, sin importar su pasado o traumas decidieron confiar entre ellos y seguir adelante.\n\nLa gran preocupación del grupo es cumplir con el tratamiento de Umut, quien no puede caminar y el “Doctor milagro” es su única esperanza, pero el médico vive en el extranjero y ve a pocos pacientes una vez al año cuando llega al país. \n\nYaman cometerá el mayor error de su vida, entrando a una mansión que probablemente podría ser la de su familia, pero se le cae la cara de vergüenza ya que ha atacado a quien sería su hermano y apuñalado a su madre. Ahora su familia y la policía lo buscan.\n\nLa vida de Yaman comenzará a dar un giro inesperado cuando se cruce con Ates y su novia Ruya. Estos salían de un club nocturno. A partir de ahí una serie de eventos golpearán la vida de Yaman y lo llevarán al límite. Salvaje serie turca.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/yabani.jpg",
      "estado": "transmision",
      "id": 1759547831629,
      "createdAt": "2025-10-04T03:17:11.629Z",
      "updatedAt": "2025-10-12T01:11:41.187Z"
    },
    {
      "titulo": "El Turco",
      "genero": "Romance",
      "capitulos": 6,
      "año": 2024,
      "descripcion": "Tras ser traicionado y condenado a muerte, logra escapar y es curado por los aldeanos del pintoresco pueblo italiano de Moena, ubicado en los Alpes. A medida que se recupera, Balaban, al que apodan 'El Turco', se convierte en protector del pueblo, resistiendo las opresivas cargas impositivas de su señor feudal. Con el tiempo, la lucha se intensifica y, cuando un antiguo enemigo del protagonista, el implacable caballero Marco, aparece, comienza la batalla decisiva.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/el+turco.jpg",
      "estado": "finalizada",
      "id": 1759547886013,
      "createdAt": "2025-10-04T03:18:06.013Z",
      "updatedAt": "2025-10-12T01:09:31.363Z"
    },
    {
      "titulo": "A.mar, donde el amor teje sus redes",
      "genero": "Romance",
      "capitulos": 90,
      "año": 2025,
      "descripcion": "Estrella, madre soltera, regresa al pequeño pueblo pesquero de su juventud tras la muerte de su padre. Se enamora de Fabián, padre viudo y pescador, y se enfrenta a un huracán de problemas que ponen en riesgo el bienestar de sus familias.",
      "pais": "México",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/A.mar%2C+donde+el+amor+teje+sus+redes.jpg",
      "estado": "finalizada",
      "id": 1759548453473,
      "createdAt": "2025-10-04T03:27:33.473Z",
      "updatedAt": "2025-10-04T03:27:33.473Z"
    },
    {
      "titulo": "Amor en blanco y negro ES (Siyah Beyaz Ask)",
      "genero": "Romance",
      "capitulos": 64,
      "año": 2017,
      "descripcion": "Amor en Blanco y Negro novela turca es protagonizada por Ferhat Aslan, un joven que tiene un empleo que no todos pueden cumplir. Él es un asesino que trabaja para Namik, quien es su tío. Namik es el líder de los Emirham. La otra protagonista de esta serie es Asli Cinar, una neurocirujana que adora su empleo. Un día, no regresará a casa y será secuestrada por sus habilidades con el bisturí. Tendrá que salvarle la vida a un hombre al que Ferhat agredió. Sorprendida por los hechos, se convertirá en testigo de ese crimen, y reconocerá al infame Namik Emirham.\n\nSerá allí cuando Namik desarrolle desconfianza hacia la mujer, y es que además de ser un mafioso, es uno de los benefactores más importantes del hospital en dónde trabaja Asli. Namik le dará la misión a Ferhat de asesinar a la testigo, pero no podrá completarla, y le ofrecerá a Asli la opción de morir o contraer matrimonio con él. Resultará que el hermano de nuestra protagonista es policía, y está investigando casos de corrupción, en los que se incluye a los Emirham. Se llevará a cabo la boda, pero Namik jamás creerá que el amor floreció entre su sobrino y la neurocirujana.\n\nSeguirán con su matrimonio falso en Amor en Blanco y Negro serie turca, y poco a poco, Asli dejará de sentir miedo hacia Ferhat.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/amor+en+blanco+y+negro+2.jpg",
      "estado": "finalizada",
      "id": 1759548589366,
      "createdAt": "2025-10-04T03:29:49.366Z",
      "updatedAt": "2025-10-12T01:07:40.100Z"
    },
    {
      "titulo": "Amor perfecto",
      "genero": "Romance",
      "capitulos": 60,
      "año": 2023,
      "descripcion": "Amor perfecto novela brasileña, Mare es una joven visionaria, regresa a su pueblo natal en 1934 para tomar las riendas del hotel familiar. Sus sueños se ven truncados cuando su padre, cegado por los prejuicios, la obliga a casarse con Gaspar, un hombre malvado y sin escrúpulos. La ambición desmedida de Gilda, la madrastra de Mare, la lleva a conspirar con Gaspar para deshacerse de Leonel, el padre de Mare, y culpar a la joven de su muerte.\n\nMare es encarcelada injustamente y da a luz en la cárcel. Tras ocho años en prisión, finalmente cumple su condena en el año 1942, sale de prisión con un solo objetivo, vengarse de quienes la traicionaron y recuperar a su hijo perdido.\n\nEn su camino, Mare se reencuentra con Orlando, un médico que la amó en el pasado y que ahora está dispuesto a luchar por ella. Juntos, se enfrentan a los poderosos de Sao Jacinto. Mientras tanto Marcelino, es hijo de Orlando y Mare, se ha criado en un monasterio, a cargo de Fray León, quien se ha convertido en una figura paterna para el joven.\n\nGilda se ha convertido en una mujer poderosa e influyente, Mare hará todo en sus manos para recuperar su vida, reencontrarse con su hijo y vengarse de aquellos que le hicieron daño. Amor perfecto telenovela brasileña. ",
      "pais": "Brasil",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Amor+Perfecto.jpg",
      "estado": "finalizada",
      "id": 1759548723639,
      "createdAt": "2025-10-04T03:32:03.639Z",
      "updatedAt": "2025-10-16T07:53:21.464Z"
    },
    {
      "titulo": "Holding",
      "genero": "Drama",
      "capitulos": 20,
      "año": 2024,
      "descripcion": "La campeona mundial de apnea, Aydan Türker, se prepara para una nueva inmersión récord. Aydan no solo es una atleta exitosa; es una mujer emprendedora que ha entregado su corazón a los niños. Todos los ingresos que obtiene de su gran pasión, el buceo, los dedica a mantener en pie las escuelas que fundó, incluyendo aquellas que atienden a niños con necesidades educativas especiales. Uno de esos colegios le traerá a su vida a F?rat y al comisario Kerem. Uno de los principales patrocinadores de Aydan Türker es Alt?nordu Holding, uno de los grupos empresariales más grandes del país. Bajo el liderazgo de Osman Alt?nordu y con el impulso de sus hijas Ebru, Ceyda y Sema, la empresa crece día a día con una imagen impecable. Sin embargo, detrás de ese brillante rostro se esconden luchas de poder, conflictos familiares y un pasado oscuro. Como todo gran poder, Alt?nordu Holding también tiene grandes enemigos. Su adversario más peligroso es Mahir Beyo?lu, cómplice de aquel pasado oscuro. El viejo amigo y compañero de Osman, Zakir, tendrá que jugar con astucia para detener a Mahir. En medio de este caos, Osman descubre que padece una enfermedad incurable. Al borde de una ruptura total, se encuentra frente a la necesidad de enfrentarse al secreto mejor guardado de su vida: su hija, y con ello, a toda su familia. Para esa confrontación, Osman elige el mismo día en que Aydan romperá su nuevo récord. Ese día marcará el inicio de un viaje sin retorno para todos.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Holding.jpg",
      "estado": "finalizada",
      "id": 1759548810927,
      "createdAt": "2025-10-04T03:33:30.927Z",
      "updatedAt": "2025-10-16T07:49:47.713Z"
    },
    {
      "titulo": "La realeza",
      "genero": "Romance",
      "capitulos": 8,
      "año": 2025,
      "descripcion": "'La realeza' presenta una historia romántica que trasciende clichés. La trama gira en torno al encuentro entre Sophia, una empresaria moderna, y Aviraaj, un príncipe con un legado en decadencia. Él posee una mansión ancestral que necesita ser restaurada, pero carece de los fondos necesarios. Ella ve en ese lugar la oportunidad perfecta para lanzar su nueva empresa. Así, ambos deciden colaborar, aunque sus diferencias culturales y personales amenazan con arruinar todo. \n\nEl encantador príncipe Aviraaj conoce a Sofía, una empresaria hecha a sí misma, y los mundos de la realeza y las startups chocan en una apasionada tormenta de romance y ambición",
      "pais": "India",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/la+realeza.jpg",
      "estado": "finalizada",
      "id": 1759548887343,
      "createdAt": "2025-10-04T03:34:47.343Z",
      "updatedAt": "2025-10-12T01:10:39.531Z"
    },
    {
      "titulo": "Valentina, mi amor especial",
      "genero": "Romance",
      "capitulos": 39,
      "año": 2024,
      "descripcion": "En Valentina, mi amor especial, Herrera encarna a una joven en el espectro autista, quien es un genio en el mundo de la tecnología. El papel masculino principal es interpretado por Mauricio Novoa, un actor mexicano en ascenso, conocido por sus actuaciones en las últimas telenovelas producidas en Miami.\n\nValentina ha crecido protegida de la sociedad por su madre adoptiva en el pequeño pueblo de Chiquilistlán, donde destacó académicamente. Mudarse a la gran ciudad de Guadalajara después de que su madre fallece en un accidente será muy difícil, ya que se enfrentará lo peor y lo mejor de la humanidad: se enamorará por primera vez, conocerá nuevos amigos, pero también la envidia y los celos de aquellos que eligen no aceptarla.",
      "pais": "México",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Valentina%2C+mi+amor+especial.jpg",
      "estado": "finalizada",
      "id": 1759549070923,
      "createdAt": "2025-10-04T03:37:50.923Z",
      "updatedAt": "2025-10-16T12:40:22.316Z"
    },
    {
      "titulo": "Bahar",
      "genero": "Drama",
      "capitulos": 109,
      "año": 2024,
      "descripcion": "Hace 20 años, se graduó de la facultad de medicina pero decidió ser ama de casa en lugar de seguir la carrera de medicina. Está casada con el exitoso cirujano Timur Yavuzoglu y ha dedicado su vida a su marido y a sus hijos. La aparentemente feliz familia Yavuzoglu está conmocionada por la enfermedad de Bahar. El médico de Bahar, Evren, está decidido a salvarla y dice que la única solución es un trasplante de hígado. ¡El único hígado compatible de la familia pertenece a Timur! Para la familia Yavuzoglu, que se somete a una prueba con un umbral importante, nada volverá a ser lo mismo…",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Bahar2.jpg",
      "estado": "transmision",
      "id": 1759906090446,
      "createdAt": "2025-10-08T06:48:10.446Z",
      "updatedAt": "2025-10-12T00:58:39.140Z"
    },
    {
      "titulo": "Amanecer",
      "genero": "Romance",
      "capitulos": 67,
      "año": 2025,
      "descripcion": "La telenovela gira en torno a Leonel Carranza (Fernando Colunga), un hombre que vive en Villa Escarlata y es propietario de la hacienda Montoro. Su rutina cambia por completo cuando su esposa (interpretada por Andrea Legarreta) y su mejor amigo desaparecen juntos, dejándolo lleno de ira y desilusión al punto de darlos por muertos, lo cual podría traerle graves consecuencias en el futuro.\n\nAunque intenta rehacer su vida, sufre una nueva tragedia: su hija Paulina pierde la vida en un incendio. Leonel jura vengarse, convencido de que no se trató de un accidente, sino de un acto provocado por la familia Palacios.\n\nPara saciar su sed de revancha, obliga a Alba Palacios (Livia Brito) a casarse con él. Ella accede al matrimonio con tal de apoyar a sus padres, quienes atraviesan una fuerte crisis económica.\n\nPronto, la joven se ve envuelta en una relación sin afecto y bajo las amenazas de Atocha (Ana Belena), la hermana de Leonel. Ella es una mujer despiadada y ambiciosa, que desea quedarse con la hacienda Montoro, sin importar las consecuencias.\n\nA medida que Alba intenta ganarse el respeto de los habitantes de Villa Escarlata y de la finca, Leonel comienza a cuestionar su odio, pues ella parece todo menos culpable de la tragedia que marcó su vida.\n\nLa tensión aumenta con la llegada de Sebastián Peñalosa (Daniel Elbittar), un médico que, bajo el argumento de atender la salud de Leonel, comienza a acercarse a Alba con una fijación peligrosa creando un tríangulo romántico muy potente. Además, él guarda un misterio que podría cambiar el rumbo de la protagonista.\n\nA lo largo de la trama, Leonel y Alba experimentarán una mezcla de dolor, deseo y confusión, que podría evolucionar en una conexión profunda, mientras que quienes los rodean intentarán alimentar el rencor entre ellos.",
      "pais": "México",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Amanecer+2.jpg",
      "estado": "transmision",
      "id": 1759906188156,
      "createdAt": "2025-10-08T06:49:48.156Z",
      "updatedAt": "2025-10-12T00:57:45.117Z"
    },
    {
      "titulo": "Amor y Esperanza",
      "genero": "Drama",
      "capitulos": 106,
      "año": 2022,
      "descripcion": "Cuenta la historia de Ali Tahir, quien nació en Tesalónica en 1893 y cayó mártir en Sakarya en 1921. Sin embargo, ocurrió un evento milagroso cuando Ali abrió los ojos nuevamente. Desde ese día ha vivido 100 años sin envejecer un solo día. Sin embargo, después de todo lo que ha pasado, Ali decide acabar con su vida. \n\nZeynep, que trabajó en condiciones difíciles en Edremit y se preparó para el examen universitario, finalmente se convirtió en la quinta en Turquía y ganó el departamento de derecho de la universidad de su elección. Zeynep, que sueña con mudarse a Estambul con su madre para ir a la universidad, desconoce la desgracia de su madre Gönül.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Amor+y+Esperanza.jpg",
      "estado": "transmision",
      "id": 1759906259323,
      "createdAt": "2025-10-08T06:50:59.323Z",
      "updatedAt": "2025-10-12T00:58:14.693Z"
    },
    {
      "titulo": "Corazón Negro",
      "genero": "Drama",
      "capitulos": 53,
      "año": 2024,
      "descripcion": "A una edad temprana, Sumru abandonó a sus gemelos recién nacidos sin ni siquiera llegar a tenerlos en sus brazos. Se mudó a Capadocia con su madre, Nihayet, donde se casó con Samet ?ansalan, un hombre rico y prominente en la industria del turismo de la ciudad. Tuvieron dos hijos. Samet también tenía un hijo llamado Cihan de su primer matrimonio.\n\nCriados en circunstancias difíciles, los gemelos, Nuh y Melek, alimentados por el odio hacia la madre que los abandonó, descubren la identidad de su madre. Llegan a Capadocia para reclamar lo que creen que les corresponde y enfrentarse a su madre. Sorprendida, Sumru lo niega todo, pero es consciente de que es solo cuestión de tiempo antes de que se revele el secreto que ha escondido. Las cosas también son complicadas en la mansión de los ?ansalan. La cuñada viuda de Sumru, Hikmet, vive en la mansión con su hija Sevilay. Su objetivo es casar a su hija con su sobrino Cihan y asegurar su futuro. Samet, también apoya este plan.\n\nMientras los gemelos persiguen lo que creen que les corresponde de su madre, Melek se cruza en el camino de Cihan, y Nuh encuentra a Sevilay. Desde el primer momento, Cihan se ve profundamente afectado por Melek y no puede sacársela de la cabeza, incluso cuando se encuentra al borde de un matrimonio forzado. Mientras tanto, Sevilay intenta oponerse al matrimonio por su cuenta, y se cruza en su camino Nuh.\n\nAunque Sumru intenta mantener a los hijos que rechazó alejados de su familia, Melek y Nuh gradualmente se infiltrarán tanto en la familia como en los corazones de Cihan y Sevilay. Mientras los problemas de salud de Samet preocupan a toda la familia, su viejo enemigo, Tahsin, espera en la sombra, listo para vengarse del pasado.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/corazon+negro+-+siyah+kalp.jpg",
      "estado": "transmision",
      "id": 1759994099585,
      "createdAt": "2025-10-09T07:14:59.585Z",
      "updatedAt": "2025-10-12T01:08:26.084Z"
    },
    {
      "titulo": "El olor de un niño",
      "genero": "Drama",
      "capitulos": 36,
      "año": 2017,
      "descripcion": "eyno, una joven enfermera en Ámsterdam queda embarazada del hombre al que ama, soñando con formar una familia feliz. Pero un momento de ira cambia su destino para siempre, alejándola de su hijo y entrelazando su vida con la poderosa familia Akba?, líder del sector energético en Turquía. Mientras los conflictos de poder y las tensiones familiares sacuden a los Akba?, Zeyno, marcada por la pérdida, se transforma en una mujer fuerte y decidida. Esta es la historia de una madre que lucha por recuperar a su hijo, de un hombre que enfrenta su conciencia, y de secretos que podrían cambiarlo todo.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/el+olor+de+un+ni%C3%B1o+2.jpg",
      "estado": "finalizada",
      "id": 1759994252937,
      "createdAt": "2025-10-09T07:17:32.937Z",
      "updatedAt": "2025-10-12T01:08:50.076Z"
    },
    {
      "titulo": "Velvet el nuevo imperio",
      "genero": "Drama",
      "capitulos": 38,
      "año": 2025,
      "descripcion": "“Velvet, el nuevo imperio” se centra en Ana Velázquez, una talentosa diseñadora mexicana que llega a la empresa de moda Velvet en Nueva York tras perder a su madre.\n\nAllí, se enamora de Alberto Márquez, heredero de la compañía, pero su relación se ve frustrada por intrigas y un matrimonio por conveniencia con Cristina Ortegui.\n\nEntonces, eventualmente, Alberto desaparece y Ana continúa su carrera mientras espera a su hijo.\n\nTres años después, resulta que el destino los reúne nuevamente. Así, superando mentiras y obstáculos, ambos recuperan su amor y fundan una nueva empresa que celebra el legado de Velvet y su futuro en familia...",
      "pais": "Estados Unidos",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Velvet+el+nuevo+imperio+2.jpg",
      "estado": "transmision",
      "id": 1760000176983,
      "createdAt": "2025-10-09T08:56:16.983Z",
      "updatedAt": "2025-10-12T01:06:34.820Z"
    },
    {
      "titulo": "Kuma la otra esposa",
      "genero": "Drama",
      "capitulos": 81,
      "año": 2025,
      "descripcion": "Una joven acusada injustamente de asesinato debe convertirse en la segunda esposa (Kuma) del hermano de la víctima. Ceylan es una hija amable y cumplidora, pero cuando su padre intenta venderla como segunda esposa o “kuma”, ella huye. En su camino se encuentra con Karan, un joven empresario adinerado que acoge a Ceylan bajo su protección. Ambos se enamoran, pero cuando Ceylan es acusada falsamente del asesinato del hermano de Karan, el amor se transforma en odio. Karan se casa con la viuda de su hermano fallecido y obliga a Ceylan a convertirse en su kuma. Atrapada en una casa donde todos la odian y sin poder regresar a casa, la única esperanza de Ceylan es demostrar su inocencia y, tal vez, recuperar el amor de Karan.\n\n“Kuma” te atrapa de inmediato con una historia impactante: Ceylan, una joven inocente, es acusada injustamente de un asesinato que no cometió. Para escapar de un destino cruel, se ve forzada a casarse con Karan, el hermano de la supuesta víctima, convirtiéndose en su segunda esposa. Desde el primer episodio, la telenovela te sumerge en un torbellino de emociones, donde la lucha por la verdad y la supervivencia se entrelazan. ¿Cómo logrará Ceylan probar su inocencia mientras enfrenta un matrimonio impuesto y un entorno lleno de rechazo?\n\nLa tensión sube cuando Ceylan entra en la vida de Karan y su primera esposa, Sema, quien la desprecia y la considera una rival. Los enfrentamientos entre ellas son solo la punta del iceberg: la familia guarda secretos oscuros que se revelan poco a poco, dejando más preguntas que respuestas. Cada capítulo te mantiene expectante, descubriendo las verdaderas intenciones de los personajes y las traiciones que acechan en cada esquina. ¿Qué enigmas saldrán a la luz y cómo cambiarán el rumbo de la vida de Ceylan?\n\n“Kuma” no solo es drama; también te ofrece una poderosa historia de amor y superación. Mientras Ceylan enfrenta hostilidad y desafíos, encuentra apoyo en los lugares más inesperados y comienza a florecer un romance que desafía todas las probabilidades. A lo largo de la serie, la ves transformarse de una mujer vulnerable a una luchadora decidida, lista para reclamar su lugar en el mundo. ¿Podrá el amor sobrevivir en un entorno tan hostil y llevará a Ceylan a encontrar su verdadera fuerza?\n\nCon los majestuosos paisajes del este de Turquía como telón de fondo, “Kuma” es un espectáculo visual que acompaña una narrativa emocionante. La telenovela combina temas profundos como la injusticia y la resiliencia con giros inesperados que te dejarán ansioso por el próximo episodio. Es una invitación a seguir el viaje de Ceylan hacia la redención, lleno de misterio, pasión y esperanza. Si buscas una historia que te haga sentir, reflexionar y mantenerte al borde del asiento, “Kuma” te está esperando para que descubras qué pasa después. ",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Kuma+La+otra+esposa.jpg",
      "estado": "transmision",
      "id": 1760000320843,
      "createdAt": "2025-10-09T08:58:40.843Z",
      "updatedAt": "2025-10-12T01:03:19.396Z"
    },
    {
      "titulo": "Cautiva por amor",
      "genero": "Drama",
      "capitulos": 70,
      "año": 2025,
      "descripcion": "Jazmín, secuestrada por el terrateniente Remigio Fuentes, sobrevive esclavitud y abusos. Años después, regresa al rancho buscando venganza a través de su hijo Fernando, pero conoce a Santiago, un peón que finge ser policía.",
      "pais": "México",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/cautiva+por+amor.jpg",
      "estado": "finalizada",
      "id": 1760022250390,
      "createdAt": "2025-10-09T15:04:10.390Z",
      "updatedAt": "2025-10-12T01:08:04.036Z"
    },
    {
      "titulo": "La chica del momento",
      "genero": "Romance",
      "capitulos": 21,
      "año": 2023,
      "descripcion": "La trama, ambientada en los años 50, gira en torno a Beatriz (Duda Santos, de Renacer), quien ha crecido creyendo que su madre Clarice (Carol Castro de Huérfanos de su tierra) la abandonó cuando tenía cuatro años. Pero 16 años después descubre el paradero de su madre y se entera de que no la abandonó sino que perdió la memoria en un accidente. Pero Beatriz también descubrirá que otra joven, Bia (Maisa), ha tomado su lugar e iniciará un viaje lleno de obstáculos y de reconciliación con el pasado.",
      "pais": "Brasil",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/la+chica+del+momento.jpg",
      "estado": "transmision",
      "id": 1760022506646,
      "createdAt": "2025-10-09T15:08:26.646Z",
      "updatedAt": "2025-10-12T01:09:52.979Z"
    },
    {
      "titulo": "La encrucijada",
      "genero": "Drama",
      "capitulos": 28,
      "año": 2025,
      "descripcion": "César Bravo vuelve de México, casi treinta años después, a la tierra donde nació cuando ya nadie se acuerda del apellido de su padre ni de las trágicas circunstancias que rodearon su muerte y la de sus abuelos. Aunque su aspecto de turista aventurero no lo delata, tiene muy claro a lo que viene.\n\nNo hallará paz hasta que no consiga hacer justicia y meter en la cárcel a Octavio Oramas, el hombre que se apropió de la historia familiar de su padre y de todo lo que le pertenecía para crear su propio imperio. Con lo que no cuenta César es que en su camino se cruzará Amanda Oramas, la niña de los ojos de su enemigo, de quien se enamorará perdidamente. Un cruce de caminos fortuito que marca un antes y un después en la vida de dos familias rivales. ¿Qué vencerá: el amor o la venganza?[",
      "pais": "España",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/La+encrucijada.jpg",
      "estado": "transmision",
      "id": 1760022601366,
      "createdAt": "2025-10-09T15:10:01.366Z",
      "updatedAt": "2025-10-12T01:03:45.252Z"
    },
    {
      "titulo": "Leyla",
      "genero": "Drama",
      "capitulos": 32,
      "año": 2024,
      "descripcion": "Después de perderlo todo, Leyla renació entre las sombras. La inocencia se quebró el día en que su padre cayó rendido ante los encantos de Nur, la mujer que alguna vez fingió cuidar de su familia… y que ahora, convertida en su madrastra, oculta más de un secreto detrás de su sonrisa. Cuando el amor ciega, la tragedia abre los ojos. Y Leyla lo aprendió demasiado tarde.\n\nAños más tarde, regresa bajo una nueva identidad. Nadie sospecha que esa talentosa chef llamada Ela es en realidad la hija que vio su hogar convertirse en ruinas. Ni siquiera Nur, quien ahora vive rodeada de lujos junto a su nuevo amante, una leyenda caída del fútbol. Pero el destino no olvida… y tampoco perdona.\n\nEl reencuentro con Civan —el hijo adoptivo de Nur y antiguo amor de infancia de Leyla— desata una tormenta de emociones, mentiras y heridas que jamás cerraron. A medida que las piezas del pasado empiezan a encajar, las preguntas se multiplican como cuchillos en la espalda:\n\n¿Puede la venganza sobrevivir al amor? ¿Quién es realmente víctima… y quién el verdadero villano? ¿Hasta dónde está dispuesta a llegar Leyla para hacer justicia… o para destruirse en el intento? En un juego de identidades, pasiones ocultas y verdades peligrosas… nadie sale ileso.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Leyla+Hayat.jpg",
      "estado": "transmision",
      "id": 1760022763950,
      "createdAt": "2025-10-09T15:12:43.950Z",
      "updatedAt": "2025-10-12T01:05:04.308Z"
    },
    {
      "titulo": "Manía de ti",
      "genero": "Drama",
      "capitulos": 111,
      "año": 2024,
      "descripcion": "Narra la historia de Luna (Moreira) y Viola (Gabz), dos chicas que se convierten en amigas cuando la segunda se instala en Angra dos Reis junto a su marido Mavi. Con el tiempo, Viola se destaca en la gastronomía, misma área de Luna y también se involucra con Rudá (Chay Suede), el hombre al que Luna ama. Años después, Viola se ha convertido en una éxitosa chef, mientras Luna perdió todo lo que tenía. Ambas rivales se unen para intentar liberar a Rudá de la cárcel, tras una trampa ocasionada por Mavi.",
      "pais": "Brasil",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/mania+de+ti2.jpg",
      "estado": "finalizada",
      "id": 1760022873950,
      "createdAt": "2025-10-09T15:14:33.950Z",
      "updatedAt": "2025-10-16T07:50:24.024Z"
    },
    {
      "titulo": "Monteverde",
      "genero": "Drama",
      "capitulos": 81,
      "año": 2025,
      "descripcion": "‘Monteverde’ es un melodrama donde los habitantes de este pequeño pueblo vivirán el amor, la traición y la redención mientras descubren el amor y la verdad.\n\nMonteverde' narra la vida de Carolina (África Zavala), que cambiará radicalmente al ser acusada de un fraude que cometió su marido. Por ello debe salir huyendo con su hijo Andrés (Juniel García) y adoptar la identidad de Celeste, su hermana melliza que es monja, para refugiarse en dicho pueblo, pero todo se complicará cuando conoce a Oscar León (Gabriel Soto).\n\nAlejandro Ibarra, Cynthia Klitbo, Mario Morán, Arturo Carmona, Marialicia Delgado, Oscar Bonfiglio, Fernanda Urdapilleta, Aldo Guerra, Ana Patricio Rojo, Christian Ramos, Ara Saldívar, Rodrigo Ríos, Juniel García, Manuel Riguezza, Marcela Guzmán, Ana Karen Parra, Ximena Martínez, Fernanda Bernal y Claudia Acosta complementan el reparto.",
      "pais": "México",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/monte+verde.jpg",
      "estado": "transmision",
      "id": 1760023005510,
      "createdAt": "2025-10-09T15:16:45.510Z",
      "updatedAt": "2025-10-12T01:15:11.459Z"
    },
    {
      "titulo": "El padre (Ben Bu Cihana)",
      "genero": "Drama",
      "capitulos": 224,
      "año": 2022,
      "descripcion": "Cezayir Türk, un asesino del servicio secreto que sirvió a su país, se venga de su hermano, quien fue saboteado. Empieza una nueva vida demostrando que murió por el bien del estado y la seguridad de su familia. A raíz de una lesión sufrida durante una de sus operaciones en el extranjero, conoce a Firuze, uno de los médicos sin fronteras. Aunque extraña a su esposa e hijos, en el fondo de su corazón sabe que volver con ellos es casi imposible; sin embargo, esta palabra no está en su vocabulario. Se enamora de Firuze para formar una familia; mientras tanto, queda expuesto y tiene que regresar a Estambul. Ni su familia secundaria lo sabe, ni la familia original, que lloró y rezó en su cementerio, siguió los recientes acontecimientos que le sucedieron. Estambul, por otro lado, no es el mismo lugar de donde partió. Hará todo lo posible por luchar contra las fuerzas extranjeras, aunque también deberá dividir su energía entre dos mujeres que lo aman.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/el+padre.jpeg",
      "estado": "finalizada",
      "id": 1760023297743,
      "createdAt": "2025-10-09T15:21:37.743Z",
      "updatedAt": "2025-10-12T01:09:15.667Z"
    },
    {
      "titulo": "Karsu",
      "genero": "Drama",
      "capitulos": 215,
      "año": 2025,
      "descripcion": "Karsu, el amor de madre nunca se rinde, una serie turca que cuenta la conmovedora historia de una madre resiliente a la que la vida la pone a prueba cuando cree perder a uno de sus hijos y  cuando sufre la infidelidad de su esposo. Un drama que describe la entereza de una mujer frente a las adversidades y que habla del carácter y valentía de una mujer que consigue ser  independiente para asegurar el bienestar de sus hijos. Una historia de lucha, sacrificio y esperanza.\n\nKarsu, no ha tenido una buena relación con su madre y decide alejarse de su familia para casarse con Reha, un hombre al que no ama, y en donde no encuentra felicidad, sin embargo, lucha por mantener su matrimonio por el bien de sus tres hijos.\n\nLas cosas para Karsu se volverán aún más dramáticas cuando, por un descuido de su madre, su hijo Kuzey desaparece,  debido a esto, la relación con su esposo se convierte en un total infierno, pues ahora el único propósito en su vida es encontrar a su hijo. Pasa el tiempo hasta que tres años después de búsqueda infructuosa, da con su paradero.  Ella, en su amor de madre, hace todo lo posible para traerlo de regreso a casa hasta que finalmente lo logra, pero esto hace que su hijo despierte una intensa ira en contra de ella, pues lo separa de Ozan, quien ha sido el hombre que lo ha cuidado durante estos tres años y a quien considera su padre. ¿Logrará ganarse el amor de su hijo?\n\nParalelo a esta situación, Karsu es engañada por su esposo, sufriendo una terrible decepción que la hace tomar la decisión de abandonar su hogar junto a sus hijos. Desesperada, sin tener un lugar a donde ir, se ve obligada a regresar a la casa de su madre, a quien no ve desde hace años, con el único deseo de reconstruir su vida.\n\nOzan se siente atraído por Karsu y su pasión va creciendo con el pasar de los días, a esto se suma al amor que siente por Kuzey, a quien ve como su hijo.\n\nLas cosas se complicarán más cuando Karsu conoce a Atilla, un mafioso que se presenta como escritor, y que  también se siente atraído por ella. Al mismo tiempo, su marido, Reha, de quien está intentando divorciarse, ha prometido hacerle la vida imposible, dejándola sin apoyo económico, además de negarse  a darle el divorcio. ¿Podrá  encontrar el amor?\n\nLa protagonista de esta historia vivirá un viaje de resiliencia y renovación, mientras enfrenta los desafíos de reconstruir su vida y dejar atrás un pasado agobiante.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Karsu%2C+La+Fuerza+de+Una+Madre.jpg",
      "estado": "transmision",
      "id": 1760023410453,
      "createdAt": "2025-10-09T15:23:30.453Z",
      "updatedAt": "2025-10-12T01:02:54.740Z"
    },
    {
      "titulo": "La esclava madre",
      "genero": "Drama",
      "capitulos": 125,
      "año": 2016,
      "descripcion": "Juliana es fruto de la violencia que su madre, Luena, sufrió durante la travesía oceánica a bordo de un navío mercante que tenía como mercancía esclavos. Al cumplir 18 años y conocer la verdad sobre su pasado, Juliana se jura a si misma que jamás dejará que un hombre blanco la toque. Es en ese preciso momento de desesperación que conoce al joven portugués Miguel, un viajante en búsqueda de respuestas sobre el misterio que involucra a la muerte de sus padres.\n\nMiguel será el gran amor de su vida, pero además despertará el interés de Maria Isabel, hija del coronel Custódio. Con la complicidad de su fiel y sarcástica mucama Esméria, Maria Isabel no medirá sus esfuerzos para perjudicar a Juliana, que jamás aceptará el desacato de una esclava.\n\nJuliana también enfrentará un obstáculo muy poderoso: el Comendador Almeida. Al casarse con Teresa por un acuerdo que permitiría sacar a su familia de la ruina financiera, Almeida se convierte en el nuevo señor del Ingenio del Sol. El casamiento de Teresa y Almeida fue el comienzo de una terrible etapa en la vida de Juliana, ya que su nuevo amo se quedará completamente obcecado por ella.\n\nJuliana y Miguel vivirán juntos una intensa historia de amor, y enfrentarán a enemigos poderosos y obstáculos aparentemente difíciles de sobrellevar, como el prejuicio de una época que vive a la sombra de la esclavitud.",
      "pais": "Brasil",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/la+esclava+madre.jpg",
      "estado": "transmision",
      "id": 1760023539558,
      "createdAt": "2025-10-09T15:25:39.558Z",
      "updatedAt": "2025-10-12T01:10:21.787Z"
    },
    {
      "titulo": "Carpinti",
      "genero": "Romance",
      "capitulos": 4,
      "año": 2025,
      "descripcion": "Tras recibir el corazón de Melike Alkan, Asli se adentra en un mundo de dolor, poder y amor prohibido, mientras todos se preguntan si la muerte de Melike fue accidente o asesinato.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Carpinti.jpeg",
      "estado": "transmision",
      "id": 1760118692800,
      "createdAt": "2025-10-10T17:51:32.800Z",
      "updatedAt": "2025-10-12T01:02:15.180Z"
    },
    {
      "titulo": "Betty la fea,la historia continúa",
      "genero": "Romance",
      "capitulos": 18,
      "año": 2024,
      "descripcion": 'Betty la fea,la historia continua novela colombiana, Dos décadas después de conquistar el corazón de Armando Mendoza y transformar el mundo de la moda, Beatriz Pinzón Solano, mejor conocida como "Betty la fea", se enfrenta a nuevos desafíos en su vida personal y profesional.\n\nConvertida en una reconocida empresaria y diseñadora de moda, Betty lidera Ecomoda con mano firme, inspirando a las mujeres con sus creaciones y su visión innovadora. Sin embargo, su matrimonio con Armando, aunque lleno de amor, se ve amenazado por las inseguridades del pasado y la aparición de nuevos rivales en el mundo de los negocios.\n\nAl mismo tiempo, Betty debe lidiar con las nuevas generaciones en Ecomoda. Las jóvenes diseñadoras, influenciadas por las tendencias digitales y la cultura del influencer, desafían la visión tradicional de Betty sobre la moda, generando tensiones y debates en la empresa.\n\nEn medio de estos retos, Betty encuentra apoyo en sus fieles amigos, Marcela y Hugo, quienes la acompañan en sus aventuras y le ofrecen consejos sabios. Además, descubre nuevas aliadas en algunas de las jóvenes diseñadoras que, a pesar de sus diferencias, reconocen el talento y la experiencia de Betty. Betty la fea,la historia continúa telenovela colombiana.',
      "pais": "Colombia",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Betty+la+fea%2Cla+historia+contin%C3%BAa+2.png",
      "estado": "finalizada",
      "id": 1760119057180,
      "createdAt": "2025-10-10T17:57:37.180Z",
      "updatedAt": "2025-10-12T01:00:50.220Z"
    },
    {
      "titulo": "La Venganza de Analía 2",
      "genero": "Drama",
      "capitulos": 67,
      "año": 2025,
      "descripcion": "En una jugada maquiavélica, logra salir de la cárcel para volver a la política, su objetivo es claro: castigar a Analía y convertirse en el presidente de Colombia. Para evitar esto y proteger a los suyos, Analía pondrá en riesgo su vida y se enfrentará a Paulina Peña, aliada de Mejía y asesina profesional.",
      "pais": "Colombia",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Venganza-de-Analia-23.jpg",
      "estado": "finalizada",
      "id": 1760119856700,
      "createdAt": "2025-10-10T18:10:56.700Z",
      "updatedAt": "2025-10-12T01:07:05.252Z"
    },
    {
      "titulo": "Leke",
      "genero": "Romance",
      "capitulos": 30,
      "año": 2019,
      "descripcion": "Leke novela turca tiene como personaje principal a Yasemin, quien se mudó a Alemania y tuvo muchos altibajos. A pesar de ello, no tuvo miedo de embarcarse en una aventura. Lograría ingresar en la escuela de leyes, y deberá trabajar medio tiempo para pagar sus estudios.\n\nDescubriremos que tiene un hermano con discapacidad auditiva,y su única meta es lograr recibir la custodia del joven, quien ha tenido que crecer en un orfanato porque sus padres no quisieron hacerse cargo de él. Igualmente, está ahorrando dinero para costear la operación de su hermano. Conoceremos a otro personaje llamado Cem, quien es el mayor de dos hijos de una familia acaudalada. Su infancia fue traumática, ya que fue testigo de un incidente que hizo que sus padres se divorciaran. Ahora es un hombre talentoso para los negocios, pero su vida personal es otra. No confía fácilmente en las personas y tiene cierto recelo con las mujeres. Sin esperar conocerse, tanto Yasemin como Cem tendrán un encuentro que se producirá en un evento que organizó la compañía de este joven apuesto.\n\nNinguno buscaba este encuentro en Leke serie turca, el cual será el desencadenante de una serie de sucesos que debes descubrir.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Leke.jpg",
      "estado": "finalizada",
      "id": 1760120038067,
      "createdAt": "2025-10-10T18:13:58.067Z",
      "updatedAt": "2025-10-12T01:04:39.012Z"
    },
    {
      "titulo": "Mehmed Sultán de las Conquistas",
      "genero": "Acción",
      "capitulos": 15,
      "año": 2024,
      "descripcion": "En esta apasionante producción, nos adentramos en el corazón del Imperio otomano, en una época cargada de conquistas y luchas por la justicia, para ser testigos del viaje triunfal del joven sultán Mehmed II, cuya inteligencia y valentía lo guiarán en su camino hacia la grandeza.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Mehmed+Sultan+of+Conquests+2.jpg",
      "estado": "finalizada",
      "id": 1760128599656,
      "createdAt": "2025-10-10T20:36:39.656Z",
      "updatedAt": "2025-10-12T01:05:32.420Z"
    },
    {
      "titulo": "Represalias",
      "genero": "Acción",
      "capitulos": 10,
      "año": 2024,
      "descripcion": "Ali Resat, un férreo hombre apegado a sus tradiciones, es liberado tras largos años en prisión gracias a una amnistía. Con la esperanza de reconciliarse con su hijo, quien lo desprecia, y con el deseo de hacer pagar a la mafia todo mal que le hizo, Ali Resat irá en busca de redención... y represalias.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Represalias.jpg",
      "estado": "transmision",
      "id": 1760129254327,
      "createdAt": "2025-10-10T20:47:34.327Z",
      "updatedAt": "2025-10-12T01:06:00.932Z"
    },
    {
      "titulo": "Lazos Rotos (Yalan)",
      "genero": "Drama",
      "capitulos": 95,
      "año": 2024,
      "descripcion": "Yalan novela turca, Melike, una mujer fuerte y resiliente, ha sacrificado 20 años de su vida en prisión para proteger a su hija Elif. Acusada injustamente de un crimen que no cometió, Melike ha soportado el dolor y la soledad con la esperanza de un futuro mejor para su pequeña.\n\nAl fin liberada, Melike regresa a un mundo que ya no reconoce. Su hija Elif ha crecido bajo la tutela de otras personas, y Melike debe luchar para recuperar su lugar en la vida de su hija.\n\nSin embargo, la verdad sobre el crimen que la llevó a prisión no tardará en salir a la luz. Melike se verá envuelta en una red de mentiras, engaños y traiciones que amenazan con destruir su vida y la de su hija.\n\nEn medio de la adversidad, Melike encontrará apoyo en Suna, una joven abogada idealista que cree en su inocencia. Juntas, lucharán por desenmascarar a los verdaderos culpables y restaurar el honor de Melike.\n\nA lo largo de su camino, Melike se enfrentará a poderosos enemigos que no se detendrán ante nada para silenciarla. Deberá utilizar su astucia, su valentía y su determinación para proteger a su hija y descubrir la verdad. Yalan serie turca.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Lazos+Rotos.jpg",
      "estado": "finalizada",
      "id": 1760129966562,
      "createdAt": "2025-10-10T20:59:26.562Z",
      "updatedAt": "2025-10-12T01:04:15.828Z"
    },
    {
      "titulo": "Destino roto",
      "genero": "Drama",
      "capitulos": 121,
      "año": 2022,
      "descripcion": "Melike, que sobrevivió en prisión durante 20 años por el bien de su hija, cayó en medio de una gran mentira cuando fue puesta en libertad. Todas las injusticias y el mal que se le han hecho salen al descubierto ante Melike.",
      "pais": "Turquía",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Destino+roto.jpg",
      "estado": "finalizada",
      "id": 1760239390038,
      "createdAt": "2025-10-12T03:23:10.038Z",
      "updatedAt": "2025-10-12T03:23:10.038Z"
    },
    {
      "titulo": "Dinastia Casillas",
      "genero": "Acción",
      "capitulos": 6,
      "año": 2025,
      "descripcion": "Tras la misteriosa desaparición de Aurelio, Ismael Casillas se ve obligado a enfrentar una despiadada batalla por el legado y la familia. Proteger a los suyos le exige alianzas y sacrificios.",
      "pais": "Estados Unidos",
      "imagen": "https://f005.backblazeb2.com/file/tvalacartaplus/tvalacartaplus/Dinastia+casilla.jpg",
      "estado": "transmision",
      "id": 1760601934996,
      "createdAt": "2025-10-16T08:05:34.996Z",
      "updatedAt": "2025-10-16T08:05:34.996Z"
    }
  ],
  "settings": {
    "version": "2.1.0",
    "autoSync": true,
    "syncInterval": 3e5,
    "enableNotifications": true,
    "maxNotifications": 100,
    "metadata": {
      "totalOrders": 0,
      "totalRevenue": 0,
      "lastOrderDate": "",
      "systemUptime": "2025-10-04T02:55:36.295Z"
    }
  },
  "syncStatus": {
    "lastSync": "2025-10-04T03:49:03.729Z",
    "isOnline": true,
    "pendingChanges": 1
  },
  "exportDate": "2025-10-04T03:49:10.992Z"
};
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};
const initialState = {
  isAuthenticated: false,
  prices: EMBEDDED_CONFIG.prices,
  deliveryZones: EMBEDDED_CONFIG.deliveryZones,
  novels: EMBEDDED_CONFIG.novels,
  notifications: [],
  syncStatus: {
    lastSync: (/* @__PURE__ */ new Date()).toISOString(),
    isOnline: true,
    pendingChanges: 0
  },
  systemConfig: EMBEDDED_CONFIG
};
function adminReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      if (action.payload.username === ADMIN_CREDENTIALS.username && action.payload.password === ADMIN_CREDENTIALS.password) {
        return { ...state, isAuthenticated: true };
      }
      return state;
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    case "UPDATE_PRICES":
      const updatedConfig = {
        ...state.systemConfig,
        prices: action.payload,
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        prices: action.payload,
        systemConfig: updatedConfig,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "ADD_DELIVERY_ZONE":
      const newZone = {
        ...action.payload,
        id: Date.now(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const configWithNewZone = {
        ...state.systemConfig,
        deliveryZones: [...state.systemConfig.deliveryZones, newZone],
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        deliveryZones: [...state.deliveryZones, newZone],
        systemConfig: configWithNewZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "UPDATE_DELIVERY_ZONE":
      const updatedZones = state.deliveryZones.map(
        (zone) => zone.id === action.payload.id ? { ...action.payload, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : zone
      );
      const configWithUpdatedZone = {
        ...state.systemConfig,
        deliveryZones: updatedZones,
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        deliveryZones: updatedZones,
        systemConfig: configWithUpdatedZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "DELETE_DELIVERY_ZONE":
      const filteredZones = state.deliveryZones.filter((zone) => zone.id !== action.payload);
      const configWithDeletedZone = {
        ...state.systemConfig,
        deliveryZones: filteredZones,
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        deliveryZones: filteredZones,
        systemConfig: configWithDeletedZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "ADD_NOVEL":
      const newNovel = {
        ...action.payload,
        id: Date.now(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const configWithNewNovel = {
        ...state.systemConfig,
        novels: [...state.systemConfig.novels, newNovel],
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        novels: [...state.novels, newNovel],
        systemConfig: configWithNewNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "UPDATE_NOVEL":
      const updatedNovels = state.novels.map(
        (novel) => novel.id === action.payload.id ? { ...action.payload, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : novel
      );
      const configWithUpdatedNovel = {
        ...state.systemConfig,
        novels: updatedNovels,
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        novels: updatedNovels,
        systemConfig: configWithUpdatedNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "DELETE_NOVEL":
      const filteredNovels = state.novels.filter((novel) => novel.id !== action.payload);
      const configWithDeletedNovel = {
        ...state.systemConfig,
        novels: filteredNovels,
        lastExport: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        ...state,
        novels: filteredNovels,
        systemConfig: configWithDeletedNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };
    case "ADD_NOTIFICATION":
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        read: false
      };
      return {
        ...state,
        notifications: [notification, ...state.notifications].slice(0, state.systemConfig.settings.maxNotifications)
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map(
          (notification2) => notification2.id === action.payload ? { ...notification2, read: true } : notification2
        )
      };
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: []
      };
    case "UPDATE_SYNC_STATUS":
      return {
        ...state,
        syncStatus: { ...state.syncStatus, ...action.payload }
      };
    case "LOAD_SYSTEM_CONFIG":
      return {
        ...state,
        prices: action.payload.prices,
        deliveryZones: action.payload.deliveryZones,
        novels: action.payload.novels,
        systemConfig: action.payload,
        syncStatus: { ...state.syncStatus, lastSync: (/* @__PURE__ */ new Date()).toISOString(), pendingChanges: 0 }
      };
    case "UPDATE_SYSTEM_CONFIG":
      const newSystemConfig = { ...state.systemConfig, ...action.payload };
      return {
        ...state,
        systemConfig: newSystemConfig
      };
    case "SYNC_STATE":
      return {
        ...state,
        ...action.payload,
        syncStatus: { ...state.syncStatus, lastSync: (/* @__PURE__ */ new Date()).toISOString(), pendingChanges: 0 }
      };
    default:
      return state;
  }
}
const AdminContext = createContext(void 0);
class RealTimeSyncService {
  listeners = /* @__PURE__ */ new Set();
  syncInterval = null;
  storageKey = "admin_system_state";
  configKey = "system_config";
  constructor() {
    this.initializeSync();
  }
  initializeSync() {
    window.addEventListener("storage", this.handleStorageChange.bind(this));
    this.syncInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5e3);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }
  handleStorageChange(event) {
    if ((event.key === this.storageKey || event.key === this.configKey) && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue);
        this.notifyListeners(newState);
      } catch (error) {
        console.error("Error parsing sync data:", error);
      }
    }
  }
  checkForUpdates() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const config = localStorage.getItem(this.configKey);
      if (stored) {
        const storedState = JSON.parse(stored);
        this.notifyListeners(storedState);
      }
      if (config) {
        const configData = JSON.parse(config);
        this.notifyListeners({ systemConfig: configData });
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  broadcast(state) {
    try {
      const syncData = {
        ...state,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(syncData));
      localStorage.setItem(this.configKey, JSON.stringify(state.systemConfig));
      this.notifyListeners(syncData);
    } catch (error) {
      console.error("Error broadcasting state:", error);
    }
  }
  notifyListeners(data) {
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error("Error in sync listener:", error);
      }
    });
  }
  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    window.removeEventListener("storage", this.handleStorageChange.bind(this));
    this.listeners.clear();
  }
}
export function AdminProvider({ children }) {
  _s();
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const [syncService] = React.useState(() => new RealTimeSyncService());
  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem("system_config");
      if (storedConfig) {
        const config = JSON.parse(storedConfig);
        dispatch({ type: "LOAD_SYSTEM_CONFIG", payload: config });
      }
      const stored = localStorage.getItem("admin_system_state");
      if (stored) {
        const storedState = JSON.parse(stored);
        dispatch({ type: "SYNC_STATE", payload: storedState });
      }
    } catch (error) {
      console.error("Error loading initial state:", error);
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("admin_system_state", JSON.stringify(state));
      localStorage.setItem("system_config", JSON.stringify(state.systemConfig));
      syncService.broadcast(state);
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [state, syncService]);
  useEffect(() => {
    const unsubscribe = syncService.subscribe((syncedState) => {
      if (JSON.stringify(syncedState) !== JSON.stringify(state)) {
        dispatch({ type: "SYNC_STATE", payload: syncedState });
      }
    });
    return unsubscribe;
  }, [syncService, state]);
  useEffect(() => {
    return () => {
      syncService.destroy();
    };
  }, [syncService]);
  const login = (username, password) => {
    dispatch({ type: "LOGIN", payload: { username, password } });
    const success = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
    if (success) {
      addNotification({
        type: "success",
        title: "Inicio de sesión exitoso",
        message: "Bienvenido al panel de administración",
        section: "Autenticación",
        action: "login"
      });
    }
    return success;
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    addNotification({
      type: "info",
      title: "Sesión cerrada",
      message: "Has cerrado sesión correctamente",
      section: "Autenticación",
      action: "logout"
    });
  };
  const updatePrices = (prices) => {
    dispatch({ type: "UPDATE_PRICES", payload: prices });
    addNotification({
      type: "success",
      title: "Precios actualizados",
      message: "Los precios se han actualizado y sincronizado automáticamente",
      section: "Precios",
      action: "update"
    });
    broadcastChange({ type: "prices", data: prices });
  };
  const addDeliveryZone = (zone) => {
    dispatch({ type: "ADD_DELIVERY_ZONE", payload: zone });
    addNotification({
      type: "success",
      title: "Zona de entrega agregada",
      message: `Se agregó la zona "${zone.name}" y se sincronizó automáticamente`,
      section: "Zonas de Entrega",
      action: "create"
    });
    broadcastChange({ type: "delivery_zone_add", data: zone });
  };
  const updateDeliveryZone = (zone) => {
    dispatch({ type: "UPDATE_DELIVERY_ZONE", payload: zone });
    addNotification({
      type: "success",
      title: "Zona de entrega actualizada",
      message: `Se actualizó la zona "${zone.name}" y se sincronizó automáticamente`,
      section: "Zonas de Entrega",
      action: "update"
    });
    broadcastChange({ type: "delivery_zone_update", data: zone });
  };
  const deleteDeliveryZone = (id) => {
    const zone = state.deliveryZones.find((z) => z.id === id);
    dispatch({ type: "DELETE_DELIVERY_ZONE", payload: id });
    addNotification({
      type: "warning",
      title: "Zona de entrega eliminada",
      message: `Se eliminó la zona "${zone?.name || "Desconocida"}" y se sincronizó automáticamente`,
      section: "Zonas de Entrega",
      action: "delete"
    });
    broadcastChange({ type: "delivery_zone_delete", data: { id } });
  };
  const addNovel = (novel) => {
    dispatch({ type: "ADD_NOVEL", payload: novel });
    addNotification({
      type: "success",
      title: "Novela agregada",
      message: `Se agregó la novela "${novel.titulo}" y se sincronizó automáticamente`,
      section: "Gestión de Novelas",
      action: "create"
    });
    broadcastChange({ type: "novel_add", data: novel });
  };
  const updateNovel = (novel) => {
    dispatch({ type: "UPDATE_NOVEL", payload: novel });
    addNotification({
      type: "success",
      title: "Novela actualizada",
      message: `Se actualizó la novela "${novel.titulo}" y se sincronizó automáticamente`,
      section: "Gestión de Novelas",
      action: "update"
    });
    broadcastChange({ type: "novel_update", data: novel });
  };
  const deleteNovel = (id) => {
    const novel = state.novels.find((n) => n.id === id);
    dispatch({ type: "DELETE_NOVEL", payload: id });
    addNotification({
      type: "warning",
      title: "Novela eliminada",
      message: `Se eliminó la novela "${novel?.titulo || "Desconocida"}" y se sincronizó automáticamente`,
      section: "Gestión de Novelas",
      action: "delete"
    });
    broadcastChange({ type: "novel_delete", data: { id } });
  };
  const addNotification = (notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };
  const markNotificationRead = (id) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id });
  };
  const clearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
    addNotification({
      type: "info",
      title: "Notificaciones limpiadas",
      message: "Se han eliminado todas las notificaciones del sistema",
      section: "Notificaciones",
      action: "clear"
    });
  };
  const exportSystemConfig = () => {
    try {
      addNotification({
        type: "info",
        title: "Exportación de configuración iniciada",
        message: "Generando archivo de configuración JSON...",
        section: "Sistema",
        action: "export_config_start"
      });
      const completeConfig = {
        ...state.systemConfig,
        version: "2.1.0",
        lastExport: (/* @__PURE__ */ new Date()).toISOString(),
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels,
        metadata: {
          ...state.systemConfig.metadata,
          totalOrders: state.systemConfig.metadata.totalOrders,
          totalRevenue: state.systemConfig.metadata.totalRevenue,
          lastOrderDate: state.systemConfig.metadata.lastOrderDate,
          systemUptime: state.systemConfig.metadata.systemUptime
        }
      };
      const configJson = JSON.stringify(completeConfig, null, 2);
      dispatch({
        type: "UPDATE_SYSTEM_CONFIG",
        payload: { lastExport: (/* @__PURE__ */ new Date()).toISOString() }
      });
      addNotification({
        type: "success",
        title: "Configuración exportada",
        message: "La configuración JSON se ha exportado correctamente",
        section: "Sistema",
        action: "export_config"
      });
      return configJson;
    } catch (error) {
      console.error("Error exporting system config:", error);
      addNotification({
        type: "error",
        title: "Error en la exportación de configuración",
        message: "No se pudo exportar la configuración JSON",
        section: "Sistema",
        action: "export_config_error"
      });
      return "";
    }
  };
  const exportCompleteSourceCode = async () => {
    try {
      addNotification({
        type: "info",
        title: "Exportación de código fuente iniciada",
        message: "Generando sistema completo con código fuente...",
        section: "Sistema",
        action: "export_source_start"
      });
      try {
        const { generateCompleteSourceCode } = await import("/src/utils/sourceCodeGenerator.ts");
        await generateCompleteSourceCode(state.systemConfig);
      } catch (importError) {
        console.error("Error importing source code generator:", importError);
        throw new Error("No se pudo cargar el generador de código fuente");
      }
      addNotification({
        type: "success",
        title: "Código fuente exportado",
        message: "El sistema completo se ha exportado como código fuente",
        section: "Sistema",
        action: "export_source"
      });
    } catch (error) {
      console.error("Error exporting source code:", error);
      addNotification({
        type: "error",
        title: "Error en la exportación de código",
        message: error instanceof Error ? error.message : "No se pudo exportar el código fuente completo",
        section: "Sistema",
        action: "export_source_error"
      });
      throw error;
    }
  };
  const importSystemConfig = (configJson) => {
    try {
      const config = JSON.parse(configJson);
      dispatch({ type: "LOAD_SYSTEM_CONFIG", payload: config });
      addNotification({
        type: "success",
        title: "Configuración importada",
        message: "La configuración del sistema se ha cargado correctamente",
        section: "Sistema",
        action: "import"
      });
      return true;
    } catch (error) {
      console.error("Error importing system config:", error);
      addNotification({
        type: "error",
        title: "Error en la importación",
        message: "No se pudo cargar la configuración del sistema",
        section: "Sistema",
        action: "import_error"
      });
      return false;
    }
  };
  const syncAllSections = async () => {
    try {
      addNotification({
        type: "info",
        title: "Sincronización completa iniciada",
        message: "Sincronizando todas las secciones del sistema...",
        section: "Sistema",
        action: "sync_all_start"
      });
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      const updatedConfig = {
        ...state.systemConfig,
        lastExport: (/* @__PURE__ */ new Date()).toISOString(),
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels
      };
      dispatch({ type: "UPDATE_SYSTEM_CONFIG", payload: updatedConfig });
      window.dispatchEvent(new CustomEvent("admin_full_sync", {
        detail: {
          config: updatedConfig,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }));
      addNotification({
        type: "success",
        title: "Sincronización completa exitosa",
        message: "Todas las secciones se han sincronizado correctamente",
        section: "Sistema",
        action: "sync_all"
      });
    } catch (error) {
      console.error("Error in full sync:", error);
      addNotification({
        type: "error",
        title: "Error en sincronización completa",
        message: "No se pudo completar la sincronización de todas las secciones",
        section: "Sistema",
        action: "sync_all_error"
      });
    }
  };
  const broadcastChange = (change) => {
    const changeEvent = {
      ...change,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      source: "admin_panel"
    };
    dispatch({
      type: "UPDATE_SYNC_STATUS",
      payload: {
        lastSync: (/* @__PURE__ */ new Date()).toISOString(),
        pendingChanges: Math.max(0, state.syncStatus.pendingChanges - 1)
      }
    });
    window.dispatchEvent(new CustomEvent("admin_state_change", {
      detail: changeEvent
    }));
  };
  const syncWithRemote = async () => {
    try {
      dispatch({ type: "UPDATE_SYNC_STATUS", payload: { isOnline: true } });
      addNotification({
        type: "info",
        title: "Sincronización iniciada",
        message: "Iniciando sincronización con el sistema remoto...",
        section: "Sistema",
        action: "sync_start"
      });
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      dispatch({
        type: "UPDATE_SYNC_STATUS",
        payload: {
          lastSync: (/* @__PURE__ */ new Date()).toISOString(),
          pendingChanges: 0
        }
      });
      addNotification({
        type: "success",
        title: "Sincronización completada",
        message: "Todos los datos se han sincronizado correctamente",
        section: "Sistema",
        action: "sync"
      });
    } catch (error) {
      dispatch({ type: "UPDATE_SYNC_STATUS", payload: { isOnline: false } });
      addNotification({
        type: "error",
        title: "Error de sincronización",
        message: "No se pudo sincronizar con el servidor remoto",
        section: "Sistema",
        action: "sync_error"
      });
    }
  };
  const getAvailableCountries = () => {
    const countries = /* @__PURE__ */ new Set();
    state.novels.forEach((novel) => {
      if (novel.pais) {
        countries.add(novel.pais);
      }
    });
    const commonCountries = [
      "Cuba",
      "Turquía",
      "México",
      "Brasil",
      "Colombia",
      "Argentina",
      "España",
      "Estados Unidos",
      "Corea del Sur",
      "India",
      "Reino Unido",
      "Francia",
      "Italia",
      "Alemania",
      "Japón",
      "China",
      "Rusia"
    ];
    commonCountries.forEach((country) => countries.add(country));
    return Array.from(countries).sort();
  };
  const updateSystemConfig = (config) => {
    dispatch({ type: "UPDATE_SYSTEM_CONFIG", payload: config });
  };
  return /* @__PURE__ */ jsxDEV(
    AdminContext.Provider,
    {
      value: {
        state,
        login,
        logout,
        updatePrices,
        addDeliveryZone,
        updateDeliveryZone,
        deleteDeliveryZone,
        addNovel,
        updateNovel,
        deleteNovel,
        addNotification,
        markNotificationRead,
        clearNotifications,
        exportSystemConfig,
        importSystemConfig,
        exportCompleteSourceCode,
        syncWithRemote,
        broadcastChange,
        syncAllSections,
        getAvailableCountries,
        updateSystemConfig
      },
      children
    },
    void 0,
    false,
    {
      fileName: "/home/project/src/context/AdminContext.tsx",
      lineNumber: 1575,
      columnNumber: 5
    },
    this
  );
}
_s(AdminProvider, "8vPut2gZMBv2leXhW5aHjyCmb2k=");
_c = AdminProvider;
export function useAdmin() {
  _s2();
  const context = useContext(AdminContext);
  if (context === void 0) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
_s2(useAdmin, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export { AdminContext };
var _c;
$RefreshReg$(_c, "AdminProvider");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/context/AdminContext.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/context/AdminContext.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBbWhESTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFuaERKLE9BQU9BLFNBQVNDLGVBQWVDLFlBQVlDLFlBQVlDLGlCQUFpQjtBQUl4RSxNQUFNQyxrQkFBa0I7QUFBQSxFQUN0QixXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZix5QkFBeUI7QUFBQSxJQUN6Qix3QkFBd0I7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZjtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxFQUFDO0FBQUEsRUFFSCxVQUFVO0FBQUEsSUFDUjtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLGFBQWE7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QSxNQUNGO0FBQUEsTUFFQ2pFO0FBQUFBO0FBQUFBLElBekJIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTBCQTtBQUVKO0FBQUNDLEdBdGVlRixlQUFhO0FBQUFtRSxLQUFibkU7QUF3ZVQsZ0JBQVNvRSxXQUFXO0FBQUFDLE1BQUE7QUFDekIsUUFBTUMsVUFBVTVLLFdBQVd1RCxZQUFZO0FBQ3ZDLE1BQUlxSCxZQUFZcEgsUUFBVztBQUN6QixVQUFNLElBQUl5RixNQUFNLCtDQUErQztBQUFBLEVBQ2pFO0FBQ0EsU0FBTzJCO0FBQ1Q7QUFBQ0QsSUFOZUQsVUFBUTtBQVF4QixTQUFTbkg7QUFBZSxJQUFBa0g7QUFBQUksYUFBQUosSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VSZWR1Y2VyIiwidXNlRWZmZWN0IiwiRU1CRURERURfQ09ORklHIiwiQURNSU5fQ1JFREVOVElBTFMiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5pdGlhbFN0YXRlIiwiaXNBdXRoZW50aWNhdGVkIiwicHJpY2VzIiwiZGVsaXZlcnlab25lcyIsIm5vdmVscyIsIm5vdGlmaWNhdGlvbnMiLCJzeW5jU3RhdHVzIiwibGFzdFN5bmMiLCJEYXRlIiwidG9JU09TdHJpbmciLCJpc09ubGluZSIsInBlbmRpbmdDaGFuZ2VzIiwic3lzdGVtQ29uZmlnIiwiYWRtaW5SZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsInVwZGF0ZWRDb25maWciLCJsYXN0RXhwb3J0IiwibmV3Wm9uZSIsImlkIiwibm93IiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiY29uZmlnV2l0aE5ld1pvbmUiLCJ1cGRhdGVkWm9uZXMiLCJtYXAiLCJ6b25lIiwiY29uZmlnV2l0aFVwZGF0ZWRab25lIiwiZmlsdGVyZWRab25lcyIsImZpbHRlciIsImNvbmZpZ1dpdGhEZWxldGVkWm9uZSIsIm5ld05vdmVsIiwiY29uZmlnV2l0aE5ld05vdmVsIiwidXBkYXRlZE5vdmVscyIsIm5vdmVsIiwiY29uZmlnV2l0aFVwZGF0ZWROb3ZlbCIsImZpbHRlcmVkTm92ZWxzIiwiY29uZmlnV2l0aERlbGV0ZWROb3ZlbCIsIm5vdGlmaWNhdGlvbiIsInRvU3RyaW5nIiwidGltZXN0YW1wIiwicmVhZCIsInNsaWNlIiwic2V0dGluZ3MiLCJtYXhOb3RpZmljYXRpb25zIiwibmV3U3lzdGVtQ29uZmlnIiwiQWRtaW5Db250ZXh0IiwidW5kZWZpbmVkIiwiUmVhbFRpbWVTeW5jU2VydmljZSIsImxpc3RlbmVycyIsIlNldCIsInN5bmNJbnRlcnZhbCIsInN0b3JhZ2VLZXkiLCJjb25maWdLZXkiLCJjb25zdHJ1Y3RvciIsImluaXRpYWxpemVTeW5jIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVN0b3JhZ2VDaGFuZ2UiLCJiaW5kIiwic2V0SW50ZXJ2YWwiLCJjaGVja0ZvclVwZGF0ZXMiLCJkb2N1bWVudCIsImhpZGRlbiIsImV2ZW50Iiwia2V5IiwibmV3VmFsdWUiLCJuZXdTdGF0ZSIsIkpTT04iLCJwYXJzZSIsIm5vdGlmeUxpc3RlbmVycyIsImVycm9yIiwiY29uc29sZSIsInN0b3JlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25maWciLCJzdG9yZWRTdGF0ZSIsImNvbmZpZ0RhdGEiLCJzdWJzY3JpYmUiLCJjYWxsYmFjayIsImFkZCIsImRlbGV0ZSIsImJyb2FkY2FzdCIsInN5bmNEYXRhIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRhdGEiLCJmb3JFYWNoIiwiZGVzdHJveSIsImNsZWFySW50ZXJ2YWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJBZG1pblByb3ZpZGVyIiwiY2hpbGRyZW4iLCJfcyIsImRpc3BhdGNoIiwic3luY1NlcnZpY2UiLCJ1c2VTdGF0ZSIsInN0b3JlZENvbmZpZyIsInVuc3Vic2NyaWJlIiwic3luY2VkU3RhdGUiLCJsb2dpbiIsInN1Y2Nlc3MiLCJhZGROb3RpZmljYXRpb24iLCJ0aXRsZSIsIm1lc3NhZ2UiLCJzZWN0aW9uIiwibG9nb3V0IiwidXBkYXRlUHJpY2VzIiwiYnJvYWRjYXN0Q2hhbmdlIiwiYWRkRGVsaXZlcnlab25lIiwibmFtZSIsInVwZGF0ZURlbGl2ZXJ5Wm9uZSIsImRlbGV0ZURlbGl2ZXJ5Wm9uZSIsImZpbmQiLCJ6IiwiYWRkTm92ZWwiLCJ0aXR1bG8iLCJ1cGRhdGVOb3ZlbCIsImRlbGV0ZU5vdmVsIiwibiIsIm1hcmtOb3RpZmljYXRpb25SZWFkIiwiY2xlYXJOb3RpZmljYXRpb25zIiwiZXhwb3J0U3lzdGVtQ29uZmlnIiwiY29tcGxldGVDb25maWciLCJ2ZXJzaW9uIiwibWV0YWRhdGEiLCJ0b3RhbE9yZGVycyIsInRvdGFsUmV2ZW51ZSIsImxhc3RPcmRlckRhdGUiLCJzeXN0ZW1VcHRpbWUiLCJjb25maWdKc29uIiwiZXhwb3J0Q29tcGxldGVTb3VyY2VDb2RlIiwiZ2VuZXJhdGVDb21wbGV0ZVNvdXJjZUNvZGUiLCJpbXBvcnRFcnJvciIsIkVycm9yIiwiaW1wb3J0U3lzdGVtQ29uZmlnIiwic3luY0FsbFNlY3Rpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiY2hhbmdlIiwiY2hhbmdlRXZlbnQiLCJzb3VyY2UiLCJNYXRoIiwibWF4Iiwic3luY1dpdGhSZW1vdGUiLCJnZXRBdmFpbGFibGVDb3VudHJpZXMiLCJjb3VudHJpZXMiLCJwYWlzIiwiY29tbW9uQ291bnRyaWVzIiwiY291bnRyeSIsIkFycmF5IiwiZnJvbSIsInNvcnQiLCJ1cGRhdGVTeXN0ZW1Db25maWciLCJfYyIsInVzZUFkbWluIiwiX3MyIiwiY29udGV4dCIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJBZG1pbkNvbnRleHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VSZWR1Y2VyLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuXG4vLyBDT05GSUdVUkFDScOTTiBFTUJFQklEQSAtIEdlbmVyYWRhIGF1dG9tw6F0aWNhbWVudGVcbmNvbnN0IEVNQkVEREVEX0NPTkZJRyA9IHtcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4xLjBcIixcbiAgXCJwcmljZXNcIjoge1xuICAgIFwibW92aWVQcmljZVwiOiA4MCxcbiAgICBcInNlcmllc1ByaWNlXCI6IDMwMCxcbiAgICBcInRyYW5zZmVyRmVlUGVyY2VudGFnZVwiOiAxMCxcbiAgICBcIm5vdmVsUHJpY2VQZXJDaGFwdGVyXCI6IDVcbiAgfSxcbiAgXCJkZWxpdmVyeVpvbmVzXCI6IFtcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gVmlzdGEgSGVybW9zYVwiLFxuICAgICAgXCJjb3N0XCI6IDQwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTQ0ODc3NixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NDowOC43NzZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDQ6MDguNzc2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gQW50b25pbyBNYWNlb1wiLFxuICAgICAgXCJjb3N0XCI6IDQwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTQ2MTM3NixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NDoyMS4zNzZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDQ6MjEuMzc2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gQ2VudHJvIGRlIGxhIGNpdWRhZFwiLFxuICAgICAgXCJjb3N0XCI6IDI1MCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTQ3MzQ4OCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NDozMy40ODhaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDQ6MzMuNDg4WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gVmVyc2FsbGVzIEhhc3RhIGVsIEhvdGVsXCIsXG4gICAgICBcImNvc3RcIjogNTAwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5NDg2NzM2LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ0OjQ2LjczNlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NDo0Ni43MzZaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiBDYXJyZXRlcmEgZGVsIE1vcnJvXCIsXG4gICAgICBcImNvc3RcIjogMzAwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5NDk5NTUyLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ0OjU5LjU1MlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NDo1OS41NTJaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiBBbHRhbWlyYVwiLFxuICAgICAgXCJjb3N0XCI6IDQwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTUxMTY2NCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NToxMS42NjRaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDU6MTEuNjY0WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gQ2FuZ3Jlaml0b3NcIixcbiAgICAgIFwiY29zdFwiOiAzNTAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk1MjE0MjQsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDU6MjEuNDI0WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ1OjIxLjQyNFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFRyb2NoYVwiLFxuICAgICAgXCJjb3N0XCI6IDI1MCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTUzNDU2MCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NTozNC41NjBaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDU6MzQuNTYwWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gVmVndWl0YSBkZSBHYWxvXCIsXG4gICAgICBcImNvc3RcIjogMzAwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5NTQ2OTEyLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ1OjQ2LjkxMlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NTo0Ni45MTJaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiBQbGF6YSBkZSBNYXJ0ZXNcIixcbiAgICAgIFwiY29zdFwiOiAyNTAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk1NTgwMDAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDU6NTguMDAwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ1OjU4LjAwMFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFBvcnR1b25kb1wiLFxuICAgICAgXCJjb3N0XCI6IDMwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTU2OTExMixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NjowOS4xMTJaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDY6MDkuMTEyWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gU3RhIEJhcmJhcmFcIixcbiAgICAgIFwiY29zdFwiOiAzMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk1ODA1NjAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDY6MjAuNTYwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ2OjIwLjU2MFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFN1ZcOxb1wiLFxuICAgICAgXCJjb3N0XCI6IDI1MCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTU5MjExMixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NjozMi4xMTJaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDY6MzIuMTEyWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gU2FuIFBlZHJpdG9cIixcbiAgICAgIFwiY29zdFwiOiAxNTAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk2MDM2OTYsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDY6NDMuNjk2WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ2OjQzLjY5NlpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IEFnw7xlcm9cIixcbiAgICAgIFwiY29zdFwiOiAxMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk2MTU4NDgsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDY6NTUuODQ4WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ2OjU1Ljg0OFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IERpc3RyaXRvIEpvc2UgTWFydMOtXCIsXG4gICAgICBcImNvc3RcIjogMTUwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5NjI3NTA0LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ3OjA3LjUwNFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NzowNy41MDRaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiBMb3MgUGlub3NcIixcbiAgICAgIFwiY29zdFwiOiAyMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk2MzgyNzIsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDc6MTguMjcyWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ3OjE4LjI3MlpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFF1aW50ZXJvXCIsXG4gICAgICBcImNvc3RcIjogNTAwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5NjQ5NDgwLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ3OjI5LjQ4MFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0NzoyOS40ODBaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiAzMCBkZSBub3ZpZW1icmUgYmFqb1wiLFxuICAgICAgXCJjb3N0XCI6IDQwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTY2MDkwNCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0Nzo0MC45MDRaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDc6NDAuOTA0WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gUmFqYXlvZ2FcIixcbiAgICAgIFwiY29zdFwiOiA2MDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk2Njg4MDAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDc6NDguODAwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ3OjQ4LjgwMFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFBhc3Rvcml0YVwiLFxuICAgICAgXCJjb3N0XCI6IDYwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTY3Njc2MCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0Nzo1Ni43NjBaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDc6NTYuNzYwWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gVmlzdGEgQWxlZ3JlXCIsXG4gICAgICBcImNvc3RcIjogMzAwLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ5Njg2ODk2LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ4OjA2Ljg5NlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0ODowNi44OTZaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNhbnRpYWdvIGRlIEN1YmEgPiBDYW5leVwiLFxuICAgICAgXCJjb3N0XCI6IDEwMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk2OTYyNDAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDg6MTYuMjQwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ4OjE2LjI0MFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IE51ZXZvIFZpc3RhIEFsZWdyZVwiLFxuICAgICAgXCJjb3N0XCI6IDEwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTcwNjg4OCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0ODoyNi44ODhaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDg6MjYuODg4WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gTWFyaW3Ds25cIixcbiAgICAgIFwiY29zdFwiOiAxMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk3MTU1MjEsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDg6MzUuNTIxWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ4OjM1LjUyMVpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IFZlcnNhbGxlIEVkaWZpY2lvc1wiLFxuICAgICAgXCJjb3N0XCI6IDgwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTcyOTczNixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0ODo0OS43MzZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDg6NDkuNzM2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTYW50aWFnbyBkZSBDdWJhID4gRmVycmVpcm9cIixcbiAgICAgIFwiY29zdFwiOiAzMDAsXG4gICAgICBcImlkXCI6IDE3NTk1NDk3Mzg3MjAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDg6NTguNzIwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjQ4OjU4LjcyMFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU2FudGlhZ28gZGUgQ3ViYSA+IDMwIGRlIG5vdmllbWJyZSBhbHRvc1wiLFxuICAgICAgXCJjb3N0XCI6IDUwMCxcbiAgICAgIFwiaWRcIjogMTc1OTU0OTc0Nzk1MixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzo0OTowNy45NTJaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6NDk6MDcuOTUyWlwiXG4gICAgfVxuICBdLFxuICBcIm5vdmVsc1wiOiBbXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJBbGFjYVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMTIwLFxuICAgICAgXCJhw7FvXCI6IDIwMjQsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiTGEgdmlkYSBkZSB1bmEgam92ZW4gc2UgdmUgZGVzdHJvemFkYSBjdWFuZG8gbGUgcm9iYW4gdW4gcmnDscOzbiBkdXJhbnRlIHVuIHZpb2xlbnRvIHNlY3Vlc3Rybywgb3JnYW5pemFkbyBwb3Igc3UgcmljbyBwYWRyZSBiaW9sw7NnaWNvLCBxdWUgbmVjZXNpdGEgdW4gZG9uYW50ZS4gTWllbnRyYXMgYnVzY2EgcmVzcHVlc3RhcywgZGVzY3VicmUgZWwgc2VjcmV0byBxdWUgY2FtYmnDsyBzdSB2aWRhIHkgc2UgZW5mcmVudGEgYSBsYSB0cmFpY2nDs24gZGUgS2VuYW4sIGVsIGFtb3IgZGUgc3UgdmlkYSwgY3V5YXMgY29tcGxpY2FkYXMgbGVhbHRhZGVzIHBvbmVuIGEgcHJ1ZWJhIHN1IHbDrW5jdWxvLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL2FsYWNhMi5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ3NTg3MTU4LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjEzOjA3LjE1OFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowNzoxOS45MDBaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiU2FsdmFqZSAoWWFiYW5pKVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMjAsXG4gICAgICBcImHDsW9cIjogMjAyMyxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJTYWx2YWplIG5vdmVsYSB0dXJjYSwgWWFtYW4gZXMgdW4gam92ZW4gcXVlIGhhIHZpdmlkbyBlbiBsYXMgY2FsbGVzIGRlc2RlIHF1ZSB0aWVuZSB1c28gZGUgcmF6w7NuLiBIYSB0ZW5pZG8gdW5hIHZpZGEgZHVyYSwgdGVuaWVuZG8gcXVlIGx1Y2hhciBwYXJhIHNvYnJldml2aXIgeSBlbmNvbnRyYXIgY29taWRhLiBBZm9ydHVuYWRhbWVudGUsIHNpZW1wcmUgaGEgdGVuaWRvIGEgc3UgbGFkbyB0cmVzIGFtaWdvcyBxdWUgc2UgY29udmlydGllcm9uIGVuIHN1IGZhbWlsaWEsIENlc3VyLCBBc2kgeSBVbXV0LlxcblxcblNlIGNydXphcm9uIGN1YW5kbyBlcmFuIGFwZW5hcyB1bm9zIG5pw7FvcyB5IGEgcGFydGlyIGRlIGFow60gbm8gc2Ugc2VwYXJhcm9uLiBEZSBtYW5lcmEgaW5leHBsaWNhYmxlIG5pbmd1bm8gc2FiZSBuYWRhIGRlIHN1IHBhc2FkbyBvIHBvcnF1ZSBlc3TDoW4gZW4gbGEgY2FsbGUsIHNpbiBpbXBvcnRhciBzdSBwYXNhZG8gbyB0cmF1bWFzIGRlY2lkaWVyb24gY29uZmlhciBlbnRyZSBlbGxvcyB5IHNlZ3VpciBhZGVsYW50ZS5cXG5cXG5MYSBncmFuIHByZW9jdXBhY2nDs24gZGVsIGdydXBvIGVzIGN1bXBsaXIgY29uIGVsIHRyYXRhbWllbnRvIGRlIFVtdXQsIHF1aWVuIG5vIHB1ZWRlIGNhbWluYXIgeSBlbCDigJxEb2N0b3IgbWlsYWdyb+KAnSBlcyBzdSDDum5pY2EgZXNwZXJhbnphLCBwZXJvIGVsIG3DqWRpY28gdml2ZSBlbiBlbCBleHRyYW5qZXJvIHkgdmUgYSBwb2NvcyBwYWNpZW50ZXMgdW5hIHZleiBhbCBhw7FvIGN1YW5kbyBsbGVnYSBhbCBwYcOtcy4gXFxuXFxuWWFtYW4gY29tZXRlcsOhIGVsIG1heW9yIGVycm9yIGRlIHN1IHZpZGEsIGVudHJhbmRvIGEgdW5hIG1hbnNpw7NuIHF1ZSBwcm9iYWJsZW1lbnRlIHBvZHLDrWEgc2VyIGxhIGRlIHN1IGZhbWlsaWEsIHBlcm8gc2UgbGUgY2FlIGxhIGNhcmEgZGUgdmVyZ8O8ZW56YSB5YSBxdWUgaGEgYXRhY2FkbyBhIHF1aWVuIHNlcsOtYSBzdSBoZXJtYW5vIHkgYXB1w7FhbGFkbyBhIHN1IG1hZHJlLiBBaG9yYSBzdSBmYW1pbGlhIHkgbGEgcG9saWPDrWEgbG8gYnVzY2FuLlxcblxcbkxhIHZpZGEgZGUgWWFtYW4gY29tZW56YXLDoSBhIGRhciB1biBnaXJvIGluZXNwZXJhZG8gY3VhbmRvIHNlIGNydWNlIGNvbiBBdGVzIHkgc3Ugbm92aWEgUnV5YS4gRXN0b3Mgc2Fsw61hbiBkZSB1biBjbHViIG5vY3R1cm5vLiBBIHBhcnRpciBkZSBhaMOtIHVuYSBzZXJpZSBkZSBldmVudG9zIGdvbHBlYXLDoW4gbGEgdmlkYSBkZSBZYW1hbiB5IGxvIGxsZXZhcsOhbiBhbCBsw61taXRlLiBTYWx2YWplIHNlcmllIHR1cmNhLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL3lhYmFuaS5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc1OTU0NzgzMTYyOSxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzoxNzoxMS42MjlaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MTE6NDEuMTg3WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkVsIFR1cmNvXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDYsXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJUcmFzIHNlciB0cmFpY2lvbmFkbyB5IGNvbmRlbmFkbyBhIG11ZXJ0ZSwgbG9ncmEgZXNjYXBhciB5IGVzIGN1cmFkbyBwb3IgbG9zIGFsZGVhbm9zIGRlbCBwaW50b3Jlc2NvIHB1ZWJsbyBpdGFsaWFubyBkZSBNb2VuYSwgdWJpY2FkbyBlbiBsb3MgQWxwZXMuIEEgbWVkaWRhIHF1ZSBzZSByZWN1cGVyYSwgQmFsYWJhbiwgYWwgcXVlIGFwb2RhbiAnRWwgVHVyY28nLCBzZSBjb252aWVydGUgZW4gcHJvdGVjdG9yIGRlbCBwdWVibG8sIHJlc2lzdGllbmRvIGxhcyBvcHJlc2l2YXMgY2FyZ2FzIGltcG9zaXRpdmFzIGRlIHN1IHNlw7FvciBmZXVkYWwuIENvbiBlbCB0aWVtcG8sIGxhIGx1Y2hhIHNlIGludGVuc2lmaWNhIHksIGN1YW5kbyB1biBhbnRpZ3VvIGVuZW1pZ28gZGVsIHByb3RhZ29uaXN0YSwgZWwgaW1wbGFjYWJsZSBjYWJhbGxlcm8gTWFyY28sIGFwYXJlY2UsIGNvbWllbnphIGxhIGJhdGFsbGEgZGVjaXNpdmEuXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvZWwrdHVyY28uanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc1OTU0Nzg4NjAxMyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzoxODowNi4wMTNaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDk6MzEuMzYzWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkEubWFyLCBkb25kZSBlbCBhbW9yIHRlamUgc3VzIHJlZGVzXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDkwLFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiRXN0cmVsbGEsIG1hZHJlIHNvbHRlcmEsIHJlZ3Jlc2EgYWwgcGVxdWXDsW8gcHVlYmxvIHBlc3F1ZXJvIGRlIHN1IGp1dmVudHVkIHRyYXMgbGEgbXVlcnRlIGRlIHN1IHBhZHJlLiBTZSBlbmFtb3JhIGRlIEZhYmnDoW4sIHBhZHJlIHZpdWRvIHkgcGVzY2Fkb3IsIHkgc2UgZW5mcmVudGEgYSB1biBodXJhY8OhbiBkZSBwcm9ibGVtYXMgcXVlIHBvbmVuIGVuIHJpZXNnbyBlbCBiaWVuZXN0YXIgZGUgc3VzIGZhbWlsaWFzLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiTcOpeGljb1wiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvQS5tYXIlMkMrZG9uZGUrZWwrYW1vcit0ZWplK3N1cytyZWRlcy5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ4NDUzNDczLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjI3OjMzLjQ3M1pcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzoyNzozMy40NzNaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiQW1vciBlbiBibGFuY28geSBuZWdybyBFUyAoU2l5YWggQmV5YXogQXNrKVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJSb21hbmNlXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiA2NCxcbiAgICAgIFwiYcOxb1wiOiAyMDE3LFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIkFtb3IgZW4gQmxhbmNvIHkgTmVncm8gbm92ZWxhIHR1cmNhIGVzIHByb3RhZ29uaXphZGEgcG9yIEZlcmhhdCBBc2xhbiwgdW4gam92ZW4gcXVlIHRpZW5lIHVuIGVtcGxlbyBxdWUgbm8gdG9kb3MgcHVlZGVuIGN1bXBsaXIuIMOJbCBlcyB1biBhc2VzaW5vIHF1ZSB0cmFiYWphIHBhcmEgTmFtaWssIHF1aWVuIGVzIHN1IHTDrW8uIE5hbWlrIGVzIGVsIGzDrWRlciBkZSBsb3MgRW1pcmhhbS4gTGEgb3RyYSBwcm90YWdvbmlzdGEgZGUgZXN0YSBzZXJpZSBlcyBBc2xpIENpbmFyLCB1bmEgbmV1cm9jaXJ1amFuYSBxdWUgYWRvcmEgc3UgZW1wbGVvLiBVbiBkw61hLCBubyByZWdyZXNhcsOhIGEgY2FzYSB5IHNlcsOhIHNlY3Vlc3RyYWRhIHBvciBzdXMgaGFiaWxpZGFkZXMgY29uIGVsIGJpc3R1csOtLiBUZW5kcsOhIHF1ZSBzYWx2YXJsZSBsYSB2aWRhIGEgdW4gaG9tYnJlIGFsIHF1ZSBGZXJoYXQgYWdyZWRpw7MuIFNvcnByZW5kaWRhIHBvciBsb3MgaGVjaG9zLCBzZSBjb252ZXJ0aXLDoSBlbiB0ZXN0aWdvIGRlIGVzZSBjcmltZW4sIHkgcmVjb25vY2Vyw6EgYWwgaW5mYW1lIE5hbWlrIEVtaXJoYW0uXFxuXFxuU2Vyw6EgYWxsw60gY3VhbmRvIE5hbWlrIGRlc2Fycm9sbGUgZGVzY29uZmlhbnphIGhhY2lhIGxhIG11amVyLCB5IGVzIHF1ZSBhZGVtw6FzIGRlIHNlciB1biBtYWZpb3NvLCBlcyB1bm8gZGUgbG9zIGJlbmVmYWN0b3JlcyBtw6FzIGltcG9ydGFudGVzIGRlbCBob3NwaXRhbCBlbiBkw7NuZGUgdHJhYmFqYSBBc2xpLiBOYW1payBsZSBkYXLDoSBsYSBtaXNpw7NuIGEgRmVyaGF0IGRlIGFzZXNpbmFyIGEgbGEgdGVzdGlnbywgcGVybyBubyBwb2Ryw6EgY29tcGxldGFybGEsIHkgbGUgb2ZyZWNlcsOhIGEgQXNsaSBsYSBvcGNpw7NuIGRlIG1vcmlyIG8gY29udHJhZXIgbWF0cmltb25pbyBjb24gw6lsLiBSZXN1bHRhcsOhIHF1ZSBlbCBoZXJtYW5vIGRlIG51ZXN0cmEgcHJvdGFnb25pc3RhIGVzIHBvbGljw61hLCB5IGVzdMOhIGludmVzdGlnYW5kbyBjYXNvcyBkZSBjb3JydXBjacOzbiwgZW4gbG9zIHF1ZSBzZSBpbmNsdXllIGEgbG9zIEVtaXJoYW0uIFNlIGxsZXZhcsOhIGEgY2FibyBsYSBib2RhLCBwZXJvIE5hbWlrIGphbcOhcyBjcmVlcsOhIHF1ZSBlbCBhbW9yIGZsb3JlY2nDsyBlbnRyZSBzdSBzb2JyaW5vIHkgbGEgbmV1cm9jaXJ1amFuYS5cXG5cXG5TZWd1aXLDoW4gY29uIHN1IG1hdHJpbW9uaW8gZmFsc28gZW4gQW1vciBlbiBCbGFuY28geSBOZWdybyBzZXJpZSB0dXJjYSwgeSBwb2NvIGEgcG9jbywgQXNsaSBkZWphcsOhIGRlIHNlbnRpciBtaWVkbyBoYWNpYSBGZXJoYXQuXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvYW1vcitlbitibGFuY28reStuZWdybysyLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJmaW5hbGl6YWRhXCIsXG4gICAgICBcImlkXCI6IDE3NTk1NDg1ODkzNjYsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDRUMDM6Mjk6NDkuMzY2WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAxOjA3OjQwLjEwMFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJBbW9yIHBlcmZlY3RvXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDYwLFxuICAgICAgXCJhw7FvXCI6IDIwMjMsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiQW1vciBwZXJmZWN0byBub3ZlbGEgYnJhc2lsZcOxYSwgTWFyZSBlcyB1bmEgam92ZW4gdmlzaW9uYXJpYSwgcmVncmVzYSBhIHN1IHB1ZWJsbyBuYXRhbCBlbiAxOTM0IHBhcmEgdG9tYXIgbGFzIHJpZW5kYXMgZGVsIGhvdGVsIGZhbWlsaWFyLiBTdXMgc3Vlw7FvcyBzZSB2ZW4gdHJ1bmNhZG9zIGN1YW5kbyBzdSBwYWRyZSwgY2VnYWRvIHBvciBsb3MgcHJlanVpY2lvcywgbGEgb2JsaWdhIGEgY2FzYXJzZSBjb24gR2FzcGFyLCB1biBob21icmUgbWFsdmFkbyB5IHNpbiBlc2Nyw7pwdWxvcy4gTGEgYW1iaWNpw7NuIGRlc21lZGlkYSBkZSBHaWxkYSwgbGEgbWFkcmFzdHJhIGRlIE1hcmUsIGxhIGxsZXZhIGEgY29uc3BpcmFyIGNvbiBHYXNwYXIgcGFyYSBkZXNoYWNlcnNlIGRlIExlb25lbCwgZWwgcGFkcmUgZGUgTWFyZSwgeSBjdWxwYXIgYSBsYSBqb3ZlbiBkZSBzdSBtdWVydGUuXFxuXFxuTWFyZSBlcyBlbmNhcmNlbGFkYSBpbmp1c3RhbWVudGUgeSBkYSBhIGx1eiBlbiBsYSBjw6FyY2VsLiBUcmFzIG9jaG8gYcOxb3MgZW4gcHJpc2nDs24sIGZpbmFsbWVudGUgY3VtcGxlIHN1IGNvbmRlbmEgZW4gZWwgYcOxbyAxOTQyLCBzYWxlIGRlIHByaXNpw7NuIGNvbiB1biBzb2xvIG9iamV0aXZvLCB2ZW5nYXJzZSBkZSBxdWllbmVzIGxhIHRyYWljaW9uYXJvbiB5IHJlY3VwZXJhciBhIHN1IGhpam8gcGVyZGlkby5cXG5cXG5FbiBzdSBjYW1pbm8sIE1hcmUgc2UgcmVlbmN1ZW50cmEgY29uIE9ybGFuZG8sIHVuIG3DqWRpY28gcXVlIGxhIGFtw7MgZW4gZWwgcGFzYWRvIHkgcXVlIGFob3JhIGVzdMOhIGRpc3B1ZXN0byBhIGx1Y2hhciBwb3IgZWxsYS4gSnVudG9zLCBzZSBlbmZyZW50YW4gYSBsb3MgcG9kZXJvc29zIGRlIFNhbyBKYWNpbnRvLiBNaWVudHJhcyB0YW50byBNYXJjZWxpbm8sIGVzIGhpam8gZGUgT3JsYW5kbyB5IE1hcmUsIHNlIGhhIGNyaWFkbyBlbiB1biBtb25hc3RlcmlvLCBhIGNhcmdvIGRlIEZyYXkgTGXDs24sIHF1aWVuIHNlIGhhIGNvbnZlcnRpZG8gZW4gdW5hIGZpZ3VyYSBwYXRlcm5hIHBhcmEgZWwgam92ZW4uXFxuXFxuR2lsZGEgc2UgaGEgY29udmVydGlkbyBlbiB1bmEgbXVqZXIgcG9kZXJvc2EgZSBpbmZsdXllbnRlLCBNYXJlIGhhcsOhIHRvZG8gZW4gc3VzIG1hbm9zIHBhcmEgcmVjdXBlcmFyIHN1IHZpZGEsIHJlZW5jb250cmFyc2UgY29uIHN1IGhpam8geSB2ZW5nYXJzZSBkZSBhcXVlbGxvcyBxdWUgbGUgaGljaWVyb24gZGHDsW8uIEFtb3IgcGVyZmVjdG8gdGVsZW5vdmVsYSBicmFzaWxlw7FhLiBcIixcbiAgICAgIFwicGFpc1wiOiBcIkJyYXNpbFwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvQW1vcitQZXJmZWN0by5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ4NzIzNjM5LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjMyOjAzLjYzOVpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xNlQwNzo1MzoyMS40NjRaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiSG9sZGluZ1wiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMjAsXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJMYSBjYW1wZW9uYSBtdW5kaWFsIGRlIGFwbmVhLCBBeWRhbiBUw7xya2VyLCBzZSBwcmVwYXJhIHBhcmEgdW5hIG51ZXZhIGlubWVyc2nDs24gcsOpY29yZC4gQXlkYW4gbm8gc29sbyBlcyB1bmEgYXRsZXRhIGV4aXRvc2E7IGVzIHVuYSBtdWplciBlbXByZW5kZWRvcmEgcXVlIGhhIGVudHJlZ2FkbyBzdSBjb3JhesOzbiBhIGxvcyBuacOxb3MuIFRvZG9zIGxvcyBpbmdyZXNvcyBxdWUgb2J0aWVuZSBkZSBzdSBncmFuIHBhc2nDs24sIGVsIGJ1Y2VvLCBsb3MgZGVkaWNhIGEgbWFudGVuZXIgZW4gcGllIGxhcyBlc2N1ZWxhcyBxdWUgZnVuZMOzLCBpbmNsdXllbmRvIGFxdWVsbGFzIHF1ZSBhdGllbmRlbiBhIG5pw7FvcyBjb24gbmVjZXNpZGFkZXMgZWR1Y2F0aXZhcyBlc3BlY2lhbGVzLiBVbm8gZGUgZXNvcyBjb2xlZ2lvcyBsZSB0cmFlcsOhIGEgc3UgdmlkYSBhIEY/cmF0IHkgYWwgY29taXNhcmlvIEtlcmVtLiBVbm8gZGUgbG9zIHByaW5jaXBhbGVzIHBhdHJvY2luYWRvcmVzIGRlIEF5ZGFuIFTDvHJrZXIgZXMgQWx0P25vcmR1IEhvbGRpbmcsIHVubyBkZSBsb3MgZ3J1cG9zIGVtcHJlc2FyaWFsZXMgbcOhcyBncmFuZGVzIGRlbCBwYcOtcy4gQmFqbyBlbCBsaWRlcmF6Z28gZGUgT3NtYW4gQWx0P25vcmR1IHkgY29uIGVsIGltcHVsc28gZGUgc3VzIGhpamFzIEVicnUsIENleWRhIHkgU2VtYSwgbGEgZW1wcmVzYSBjcmVjZSBkw61hIGEgZMOtYSBjb24gdW5hIGltYWdlbiBpbXBlY2FibGUuIFNpbiBlbWJhcmdvLCBkZXRyw6FzIGRlIGVzZSBicmlsbGFudGUgcm9zdHJvIHNlIGVzY29uZGVuIGx1Y2hhcyBkZSBwb2RlciwgY29uZmxpY3RvcyBmYW1pbGlhcmVzIHkgdW4gcGFzYWRvIG9zY3Vyby4gQ29tbyB0b2RvIGdyYW4gcG9kZXIsIEFsdD9ub3JkdSBIb2xkaW5nIHRhbWJpw6luIHRpZW5lIGdyYW5kZXMgZW5lbWlnb3MuIFN1IGFkdmVyc2FyaW8gbcOhcyBwZWxpZ3Jvc28gZXMgTWFoaXIgQmV5bz9sdSwgY8OzbXBsaWNlIGRlIGFxdWVsIHBhc2FkbyBvc2N1cm8uIEVsIHZpZWpvIGFtaWdvIHkgY29tcGHDsWVybyBkZSBPc21hbiwgWmFraXIsIHRlbmRyw6EgcXVlIGp1Z2FyIGNvbiBhc3R1Y2lhIHBhcmEgZGV0ZW5lciBhIE1haGlyLiBFbiBtZWRpbyBkZSBlc3RlIGNhb3MsIE9zbWFuIGRlc2N1YnJlIHF1ZSBwYWRlY2UgdW5hIGVuZmVybWVkYWQgaW5jdXJhYmxlLiBBbCBib3JkZSBkZSB1bmEgcnVwdHVyYSB0b3RhbCwgc2UgZW5jdWVudHJhIGZyZW50ZSBhIGxhIG5lY2VzaWRhZCBkZSBlbmZyZW50YXJzZSBhbCBzZWNyZXRvIG1lam9yIGd1YXJkYWRvIGRlIHN1IHZpZGE6IHN1IGhpamEsIHkgY29uIGVsbG8sIGEgdG9kYSBzdSBmYW1pbGlhLiBQYXJhIGVzYSBjb25mcm9udGFjacOzbiwgT3NtYW4gZWxpZ2UgZWwgbWlzbW8gZMOtYSBlbiBxdWUgQXlkYW4gcm9tcGVyw6Egc3UgbnVldm8gcsOpY29yZC4gRXNlIGTDrWEgbWFyY2Fyw6EgZWwgaW5pY2lvIGRlIHVuIHZpYWplIHNpbiByZXRvcm5vIHBhcmEgdG9kb3MuXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvSG9sZGluZy5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ4ODEwOTI3LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjMzOjMwLjkyN1pcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xNlQwNzo0OTo0Ny43MTNaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiTGEgcmVhbGV6YVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJSb21hbmNlXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiA4LFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiJ0xhIHJlYWxlemEnIHByZXNlbnRhIHVuYSBoaXN0b3JpYSByb23DoW50aWNhIHF1ZSB0cmFzY2llbmRlIGNsaWNow6lzLiBMYSB0cmFtYSBnaXJhIGVuIHRvcm5vIGFsIGVuY3VlbnRybyBlbnRyZSBTb3BoaWEsIHVuYSBlbXByZXNhcmlhIG1vZGVybmEsIHkgQXZpcmFhaiwgdW4gcHLDrW5jaXBlIGNvbiB1biBsZWdhZG8gZW4gZGVjYWRlbmNpYS4gw4lsIHBvc2VlIHVuYSBtYW5zacOzbiBhbmNlc3RyYWwgcXVlIG5lY2VzaXRhIHNlciByZXN0YXVyYWRhLCBwZXJvIGNhcmVjZSBkZSBsb3MgZm9uZG9zIG5lY2VzYXJpb3MuIEVsbGEgdmUgZW4gZXNlIGx1Z2FyIGxhIG9wb3J0dW5pZGFkIHBlcmZlY3RhIHBhcmEgbGFuemFyIHN1IG51ZXZhIGVtcHJlc2EuIEFzw60sIGFtYm9zIGRlY2lkZW4gY29sYWJvcmFyLCBhdW5xdWUgc3VzIGRpZmVyZW5jaWFzIGN1bHR1cmFsZXMgeSBwZXJzb25hbGVzIGFtZW5hemFuIGNvbiBhcnJ1aW5hciB0b2RvLiBcXG5cXG5FbCBlbmNhbnRhZG9yIHByw61uY2lwZSBBdmlyYWFqIGNvbm9jZSBhIFNvZsOtYSwgdW5hIGVtcHJlc2FyaWEgaGVjaGEgYSBzw60gbWlzbWEsIHkgbG9zIG11bmRvcyBkZSBsYSByZWFsZXphIHkgbGFzIHN0YXJ0dXBzIGNob2NhbiBlbiB1bmEgYXBhc2lvbmFkYSB0b3JtZW50YSBkZSByb21hbmNlIHkgYW1iaWNpw7NuXCIsXG4gICAgICBcInBhaXNcIjogXCJJbmRpYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvbGErcmVhbGV6YS5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzU5NTQ4ODg3MzQzLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA0VDAzOjM0OjQ3LjM0M1pcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMToxMDozOS41MzFaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiVmFsZW50aW5hLCBtaSBhbW9yIGVzcGVjaWFsXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDM5LFxuICAgICAgXCJhw7FvXCI6IDIwMjQsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiRW4gVmFsZW50aW5hLCBtaSBhbW9yIGVzcGVjaWFsLCBIZXJyZXJhIGVuY2FybmEgYSB1bmEgam92ZW4gZW4gZWwgZXNwZWN0cm8gYXV0aXN0YSwgcXVpZW4gZXMgdW4gZ2VuaW8gZW4gZWwgbXVuZG8gZGUgbGEgdGVjbm9sb2fDrWEuIEVsIHBhcGVsIG1hc2N1bGlubyBwcmluY2lwYWwgZXMgaW50ZXJwcmV0YWRvIHBvciBNYXVyaWNpbyBOb3ZvYSwgdW4gYWN0b3IgbWV4aWNhbm8gZW4gYXNjZW5zbywgY29ub2NpZG8gcG9yIHN1cyBhY3R1YWNpb25lcyBlbiBsYXMgw7psdGltYXMgdGVsZW5vdmVsYXMgcHJvZHVjaWRhcyBlbiBNaWFtaS5cXG5cXG5WYWxlbnRpbmEgaGEgY3JlY2lkbyBwcm90ZWdpZGEgZGUgbGEgc29jaWVkYWQgcG9yIHN1IG1hZHJlIGFkb3B0aXZhIGVuIGVsIHBlcXVlw7FvIHB1ZWJsbyBkZSBDaGlxdWlsaXN0bMOhbiwgZG9uZGUgZGVzdGFjw7MgYWNhZMOpbWljYW1lbnRlLiBNdWRhcnNlIGEgbGEgZ3JhbiBjaXVkYWQgZGUgR3VhZGFsYWphcmEgZGVzcHXDqXMgZGUgcXVlIHN1IG1hZHJlIGZhbGxlY2UgZW4gdW4gYWNjaWRlbnRlIHNlcsOhIG11eSBkaWbDrWNpbCwgeWEgcXVlIHNlIGVuZnJlbnRhcsOhIGxvIHBlb3IgeSBsbyBtZWpvciBkZSBsYSBodW1hbmlkYWQ6IHNlIGVuYW1vcmFyw6EgcG9yIHByaW1lcmEgdmV6LCBjb25vY2Vyw6EgbnVldm9zIGFtaWdvcywgcGVybyB0YW1iacOpbiBsYSBlbnZpZGlhIHkgbG9zIGNlbG9zIGRlIGFxdWVsbG9zIHF1ZSBlbGlnZW4gbm8gYWNlcHRhcmxhLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiTcOpeGljb1wiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvVmFsZW50aW5hJTJDK21pK2Ftb3IrZXNwZWNpYWwuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc1OTU0OTA3MDkyMyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wNFQwMzozNzo1MC45MjNaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTZUMTI6NDA6MjIuMzE2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkJhaGFyXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAxMDksXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJIYWNlIDIwIGHDsW9zLCBzZSBncmFkdcOzIGRlIGxhIGZhY3VsdGFkIGRlIG1lZGljaW5hIHBlcm8gZGVjaWRpw7Mgc2VyIGFtYSBkZSBjYXNhIGVuIGx1Z2FyIGRlIHNlZ3VpciBsYSBjYXJyZXJhIGRlIG1lZGljaW5hLiBFc3TDoSBjYXNhZGEgY29uIGVsIGV4aXRvc28gY2lydWphbm8gVGltdXIgWWF2dXpvZ2x1IHkgaGEgZGVkaWNhZG8gc3UgdmlkYSBhIHN1IG1hcmlkbyB5IGEgc3VzIGhpam9zLiBMYSBhcGFyZW50ZW1lbnRlIGZlbGl6IGZhbWlsaWEgWWF2dXpvZ2x1IGVzdMOhIGNvbm1vY2lvbmFkYSBwb3IgbGEgZW5mZXJtZWRhZCBkZSBCYWhhci4gRWwgbcOpZGljbyBkZSBCYWhhciwgRXZyZW4sIGVzdMOhIGRlY2lkaWRvIGEgc2FsdmFybGEgeSBkaWNlIHF1ZSBsYSDDum5pY2Egc29sdWNpw7NuIGVzIHVuIHRyYXNwbGFudGUgZGUgaMOtZ2Fkby4gwqFFbCDDum5pY28gaMOtZ2FkbyBjb21wYXRpYmxlIGRlIGxhIGZhbWlsaWEgcGVydGVuZWNlIGEgVGltdXIhIFBhcmEgbGEgZmFtaWxpYSBZYXZ1em9nbHUsIHF1ZSBzZSBzb21ldGUgYSB1bmEgcHJ1ZWJhIGNvbiB1biB1bWJyYWwgaW1wb3J0YW50ZSwgbmFkYSB2b2x2ZXLDoSBhIHNlciBsbyBtaXNtb+KAplwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0JhaGFyMi5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc1OTkwNjA5MDQ0NixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOFQwNjo0ODoxMC40NDZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDA6NTg6MzkuMTQwWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkFtYW5lY2VyXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDY3LFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiTGEgdGVsZW5vdmVsYSBnaXJhIGVuIHRvcm5vIGEgTGVvbmVsIENhcnJhbnphIChGZXJuYW5kbyBDb2x1bmdhKSwgdW4gaG9tYnJlIHF1ZSB2aXZlIGVuIFZpbGxhIEVzY2FybGF0YSB5IGVzIHByb3BpZXRhcmlvIGRlIGxhIGhhY2llbmRhIE1vbnRvcm8uIFN1IHJ1dGluYSBjYW1iaWEgcG9yIGNvbXBsZXRvIGN1YW5kbyBzdSBlc3Bvc2EgKGludGVycHJldGFkYSBwb3IgQW5kcmVhIExlZ2FycmV0YSkgeSBzdSBtZWpvciBhbWlnbyBkZXNhcGFyZWNlbiBqdW50b3MsIGRlasOhbmRvbG8gbGxlbm8gZGUgaXJhIHkgZGVzaWx1c2nDs24gYWwgcHVudG8gZGUgZGFybG9zIHBvciBtdWVydG9zLCBsbyBjdWFsIHBvZHLDrWEgdHJhZXJsZSBncmF2ZXMgY29uc2VjdWVuY2lhcyBlbiBlbCBmdXR1cm8uXFxuXFxuQXVucXVlIGludGVudGEgcmVoYWNlciBzdSB2aWRhLCBzdWZyZSB1bmEgbnVldmEgdHJhZ2VkaWE6IHN1IGhpamEgUGF1bGluYSBwaWVyZGUgbGEgdmlkYSBlbiB1biBpbmNlbmRpby4gTGVvbmVsIGp1cmEgdmVuZ2Fyc2UsIGNvbnZlbmNpZG8gZGUgcXVlIG5vIHNlIHRyYXTDsyBkZSB1biBhY2NpZGVudGUsIHNpbm8gZGUgdW4gYWN0byBwcm92b2NhZG8gcG9yIGxhIGZhbWlsaWEgUGFsYWNpb3MuXFxuXFxuUGFyYSBzYWNpYXIgc3Ugc2VkIGRlIHJldmFuY2hhLCBvYmxpZ2EgYSBBbGJhIFBhbGFjaW9zIChMaXZpYSBCcml0bykgYSBjYXNhcnNlIGNvbiDDqWwuIEVsbGEgYWNjZWRlIGFsIG1hdHJpbW9uaW8gY29uIHRhbCBkZSBhcG95YXIgYSBzdXMgcGFkcmVzLCBxdWllbmVzIGF0cmF2aWVzYW4gdW5hIGZ1ZXJ0ZSBjcmlzaXMgZWNvbsOzbWljYS5cXG5cXG5Qcm9udG8sIGxhIGpvdmVuIHNlIHZlIGVudnVlbHRhIGVuIHVuYSByZWxhY2nDs24gc2luIGFmZWN0byB5IGJham8gbGFzIGFtZW5hemFzIGRlIEF0b2NoYSAoQW5hIEJlbGVuYSksIGxhIGhlcm1hbmEgZGUgTGVvbmVsLiBFbGxhIGVzIHVuYSBtdWplciBkZXNwaWFkYWRhIHkgYW1iaWNpb3NhLCBxdWUgZGVzZWEgcXVlZGFyc2UgY29uIGxhIGhhY2llbmRhIE1vbnRvcm8sIHNpbiBpbXBvcnRhciBsYXMgY29uc2VjdWVuY2lhcy5cXG5cXG5BIG1lZGlkYSBxdWUgQWxiYSBpbnRlbnRhIGdhbmFyc2UgZWwgcmVzcGV0byBkZSBsb3MgaGFiaXRhbnRlcyBkZSBWaWxsYSBFc2NhcmxhdGEgeSBkZSBsYSBmaW5jYSwgTGVvbmVsIGNvbWllbnphIGEgY3Vlc3Rpb25hciBzdSBvZGlvLCBwdWVzIGVsbGEgcGFyZWNlIHRvZG8gbWVub3MgY3VscGFibGUgZGUgbGEgdHJhZ2VkaWEgcXVlIG1hcmPDsyBzdSB2aWRhLlxcblxcbkxhIHRlbnNpw7NuIGF1bWVudGEgY29uIGxhIGxsZWdhZGEgZGUgU2ViYXN0acOhbiBQZcOxYWxvc2EgKERhbmllbCBFbGJpdHRhciksIHVuIG3DqWRpY28gcXVlLCBiYWpvIGVsIGFyZ3VtZW50byBkZSBhdGVuZGVyIGxhIHNhbHVkIGRlIExlb25lbCwgY29taWVuemEgYSBhY2VyY2Fyc2UgYSBBbGJhIGNvbiB1bmEgZmlqYWNpw7NuIHBlbGlncm9zYSBjcmVhbmRvIHVuIHRyw61hbmd1bG8gcm9tw6FudGljbyBtdXkgcG90ZW50ZS4gQWRlbcOhcywgw6lsIGd1YXJkYSB1biBtaXN0ZXJpbyBxdWUgcG9kcsOtYSBjYW1iaWFyIGVsIHJ1bWJvIGRlIGxhIHByb3RhZ29uaXN0YS5cXG5cXG5BIGxvIGxhcmdvIGRlIGxhIHRyYW1hLCBMZW9uZWwgeSBBbGJhIGV4cGVyaW1lbnRhcsOhbiB1bmEgbWV6Y2xhIGRlIGRvbG9yLCBkZXNlbyB5IGNvbmZ1c2nDs24sIHF1ZSBwb2Ryw61hIGV2b2x1Y2lvbmFyIGVuIHVuYSBjb25leGnDs24gcHJvZnVuZGEsIG1pZW50cmFzIHF1ZSBxdWllbmVzIGxvcyByb2RlYW4gaW50ZW50YXLDoW4gYWxpbWVudGFyIGVsIHJlbmNvciBlbnRyZSBlbGxvcy5cIixcbiAgICAgIFwicGFpc1wiOiBcIk3DqXhpY29cIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0FtYW5lY2VyKzIuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcInRyYW5zbWlzaW9uXCIsXG4gICAgICBcImlkXCI6IDE3NTk5MDYxODgxNTYsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDhUMDY6NDk6NDguMTU2WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAwOjU3OjQ1LjExN1pcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJBbW9yIHkgRXNwZXJhbnphXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAxMDYsXG4gICAgICBcImHDsW9cIjogMjAyMixcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJDdWVudGEgbGEgaGlzdG9yaWEgZGUgQWxpIFRhaGlyLCBxdWllbiBuYWNpw7MgZW4gVGVzYWzDs25pY2EgZW4gMTg5MyB5IGNhecOzIG3DoXJ0aXIgZW4gU2FrYXJ5YSBlbiAxOTIxLiBTaW4gZW1iYXJnbywgb2N1cnJpw7MgdW4gZXZlbnRvIG1pbGFncm9zbyBjdWFuZG8gQWxpIGFicmnDsyBsb3Mgb2pvcyBudWV2YW1lbnRlLiBEZXNkZSBlc2UgZMOtYSBoYSB2aXZpZG8gMTAwIGHDsW9zIHNpbiBlbnZlamVjZXIgdW4gc29sbyBkw61hLiBTaW4gZW1iYXJnbywgZGVzcHXDqXMgZGUgdG9kbyBsbyBxdWUgaGEgcGFzYWRvLCBBbGkgZGVjaWRlIGFjYWJhciBjb24gc3UgdmlkYS4gXFxuXFxuWmV5bmVwLCBxdWUgdHJhYmFqw7MgZW4gY29uZGljaW9uZXMgZGlmw61jaWxlcyBlbiBFZHJlbWl0IHkgc2UgcHJlcGFyw7MgcGFyYSBlbCBleGFtZW4gdW5pdmVyc2l0YXJpbywgZmluYWxtZW50ZSBzZSBjb252aXJ0acOzIGVuIGxhIHF1aW50YSBlbiBUdXJxdcOtYSB5IGdhbsOzIGVsIGRlcGFydGFtZW50byBkZSBkZXJlY2hvIGRlIGxhIHVuaXZlcnNpZGFkIGRlIHN1IGVsZWNjacOzbi4gWmV5bmVwLCBxdWUgc3Vlw7FhIGNvbiBtdWRhcnNlIGEgRXN0YW1idWwgY29uIHN1IG1hZHJlIHBhcmEgaXIgYSBsYSB1bml2ZXJzaWRhZCwgZGVzY29ub2NlIGxhIGRlc2dyYWNpYSBkZSBzdSBtYWRyZSBHw7Zuw7xsLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0Ftb3IreStFc3BlcmFuemEuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcInRyYW5zbWlzaW9uXCIsXG4gICAgICBcImlkXCI6IDE3NTk5MDYyNTkzMjMsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDhUMDY6NTA6NTkuMzIzWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAwOjU4OjE0LjY5M1pcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJDb3JhesOzbiBOZWdyb1wiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogNTMsXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJBIHVuYSBlZGFkIHRlbXByYW5hLCBTdW1ydSBhYmFuZG9uw7MgYSBzdXMgZ2VtZWxvcyByZWNpw6luIG5hY2lkb3Mgc2luIG5pIHNpcXVpZXJhIGxsZWdhciBhIHRlbmVybG9zIGVuIHN1cyBicmF6b3MuIFNlIG11ZMOzIGEgQ2FwYWRvY2lhIGNvbiBzdSBtYWRyZSwgTmloYXlldCwgZG9uZGUgc2UgY2Fzw7MgY29uIFNhbWV0ID9hbnNhbGFuLCB1biBob21icmUgcmljbyB5IHByb21pbmVudGUgZW4gbGEgaW5kdXN0cmlhIGRlbCB0dXJpc21vIGRlIGxhIGNpdWRhZC4gVHV2aWVyb24gZG9zIGhpam9zLiBTYW1ldCB0YW1iacOpbiB0ZW7DrWEgdW4gaGlqbyBsbGFtYWRvIENpaGFuIGRlIHN1IHByaW1lciBtYXRyaW1vbmlvLlxcblxcbkNyaWFkb3MgZW4gY2lyY3Vuc3RhbmNpYXMgZGlmw61jaWxlcywgbG9zIGdlbWVsb3MsIE51aCB5IE1lbGVrLCBhbGltZW50YWRvcyBwb3IgZWwgb2RpbyBoYWNpYSBsYSBtYWRyZSBxdWUgbG9zIGFiYW5kb27DsywgZGVzY3VicmVuIGxhIGlkZW50aWRhZCBkZSBzdSBtYWRyZS4gTGxlZ2FuIGEgQ2FwYWRvY2lhIHBhcmEgcmVjbGFtYXIgbG8gcXVlIGNyZWVuIHF1ZSBsZXMgY29ycmVzcG9uZGUgeSBlbmZyZW50YXJzZSBhIHN1IG1hZHJlLiBTb3JwcmVuZGlkYSwgU3VtcnUgbG8gbmllZ2EgdG9kbywgcGVybyBlcyBjb25zY2llbnRlIGRlIHF1ZSBlcyBzb2xvIGN1ZXN0acOzbiBkZSB0aWVtcG8gYW50ZXMgZGUgcXVlIHNlIHJldmVsZSBlbCBzZWNyZXRvIHF1ZSBoYSBlc2NvbmRpZG8uIExhcyBjb3NhcyB0YW1iacOpbiBzb24gY29tcGxpY2FkYXMgZW4gbGEgbWFuc2nDs24gZGUgbG9zID9hbnNhbGFuLiBMYSBjdcOxYWRhIHZpdWRhIGRlIFN1bXJ1LCBIaWttZXQsIHZpdmUgZW4gbGEgbWFuc2nDs24gY29uIHN1IGhpamEgU2V2aWxheS4gU3Ugb2JqZXRpdm8gZXMgY2FzYXIgYSBzdSBoaWphIGNvbiBzdSBzb2JyaW5vIENpaGFuIHkgYXNlZ3VyYXIgc3UgZnV0dXJvLiBTYW1ldCwgdGFtYmnDqW4gYXBveWEgZXN0ZSBwbGFuLlxcblxcbk1pZW50cmFzIGxvcyBnZW1lbG9zIHBlcnNpZ3VlbiBsbyBxdWUgY3JlZW4gcXVlIGxlcyBjb3JyZXNwb25kZSBkZSBzdSBtYWRyZSwgTWVsZWsgc2UgY3J1emEgZW4gZWwgY2FtaW5vIGRlIENpaGFuLCB5IE51aCBlbmN1ZW50cmEgYSBTZXZpbGF5LiBEZXNkZSBlbCBwcmltZXIgbW9tZW50bywgQ2loYW4gc2UgdmUgcHJvZnVuZGFtZW50ZSBhZmVjdGFkbyBwb3IgTWVsZWsgeSBubyBwdWVkZSBzYWPDoXJzZWxhIGRlIGxhIGNhYmV6YSwgaW5jbHVzbyBjdWFuZG8gc2UgZW5jdWVudHJhIGFsIGJvcmRlIGRlIHVuIG1hdHJpbW9uaW8gZm9yemFkby4gTWllbnRyYXMgdGFudG8sIFNldmlsYXkgaW50ZW50YSBvcG9uZXJzZSBhbCBtYXRyaW1vbmlvIHBvciBzdSBjdWVudGEsIHkgc2UgY3J1emEgZW4gc3UgY2FtaW5vIE51aC5cXG5cXG5BdW5xdWUgU3VtcnUgaW50ZW50YSBtYW50ZW5lciBhIGxvcyBoaWpvcyBxdWUgcmVjaGF6w7MgYWxlamFkb3MgZGUgc3UgZmFtaWxpYSwgTWVsZWsgeSBOdWggZ3JhZHVhbG1lbnRlIHNlIGluZmlsdHJhcsOhbiB0YW50byBlbiBsYSBmYW1pbGlhIGNvbW8gZW4gbG9zIGNvcmF6b25lcyBkZSBDaWhhbiB5IFNldmlsYXkuIE1pZW50cmFzIGxvcyBwcm9ibGVtYXMgZGUgc2FsdWQgZGUgU2FtZXQgcHJlb2N1cGFuIGEgdG9kYSBsYSBmYW1pbGlhLCBzdSB2aWVqbyBlbmVtaWdvLCBUYWhzaW4sIGVzcGVyYSBlbiBsYSBzb21icmEsIGxpc3RvIHBhcmEgdmVuZ2Fyc2UgZGVsIHBhc2Fkby5cIixcbiAgICAgIFwicGFpc1wiOiBcIlR1cnF1w61hXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9jb3Jhem9uK25lZ3JvKy0rc2l5YWgra2FscC5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc1OTk5NDA5OTU4NSxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQwNzoxNDo1OS41ODVaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDg6MjYuMDg0WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkVsIG9sb3IgZGUgdW4gbmnDsW9cIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiRHJhbWFcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDM2LFxuICAgICAgXCJhw7FvXCI6IDIwMTcsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiZXlubywgdW5hIGpvdmVuIGVuZmVybWVyYSBlbiDDgW1zdGVyZGFtIHF1ZWRhIGVtYmFyYXphZGEgZGVsIGhvbWJyZSBhbCBxdWUgYW1hLCBzb8OxYW5kbyBjb24gZm9ybWFyIHVuYSBmYW1pbGlhIGZlbGl6LiBQZXJvIHVuIG1vbWVudG8gZGUgaXJhIGNhbWJpYSBzdSBkZXN0aW5vIHBhcmEgc2llbXByZSwgYWxlasOhbmRvbGEgZGUgc3UgaGlqbyB5IGVudHJlbGF6YW5kbyBzdSB2aWRhIGNvbiBsYSBwb2Rlcm9zYSBmYW1pbGlhIEFrYmE/LCBsw61kZXIgZGVsIHNlY3RvciBlbmVyZ8OpdGljbyBlbiBUdXJxdcOtYS4gTWllbnRyYXMgbG9zIGNvbmZsaWN0b3MgZGUgcG9kZXIgeSBsYXMgdGVuc2lvbmVzIGZhbWlsaWFyZXMgc2FjdWRlbiBhIGxvcyBBa2JhPywgWmV5bm8sIG1hcmNhZGEgcG9yIGxhIHDDqXJkaWRhLCBzZSB0cmFuc2Zvcm1hIGVuIHVuYSBtdWplciBmdWVydGUgeSBkZWNpZGlkYS4gRXN0YSBlcyBsYSBoaXN0b3JpYSBkZSB1bmEgbWFkcmUgcXVlIGx1Y2hhIHBvciByZWN1cGVyYXIgYSBzdSBoaWpvLCBkZSB1biBob21icmUgcXVlIGVuZnJlbnRhIHN1IGNvbmNpZW5jaWEsIHkgZGUgc2VjcmV0b3MgcXVlIHBvZHLDrWFuIGNhbWJpYXJsbyB0b2RvLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL2VsK29sb3IrZGUrdW4rbmklQzMlQjFvKzIuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc1OTk5NDI1MjkzNyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQwNzoxNzozMi45MzdaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDg6NTAuMDc2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIlZlbHZldCBlbCBudWV2byBpbXBlcmlvXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAzOCxcbiAgICAgIFwiYcOxb1wiOiAyMDI1LFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIuKAnFZlbHZldCwgZWwgbnVldm8gaW1wZXJpb+KAnSBzZSBjZW50cmEgZW4gQW5hIFZlbMOhenF1ZXosIHVuYSB0YWxlbnRvc2EgZGlzZcOxYWRvcmEgbWV4aWNhbmEgcXVlIGxsZWdhIGEgbGEgZW1wcmVzYSBkZSBtb2RhIFZlbHZldCBlbiBOdWV2YSBZb3JrIHRyYXMgcGVyZGVyIGEgc3UgbWFkcmUuXFxuXFxuQWxsw60sIHNlIGVuYW1vcmEgZGUgQWxiZXJ0byBNw6FycXVleiwgaGVyZWRlcm8gZGUgbGEgY29tcGHDscOtYSwgcGVybyBzdSByZWxhY2nDs24gc2UgdmUgZnJ1c3RyYWRhIHBvciBpbnRyaWdhcyB5IHVuIG1hdHJpbW9uaW8gcG9yIGNvbnZlbmllbmNpYSBjb24gQ3Jpc3RpbmEgT3J0ZWd1aS5cXG5cXG5FbnRvbmNlcywgZXZlbnR1YWxtZW50ZSwgQWxiZXJ0byBkZXNhcGFyZWNlIHkgQW5hIGNvbnRpbsO6YSBzdSBjYXJyZXJhIG1pZW50cmFzIGVzcGVyYSBhIHN1IGhpam8uXFxuXFxuVHJlcyBhw7FvcyBkZXNwdcOpcywgcmVzdWx0YSBxdWUgZWwgZGVzdGlubyBsb3MgcmXDum5lIG51ZXZhbWVudGUuIEFzw60sIHN1cGVyYW5kbyBtZW50aXJhcyB5IG9ic3TDoWN1bG9zLCBhbWJvcyByZWN1cGVyYW4gc3UgYW1vciB5IGZ1bmRhbiB1bmEgbnVldmEgZW1wcmVzYSBxdWUgY2VsZWJyYSBlbCBsZWdhZG8gZGUgVmVsdmV0IHkgc3UgZnV0dXJvIGVuIGZhbWlsaWEuLi5cIixcbiAgICAgIFwicGFpc1wiOiBcIkVzdGFkb3MgVW5pZG9zXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9WZWx2ZXQrZWwrbnVldm8raW1wZXJpbysyLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJ0cmFuc21pc2lvblwiLFxuICAgICAgXCJpZFwiOiAxNzYwMDAwMTc2OTgzLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA5VDA4OjU2OjE2Ljk4M1pcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowNjozNC44MjBaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiS3VtYSBsYSBvdHJhIGVzcG9zYVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogODEsXG4gICAgICBcImHDsW9cIjogMjAyNSxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJVbmEgam92ZW4gYWN1c2FkYSBpbmp1c3RhbWVudGUgZGUgYXNlc2luYXRvIGRlYmUgY29udmVydGlyc2UgZW4gbGEgc2VndW5kYSBlc3Bvc2EgKEt1bWEpIGRlbCBoZXJtYW5vIGRlIGxhIHbDrWN0aW1hLiBDZXlsYW4gZXMgdW5hIGhpamEgYW1hYmxlIHkgY3VtcGxpZG9yYSwgcGVybyBjdWFuZG8gc3UgcGFkcmUgaW50ZW50YSB2ZW5kZXJsYSBjb21vIHNlZ3VuZGEgZXNwb3NhIG8g4oCca3VtYeKAnSwgZWxsYSBodXllLiBFbiBzdSBjYW1pbm8gc2UgZW5jdWVudHJhIGNvbiBLYXJhbiwgdW4gam92ZW4gZW1wcmVzYXJpbyBhZGluZXJhZG8gcXVlIGFjb2dlIGEgQ2V5bGFuIGJham8gc3UgcHJvdGVjY2nDs24uIEFtYm9zIHNlIGVuYW1vcmFuLCBwZXJvIGN1YW5kbyBDZXlsYW4gZXMgYWN1c2FkYSBmYWxzYW1lbnRlIGRlbCBhc2VzaW5hdG8gZGVsIGhlcm1hbm8gZGUgS2FyYW4sIGVsIGFtb3Igc2UgdHJhbnNmb3JtYSBlbiBvZGlvLiBLYXJhbiBzZSBjYXNhIGNvbiBsYSB2aXVkYSBkZSBzdSBoZXJtYW5vIGZhbGxlY2lkbyB5IG9ibGlnYSBhIENleWxhbiBhIGNvbnZlcnRpcnNlIGVuIHN1IGt1bWEuIEF0cmFwYWRhIGVuIHVuYSBjYXNhIGRvbmRlIHRvZG9zIGxhIG9kaWFuIHkgc2luIHBvZGVyIHJlZ3Jlc2FyIGEgY2FzYSwgbGEgw7puaWNhIGVzcGVyYW56YSBkZSBDZXlsYW4gZXMgZGVtb3N0cmFyIHN1IGlub2NlbmNpYSB5LCB0YWwgdmV6LCByZWN1cGVyYXIgZWwgYW1vciBkZSBLYXJhbi5cXG5cXG7igJxLdW1h4oCdIHRlIGF0cmFwYSBkZSBpbm1lZGlhdG8gY29uIHVuYSBoaXN0b3JpYSBpbXBhY3RhbnRlOiBDZXlsYW4sIHVuYSBqb3ZlbiBpbm9jZW50ZSwgZXMgYWN1c2FkYSBpbmp1c3RhbWVudGUgZGUgdW4gYXNlc2luYXRvIHF1ZSBubyBjb21ldGnDsy4gUGFyYSBlc2NhcGFyIGRlIHVuIGRlc3Rpbm8gY3J1ZWwsIHNlIHZlIGZvcnphZGEgYSBjYXNhcnNlIGNvbiBLYXJhbiwgZWwgaGVybWFubyBkZSBsYSBzdXB1ZXN0YSB2w61jdGltYSwgY29udmlydGnDqW5kb3NlIGVuIHN1IHNlZ3VuZGEgZXNwb3NhLiBEZXNkZSBlbCBwcmltZXIgZXBpc29kaW8sIGxhIHRlbGVub3ZlbGEgdGUgc3VtZXJnZSBlbiB1biB0b3JiZWxsaW5vIGRlIGVtb2Npb25lcywgZG9uZGUgbGEgbHVjaGEgcG9yIGxhIHZlcmRhZCB5IGxhIHN1cGVydml2ZW5jaWEgc2UgZW50cmVsYXphbi4gwr9Dw7NtbyBsb2dyYXLDoSBDZXlsYW4gcHJvYmFyIHN1IGlub2NlbmNpYSBtaWVudHJhcyBlbmZyZW50YSB1biBtYXRyaW1vbmlvIGltcHVlc3RvIHkgdW4gZW50b3JubyBsbGVubyBkZSByZWNoYXpvP1xcblxcbkxhIHRlbnNpw7NuIHN1YmUgY3VhbmRvIENleWxhbiBlbnRyYSBlbiBsYSB2aWRhIGRlIEthcmFuIHkgc3UgcHJpbWVyYSBlc3Bvc2EsIFNlbWEsIHF1aWVuIGxhIGRlc3ByZWNpYSB5IGxhIGNvbnNpZGVyYSB1bmEgcml2YWwuIExvcyBlbmZyZW50YW1pZW50b3MgZW50cmUgZWxsYXMgc29uIHNvbG8gbGEgcHVudGEgZGVsIGljZWJlcmc6IGxhIGZhbWlsaWEgZ3VhcmRhIHNlY3JldG9zIG9zY3Vyb3MgcXVlIHNlIHJldmVsYW4gcG9jbyBhIHBvY28sIGRlamFuZG8gbcOhcyBwcmVndW50YXMgcXVlIHJlc3B1ZXN0YXMuIENhZGEgY2Fww610dWxvIHRlIG1hbnRpZW5lIGV4cGVjdGFudGUsIGRlc2N1YnJpZW5kbyBsYXMgdmVyZGFkZXJhcyBpbnRlbmNpb25lcyBkZSBsb3MgcGVyc29uYWplcyB5IGxhcyB0cmFpY2lvbmVzIHF1ZSBhY2VjaGFuIGVuIGNhZGEgZXNxdWluYS4gwr9RdcOpIGVuaWdtYXMgc2FsZHLDoW4gYSBsYSBsdXogeSBjw7NtbyBjYW1iaWFyw6FuIGVsIHJ1bWJvIGRlIGxhIHZpZGEgZGUgQ2V5bGFuP1xcblxcbuKAnEt1bWHigJ0gbm8gc29sbyBlcyBkcmFtYTsgdGFtYmnDqW4gdGUgb2ZyZWNlIHVuYSBwb2Rlcm9zYSBoaXN0b3JpYSBkZSBhbW9yIHkgc3VwZXJhY2nDs24uIE1pZW50cmFzIENleWxhbiBlbmZyZW50YSBob3N0aWxpZGFkIHkgZGVzYWbDrW9zLCBlbmN1ZW50cmEgYXBveW8gZW4gbG9zIGx1Z2FyZXMgbcOhcyBpbmVzcGVyYWRvcyB5IGNvbWllbnphIGEgZmxvcmVjZXIgdW4gcm9tYW5jZSBxdWUgZGVzYWbDrWEgdG9kYXMgbGFzIHByb2JhYmlsaWRhZGVzLiBBIGxvIGxhcmdvIGRlIGxhIHNlcmllLCBsYSB2ZXMgdHJhbnNmb3JtYXJzZSBkZSB1bmEgbXVqZXIgdnVsbmVyYWJsZSBhIHVuYSBsdWNoYWRvcmEgZGVjaWRpZGEsIGxpc3RhIHBhcmEgcmVjbGFtYXIgc3UgbHVnYXIgZW4gZWwgbXVuZG8uIMK/UG9kcsOhIGVsIGFtb3Igc29icmV2aXZpciBlbiB1biBlbnRvcm5vIHRhbiBob3N0aWwgeSBsbGV2YXLDoSBhIENleWxhbiBhIGVuY29udHJhciBzdSB2ZXJkYWRlcmEgZnVlcnphP1xcblxcbkNvbiBsb3MgbWFqZXN0dW9zb3MgcGFpc2FqZXMgZGVsIGVzdGUgZGUgVHVycXXDrWEgY29tbyB0ZWzDs24gZGUgZm9uZG8sIOKAnEt1bWHigJ0gZXMgdW4gZXNwZWN0w6FjdWxvIHZpc3VhbCBxdWUgYWNvbXBhw7FhIHVuYSBuYXJyYXRpdmEgZW1vY2lvbmFudGUuIExhIHRlbGVub3ZlbGEgY29tYmluYSB0ZW1hcyBwcm9mdW5kb3MgY29tbyBsYSBpbmp1c3RpY2lhIHkgbGEgcmVzaWxpZW5jaWEgY29uIGdpcm9zIGluZXNwZXJhZG9zIHF1ZSB0ZSBkZWphcsOhbiBhbnNpb3NvIHBvciBlbCBwcsOzeGltbyBlcGlzb2Rpby4gRXMgdW5hIGludml0YWNpw7NuIGEgc2VndWlyIGVsIHZpYWplIGRlIENleWxhbiBoYWNpYSBsYSByZWRlbmNpw7NuLCBsbGVubyBkZSBtaXN0ZXJpbywgcGFzacOzbiB5IGVzcGVyYW56YS4gU2kgYnVzY2FzIHVuYSBoaXN0b3JpYSBxdWUgdGUgaGFnYSBzZW50aXIsIHJlZmxleGlvbmFyIHkgbWFudGVuZXJ0ZSBhbCBib3JkZSBkZWwgYXNpZW50bywg4oCcS3VtYeKAnSB0ZSBlc3TDoSBlc3BlcmFuZG8gcGFyYSBxdWUgZGVzY3VicmFzIHF1w6kgcGFzYSBkZXNwdcOpcy4gXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvS3VtYStMYStvdHJhK2VzcG9zYS5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc2MDAwMDMyMDg0MyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQwODo1ODo0MC44NDNaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDM6MTkuMzk2WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkNhdXRpdmEgcG9yIGFtb3JcIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiRHJhbWFcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDcwLFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiSmF6bcOtbiwgc2VjdWVzdHJhZGEgcG9yIGVsIHRlcnJhdGVuaWVudGUgUmVtaWdpbyBGdWVudGVzLCBzb2JyZXZpdmUgZXNjbGF2aXR1ZCB5IGFidXNvcy4gQcOxb3MgZGVzcHXDqXMsIHJlZ3Jlc2EgYWwgcmFuY2hvIGJ1c2NhbmRvIHZlbmdhbnphIGEgdHJhdsOpcyBkZSBzdSBoaWpvIEZlcm5hbmRvLCBwZXJvIGNvbm9jZSBhIFNhbnRpYWdvLCB1biBwZcOzbiBxdWUgZmluZ2Ugc2VyIHBvbGljw61hLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiTcOpeGljb1wiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvY2F1dGl2YStwb3IrYW1vci5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzYwMDIyMjUwMzkwLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA5VDE1OjA0OjEwLjM5MFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowODowNC4wMzZaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiTGEgY2hpY2EgZGVsIG1vbWVudG9cIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiUm9tYW5jZVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMjEsXG4gICAgICBcImHDsW9cIjogMjAyMyxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJMYSB0cmFtYSwgYW1iaWVudGFkYSBlbiBsb3MgYcOxb3MgNTAsIGdpcmEgZW4gdG9ybm8gYSBCZWF0cml6IChEdWRhIFNhbnRvcywgZGUgUmVuYWNlciksIHF1aWVuIGhhIGNyZWNpZG8gY3JleWVuZG8gcXVlIHN1IG1hZHJlIENsYXJpY2UgKENhcm9sIENhc3RybyBkZSBIdcOpcmZhbm9zIGRlIHN1IHRpZXJyYSkgbGEgYWJhbmRvbsOzIGN1YW5kbyB0ZW7DrWEgY3VhdHJvIGHDsW9zLiBQZXJvIDE2IGHDsW9zIGRlc3B1w6lzIGRlc2N1YnJlIGVsIHBhcmFkZXJvIGRlIHN1IG1hZHJlIHkgc2UgZW50ZXJhIGRlIHF1ZSBubyBsYSBhYmFuZG9uw7Mgc2lubyBxdWUgcGVyZGnDsyBsYSBtZW1vcmlhIGVuIHVuIGFjY2lkZW50ZS4gUGVybyBCZWF0cml6IHRhbWJpw6luIGRlc2N1YnJpcsOhIHF1ZSBvdHJhIGpvdmVuLCBCaWEgKE1haXNhKSwgaGEgdG9tYWRvIHN1IGx1Z2FyIGUgaW5pY2lhcsOhIHVuIHZpYWplIGxsZW5vIGRlIG9ic3TDoWN1bG9zIHkgZGUgcmVjb25jaWxpYWNpw7NuIGNvbiBlbCBwYXNhZG8uXCIsXG4gICAgICBcInBhaXNcIjogXCJCcmFzaWxcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL2xhK2NoaWNhK2RlbCttb21lbnRvLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJ0cmFuc21pc2lvblwiLFxuICAgICAgXCJpZFwiOiAxNzYwMDIyNTA2NjQ2LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA5VDE1OjA4OjI2LjY0NlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowOTo1Mi45NzlaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiTGEgZW5jcnVjaWphZGFcIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiRHJhbWFcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDI4LFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiQ8Opc2FyIEJyYXZvIHZ1ZWx2ZSBkZSBNw6l4aWNvLCBjYXNpIHRyZWludGEgYcOxb3MgZGVzcHXDqXMsIGEgbGEgdGllcnJhIGRvbmRlIG5hY2nDsyBjdWFuZG8geWEgbmFkaWUgc2UgYWN1ZXJkYSBkZWwgYXBlbGxpZG8gZGUgc3UgcGFkcmUgbmkgZGUgbGFzIHRyw6FnaWNhcyBjaXJjdW5zdGFuY2lhcyBxdWUgcm9kZWFyb24gc3UgbXVlcnRlIHkgbGEgZGUgc3VzIGFidWVsb3MuIEF1bnF1ZSBzdSBhc3BlY3RvIGRlIHR1cmlzdGEgYXZlbnR1cmVybyBubyBsbyBkZWxhdGEsIHRpZW5lIG11eSBjbGFybyBhIGxvIHF1ZSB2aWVuZS5cXG5cXG5ObyBoYWxsYXLDoSBwYXogaGFzdGEgcXVlIG5vIGNvbnNpZ2EgaGFjZXIganVzdGljaWEgeSBtZXRlciBlbiBsYSBjw6FyY2VsIGEgT2N0YXZpbyBPcmFtYXMsIGVsIGhvbWJyZSBxdWUgc2UgYXByb3Bpw7MgZGUgbGEgaGlzdG9yaWEgZmFtaWxpYXIgZGUgc3UgcGFkcmUgeSBkZSB0b2RvIGxvIHF1ZSBsZSBwZXJ0ZW5lY8OtYSBwYXJhIGNyZWFyIHN1IHByb3BpbyBpbXBlcmlvLiBDb24gbG8gcXVlIG5vIGN1ZW50YSBDw6lzYXIgZXMgcXVlIGVuIHN1IGNhbWlubyBzZSBjcnV6YXLDoSBBbWFuZGEgT3JhbWFzLCBsYSBuacOxYSBkZSBsb3Mgb2pvcyBkZSBzdSBlbmVtaWdvLCBkZSBxdWllbiBzZSBlbmFtb3JhcsOhIHBlcmRpZGFtZW50ZS4gVW4gY3J1Y2UgZGUgY2FtaW5vcyBmb3J0dWl0byBxdWUgbWFyY2EgdW4gYW50ZXMgeSB1biBkZXNwdcOpcyBlbiBsYSB2aWRhIGRlIGRvcyBmYW1pbGlhcyByaXZhbGVzLiDCv1F1w6kgdmVuY2Vyw6E6IGVsIGFtb3IgbyBsYSB2ZW5nYW56YT9bXCIsXG4gICAgICBcInBhaXNcIjogXCJFc3Bhw7FhXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9MYStlbmNydWNpamFkYS5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc2MDAyMjYwMTM2NixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQxNToxMDowMS4zNjZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDM6NDUuMjUyWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkxleWxhXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAzMixcbiAgICAgIFwiYcOxb1wiOiAyMDI0LFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIkRlc3B1w6lzIGRlIHBlcmRlcmxvIHRvZG8sIExleWxhIHJlbmFjacOzIGVudHJlIGxhcyBzb21icmFzLiBMYSBpbm9jZW5jaWEgc2UgcXVlYnLDsyBlbCBkw61hIGVuIHF1ZSBzdSBwYWRyZSBjYXnDsyByZW5kaWRvIGFudGUgbG9zIGVuY2FudG9zIGRlIE51ciwgbGEgbXVqZXIgcXVlIGFsZ3VuYSB2ZXogZmluZ2nDsyBjdWlkYXIgZGUgc3UgZmFtaWxpYeKApiB5IHF1ZSBhaG9yYSwgY29udmVydGlkYSBlbiBzdSBtYWRyYXN0cmEsIG9jdWx0YSBtw6FzIGRlIHVuIHNlY3JldG8gZGV0csOhcyBkZSBzdSBzb25yaXNhLiBDdWFuZG8gZWwgYW1vciBjaWVnYSwgbGEgdHJhZ2VkaWEgYWJyZSBsb3Mgb2pvcy4gWSBMZXlsYSBsbyBhcHJlbmRpw7MgZGVtYXNpYWRvIHRhcmRlLlxcblxcbkHDsW9zIG3DoXMgdGFyZGUsIHJlZ3Jlc2EgYmFqbyB1bmEgbnVldmEgaWRlbnRpZGFkLiBOYWRpZSBzb3NwZWNoYSBxdWUgZXNhIHRhbGVudG9zYSBjaGVmIGxsYW1hZGEgRWxhIGVzIGVuIHJlYWxpZGFkIGxhIGhpamEgcXVlIHZpbyBzdSBob2dhciBjb252ZXJ0aXJzZSBlbiBydWluYXMuIE5pIHNpcXVpZXJhIE51ciwgcXVpZW4gYWhvcmEgdml2ZSByb2RlYWRhIGRlIGx1am9zIGp1bnRvIGEgc3UgbnVldm8gYW1hbnRlLCB1bmEgbGV5ZW5kYSBjYcOtZGEgZGVsIGbDunRib2wuIFBlcm8gZWwgZGVzdGlubyBubyBvbHZpZGHigKYgeSB0YW1wb2NvIHBlcmRvbmEuXFxuXFxuRWwgcmVlbmN1ZW50cm8gY29uIENpdmFuIOKAlGVsIGhpam8gYWRvcHRpdm8gZGUgTnVyIHkgYW50aWd1byBhbW9yIGRlIGluZmFuY2lhIGRlIExleWxh4oCUIGRlc2F0YSB1bmEgdG9ybWVudGEgZGUgZW1vY2lvbmVzLCBtZW50aXJhcyB5IGhlcmlkYXMgcXVlIGphbcOhcyBjZXJyYXJvbi4gQSBtZWRpZGEgcXVlIGxhcyBwaWV6YXMgZGVsIHBhc2FkbyBlbXBpZXphbiBhIGVuY2FqYXIsIGxhcyBwcmVndW50YXMgc2UgbXVsdGlwbGljYW4gY29tbyBjdWNoaWxsb3MgZW4gbGEgZXNwYWxkYTpcXG5cXG7Cv1B1ZWRlIGxhIHZlbmdhbnphIHNvYnJldml2aXIgYWwgYW1vcj8gwr9RdWnDqW4gZXMgcmVhbG1lbnRlIHbDrWN0aW1h4oCmIHkgcXVpw6luIGVsIHZlcmRhZGVybyB2aWxsYW5vPyDCv0hhc3RhIGTDs25kZSBlc3TDoSBkaXNwdWVzdGEgYSBsbGVnYXIgTGV5bGEgcGFyYSBoYWNlciBqdXN0aWNpYeKApiBvIHBhcmEgZGVzdHJ1aXJzZSBlbiBlbCBpbnRlbnRvPyBFbiB1biBqdWVnbyBkZSBpZGVudGlkYWRlcywgcGFzaW9uZXMgb2N1bHRhcyB5IHZlcmRhZGVzIHBlbGlncm9zYXPigKYgbmFkaWUgc2FsZSBpbGVzby5cIixcbiAgICAgIFwicGFpc1wiOiBcIlR1cnF1w61hXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9MZXlsYStIYXlhdC5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc2MDAyMjc2Mzk1MCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQxNToxMjo0My45NTBaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDU6MDQuMzA4WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIk1hbsOtYSBkZSB0aVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMTExLFxuICAgICAgXCJhw7FvXCI6IDIwMjQsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiTmFycmEgbGEgaGlzdG9yaWEgZGUgTHVuYSAoTW9yZWlyYSkgeSBWaW9sYSAoR2FieiksIGRvcyBjaGljYXMgcXVlIHNlIGNvbnZpZXJ0ZW4gZW4gYW1pZ2FzIGN1YW5kbyBsYSBzZWd1bmRhIHNlIGluc3RhbGEgZW4gQW5ncmEgZG9zIFJlaXMganVudG8gYSBzdSBtYXJpZG8gTWF2aS4gQ29uIGVsIHRpZW1wbywgVmlvbGEgc2UgZGVzdGFjYSBlbiBsYSBnYXN0cm9ub23DrWEsIG1pc21hIMOhcmVhIGRlIEx1bmEgeSB0YW1iacOpbiBzZSBpbnZvbHVjcmEgY29uIFJ1ZMOhIChDaGF5IFN1ZWRlKSwgZWwgaG9tYnJlIGFsIHF1ZSBMdW5hIGFtYS4gQcOxb3MgZGVzcHXDqXMsIFZpb2xhIHNlIGhhIGNvbnZlcnRpZG8gZW4gdW5hIMOpeGl0b3NhIGNoZWYsIG1pZW50cmFzIEx1bmEgcGVyZGnDsyB0b2RvIGxvIHF1ZSB0ZW7DrWEuIEFtYmFzIHJpdmFsZXMgc2UgdW5lbiBwYXJhIGludGVudGFyIGxpYmVyYXIgYSBSdWTDoSBkZSBsYSBjw6FyY2VsLCB0cmFzIHVuYSB0cmFtcGEgb2Nhc2lvbmFkYSBwb3IgTWF2aS5cIixcbiAgICAgIFwicGFpc1wiOiBcIkJyYXNpbFwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvbWFuaWErZGUrdGkyLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJmaW5hbGl6YWRhXCIsXG4gICAgICBcImlkXCI6IDE3NjAwMjI4NzM5NTAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDlUMTU6MTQ6MzMuOTUwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTE2VDA3OjUwOjI0LjAyNFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJNb250ZXZlcmRlXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiA4MSxcbiAgICAgIFwiYcOxb1wiOiAyMDI1LFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIuKAmE1vbnRldmVyZGXigJkgZXMgdW4gbWVsb2RyYW1hIGRvbmRlIGxvcyBoYWJpdGFudGVzIGRlIGVzdGUgcGVxdWXDsW8gcHVlYmxvIHZpdmlyw6FuIGVsIGFtb3IsIGxhIHRyYWljacOzbiB5IGxhIHJlZGVuY2nDs24gbWllbnRyYXMgZGVzY3VicmVuIGVsIGFtb3IgeSBsYSB2ZXJkYWQuXFxuXFxuTW9udGV2ZXJkZScgbmFycmEgbGEgdmlkYSBkZSBDYXJvbGluYSAow4FmcmljYSBaYXZhbGEpLCBxdWUgY2FtYmlhcsOhIHJhZGljYWxtZW50ZSBhbCBzZXIgYWN1c2FkYSBkZSB1biBmcmF1ZGUgcXVlIGNvbWV0acOzIHN1IG1hcmlkby4gUG9yIGVsbG8gZGViZSBzYWxpciBodXllbmRvIGNvbiBzdSBoaWpvIEFuZHLDqXMgKEp1bmllbCBHYXJjw61hKSB5IGFkb3B0YXIgbGEgaWRlbnRpZGFkIGRlIENlbGVzdGUsIHN1IGhlcm1hbmEgbWVsbGl6YSBxdWUgZXMgbW9uamEsIHBhcmEgcmVmdWdpYXJzZSBlbiBkaWNobyBwdWVibG8sIHBlcm8gdG9kbyBzZSBjb21wbGljYXLDoSBjdWFuZG8gY29ub2NlIGEgT3NjYXIgTGXDs24gKEdhYnJpZWwgU290bykuXFxuXFxuQWxlamFuZHJvIEliYXJyYSwgQ3ludGhpYSBLbGl0Ym8sIE1hcmlvIE1vcsOhbiwgQXJ0dXJvIENhcm1vbmEsIE1hcmlhbGljaWEgRGVsZ2FkbywgT3NjYXIgQm9uZmlnbGlvLCBGZXJuYW5kYSBVcmRhcGlsbGV0YSwgQWxkbyBHdWVycmEsIEFuYSBQYXRyaWNpbyBSb2pvLCBDaHJpc3RpYW4gUmFtb3MsIEFyYSBTYWxkw612YXIsIFJvZHJpZ28gUsOtb3MsIEp1bmllbCBHYXJjw61hLCBNYW51ZWwgUmlndWV6emEsIE1hcmNlbGEgR3V6bcOhbiwgQW5hIEthcmVuIFBhcnJhLCBYaW1lbmEgTWFydMOtbmV6LCBGZXJuYW5kYSBCZXJuYWwgeSBDbGF1ZGlhIEFjb3N0YSBjb21wbGVtZW50YW4gZWwgcmVwYXJ0by5cIixcbiAgICAgIFwicGFpc1wiOiBcIk3DqXhpY29cIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL21vbnRlK3ZlcmRlLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJ0cmFuc21pc2lvblwiLFxuICAgICAgXCJpZFwiOiAxNzYwMDIzMDA1NTEwLFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA5VDE1OjE2OjQ1LjUxMFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMToxNToxMS40NTlaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiRWwgcGFkcmUgKEJlbiBCdSBDaWhhbmEpXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAyMjQsXG4gICAgICBcImHDsW9cIjogMjAyMixcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJDZXpheWlyIFTDvHJrLCB1biBhc2VzaW5vIGRlbCBzZXJ2aWNpbyBzZWNyZXRvIHF1ZSBzaXJ2acOzIGEgc3UgcGHDrXMsIHNlIHZlbmdhIGRlIHN1IGhlcm1hbm8sIHF1aWVuIGZ1ZSBzYWJvdGVhZG8uIEVtcGllemEgdW5hIG51ZXZhIHZpZGEgZGVtb3N0cmFuZG8gcXVlIG11cmnDsyBwb3IgZWwgYmllbiBkZWwgZXN0YWRvIHkgbGEgc2VndXJpZGFkIGRlIHN1IGZhbWlsaWEuIEEgcmHDrXogZGUgdW5hIGxlc2nDs24gc3VmcmlkYSBkdXJhbnRlIHVuYSBkZSBzdXMgb3BlcmFjaW9uZXMgZW4gZWwgZXh0cmFuamVybywgY29ub2NlIGEgRmlydXplLCB1bm8gZGUgbG9zIG3DqWRpY29zIHNpbiBmcm9udGVyYXMuIEF1bnF1ZSBleHRyYcOxYSBhIHN1IGVzcG9zYSBlIGhpam9zLCBlbiBlbCBmb25kbyBkZSBzdSBjb3JhesOzbiBzYWJlIHF1ZSB2b2x2ZXIgY29uIGVsbG9zIGVzIGNhc2kgaW1wb3NpYmxlOyBzaW4gZW1iYXJnbywgZXN0YSBwYWxhYnJhIG5vIGVzdMOhIGVuIHN1IHZvY2FidWxhcmlvLiBTZSBlbmFtb3JhIGRlIEZpcnV6ZSBwYXJhIGZvcm1hciB1bmEgZmFtaWxpYTsgbWllbnRyYXMgdGFudG8sIHF1ZWRhIGV4cHVlc3RvIHkgdGllbmUgcXVlIHJlZ3Jlc2FyIGEgRXN0YW1idWwuIE5pIHN1IGZhbWlsaWEgc2VjdW5kYXJpYSBsbyBzYWJlLCBuaSBsYSBmYW1pbGlhIG9yaWdpbmFsLCBxdWUgbGxvcsOzIHkgcmV6w7MgZW4gc3UgY2VtZW50ZXJpbywgc2lndWnDsyBsb3MgcmVjaWVudGVzIGFjb250ZWNpbWllbnRvcyBxdWUgbGUgc3VjZWRpZXJvbi4gRXN0YW1idWwsIHBvciBvdHJvIGxhZG8sIG5vIGVzIGVsIG1pc21vIGx1Z2FyIGRlIGRvbmRlIHBhcnRpw7MuIEhhcsOhIHRvZG8gbG8gcG9zaWJsZSBwb3IgbHVjaGFyIGNvbnRyYSBsYXMgZnVlcnphcyBleHRyYW5qZXJhcywgYXVucXVlIHRhbWJpw6luIGRlYmVyw6EgZGl2aWRpciBzdSBlbmVyZ8OtYSBlbnRyZSBkb3MgbXVqZXJlcyBxdWUgbG8gYW1hbi5cIixcbiAgICAgIFwicGFpc1wiOiBcIlR1cnF1w61hXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9lbCtwYWRyZS5qcGVnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc2MDAyMzI5Nzc0MyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0wOVQxNToyMTozNy43NDNaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDk6MTUuNjY3WlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkthcnN1XCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAyMTUsXG4gICAgICBcImHDsW9cIjogMjAyNSxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJLYXJzdSwgZWwgYW1vciBkZSBtYWRyZSBudW5jYSBzZSByaW5kZSwgdW5hIHNlcmllIHR1cmNhIHF1ZSBjdWVudGEgbGEgY29ubW92ZWRvcmEgaGlzdG9yaWEgZGUgdW5hIG1hZHJlIHJlc2lsaWVudGUgYSBsYSBxdWUgbGEgdmlkYSBsYSBwb25lIGEgcHJ1ZWJhIGN1YW5kbyBjcmVlIHBlcmRlciBhIHVubyBkZSBzdXMgaGlqb3MgeSAgY3VhbmRvIHN1ZnJlIGxhIGluZmlkZWxpZGFkIGRlIHN1IGVzcG9zby4gVW4gZHJhbWEgcXVlIGRlc2NyaWJlIGxhIGVudGVyZXphIGRlIHVuYSBtdWplciBmcmVudGUgYSBsYXMgYWR2ZXJzaWRhZGVzIHkgcXVlIGhhYmxhIGRlbCBjYXLDoWN0ZXIgeSB2YWxlbnTDrWEgZGUgdW5hIG11amVyIHF1ZSBjb25zaWd1ZSBzZXIgIGluZGVwZW5kaWVudGUgcGFyYSBhc2VndXJhciBlbCBiaWVuZXN0YXIgZGUgc3VzIGhpam9zLiBVbmEgaGlzdG9yaWEgZGUgbHVjaGEsIHNhY3JpZmljaW8geSBlc3BlcmFuemEuXFxuXFxuS2Fyc3UsIG5vIGhhIHRlbmlkbyB1bmEgYnVlbmEgcmVsYWNpw7NuIGNvbiBzdSBtYWRyZSB5IGRlY2lkZSBhbGVqYXJzZSBkZSBzdSBmYW1pbGlhIHBhcmEgY2FzYXJzZSBjb24gUmVoYSwgdW4gaG9tYnJlIGFsIHF1ZSBubyBhbWEsIHkgZW4gZG9uZGUgbm8gZW5jdWVudHJhIGZlbGljaWRhZCwgc2luIGVtYmFyZ28sIGx1Y2hhIHBvciBtYW50ZW5lciBzdSBtYXRyaW1vbmlvIHBvciBlbCBiaWVuIGRlIHN1cyB0cmVzIGhpam9zLlxcblxcbkxhcyBjb3NhcyBwYXJhIEthcnN1IHNlIHZvbHZlcsOhbiBhw7puIG3DoXMgZHJhbcOhdGljYXMgY3VhbmRvLCBwb3IgdW4gZGVzY3VpZG8gZGUgc3UgbWFkcmUsIHN1IGhpam8gS3V6ZXkgZGVzYXBhcmVjZSwgIGRlYmlkbyBhIGVzdG8sIGxhIHJlbGFjacOzbiBjb24gc3UgZXNwb3NvIHNlIGNvbnZpZXJ0ZSBlbiB1biB0b3RhbCBpbmZpZXJubywgcHVlcyBhaG9yYSBlbCDDum5pY28gcHJvcMOzc2l0byBlbiBzdSB2aWRhIGVzIGVuY29udHJhciBhIHN1IGhpam8uIFBhc2EgZWwgdGllbXBvIGhhc3RhIHF1ZSB0cmVzIGHDsW9zIGRlc3B1w6lzIGRlIGLDunNxdWVkYSBpbmZydWN0dW9zYSwgZGEgY29uIHN1IHBhcmFkZXJvLiAgRWxsYSwgZW4gc3UgYW1vciBkZSBtYWRyZSwgaGFjZSB0b2RvIGxvIHBvc2libGUgcGFyYSB0cmFlcmxvIGRlIHJlZ3Jlc28gYSBjYXNhIGhhc3RhIHF1ZSBmaW5hbG1lbnRlIGxvIGxvZ3JhLCBwZXJvIGVzdG8gaGFjZSBxdWUgc3UgaGlqbyBkZXNwaWVydGUgdW5hIGludGVuc2EgaXJhIGVuIGNvbnRyYSBkZSBlbGxhLCBwdWVzIGxvIHNlcGFyYSBkZSBPemFuLCBxdWllbiBoYSBzaWRvIGVsIGhvbWJyZSBxdWUgbG8gaGEgY3VpZGFkbyBkdXJhbnRlIGVzdG9zIHRyZXMgYcOxb3MgeSBhIHF1aWVuIGNvbnNpZGVyYSBzdSBwYWRyZS4gwr9Mb2dyYXLDoSBnYW5hcnNlIGVsIGFtb3IgZGUgc3UgaGlqbz9cXG5cXG5QYXJhbGVsbyBhIGVzdGEgc2l0dWFjacOzbiwgS2Fyc3UgZXMgZW5nYcOxYWRhIHBvciBzdSBlc3Bvc28sIHN1ZnJpZW5kbyB1bmEgdGVycmlibGUgZGVjZXBjacOzbiBxdWUgbGEgaGFjZSB0b21hciBsYSBkZWNpc2nDs24gZGUgYWJhbmRvbmFyIHN1IGhvZ2FyIGp1bnRvIGEgc3VzIGhpam9zLiBEZXNlc3BlcmFkYSwgc2luIHRlbmVyIHVuIGx1Z2FyIGEgZG9uZGUgaXIsIHNlIHZlIG9ibGlnYWRhIGEgcmVncmVzYXIgYSBsYSBjYXNhIGRlIHN1IG1hZHJlLCBhIHF1aWVuIG5vIHZlIGRlc2RlIGhhY2UgYcOxb3MsIGNvbiBlbCDDum5pY28gZGVzZW8gZGUgcmVjb25zdHJ1aXIgc3UgdmlkYS5cXG5cXG5PemFuIHNlIHNpZW50ZSBhdHJhw61kbyBwb3IgS2Fyc3UgeSBzdSBwYXNpw7NuIHZhIGNyZWNpZW5kbyBjb24gZWwgcGFzYXIgZGUgbG9zIGTDrWFzLCBhIGVzdG8gc2Ugc3VtYSBhbCBhbW9yIHF1ZSBzaWVudGUgcG9yIEt1emV5LCBhIHF1aWVuIHZlIGNvbW8gc3UgaGlqby5cXG5cXG5MYXMgY29zYXMgc2UgY29tcGxpY2Fyw6FuIG3DoXMgY3VhbmRvIEthcnN1IGNvbm9jZSBhIEF0aWxsYSwgdW4gbWFmaW9zbyBxdWUgc2UgcHJlc2VudGEgY29tbyBlc2NyaXRvciwgeSBxdWUgIHRhbWJpw6luIHNlIHNpZW50ZSBhdHJhw61kbyBwb3IgZWxsYS4gQWwgbWlzbW8gdGllbXBvLCBzdSBtYXJpZG8sIFJlaGEsIGRlIHF1aWVuIGVzdMOhIGludGVudGFuZG8gZGl2b3JjaWFyc2UsIGhhIHByb21ldGlkbyBoYWNlcmxlIGxhIHZpZGEgaW1wb3NpYmxlLCBkZWrDoW5kb2xhIHNpbiBhcG95byBlY29uw7NtaWNvLCBhZGVtw6FzIGRlIG5lZ2Fyc2UgIGEgZGFybGUgZWwgZGl2b3JjaW8uIMK/UG9kcsOhICBlbmNvbnRyYXIgZWwgYW1vcj9cXG5cXG5MYSBwcm90YWdvbmlzdGEgZGUgZXN0YSBoaXN0b3JpYSB2aXZpcsOhIHVuIHZpYWplIGRlIHJlc2lsaWVuY2lhIHkgcmVub3ZhY2nDs24sIG1pZW50cmFzIGVuZnJlbnRhIGxvcyBkZXNhZsOtb3MgZGUgcmVjb25zdHJ1aXIgc3UgdmlkYSB5IGRlamFyIGF0csOhcyB1biBwYXNhZG8gYWdvYmlhbnRlLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0thcnN1JTJDK0xhK0Z1ZXJ6YStkZStVbmErTWFkcmUuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcInRyYW5zbWlzaW9uXCIsXG4gICAgICBcImlkXCI6IDE3NjAwMjM0MTA0NTMsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMDlUMTU6MjM6MzAuNDUzWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAxOjAyOjU0Ljc0MFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJMYSBlc2NsYXZhIG1hZHJlXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkRyYW1hXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiAxMjUsXG4gICAgICBcImHDsW9cIjogMjAxNixcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJKdWxpYW5hIGVzIGZydXRvIGRlIGxhIHZpb2xlbmNpYSBxdWUgc3UgbWFkcmUsIEx1ZW5hLCBzdWZyacOzIGR1cmFudGUgbGEgdHJhdmVzw61hIG9jZcOhbmljYSBhIGJvcmRvIGRlIHVuIG5hdsOtbyBtZXJjYW50ZSBxdWUgdGVuw61hIGNvbW8gbWVyY2FuY8OtYSBlc2NsYXZvcy4gQWwgY3VtcGxpciAxOCBhw7FvcyB5IGNvbm9jZXIgbGEgdmVyZGFkIHNvYnJlIHN1IHBhc2FkbywgSnVsaWFuYSBzZSBqdXJhIGEgc2kgbWlzbWEgcXVlIGphbcOhcyBkZWphcsOhIHF1ZSB1biBob21icmUgYmxhbmNvIGxhIHRvcXVlLiBFcyBlbiBlc2UgcHJlY2lzbyBtb21lbnRvIGRlIGRlc2VzcGVyYWNpw7NuIHF1ZSBjb25vY2UgYWwgam92ZW4gcG9ydHVndcOpcyBNaWd1ZWwsIHVuIHZpYWphbnRlIGVuIGLDunNxdWVkYSBkZSByZXNwdWVzdGFzIHNvYnJlIGVsIG1pc3RlcmlvIHF1ZSBpbnZvbHVjcmEgYSBsYSBtdWVydGUgZGUgc3VzIHBhZHJlcy5cXG5cXG5NaWd1ZWwgc2Vyw6EgZWwgZ3JhbiBhbW9yIGRlIHN1IHZpZGEsIHBlcm8gYWRlbcOhcyBkZXNwZXJ0YXLDoSBlbCBpbnRlcsOpcyBkZSBNYXJpYSBJc2FiZWwsIGhpamEgZGVsIGNvcm9uZWwgQ3VzdMOzZGlvLiBDb24gbGEgY29tcGxpY2lkYWQgZGUgc3UgZmllbCB5IHNhcmPDoXN0aWNhIG11Y2FtYSBFc23DqXJpYSwgTWFyaWEgSXNhYmVsIG5vIG1lZGlyw6Egc3VzIGVzZnVlcnpvcyBwYXJhIHBlcmp1ZGljYXIgYSBKdWxpYW5hLCBxdWUgamFtw6FzIGFjZXB0YXLDoSBlbCBkZXNhY2F0byBkZSB1bmEgZXNjbGF2YS5cXG5cXG5KdWxpYW5hIHRhbWJpw6luIGVuZnJlbnRhcsOhIHVuIG9ic3TDoWN1bG8gbXV5IHBvZGVyb3NvOiBlbCBDb21lbmRhZG9yIEFsbWVpZGEuIEFsIGNhc2Fyc2UgY29uIFRlcmVzYSBwb3IgdW4gYWN1ZXJkbyBxdWUgcGVybWl0aXLDrWEgc2FjYXIgYSBzdSBmYW1pbGlhIGRlIGxhIHJ1aW5hIGZpbmFuY2llcmEsIEFsbWVpZGEgc2UgY29udmllcnRlIGVuIGVsIG51ZXZvIHNlw7FvciBkZWwgSW5nZW5pbyBkZWwgU29sLiBFbCBjYXNhbWllbnRvIGRlIFRlcmVzYSB5IEFsbWVpZGEgZnVlIGVsIGNvbWllbnpvIGRlIHVuYSB0ZXJyaWJsZSBldGFwYSBlbiBsYSB2aWRhIGRlIEp1bGlhbmEsIHlhIHF1ZSBzdSBudWV2byBhbW8gc2UgcXVlZGFyw6EgY29tcGxldGFtZW50ZSBvYmNlY2FkbyBwb3IgZWxsYS5cXG5cXG5KdWxpYW5hIHkgTWlndWVsIHZpdmlyw6FuIGp1bnRvcyB1bmEgaW50ZW5zYSBoaXN0b3JpYSBkZSBhbW9yLCB5IGVuZnJlbnRhcsOhbiBhIGVuZW1pZ29zIHBvZGVyb3NvcyB5IG9ic3TDoWN1bG9zIGFwYXJlbnRlbWVudGUgZGlmw61jaWxlcyBkZSBzb2JyZWxsZXZhciwgY29tbyBlbCBwcmVqdWljaW8gZGUgdW5hIMOpcG9jYSBxdWUgdml2ZSBhIGxhIHNvbWJyYSBkZSBsYSBlc2NsYXZpdHVkLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiQnJhc2lsXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9sYStlc2NsYXZhK21hZHJlLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJ0cmFuc21pc2lvblwiLFxuICAgICAgXCJpZFwiOiAxNzYwMDIzNTM5NTU4LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTA5VDE1OjI1OjM5LjU1OFpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMToxMDoyMS43ODdaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiQ2FycGludGlcIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiUm9tYW5jZVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogNCxcbiAgICAgIFwiYcOxb1wiOiAyMDI1LFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIlRyYXMgcmVjaWJpciBlbCBjb3JhesOzbiBkZSBNZWxpa2UgQWxrYW4sIEFzbGkgc2UgYWRlbnRyYSBlbiB1biBtdW5kbyBkZSBkb2xvciwgcG9kZXIgeSBhbW9yIHByb2hpYmlkbywgbWllbnRyYXMgdG9kb3Mgc2UgcHJlZ3VudGFuIHNpIGxhIG11ZXJ0ZSBkZSBNZWxpa2UgZnVlIGFjY2lkZW50ZSBvIGFzZXNpbmF0by5cIixcbiAgICAgIFwicGFpc1wiOiBcIlR1cnF1w61hXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9DYXJwaW50aS5qcGVnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcInRyYW5zbWlzaW9uXCIsXG4gICAgICBcImlkXCI6IDE3NjAxMTg2OTI4MDAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMTBUMTc6NTE6MzIuODAwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAxOjAyOjE1LjE4MFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJCZXR0eSBsYSBmZWEsbGEgaGlzdG9yaWEgY29udGluw7phXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDE4LFxuICAgICAgXCJhw7FvXCI6IDIwMjQsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiQmV0dHkgbGEgZmVhLGxhIGhpc3RvcmlhIGNvbnRpbnVhIG5vdmVsYSBjb2xvbWJpYW5hLCBEb3MgZMOpY2FkYXMgZGVzcHXDqXMgZGUgY29ucXVpc3RhciBlbCBjb3JhesOzbiBkZSBBcm1hbmRvIE1lbmRvemEgeSB0cmFuc2Zvcm1hciBlbCBtdW5kbyBkZSBsYSBtb2RhLCBCZWF0cml6IFBpbnrDs24gU29sYW5vLCBtZWpvciBjb25vY2lkYSBjb21vIFxcXCJCZXR0eSBsYSBmZWFcXFwiLCBzZSBlbmZyZW50YSBhIG51ZXZvcyBkZXNhZsOtb3MgZW4gc3UgdmlkYSBwZXJzb25hbCB5IHByb2Zlc2lvbmFsLlxcblxcbkNvbnZlcnRpZGEgZW4gdW5hIHJlY29ub2NpZGEgZW1wcmVzYXJpYSB5IGRpc2XDsWFkb3JhIGRlIG1vZGEsIEJldHR5IGxpZGVyYSBFY29tb2RhIGNvbiBtYW5vIGZpcm1lLCBpbnNwaXJhbmRvIGEgbGFzIG11amVyZXMgY29uIHN1cyBjcmVhY2lvbmVzIHkgc3UgdmlzacOzbiBpbm5vdmFkb3JhLiBTaW4gZW1iYXJnbywgc3UgbWF0cmltb25pbyBjb24gQXJtYW5kbywgYXVucXVlIGxsZW5vIGRlIGFtb3IsIHNlIHZlIGFtZW5hemFkbyBwb3IgbGFzIGluc2VndXJpZGFkZXMgZGVsIHBhc2FkbyB5IGxhIGFwYXJpY2nDs24gZGUgbnVldm9zIHJpdmFsZXMgZW4gZWwgbXVuZG8gZGUgbG9zIG5lZ29jaW9zLlxcblxcbkFsIG1pc21vIHRpZW1wbywgQmV0dHkgZGViZSBsaWRpYXIgY29uIGxhcyBudWV2YXMgZ2VuZXJhY2lvbmVzIGVuIEVjb21vZGEuIExhcyBqw7N2ZW5lcyBkaXNlw7FhZG9yYXMsIGluZmx1ZW5jaWFkYXMgcG9yIGxhcyB0ZW5kZW5jaWFzIGRpZ2l0YWxlcyB5IGxhIGN1bHR1cmEgZGVsIGluZmx1ZW5jZXIsIGRlc2Fmw61hbiBsYSB2aXNpw7NuIHRyYWRpY2lvbmFsIGRlIEJldHR5IHNvYnJlIGxhIG1vZGEsIGdlbmVyYW5kbyB0ZW5zaW9uZXMgeSBkZWJhdGVzIGVuIGxhIGVtcHJlc2EuXFxuXFxuRW4gbWVkaW8gZGUgZXN0b3MgcmV0b3MsIEJldHR5IGVuY3VlbnRyYSBhcG95byBlbiBzdXMgZmllbGVzIGFtaWdvcywgTWFyY2VsYSB5IEh1Z28sIHF1aWVuZXMgbGEgYWNvbXBhw7FhbiBlbiBzdXMgYXZlbnR1cmFzIHkgbGUgb2ZyZWNlbiBjb25zZWpvcyBzYWJpb3MuIEFkZW3DoXMsIGRlc2N1YnJlIG51ZXZhcyBhbGlhZGFzIGVuIGFsZ3VuYXMgZGUgbGFzIGrDs3ZlbmVzIGRpc2XDsWFkb3JhcyBxdWUsIGEgcGVzYXIgZGUgc3VzIGRpZmVyZW5jaWFzLCByZWNvbm9jZW4gZWwgdGFsZW50byB5IGxhIGV4cGVyaWVuY2lhIGRlIEJldHR5LiBCZXR0eSBsYSBmZWEsbGEgaGlzdG9yaWEgY29udGluw7phIHRlbGVub3ZlbGEgY29sb21iaWFuYS5cIixcbiAgICAgIFwicGFpc1wiOiBcIkNvbG9tYmlhXCIsXG4gICAgICBcImltYWdlblwiOiBcImh0dHBzOi8vZjAwNS5iYWNrYmxhemViMi5jb20vZmlsZS90dmFsYWNhcnRhcGx1cy90dmFsYWNhcnRhcGx1cy9CZXR0eStsYStmZWElMkNsYStoaXN0b3JpYStjb250aW4lQzMlQkFhKzIucG5nXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc2MDExOTA1NzE4MCxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0xMFQxNzo1NzozNy4xODBaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDA6NTAuMjIwWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIkxhIFZlbmdhbnphIGRlIEFuYWzDrWEgMlwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogNjcsXG4gICAgICBcImHDsW9cIjogMjAyNSxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJFbiB1bmEganVnYWRhIG1hcXVpYXbDqWxpY2EsIGxvZ3JhIHNhbGlyIGRlIGxhIGPDoXJjZWwgcGFyYSB2b2x2ZXIgYSBsYSBwb2zDrXRpY2EsIHN1IG9iamV0aXZvIGVzIGNsYXJvOiBjYXN0aWdhciBhIEFuYWzDrWEgeSBjb252ZXJ0aXJzZSBlbiBlbCBwcmVzaWRlbnRlIGRlIENvbG9tYmlhLiBQYXJhIGV2aXRhciBlc3RvIHkgcHJvdGVnZXIgYSBsb3Mgc3V5b3MsIEFuYWzDrWEgcG9uZHLDoSBlbiByaWVzZ28gc3UgdmlkYSB5IHNlIGVuZnJlbnRhcsOhIGEgUGF1bGluYSBQZcOxYSwgYWxpYWRhIGRlIE1lasOtYSB5IGFzZXNpbmEgcHJvZmVzaW9uYWwuXCIsXG4gICAgICBcInBhaXNcIjogXCJDb2xvbWJpYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvVmVuZ2FuemEtZGUtQW5hbGlhLTIzLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJmaW5hbGl6YWRhXCIsXG4gICAgICBcImlkXCI6IDE3NjAxMTk4NTY3MDAsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMTBUMTg6MTA6NTYuNzAwWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAxOjA3OjA1LjI1MlpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJMZWtlXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIlJvbWFuY2VcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDMwLFxuICAgICAgXCJhw7FvXCI6IDIwMTksXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiTGVrZSBub3ZlbGEgdHVyY2EgdGllbmUgY29tbyBwZXJzb25hamUgcHJpbmNpcGFsIGEgWWFzZW1pbiwgcXVpZW4gc2UgbXVkw7MgYSBBbGVtYW5pYSB5IHR1dm8gbXVjaG9zIGFsdGliYWpvcy4gQSBwZXNhciBkZSBlbGxvLCBubyB0dXZvIG1pZWRvIGRlIGVtYmFyY2Fyc2UgZW4gdW5hIGF2ZW50dXJhLiBMb2dyYXLDrWEgaW5ncmVzYXIgZW4gbGEgZXNjdWVsYSBkZSBsZXllcywgeSBkZWJlcsOhIHRyYWJhamFyIG1lZGlvIHRpZW1wbyBwYXJhIHBhZ2FyIHN1cyBlc3R1ZGlvcy5cXG5cXG5EZXNjdWJyaXJlbW9zIHF1ZSB0aWVuZSB1biBoZXJtYW5vIGNvbiBkaXNjYXBhY2lkYWQgYXVkaXRpdmEseSBzdSDDum5pY2EgbWV0YSBlcyBsb2dyYXIgcmVjaWJpciBsYSBjdXN0b2RpYSBkZWwgam92ZW4sIHF1aWVuIGhhIHRlbmlkbyBxdWUgY3JlY2VyIGVuIHVuIG9yZmFuYXRvIHBvcnF1ZSBzdXMgcGFkcmVzIG5vIHF1aXNpZXJvbiBoYWNlcnNlIGNhcmdvIGRlIMOpbC4gSWd1YWxtZW50ZSwgZXN0w6EgYWhvcnJhbmRvIGRpbmVybyBwYXJhIGNvc3RlYXIgbGEgb3BlcmFjacOzbiBkZSBzdSBoZXJtYW5vLiBDb25vY2VyZW1vcyBhIG90cm8gcGVyc29uYWplIGxsYW1hZG8gQ2VtLCBxdWllbiBlcyBlbCBtYXlvciBkZSBkb3MgaGlqb3MgZGUgdW5hIGZhbWlsaWEgYWNhdWRhbGFkYS4gU3UgaW5mYW5jaWEgZnVlIHRyYXVtw6F0aWNhLCB5YSBxdWUgZnVlIHRlc3RpZ28gZGUgdW4gaW5jaWRlbnRlIHF1ZSBoaXpvIHF1ZSBzdXMgcGFkcmVzIHNlIGRpdm9yY2lhcmFuLiBBaG9yYSBlcyB1biBob21icmUgdGFsZW50b3NvIHBhcmEgbG9zIG5lZ29jaW9zLCBwZXJvIHN1IHZpZGEgcGVyc29uYWwgZXMgb3RyYS4gTm8gY29uZsOtYSBmw6FjaWxtZW50ZSBlbiBsYXMgcGVyc29uYXMgeSB0aWVuZSBjaWVydG8gcmVjZWxvIGNvbiBsYXMgbXVqZXJlcy4gU2luIGVzcGVyYXIgY29ub2NlcnNlLCB0YW50byBZYXNlbWluIGNvbW8gQ2VtIHRlbmRyw6FuIHVuIGVuY3VlbnRybyBxdWUgc2UgcHJvZHVjaXLDoSBlbiB1biBldmVudG8gcXVlIG9yZ2FuaXrDsyBsYSBjb21wYcOxw61hIGRlIGVzdGUgam92ZW4gYXB1ZXN0by5cXG5cXG5OaW5ndW5vIGJ1c2NhYmEgZXN0ZSBlbmN1ZW50cm8gZW4gTGVrZSBzZXJpZSB0dXJjYSwgZWwgY3VhbCBzZXLDoSBlbCBkZXNlbmNhZGVuYW50ZSBkZSB1bmEgc2VyaWUgZGUgc3VjZXNvcyBxdWUgZGViZXMgZGVzY3VicmlyLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0xla2UuanBnXCIsXG4gICAgICBcImVzdGFkb1wiOiBcImZpbmFsaXphZGFcIixcbiAgICAgIFwiaWRcIjogMTc2MDEyMDAzODA2NyxcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0xMFQxODoxMzo1OC4wNjdaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDE6MDQ6MzkuMDEyWlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdHVsb1wiOiBcIk1laG1lZCBTdWx0w6FuIGRlIGxhcyBDb25xdWlzdGFzXCIsXG4gICAgICBcImdlbmVyb1wiOiBcIkFjY2nDs25cIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDE1LFxuICAgICAgXCJhw7FvXCI6IDIwMjQsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiRW4gZXN0YSBhcGFzaW9uYW50ZSBwcm9kdWNjacOzbiwgbm9zIGFkZW50cmFtb3MgZW4gZWwgY29yYXrDs24gZGVsIEltcGVyaW8gb3RvbWFubywgZW4gdW5hIMOpcG9jYSBjYXJnYWRhIGRlIGNvbnF1aXN0YXMgeSBsdWNoYXMgcG9yIGxhIGp1c3RpY2lhLCBwYXJhIHNlciB0ZXN0aWdvcyBkZWwgdmlhamUgdHJpdW5mYWwgZGVsIGpvdmVuIHN1bHTDoW4gTWVobWVkIElJLCBjdXlhIGludGVsaWdlbmNpYSB5IHZhbGVudMOtYSBsbyBndWlhcsOhbiBlbiBzdSBjYW1pbm8gaGFjaWEgbGEgZ3JhbmRlemEuXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvTWVobWVkK1N1bHRhbitvZitDb25xdWVzdHMrMi5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwiZmluYWxpemFkYVwiLFxuICAgICAgXCJpZFwiOiAxNzYwMTI4NTk5NjU2LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTEwVDIwOjM2OjM5LjY1NlpcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowNTozMi40MjBaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiUmVwcmVzYWxpYXNcIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiQWNjacOzblwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogMTAsXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJBbGkgUmVzYXQsIHVuIGbDqXJyZW8gaG9tYnJlIGFwZWdhZG8gYSBzdXMgdHJhZGljaW9uZXMsIGVzIGxpYmVyYWRvIHRyYXMgbGFyZ29zIGHDsW9zIGVuIHByaXNpw7NuIGdyYWNpYXMgYSB1bmEgYW1uaXN0w61hLiBDb24gbGEgZXNwZXJhbnphIGRlIHJlY29uY2lsaWFyc2UgY29uIHN1IGhpam8sIHF1aWVuIGxvIGRlc3ByZWNpYSwgeSBjb24gZWwgZGVzZW8gZGUgaGFjZXIgcGFnYXIgYSBsYSBtYWZpYSB0b2RvIG1hbCBxdWUgbGUgaGl6bywgQWxpIFJlc2F0IGlyw6EgZW4gYnVzY2EgZGUgcmVkZW5jacOzbi4uLiB5IHJlcHJlc2FsaWFzLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL1JlcHJlc2FsaWFzLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJ0cmFuc21pc2lvblwiLFxuICAgICAgXCJpZFwiOiAxNzYwMTI5MjU0MzI3LFxuICAgICAgXCJjcmVhdGVkQXRcIjogXCIyMDI1LTEwLTEwVDIwOjQ3OjM0LjMyN1pcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNS0xMC0xMlQwMTowNjowMC45MzJaXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0dWxvXCI6IFwiTGF6b3MgUm90b3MgKFlhbGFuKVwiLFxuICAgICAgXCJnZW5lcm9cIjogXCJEcmFtYVwiLFxuICAgICAgXCJjYXBpdHVsb3NcIjogOTUsXG4gICAgICBcImHDsW9cIjogMjAyNCxcbiAgICAgIFwiZGVzY3JpcGNpb25cIjogXCJZYWxhbiBub3ZlbGEgdHVyY2EsIE1lbGlrZSwgdW5hIG11amVyIGZ1ZXJ0ZSB5IHJlc2lsaWVudGUsIGhhIHNhY3JpZmljYWRvIDIwIGHDsW9zIGRlIHN1IHZpZGEgZW4gcHJpc2nDs24gcGFyYSBwcm90ZWdlciBhIHN1IGhpamEgRWxpZi4gQWN1c2FkYSBpbmp1c3RhbWVudGUgZGUgdW4gY3JpbWVuIHF1ZSBubyBjb21ldGnDsywgTWVsaWtlIGhhIHNvcG9ydGFkbyBlbCBkb2xvciB5IGxhIHNvbGVkYWQgY29uIGxhIGVzcGVyYW56YSBkZSB1biBmdXR1cm8gbWVqb3IgcGFyYSBzdSBwZXF1ZcOxYS5cXG5cXG5BbCBmaW4gbGliZXJhZGEsIE1lbGlrZSByZWdyZXNhIGEgdW4gbXVuZG8gcXVlIHlhIG5vIHJlY29ub2NlLiBTdSBoaWphIEVsaWYgaGEgY3JlY2lkbyBiYWpvIGxhIHR1dGVsYSBkZSBvdHJhcyBwZXJzb25hcywgeSBNZWxpa2UgZGViZSBsdWNoYXIgcGFyYSByZWN1cGVyYXIgc3UgbHVnYXIgZW4gbGEgdmlkYSBkZSBzdSBoaWphLlxcblxcblNpbiBlbWJhcmdvLCBsYSB2ZXJkYWQgc29icmUgZWwgY3JpbWVuIHF1ZSBsYSBsbGV2w7MgYSBwcmlzacOzbiBubyB0YXJkYXLDoSBlbiBzYWxpciBhIGxhIGx1ei4gTWVsaWtlIHNlIHZlcsOhIGVudnVlbHRhIGVuIHVuYSByZWQgZGUgbWVudGlyYXMsIGVuZ2HDsW9zIHkgdHJhaWNpb25lcyBxdWUgYW1lbmF6YW4gY29uIGRlc3RydWlyIHN1IHZpZGEgeSBsYSBkZSBzdSBoaWphLlxcblxcbkVuIG1lZGlvIGRlIGxhIGFkdmVyc2lkYWQsIE1lbGlrZSBlbmNvbnRyYXLDoSBhcG95byBlbiBTdW5hLCB1bmEgam92ZW4gYWJvZ2FkYSBpZGVhbGlzdGEgcXVlIGNyZWUgZW4gc3UgaW5vY2VuY2lhLiBKdW50YXMsIGx1Y2hhcsOhbiBwb3IgZGVzZW5tYXNjYXJhciBhIGxvcyB2ZXJkYWRlcm9zIGN1bHBhYmxlcyB5IHJlc3RhdXJhciBlbCBob25vciBkZSBNZWxpa2UuXFxuXFxuQSBsbyBsYXJnbyBkZSBzdSBjYW1pbm8sIE1lbGlrZSBzZSBlbmZyZW50YXLDoSBhIHBvZGVyb3NvcyBlbmVtaWdvcyBxdWUgbm8gc2UgZGV0ZW5kcsOhbiBhbnRlIG5hZGEgcGFyYSBzaWxlbmNpYXJsYS4gRGViZXLDoSB1dGlsaXphciBzdSBhc3R1Y2lhLCBzdSB2YWxlbnTDrWEgeSBzdSBkZXRlcm1pbmFjacOzbiBwYXJhIHByb3RlZ2VyIGEgc3UgaGlqYSB5IGRlc2N1YnJpciBsYSB2ZXJkYWQuIFlhbGFuIHNlcmllIHR1cmNhLlwiLFxuICAgICAgXCJwYWlzXCI6IFwiVHVycXXDrWFcIixcbiAgICAgIFwiaW1hZ2VuXCI6IFwiaHR0cHM6Ly9mMDA1LmJhY2tibGF6ZWIyLmNvbS9maWxlL3R2YWxhY2FydGFwbHVzL3R2YWxhY2FydGFwbHVzL0xhem9zK1JvdG9zLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJmaW5hbGl6YWRhXCIsXG4gICAgICBcImlkXCI6IDE3NjAxMjk5NjY1NjIsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMTBUMjA6NTk6MjYuNTYyWlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAxOjA0OjE1LjgyOFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJEZXN0aW5vIHJvdG9cIixcbiAgICAgIFwiZ2VuZXJvXCI6IFwiRHJhbWFcIixcbiAgICAgIFwiY2FwaXR1bG9zXCI6IDEyMSxcbiAgICAgIFwiYcOxb1wiOiAyMDIyLFxuICAgICAgXCJkZXNjcmlwY2lvblwiOiBcIk1lbGlrZSwgcXVlIHNvYnJldml2acOzIGVuIHByaXNpw7NuIGR1cmFudGUgMjAgYcOxb3MgcG9yIGVsIGJpZW4gZGUgc3UgaGlqYSwgY2F5w7MgZW4gbWVkaW8gZGUgdW5hIGdyYW4gbWVudGlyYSBjdWFuZG8gZnVlIHB1ZXN0YSBlbiBsaWJlcnRhZC4gVG9kYXMgbGFzIGluanVzdGljaWFzIHkgZWwgbWFsIHF1ZSBzZSBsZSBoYW4gaGVjaG8gc2FsZW4gYWwgZGVzY3ViaWVydG8gYW50ZSBNZWxpa2UuXCIsXG4gICAgICBcInBhaXNcIjogXCJUdXJxdcOtYVwiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvRGVzdGlubytyb3RvLmpwZ1wiLFxuICAgICAgXCJlc3RhZG9cIjogXCJmaW5hbGl6YWRhXCIsXG4gICAgICBcImlkXCI6IDE3NjAyMzkzOTAwMzgsXG4gICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMTAtMTJUMDM6MjM6MTAuMDM4WlwiLFxuICAgICAgXCJ1cGRhdGVkQXRcIjogXCIyMDI1LTEwLTEyVDAzOjIzOjEwLjAzOFpcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXR1bG9cIjogXCJEaW5hc3RpYSBDYXNpbGxhc1wiLFxuICAgICAgXCJnZW5lcm9cIjogXCJBY2Npw7NuXCIsXG4gICAgICBcImNhcGl0dWxvc1wiOiA2LFxuICAgICAgXCJhw7FvXCI6IDIwMjUsXG4gICAgICBcImRlc2NyaXBjaW9uXCI6IFwiVHJhcyBsYSBtaXN0ZXJpb3NhIGRlc2FwYXJpY2nDs24gZGUgQXVyZWxpbywgSXNtYWVsIENhc2lsbGFzIHNlIHZlIG9ibGlnYWRvIGEgZW5mcmVudGFyIHVuYSBkZXNwaWFkYWRhIGJhdGFsbGEgcG9yIGVsIGxlZ2FkbyB5IGxhIGZhbWlsaWEuIFByb3RlZ2VyIGEgbG9zIHN1eW9zIGxlIGV4aWdlIGFsaWFuemFzIHkgc2FjcmlmaWNpb3MuXCIsXG4gICAgICBcInBhaXNcIjogXCJFc3RhZG9zIFVuaWRvc1wiLFxuICAgICAgXCJpbWFnZW5cIjogXCJodHRwczovL2YwMDUuYmFja2JsYXplYjIuY29tL2ZpbGUvdHZhbGFjYXJ0YXBsdXMvdHZhbGFjYXJ0YXBsdXMvRGluYXN0aWErY2FzaWxsYS5qcGdcIixcbiAgICAgIFwiZXN0YWRvXCI6IFwidHJhbnNtaXNpb25cIixcbiAgICAgIFwiaWRcIjogMTc2MDYwMTkzNDk5NixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNS0xMC0xNlQwODowNTozNC45OTZaXCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjUtMTAtMTZUMDg6MDU6MzQuOTk2WlwiXG4gICAgfVxuICBdLFxuICBcInNldHRpbmdzXCI6IHtcbiAgICBcInZlcnNpb25cIjogXCIyLjEuMFwiLFxuICAgIFwiYXV0b1N5bmNcIjogdHJ1ZSxcbiAgICBcInN5bmNJbnRlcnZhbFwiOiAzMDAwMDAsXG4gICAgXCJlbmFibGVOb3RpZmljYXRpb25zXCI6IHRydWUsXG4gICAgXCJtYXhOb3RpZmljYXRpb25zXCI6IDEwMCxcbiAgICBcIm1ldGFkYXRhXCI6IHtcbiAgICAgIFwidG90YWxPcmRlcnNcIjogMCxcbiAgICAgIFwidG90YWxSZXZlbnVlXCI6IDAsXG4gICAgICBcImxhc3RPcmRlckRhdGVcIjogXCJcIixcbiAgICAgIFwic3lzdGVtVXB0aW1lXCI6IFwiMjAyNS0xMC0wNFQwMjo1NTozNi4yOTVaXCJcbiAgICB9XG4gIH0sXG4gIFwic3luY1N0YXR1c1wiOiB7XG4gICAgXCJsYXN0U3luY1wiOiBcIjIwMjUtMTAtMDRUMDM6NDk6MDMuNzI5WlwiLFxuICAgIFwiaXNPbmxpbmVcIjogdHJ1ZSxcbiAgICBcInBlbmRpbmdDaGFuZ2VzXCI6IDFcbiAgfSxcbiAgXCJleHBvcnREYXRlXCI6IFwiMjAyNS0xMC0wNFQwMzo0OToxMC45OTJaXCJcbn07XG5cbi8vIENSRURFTkNJQUxFUyBERSBBQ0NFU08gKENPTkZJR1VSQUJMRVMpXG5jb25zdCBBRE1JTl9DUkVERU5USUFMUyA9IHtcbiAgdXNlcm5hbWU6ICdhZG1pbicsXG4gIHBhc3N3b3JkOiAnYWRtaW4xMjMnXG59O1xuXG4vLyBUeXBlc1xuZXhwb3J0IGludGVyZmFjZSBQcmljZUNvbmZpZyB7XG4gIG1vdmllUHJpY2U6IG51bWJlcjtcbiAgc2VyaWVzUHJpY2U6IG51bWJlcjtcbiAgdHJhbnNmZXJGZWVQZXJjZW50YWdlOiBudW1iZXI7XG4gIG5vdmVsUHJpY2VQZXJDaGFwdGVyOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsaXZlcnlab25lIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBjb3N0OiBudW1iZXI7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICB1cGRhdGVkQXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZlbCB7XG4gIGlkOiBudW1iZXI7XG4gIHRpdHVsbzogc3RyaW5nO1xuICBnZW5lcm86IHN0cmluZztcbiAgY2FwaXR1bG9zOiBudW1iZXI7XG4gIGHDsW86IG51bWJlcjtcbiAgZGVzY3JpcGNpb24/OiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICB1cGRhdGVkQXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb24ge1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ3dhcm5pbmcnIHwgJ2luZm8nO1xuICB0aXRsZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xuICBzZWN0aW9uOiBzdHJpbmc7XG4gIGFjdGlvbjogc3RyaW5nO1xuICByZWFkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNTdGF0dXMge1xuICBsYXN0U3luYzogc3RyaW5nO1xuICBpc09ubGluZTogYm9vbGVhbjtcbiAgcGVuZGluZ0NoYW5nZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTeXN0ZW1Db25maWcge1xuICB2ZXJzaW9uOiBzdHJpbmc7XG4gIGxhc3RFeHBvcnQ6IHN0cmluZztcbiAgcHJpY2VzOiBQcmljZUNvbmZpZztcbiAgZGVsaXZlcnlab25lczogRGVsaXZlcnlab25lW107XG4gIG5vdmVsczogTm92ZWxbXTtcbiAgc2V0dGluZ3M6IHtcbiAgICBhdXRvU3luYzogYm9vbGVhbjtcbiAgICBzeW5jSW50ZXJ2YWw6IG51bWJlcjtcbiAgICBlbmFibGVOb3RpZmljYXRpb25zOiBib29sZWFuO1xuICAgIG1heE5vdGlmaWNhdGlvbnM6IG51bWJlcjtcbiAgfTtcbiAgbWV0YWRhdGE6IHtcbiAgICB0b3RhbE9yZGVyczogbnVtYmVyO1xuICAgIHRvdGFsUmV2ZW51ZTogbnVtYmVyO1xuICAgIGxhc3RPcmRlckRhdGU6IHN0cmluZztcbiAgICBzeXN0ZW1VcHRpbWU6IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZG1pblN0YXRlIHtcbiAgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuO1xuICBwcmljZXM6IFByaWNlQ29uZmlnO1xuICBkZWxpdmVyeVpvbmVzOiBEZWxpdmVyeVpvbmVbXTtcbiAgbm92ZWxzOiBOb3ZlbFtdO1xuICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcbiAgc3luY1N0YXR1czogU3luY1N0YXR1cztcbiAgc3lzdGVtQ29uZmlnOiBTeXN0ZW1Db25maWc7XG59XG5cbnR5cGUgQWRtaW5BY3Rpb24gPSBcbiAgfCB7IHR5cGU6ICdMT0dJTic7IHBheWxvYWQ6IHsgdXNlcm5hbWU6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZyB9IH1cbiAgfCB7IHR5cGU6ICdMT0dPVVQnIH1cbiAgfCB7IHR5cGU6ICdVUERBVEVfUFJJQ0VTJzsgcGF5bG9hZDogUHJpY2VDb25maWcgfVxuICB8IHsgdHlwZTogJ0FERF9ERUxJVkVSWV9aT05FJzsgcGF5bG9hZDogT21pdDxEZWxpdmVyeVpvbmUsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICd1cGRhdGVkQXQnPiB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX0RFTElWRVJZX1pPTkUnOyBwYXlsb2FkOiBEZWxpdmVyeVpvbmUgfVxuICB8IHsgdHlwZTogJ0RFTEVURV9ERUxJVkVSWV9aT05FJzsgcGF5bG9hZDogbnVtYmVyIH1cbiAgfCB7IHR5cGU6ICdBRERfTk9WRUwnOyBwYXlsb2FkOiBPbWl0PE5vdmVsLCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAndXBkYXRlZEF0Jz4gfVxuICB8IHsgdHlwZTogJ1VQREFURV9OT1ZFTCc7IHBheWxvYWQ6IE5vdmVsIH1cbiAgfCB7IHR5cGU6ICdERUxFVEVfTk9WRUwnOyBwYXlsb2FkOiBudW1iZXIgfVxuICB8IHsgdHlwZTogJ0FERF9OT1RJRklDQVRJT04nOyBwYXlsb2FkOiBPbWl0PE5vdGlmaWNhdGlvbiwgJ2lkJyB8ICd0aW1lc3RhbXAnPiB9XG4gIHwgeyB0eXBlOiAnTUFSS19OT1RJRklDQVRJT05fUkVBRCc7IHBheWxvYWQ6IHN0cmluZyB9XG4gIHwgeyB0eXBlOiAnQ0xFQVJfTk9USUZJQ0FUSU9OUycgfVxuICB8IHsgdHlwZTogJ1VQREFURV9TWU5DX1NUQVRVUyc7IHBheWxvYWQ6IFBhcnRpYWw8U3luY1N0YXR1cz4gfVxuICB8IHsgdHlwZTogJ1NZTkNfU1RBVEUnOyBwYXlsb2FkOiBQYXJ0aWFsPEFkbWluU3RhdGU+IH1cbiAgfCB7IHR5cGU6ICdMT0FEX1NZU1RFTV9DT05GSUcnOyBwYXlsb2FkOiBTeXN0ZW1Db25maWcgfVxuICB8IHsgdHlwZTogJ1VQREFURV9TWVNURU1fQ09ORklHJzsgcGF5bG9hZDogUGFydGlhbDxTeXN0ZW1Db25maWc+IH07XG5cbmludGVyZmFjZSBBZG1pbkNvbnRleHRUeXBlIHtcbiAgc3RhdGU6IEFkbWluU3RhdGU7XG4gIGxvZ2luOiAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgbG9nb3V0OiAoKSA9PiB2b2lkO1xuICB1cGRhdGVQcmljZXM6IChwcmljZXM6IFByaWNlQ29uZmlnKSA9PiB2b2lkO1xuICBhZGREZWxpdmVyeVpvbmU6ICh6b25lOiBPbWl0PERlbGl2ZXJ5Wm9uZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCc+KSA9PiB2b2lkO1xuICB1cGRhdGVEZWxpdmVyeVpvbmU6ICh6b25lOiBEZWxpdmVyeVpvbmUpID0+IHZvaWQ7XG4gIGRlbGV0ZURlbGl2ZXJ5Wm9uZTogKGlkOiBudW1iZXIpID0+IHZvaWQ7XG4gIGFkZE5vdmVsOiAobm92ZWw6IE9taXQ8Tm92ZWwsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICd1cGRhdGVkQXQnPikgPT4gdm9pZDtcbiAgdXBkYXRlTm92ZWw6IChub3ZlbDogTm92ZWwpID0+IHZvaWQ7XG4gIGRlbGV0ZU5vdmVsOiAoaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgYWRkTm90aWZpY2F0aW9uOiAobm90aWZpY2F0aW9uOiBPbWl0PE5vdGlmaWNhdGlvbiwgJ2lkJyB8ICd0aW1lc3RhbXAnPikgPT4gdm9pZDtcbiAgbWFya05vdGlmaWNhdGlvblJlYWQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBjbGVhck5vdGlmaWNhdGlvbnM6ICgpID0+IHZvaWQ7XG4gIGV4cG9ydFN5c3RlbUNvbmZpZzogKCkgPT4gc3RyaW5nO1xuICBpbXBvcnRTeXN0ZW1Db25maWc6IChjb25maWdKc29uOiBzdHJpbmcpID0+IGJvb2xlYW47XG4gIGV4cG9ydENvbXBsZXRlU291cmNlQ29kZTogKCkgPT4gdm9pZDtcbiAgc3luY1dpdGhSZW1vdGU6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGJyb2FkY2FzdENoYW5nZTogKGNoYW5nZTogYW55KSA9PiB2b2lkO1xuICBzeW5jQWxsU2VjdGlvbnM6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGdldEF2YWlsYWJsZUNvdW50cmllczogKCkgPT4gc3RyaW5nW107XG4gIHVwZGF0ZVN5c3RlbUNvbmZpZzogKGNvbmZpZzogUGFydGlhbDxTeXN0ZW1Db25maWc+KSA9PiB2b2lkO1xufVxuXG4vLyBJbml0aWFsIHN0YXRlIHdpdGggZW1iZWRkZWQgY29uZmlndXJhdGlvblxuY29uc3QgaW5pdGlhbFN0YXRlOiBBZG1pblN0YXRlID0ge1xuICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICBwcmljZXM6IEVNQkVEREVEX0NPTkZJRy5wcmljZXMsXG4gIGRlbGl2ZXJ5Wm9uZXM6IEVNQkVEREVEX0NPTkZJRy5kZWxpdmVyeVpvbmVzLFxuICBub3ZlbHM6IEVNQkVEREVEX0NPTkZJRy5ub3ZlbHMsXG4gIG5vdGlmaWNhdGlvbnM6IFtdLFxuICBzeW5jU3RhdHVzOiB7XG4gICAgbGFzdFN5bmM6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBpc09ubGluZTogdHJ1ZSxcbiAgICBwZW5kaW5nQ2hhbmdlczogMCxcbiAgfSxcbiAgc3lzdGVtQ29uZmlnOiBFTUJFRERFRF9DT05GSUcsXG59O1xuXG4vLyBSZWR1Y2VyXG5mdW5jdGlvbiBhZG1pblJlZHVjZXIoc3RhdGU6IEFkbWluU3RhdGUsIGFjdGlvbjogQWRtaW5BY3Rpb24pOiBBZG1pblN0YXRlIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ0xPR0lOJzpcbiAgICAgIGlmIChhY3Rpb24ucGF5bG9hZC51c2VybmFtZSA9PT0gQURNSU5fQ1JFREVOVElBTFMudXNlcm5hbWUgJiYgYWN0aW9uLnBheWxvYWQucGFzc3dvcmQgPT09IEFETUlOX0NSRURFTlRJQUxTLnBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgJ0xPR09VVCc6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSB9O1xuXG4gICAgY2FzZSAnVVBEQVRFX1BSSUNFUyc6XG4gICAgICBjb25zdCB1cGRhdGVkQ29uZmlnID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIHByaWNlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHJpY2VzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgc3lzdGVtQ29uZmlnOiB1cGRhdGVkQ29uZmlnLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIHBlbmRpbmdDaGFuZ2VzOiBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzICsgMSB9XG4gICAgICB9O1xuXG4gICAgY2FzZSAnQUREX0RFTElWRVJZX1pPTkUnOlxuICAgICAgY29uc3QgbmV3Wm9uZTogRGVsaXZlcnlab25lID0ge1xuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaWQ6IERhdGUubm93KCksXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb25maWdXaXRoTmV3Wm9uZSA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiBbLi4uc3RhdGUuc3lzdGVtQ29uZmlnLmRlbGl2ZXJ5Wm9uZXMsIG5ld1pvbmVdLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IFsuLi5zdGF0ZS5kZWxpdmVyeVpvbmVzLCBuZXdab25lXSxcbiAgICAgICAgc3lzdGVtQ29uZmlnOiBjb25maWdXaXRoTmV3Wm9uZSxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBwZW5kaW5nQ2hhbmdlczogc3RhdGUuc3luY1N0YXR1cy5wZW5kaW5nQ2hhbmdlcyArIDEgfVxuICAgICAgfTtcblxuICAgIGNhc2UgJ1VQREFURV9ERUxJVkVSWV9aT05FJzpcbiAgICAgIGNvbnN0IHVwZGF0ZWRab25lcyA9IHN0YXRlLmRlbGl2ZXJ5Wm9uZXMubWFwKHpvbmUgPT5cbiAgICAgICAgem9uZS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWRcbiAgICAgICAgICA/IHsgLi4uYWN0aW9uLnBheWxvYWQsIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIH1cbiAgICAgICAgICA6IHpvbmVcbiAgICAgICk7XG4gICAgICBjb25zdCBjb25maWdXaXRoVXBkYXRlZFpvbmUgPSB7XG4gICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZyxcbiAgICAgICAgZGVsaXZlcnlab25lczogdXBkYXRlZFpvbmVzLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IHVwZGF0ZWRab25lcyxcbiAgICAgICAgc3lzdGVtQ29uZmlnOiBjb25maWdXaXRoVXBkYXRlZFpvbmUsXG4gICAgICAgIHN5bmNTdGF0dXM6IHsgLi4uc3RhdGUuc3luY1N0YXR1cywgcGVuZGluZ0NoYW5nZXM6IHN0YXRlLnN5bmNTdGF0dXMucGVuZGluZ0NoYW5nZXMgKyAxIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdERUxFVEVfREVMSVZFUllfWk9ORSc6XG4gICAgICBjb25zdCBmaWx0ZXJlZFpvbmVzID0gc3RhdGUuZGVsaXZlcnlab25lcy5maWx0ZXIoem9uZSA9PiB6b25lLmlkICE9PSBhY3Rpb24ucGF5bG9hZCk7XG4gICAgICBjb25zdCBjb25maWdXaXRoRGVsZXRlZFpvbmUgPSB7XG4gICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZyxcbiAgICAgICAgZGVsaXZlcnlab25lczogZmlsdGVyZWRab25lcyxcbiAgICAgICAgbGFzdEV4cG9ydDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiBmaWx0ZXJlZFpvbmVzLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGNvbmZpZ1dpdGhEZWxldGVkWm9uZSxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBwZW5kaW5nQ2hhbmdlczogc3RhdGUuc3luY1N0YXR1cy5wZW5kaW5nQ2hhbmdlcyArIDEgfVxuICAgICAgfTtcblxuICAgIGNhc2UgJ0FERF9OT1ZFTCc6XG4gICAgICBjb25zdCBuZXdOb3ZlbDogTm92ZWwgPSB7XG4gICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpZDogRGF0ZS5ub3coKSxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhOZXdOb3ZlbCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBub3ZlbHM6IFsuLi5zdGF0ZS5zeXN0ZW1Db25maWcubm92ZWxzLCBuZXdOb3ZlbF0sXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbm92ZWxzOiBbLi4uc3RhdGUubm92ZWxzLCBuZXdOb3ZlbF0sXG4gICAgICAgIHN5c3RlbUNvbmZpZzogY29uZmlnV2l0aE5ld05vdmVsLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIHBlbmRpbmdDaGFuZ2VzOiBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzICsgMSB9XG4gICAgICB9O1xuXG4gICAgY2FzZSAnVVBEQVRFX05PVkVMJzpcbiAgICAgIGNvbnN0IHVwZGF0ZWROb3ZlbHMgPSBzdGF0ZS5ub3ZlbHMubWFwKG5vdmVsID0+XG4gICAgICAgIG5vdmVsLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZFxuICAgICAgICAgID8geyAuLi5hY3Rpb24ucGF5bG9hZCwgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfVxuICAgICAgICAgIDogbm92ZWxcbiAgICAgICk7XG4gICAgICBjb25zdCBjb25maWdXaXRoVXBkYXRlZE5vdmVsID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIG5vdmVsczogdXBkYXRlZE5vdmVscyxcbiAgICAgICAgbGFzdEV4cG9ydDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBub3ZlbHM6IHVwZGF0ZWROb3ZlbHMsXG4gICAgICAgIHN5c3RlbUNvbmZpZzogY29uZmlnV2l0aFVwZGF0ZWROb3ZlbCxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBwZW5kaW5nQ2hhbmdlczogc3RhdGUuc3luY1N0YXR1cy5wZW5kaW5nQ2hhbmdlcyArIDEgfVxuICAgICAgfTtcblxuICAgIGNhc2UgJ0RFTEVURV9OT1ZFTCc6XG4gICAgICBjb25zdCBmaWx0ZXJlZE5vdmVscyA9IHN0YXRlLm5vdmVscy5maWx0ZXIobm92ZWwgPT4gbm92ZWwuaWQgIT09IGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhEZWxldGVkTm92ZWwgPSB7XG4gICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZyxcbiAgICAgICAgbm92ZWxzOiBmaWx0ZXJlZE5vdmVscyxcbiAgICAgICAgbGFzdEV4cG9ydDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBub3ZlbHM6IGZpbHRlcmVkTm92ZWxzLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGNvbmZpZ1dpdGhEZWxldGVkTm92ZWwsXG4gICAgICAgIHN5bmNTdGF0dXM6IHsgLi4uc3RhdGUuc3luY1N0YXR1cywgcGVuZGluZ0NoYW5nZXM6IHN0YXRlLnN5bmNTdGF0dXMucGVuZGluZ0NoYW5nZXMgKyAxIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdBRERfTk9USUZJQ0FUSU9OJzpcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uID0ge1xuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHJlYWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBub3RpZmljYXRpb25zOiBbbm90aWZpY2F0aW9uLCAuLi5zdGF0ZS5ub3RpZmljYXRpb25zXS5zbGljZSgwLCBzdGF0ZS5zeXN0ZW1Db25maWcuc2V0dGluZ3MubWF4Tm90aWZpY2F0aW9ucyksXG4gICAgICB9O1xuXG4gICAgY2FzZSAnTUFSS19OT1RJRklDQVRJT05fUkVBRCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbm90aWZpY2F0aW9uczogc3RhdGUubm90aWZpY2F0aW9ucy5tYXAobm90aWZpY2F0aW9uID0+XG4gICAgICAgICAgbm90aWZpY2F0aW9uLmlkID09PSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgPyB7IC4uLm5vdGlmaWNhdGlvbiwgcmVhZDogdHJ1ZSB9XG4gICAgICAgICAgICA6IG5vdGlmaWNhdGlvblxuICAgICAgICApLFxuICAgICAgfTtcblxuICAgIGNhc2UgJ0NMRUFSX05PVElGSUNBVElPTlMnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IFtdLFxuICAgICAgfTtcblxuICAgIGNhc2UgJ1VQREFURV9TWU5DX1NUQVRVUyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCAuLi5hY3Rpb24ucGF5bG9hZCB9LFxuICAgICAgfTtcblxuICAgIGNhc2UgJ0xPQURfU1lTVEVNX0NPTkZJRyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHJpY2VzOiBhY3Rpb24ucGF5bG9hZC5wcmljZXMsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IGFjdGlvbi5wYXlsb2FkLmRlbGl2ZXJ5Wm9uZXMsXG4gICAgICAgIG5vdmVsczogYWN0aW9uLnBheWxvYWQubm92ZWxzLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIGxhc3RTeW5jOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIHBlbmRpbmdDaGFuZ2VzOiAwIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdVUERBVEVfU1lTVEVNX0NPTkZJRyc6XG4gICAgICBjb25zdCBuZXdTeXN0ZW1Db25maWcgPSB7IC4uLnN0YXRlLnN5c3RlbUNvbmZpZywgLi4uYWN0aW9uLnBheWxvYWQgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzeXN0ZW1Db25maWc6IG5ld1N5c3RlbUNvbmZpZyxcbiAgICAgIH07XG5cbiAgICBjYXNlICdTWU5DX1NUQVRFJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBwZW5kaW5nQ2hhbmdlczogMCB9XG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG4vLyBDb250ZXh0IGNyZWF0aW9uXG5jb25zdCBBZG1pbkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEFkbWluQ29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbi8vIFJlYWwtdGltZSBzeW5jIHNlcnZpY2VcbmNsYXNzIFJlYWxUaW1lU3luY1NlcnZpY2Uge1xuICBwcml2YXRlIGxpc3RlbmVyczogU2V0PChkYXRhOiBhbnkpID0+IHZvaWQ+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIHN5bmNJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdG9yYWdlS2V5ID0gJ2FkbWluX3N5c3RlbV9zdGF0ZSc7XG4gIHByaXZhdGUgY29uZmlnS2V5ID0gJ3N5c3RlbV9jb25maWcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVN5bmMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN5bmMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCB0aGlzLmhhbmRsZVN0b3JhZ2VDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zeW5jSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xuICAgIH0sIDUwMDApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlQ2hhbmdlKGV2ZW50OiBTdG9yYWdlRXZlbnQpIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gdGhpcy5zdG9yYWdlS2V5IHx8IGV2ZW50LmtleSA9PT0gdGhpcy5jb25maWdLZXkpICYmIGV2ZW50Lm5ld1ZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IEpTT04ucGFyc2UoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhuZXdTdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHN5bmMgZGF0YTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvclVwZGF0ZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICBjb25zdCBjb25maWcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbmZpZ0tleSk7XG4gICAgICBcbiAgICAgIGlmIChzdG9yZWQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdGUgPSBKU09OLnBhcnNlKHN0b3JlZCk7XG4gICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHN0b3JlZFN0YXRlKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICBjb25zdCBjb25maWdEYXRhID0gSlNPTi5wYXJzZShjb25maWcpO1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyh7IHN5c3RlbUNvbmZpZzogY29uZmlnRGF0YSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgZm9yIHVwZGF0ZXM6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZShjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMubGlzdGVuZXJzLmFkZChjYWxsYmFjayk7XG4gICAgcmV0dXJuICgpID0+IHRoaXMubGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH1cblxuICBicm9hZGNhc3Qoc3RhdGU6IEFkbWluU3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3luY0RhdGEgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KHN5bmNEYXRhKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmNvbmZpZ0tleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUuc3lzdGVtQ29uZmlnKSk7XG4gICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhzeW5jRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJyb2FkY2FzdGluZyBzdGF0ZTonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnlMaXN0ZW5lcnMoZGF0YTogYW55KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIHN5bmMgbGlzdGVuZXI6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zeW5jSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zeW5jSW50ZXJ2YWwpO1xuICAgIH1cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuaGFuZGxlU3RvcmFnZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuICB9XG59XG5cbi8vIFByb3ZpZGVyIGNvbXBvbmVudFxuZXhwb3J0IGZ1bmN0aW9uIEFkbWluUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoYWRtaW5SZWR1Y2VyLCBpbml0aWFsU3RhdGUpO1xuICBjb25zdCBbc3luY1NlcnZpY2VdID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gbmV3IFJlYWxUaW1lU3luY1NlcnZpY2UoKSk7XG5cbiAgLy8gTG9hZCBzeXN0ZW0gY29uZmlnIG9uIHN0YXJ0dXBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmVkQ29uZmlnID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N5c3RlbV9jb25maWcnKTtcbiAgICAgIGlmIChzdG9yZWRDb25maWcpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gSlNPTi5wYXJzZShzdG9yZWRDb25maWcpO1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0FEX1NZU1RFTV9DT05GSUcnLCBwYXlsb2FkOiBjb25maWcgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZG1pbl9zeXN0ZW1fc3RhdGUnKTtcbiAgICAgIGlmIChzdG9yZWQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdGUgPSBKU09OLnBhcnNlKHN0b3JlZCk7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1NZTkNfU1RBVEUnLCBwYXlsb2FkOiBzdG9yZWRTdGF0ZSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBpbml0aWFsIHN0YXRlOicsIGVycm9yKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBTYXZlIHN0YXRlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FkbWluX3N5c3RlbV9zdGF0ZScsIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3lzdGVtX2NvbmZpZycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLnN5c3RlbUNvbmZpZykpO1xuICAgICAgc3luY1NlcnZpY2UuYnJvYWRjYXN0KHN0YXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHN0YXRlOicsIGVycm9yKTtcbiAgICB9XG4gIH0sIFtzdGF0ZSwgc3luY1NlcnZpY2VdKTtcblxuICAvLyBSZWFsLXRpbWUgc3luYyBsaXN0ZW5lclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gc3luY1NlcnZpY2Uuc3Vic2NyaWJlKChzeW5jZWRTdGF0ZSkgPT4ge1xuICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHN5bmNlZFN0YXRlKSAhPT0gSlNPTi5zdHJpbmdpZnkoc3RhdGUpKSB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1NZTkNfU1RBVEUnLCBwYXlsb2FkOiBzeW5jZWRTdGF0ZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gIH0sIFtzeW5jU2VydmljZSwgc3RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzeW5jU2VydmljZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW3N5bmNTZXJ2aWNlXSk7XG5cbiAgLy8gQ29udGV4dCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG4gIGNvbnN0IGxvZ2luID0gKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0dJTicsIHBheWxvYWQ6IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gfSk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVzZXJuYW1lID09PSBBRE1JTl9DUkVERU5USUFMUy51c2VybmFtZSAmJiBwYXNzd29yZCA9PT0gQURNSU5fQ1JFREVOVElBTFMucGFzc3dvcmQ7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdJbmljaW8gZGUgc2VzacOzbiBleGl0b3NvJyxcbiAgICAgICAgbWVzc2FnZTogJ0JpZW52ZW5pZG8gYWwgcGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuJyxcbiAgICAgICAgc2VjdGlvbjogJ0F1dGVudGljYWNpw7NuJyxcbiAgICAgICAgYWN0aW9uOiAnbG9naW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPR09VVCcgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAnU2VzacOzbiBjZXJyYWRhJyxcbiAgICAgIG1lc3NhZ2U6ICdIYXMgY2VycmFkbyBzZXNpw7NuIGNvcnJlY3RhbWVudGUnLFxuICAgICAgc2VjdGlvbjogJ0F1dGVudGljYWNpw7NuJyxcbiAgICAgIGFjdGlvbjogJ2xvZ291dCdcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVQcmljZXMgPSAocHJpY2VzOiBQcmljZUNvbmZpZykgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9QUklDRVMnLCBwYXlsb2FkOiBwcmljZXMgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnUHJlY2lvcyBhY3R1YWxpemFkb3MnLFxuICAgICAgbWVzc2FnZTogJ0xvcyBwcmVjaW9zIHNlIGhhbiBhY3R1YWxpemFkbyB5IHNpbmNyb25pemFkbyBhdXRvbcOhdGljYW1lbnRlJyxcbiAgICAgIHNlY3Rpb246ICdQcmVjaW9zJyxcbiAgICAgIGFjdGlvbjogJ3VwZGF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAncHJpY2VzJywgZGF0YTogcHJpY2VzIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZERlbGl2ZXJ5Wm9uZSA9ICh6b25lOiBPbWl0PERlbGl2ZXJ5Wm9uZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCc+KSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQUREX0RFTElWRVJZX1pPTkUnLCBwYXlsb2FkOiB6b25lIH0pO1xuICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICB0aXRsZTogJ1pvbmEgZGUgZW50cmVnYSBhZ3JlZ2FkYScsXG4gICAgICBtZXNzYWdlOiBgU2UgYWdyZWfDsyBsYSB6b25hIFwiJHt6b25lLm5hbWV9XCIgeSBzZSBzaW5jcm9uaXrDsyBhdXRvbcOhdGljYW1lbnRlYCxcbiAgICAgIHNlY3Rpb246ICdab25hcyBkZSBFbnRyZWdhJyxcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAnZGVsaXZlcnlfem9uZV9hZGQnLCBkYXRhOiB6b25lIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZURlbGl2ZXJ5Wm9uZSA9ICh6b25lOiBEZWxpdmVyeVpvbmUpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdVUERBVEVfREVMSVZFUllfWk9ORScsIHBheWxvYWQ6IHpvbmUgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnWm9uYSBkZSBlbnRyZWdhIGFjdHVhbGl6YWRhJyxcbiAgICAgIG1lc3NhZ2U6IGBTZSBhY3R1YWxpesOzIGxhIHpvbmEgXCIke3pvbmUubmFtZX1cIiB5IHNlIHNpbmNyb25pesOzIGF1dG9tw6F0aWNhbWVudGVgLFxuICAgICAgc2VjdGlvbjogJ1pvbmFzIGRlIEVudHJlZ2EnLFxuICAgICAgYWN0aW9uOiAndXBkYXRlJ1xuICAgIH0pO1xuICAgIGJyb2FkY2FzdENoYW5nZSh7IHR5cGU6ICdkZWxpdmVyeV96b25lX3VwZGF0ZScsIGRhdGE6IHpvbmUgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlRGVsaXZlcnlab25lID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB6b25lID0gc3RhdGUuZGVsaXZlcnlab25lcy5maW5kKHogPT4gei5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0RFTEVURV9ERUxJVkVSWV9aT05FJywgcGF5bG9hZDogaWQgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgIHRpdGxlOiAnWm9uYSBkZSBlbnRyZWdhIGVsaW1pbmFkYScsXG4gICAgICBtZXNzYWdlOiBgU2UgZWxpbWluw7MgbGEgem9uYSBcIiR7em9uZT8ubmFtZSB8fCAnRGVzY29ub2NpZGEnfVwiIHkgc2Ugc2luY3Jvbml6w7MgYXV0b23DoXRpY2FtZW50ZWAsXG4gICAgICBzZWN0aW9uOiAnWm9uYXMgZGUgRW50cmVnYScsXG4gICAgICBhY3Rpb246ICdkZWxldGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ2RlbGl2ZXJ5X3pvbmVfZGVsZXRlJywgZGF0YTogeyBpZCB9IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZE5vdmVsID0gKG5vdmVsOiBPbWl0PE5vdmVsLCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAndXBkYXRlZEF0Jz4pID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdBRERfTk9WRUwnLCBwYXlsb2FkOiBub3ZlbCB9KTtcbiAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgdGl0bGU6ICdOb3ZlbGEgYWdyZWdhZGEnLFxuICAgICAgbWVzc2FnZTogYFNlIGFncmVnw7MgbGEgbm92ZWxhIFwiJHtub3ZlbC50aXR1bG99XCIgeSBzZSBzaW5jcm9uaXrDsyBhdXRvbcOhdGljYW1lbnRlYCxcbiAgICAgIHNlY3Rpb246ICdHZXN0acOzbiBkZSBOb3ZlbGFzJyxcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAnbm92ZWxfYWRkJywgZGF0YTogbm92ZWwgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlTm92ZWwgPSAobm92ZWw6IE5vdmVsKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX05PVkVMJywgcGF5bG9hZDogbm92ZWwgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnTm92ZWxhIGFjdHVhbGl6YWRhJyxcbiAgICAgIG1lc3NhZ2U6IGBTZSBhY3R1YWxpesOzIGxhIG5vdmVsYSBcIiR7bm92ZWwudGl0dWxvfVwiIHkgc2Ugc2luY3Jvbml6w7MgYXV0b23DoXRpY2FtZW50ZWAsXG4gICAgICBzZWN0aW9uOiAnR2VzdGnDs24gZGUgTm92ZWxhcycsXG4gICAgICBhY3Rpb246ICd1cGRhdGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ25vdmVsX3VwZGF0ZScsIGRhdGE6IG5vdmVsIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZU5vdmVsID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBub3ZlbCA9IHN0YXRlLm5vdmVscy5maW5kKG4gPT4gbi5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0RFTEVURV9OT1ZFTCcsIHBheWxvYWQ6IGlkIH0pO1xuICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICB0aXRsZTogJ05vdmVsYSBlbGltaW5hZGEnLFxuICAgICAgbWVzc2FnZTogYFNlIGVsaW1pbsOzIGxhIG5vdmVsYSBcIiR7bm92ZWw/LnRpdHVsbyB8fCAnRGVzY29ub2NpZGEnfVwiIHkgc2Ugc2luY3Jvbml6w7MgYXV0b23DoXRpY2FtZW50ZWAsXG4gICAgICBzZWN0aW9uOiAnR2VzdGnDs24gZGUgTm92ZWxhcycsXG4gICAgICBhY3Rpb246ICdkZWxldGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ25vdmVsX2RlbGV0ZScsIGRhdGE6IHsgaWQgfSB9KTtcbiAgfTtcblxuICBjb25zdCBhZGROb3RpZmljYXRpb24gPSAobm90aWZpY2F0aW9uOiBPbWl0PE5vdGlmaWNhdGlvbiwgJ2lkJyB8ICd0aW1lc3RhbXAnPikgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0FERF9OT1RJRklDQVRJT04nLCBwYXlsb2FkOiBub3RpZmljYXRpb24gfSk7XG4gIH07XG5cbiAgY29uc3QgbWFya05vdGlmaWNhdGlvblJlYWQgPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ01BUktfTk9USUZJQ0FUSU9OX1JFQUQnLCBwYXlsb2FkOiBpZCB9KTtcbiAgfTtcblxuICBjb25zdCBjbGVhck5vdGlmaWNhdGlvbnMgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQ0xFQVJfTk9USUZJQ0FUSU9OUycgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAnTm90aWZpY2FjaW9uZXMgbGltcGlhZGFzJyxcbiAgICAgIG1lc3NhZ2U6ICdTZSBoYW4gZWxpbWluYWRvIHRvZGFzIGxhcyBub3RpZmljYWNpb25lcyBkZWwgc2lzdGVtYScsXG4gICAgICBzZWN0aW9uOiAnTm90aWZpY2FjaW9uZXMnLFxuICAgICAgYWN0aW9uOiAnY2xlYXInXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZXhwb3J0U3lzdGVtQ29uZmlnID0gKCk6IHN0cmluZyA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgdGl0bGU6ICdFeHBvcnRhY2nDs24gZGUgY29uZmlndXJhY2nDs24gaW5pY2lhZGEnLFxuICAgICAgICBtZXNzYWdlOiAnR2VuZXJhbmRvIGFyY2hpdm8gZGUgY29uZmlndXJhY2nDs24gSlNPTi4uLicsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnZXhwb3J0X2NvbmZpZ19zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDcmVhdGUgY29tcHJlaGVuc2l2ZSBzeXN0ZW0gY29uZmlndXJhdGlvblxuICAgICAgY29uc3QgY29tcGxldGVDb25maWc6IFN5c3RlbUNvbmZpZyA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICB2ZXJzaW9uOiAnMi4xLjAnLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHByaWNlczogc3RhdGUucHJpY2VzLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiBzdGF0ZS5kZWxpdmVyeVpvbmVzLFxuICAgICAgICBub3ZlbHM6IHN0YXRlLm5vdmVscyxcbiAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcubWV0YWRhdGEsXG4gICAgICAgICAgdG90YWxPcmRlcnM6IHN0YXRlLnN5c3RlbUNvbmZpZy5tZXRhZGF0YS50b3RhbE9yZGVycyxcbiAgICAgICAgICB0b3RhbFJldmVudWU6IHN0YXRlLnN5c3RlbUNvbmZpZy5tZXRhZGF0YS50b3RhbFJldmVudWUsXG4gICAgICAgICAgbGFzdE9yZGVyRGF0ZTogc3RhdGUuc3lzdGVtQ29uZmlnLm1ldGFkYXRhLmxhc3RPcmRlckRhdGUsXG4gICAgICAgICAgc3lzdGVtVXB0aW1lOiBzdGF0ZS5zeXN0ZW1Db25maWcubWV0YWRhdGEuc3lzdGVtVXB0aW1lLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gR2VuZXJhdGUgSlNPTiBmaWxlXG4gICAgICBjb25zdCBjb25maWdKc29uID0gSlNPTi5zdHJpbmdpZnkoY29tcGxldGVDb25maWcsIG51bGwsIDIpO1xuXG4gICAgICAvLyBVcGRhdGUgc3lzdGVtIGNvbmZpZyB3aXRoIGV4cG9ydCB0aW1lc3RhbXBcbiAgICAgIGRpc3BhdGNoKHsgXG4gICAgICAgIHR5cGU6ICdVUERBVEVfU1lTVEVNX0NPTkZJRycsIFxuICAgICAgICBwYXlsb2FkOiB7IGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9IFxuICAgICAgfSk7XG5cbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdDb25maWd1cmFjacOzbiBleHBvcnRhZGEnLFxuICAgICAgICBtZXNzYWdlOiAnTGEgY29uZmlndXJhY2nDs24gSlNPTiBzZSBoYSBleHBvcnRhZG8gY29ycmVjdGFtZW50ZScsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnZXhwb3J0X2NvbmZpZydcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY29uZmlnSnNvbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhwb3J0aW5nIHN5c3RlbSBjb25maWc6JywgZXJyb3IpO1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgdGl0bGU6ICdFcnJvciBlbiBsYSBleHBvcnRhY2nDs24gZGUgY29uZmlndXJhY2nDs24nLFxuICAgICAgICBtZXNzYWdlOiAnTm8gc2UgcHVkbyBleHBvcnRhciBsYSBjb25maWd1cmFjacOzbiBKU09OJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdleHBvcnRfY29uZmlnX2Vycm9yJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGV4cG9ydENvbXBsZXRlU291cmNlQ29kZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICB0aXRsZTogJ0V4cG9ydGFjacOzbiBkZSBjw7NkaWdvIGZ1ZW50ZSBpbmljaWFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdHZW5lcmFuZG8gc2lzdGVtYSBjb21wbGV0byBjb24gY8OzZGlnbyBmdWVudGUuLi4nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2V4cG9ydF9zb3VyY2Vfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgLy8gSW1wb3J0YXIgZGluw6FtaWNhbWVudGUgZWwgZ2VuZXJhZG9yIGRlIGPDs2RpZ28gZnVlbnRlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGdlbmVyYXRlQ29tcGxldGVTb3VyY2VDb2RlIH0gPSBhd2FpdCBpbXBvcnQoJy4uL3V0aWxzL3NvdXJjZUNvZGVHZW5lcmF0b3InKTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVDb21wbGV0ZVNvdXJjZUNvZGUoc3RhdGUuc3lzdGVtQ29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGltcG9ydEVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGltcG9ydGluZyBzb3VyY2UgY29kZSBnZW5lcmF0b3I6JywgaW1wb3J0RXJyb3IpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNlIHB1ZG8gY2FyZ2FyIGVsIGdlbmVyYWRvciBkZSBjw7NkaWdvIGZ1ZW50ZScpO1xuICAgICAgfVxuXG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIHRpdGxlOiAnQ8OzZGlnbyBmdWVudGUgZXhwb3J0YWRvJyxcbiAgICAgICAgbWVzc2FnZTogJ0VsIHNpc3RlbWEgY29tcGxldG8gc2UgaGEgZXhwb3J0YWRvIGNvbW8gY8OzZGlnbyBmdWVudGUnLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2V4cG9ydF9zb3VyY2UnXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhwb3J0aW5nIHNvdXJjZSBjb2RlOicsIGVycm9yKTtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgZW4gbGEgZXhwb3J0YWNpw7NuIGRlIGPDs2RpZ28nLFxuICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdObyBzZSBwdWRvIGV4cG9ydGFyIGVsIGPDs2RpZ28gZnVlbnRlIGNvbXBsZXRvJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdleHBvcnRfc291cmNlX2Vycm9yJ1xuICAgICAgfSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaW1wb3J0U3lzdGVtQ29uZmlnID0gKGNvbmZpZ0pzb246IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZ0pzb24pO1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9BRF9TWVNURU1fQ09ORklHJywgcGF5bG9hZDogY29uZmlnIH0pO1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICB0aXRsZTogJ0NvbmZpZ3VyYWNpw7NuIGltcG9ydGFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdMYSBjb25maWd1cmFjacOzbiBkZWwgc2lzdGVtYSBzZSBoYSBjYXJnYWRvIGNvcnJlY3RhbWVudGUnLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2ltcG9ydCdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGltcG9ydGluZyBzeXN0ZW0gY29uZmlnOicsIGVycm9yKTtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgZW4gbGEgaW1wb3J0YWNpw7NuJyxcbiAgICAgICAgbWVzc2FnZTogJ05vIHNlIHB1ZG8gY2FyZ2FyIGxhIGNvbmZpZ3VyYWNpw7NuIGRlbCBzaXN0ZW1hJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdpbXBvcnRfZXJyb3InXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3luY0FsbFNlY3Rpb25zID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIHRpdGxlOiAnU2luY3Jvbml6YWNpw7NuIGNvbXBsZXRhIGluaWNpYWRhJyxcbiAgICAgICAgbWVzc2FnZTogJ1NpbmNyb25pemFuZG8gdG9kYXMgbGFzIHNlY2Npb25lcyBkZWwgc2lzdGVtYS4uLicsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnc3luY19hbGxfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgLy8gU2ltdWxhdGUgY29tcHJlaGVuc2l2ZSBzeW5jIG9mIGFsbCBzZWN0aW9uc1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMDApKTtcblxuICAgICAgLy8gVXBkYXRlIGFsbCBjb21wb25lbnRzIHdpdGggY3VycmVudCBzdGF0ZVxuICAgICAgY29uc3QgdXBkYXRlZENvbmZpZzogU3lzdGVtQ29uZmlnID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgcHJpY2VzOiBzdGF0ZS5wcmljZXMsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IHN0YXRlLmRlbGl2ZXJ5Wm9uZXMsXG4gICAgICAgIG5vdmVsczogc3RhdGUubm92ZWxzLFxuICAgICAgfTtcblxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX1NZU1RFTV9DT05GSUcnLCBwYXlsb2FkOiB1cGRhdGVkQ29uZmlnIH0pO1xuICAgICAgXG4gICAgICAvLyBCcm9hZGNhc3QgY2hhbmdlcyB0byBhbGwgY29tcG9uZW50c1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZG1pbl9mdWxsX3N5bmMnLCB7IFxuICAgICAgICBkZXRhaWw6IHsgXG4gICAgICAgICAgY29uZmlnOiB1cGRhdGVkQ29uZmlnLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgIH0gXG4gICAgICB9KSk7XG5cbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdTaW5jcm9uaXphY2nDs24gY29tcGxldGEgZXhpdG9zYScsXG4gICAgICAgIG1lc3NhZ2U6ICdUb2RhcyBsYXMgc2VjY2lvbmVzIHNlIGhhbiBzaW5jcm9uaXphZG8gY29ycmVjdGFtZW50ZScsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnc3luY19hbGwnXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZnVsbCBzeW5jOicsIGVycm9yKTtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgZW4gc2luY3Jvbml6YWNpw7NuIGNvbXBsZXRhJyxcbiAgICAgICAgbWVzc2FnZTogJ05vIHNlIHB1ZG8gY29tcGxldGFyIGxhIHNpbmNyb25pemFjacOzbiBkZSB0b2RhcyBsYXMgc2VjY2lvbmVzJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdzeW5jX2FsbF9lcnJvcidcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBicm9hZGNhc3RDaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHtcbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHtcbiAgICAgIC4uLmNoYW5nZSxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgc291cmNlOiAnYWRtaW5fcGFuZWwnXG4gICAgfTtcbiAgICBcbiAgICBkaXNwYXRjaCh7IFxuICAgICAgdHlwZTogJ1VQREFURV9TWU5DX1NUQVRVUycsIFxuICAgICAgcGF5bG9hZDogeyBcbiAgICAgICAgbGFzdFN5bmM6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgcGVuZGluZ0NoYW5nZXM6IE1hdGgubWF4KDAsIHN0YXRlLnN5bmNTdGF0dXMucGVuZGluZ0NoYW5nZXMgLSAxKVxuICAgICAgfSBcbiAgICB9KTtcblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnYWRtaW5fc3RhdGVfY2hhbmdlJywgeyBcbiAgICAgIGRldGFpbDogY2hhbmdlRXZlbnQgXG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IHN5bmNXaXRoUmVtb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdVUERBVEVfU1lOQ19TVEFUVVMnLCBwYXlsb2FkOiB7IGlzT25saW5lOiB0cnVlIH0gfSk7XG4gICAgICBcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgdGl0bGU6ICdTaW5jcm9uaXphY2nDs24gaW5pY2lhZGEnLFxuICAgICAgICBtZXNzYWdlOiAnSW5pY2lhbmRvIHNpbmNyb25pemFjacOzbiBjb24gZWwgc2lzdGVtYSByZW1vdG8uLi4nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ3N5bmNfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgLy8gU2ltdWxhdGUgcmVtb3RlIHN5bmNcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XG4gICAgICBcbiAgICAgIGRpc3BhdGNoKHsgXG4gICAgICAgIHR5cGU6ICdVUERBVEVfU1lOQ19TVEFUVVMnLCBcbiAgICAgICAgcGF5bG9hZDogeyBcbiAgICAgICAgICBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgIHBlbmRpbmdDaGFuZ2VzOiAwXG4gICAgICAgIH0gXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICB0aXRsZTogJ1NpbmNyb25pemFjacOzbiBjb21wbGV0YWRhJyxcbiAgICAgICAgbWVzc2FnZTogJ1RvZG9zIGxvcyBkYXRvcyBzZSBoYW4gc2luY3Jvbml6YWRvIGNvcnJlY3RhbWVudGUnLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ3N5bmMnXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX1NZTkNfU1RBVFVTJywgcGF5bG9hZDogeyBpc09ubGluZTogZmFsc2UgfSB9KTtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgc2luY3Jvbml6YWNpw7NuJyxcbiAgICAgICAgbWVzc2FnZTogJ05vIHNlIHB1ZG8gc2luY3Jvbml6YXIgY29uIGVsIHNlcnZpZG9yIHJlbW90bycsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnc3luY19lcnJvcidcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBdmFpbGFibGVDb3VudHJpZXMgPSAoKTogc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IGNvdW50cmllcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIFxuICAgIC8vIEFkZCBjb3VudHJpZXMgZnJvbSBub3ZlbHNcbiAgICBzdGF0ZS5ub3ZlbHMuZm9yRWFjaChub3ZlbCA9PiB7XG4gICAgICBpZiAobm92ZWwucGFpcykge1xuICAgICAgICBjb3VudHJpZXMuYWRkKG5vdmVsLnBhaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCBjb21tb24gY291bnRyaWVzXG4gICAgY29uc3QgY29tbW9uQ291bnRyaWVzID0gW1xuICAgICAgJ0N1YmEnLFxuICAgICAgJ1R1cnF1w61hJyxcbiAgICAgICdNw6l4aWNvJyxcbiAgICAgICdCcmFzaWwnLFxuICAgICAgJ0NvbG9tYmlhJyxcbiAgICAgICdBcmdlbnRpbmEnLFxuICAgICAgJ0VzcGHDsWEnLFxuICAgICAgJ0VzdGFkb3MgVW5pZG9zJyxcbiAgICAgICdDb3JlYSBkZWwgU3VyJyxcbiAgICAgICdJbmRpYScsXG4gICAgICAnUmVpbm8gVW5pZG8nLFxuICAgICAgJ0ZyYW5jaWEnLFxuICAgICAgJ0l0YWxpYScsXG4gICAgICAnQWxlbWFuaWEnLFxuICAgICAgJ0phcMOzbicsXG4gICAgICAnQ2hpbmEnLFxuICAgICAgJ1J1c2lhJ1xuICAgIF07XG4gICAgXG4gICAgY29tbW9uQ291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiBjb3VudHJpZXMuYWRkKGNvdW50cnkpKTtcbiAgICBcbiAgICByZXR1cm4gQXJyYXkuZnJvbShjb3VudHJpZXMpLnNvcnQoKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTeXN0ZW1Db25maWcgPSAoY29uZmlnOiBQYXJ0aWFsPFN5c3RlbUNvbmZpZz4pID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdVUERBVEVfU1lTVEVNX0NPTkZJRycsIHBheWxvYWQ6IGNvbmZpZyB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBZG1pbkNvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHN0YXRlLFxuICAgICAgICBsb2dpbixcbiAgICAgICAgbG9nb3V0LFxuICAgICAgICB1cGRhdGVQcmljZXMsXG4gICAgICAgIGFkZERlbGl2ZXJ5Wm9uZSxcbiAgICAgICAgdXBkYXRlRGVsaXZlcnlab25lLFxuICAgICAgICBkZWxldGVEZWxpdmVyeVpvbmUsXG4gICAgICAgIGFkZE5vdmVsLFxuICAgICAgICB1cGRhdGVOb3ZlbCxcbiAgICAgICAgZGVsZXRlTm92ZWwsXG4gICAgICAgIGFkZE5vdGlmaWNhdGlvbixcbiAgICAgICAgbWFya05vdGlmaWNhdGlvblJlYWQsXG4gICAgICAgIGNsZWFyTm90aWZpY2F0aW9ucyxcbiAgICAgICAgZXhwb3J0U3lzdGVtQ29uZmlnLFxuICAgICAgICBpbXBvcnRTeXN0ZW1Db25maWcsXG4gICAgICAgIGV4cG9ydENvbXBsZXRlU291cmNlQ29kZSxcbiAgICAgICAgc3luY1dpdGhSZW1vdGUsXG4gICAgICAgIGJyb2FkY2FzdENoYW5nZSxcbiAgICAgICAgc3luY0FsbFNlY3Rpb25zLFxuICAgICAgICBnZXRBdmFpbGFibGVDb3VudHJpZXMsXG4gICAgICAgIHVwZGF0ZVN5c3RlbUNvbmZpZyxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQWRtaW5Db250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQWRtaW4oKSB7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEFkbWluQ29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUFkbWluIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQWRtaW5Qcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5leHBvcnQgeyBBZG1pbkNvbnRleHQgfTsiXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbnRleHQvQWRtaW5Db250ZXh0LnRzeCJ9