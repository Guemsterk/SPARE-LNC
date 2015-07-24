# SPARE-LNC
SPARql REquest en Langage Naturel Contrôlé

=========================
=	CONTENU DU GITHUB	=
=========================
Il y a 2 dossiers.
Un dossier build avec des versions de la fonction javascript générée. 
Un dossier dev avec les versions en cours (relatifs) de dévelopement.
(Un troisième dossier devrait arriver avec la grammaire et la grammaire expliquée)

=========================
=	UTILISER UN PARSER	=
=========================
Les parsers proposés sont sous la forme d'une fonction javascript qui prend en entrée un texte et génère une chaine de caractères contenant la requête SPARQL généré. Il existe également une sortie d'erreur (non modifiée) du parser lorsqu'il n'arrive pas à générer.

La fonction ne fourni ainsi pas de moyens de requêter un SPARQL-Endpoint (pour cela... au choix. AJAX, utiliser un site tier, un requêteur en local...)

=========================
=	GENERER UN PARSER	=
=========================
Pour générer le parseur à partir du fichier code.txt, vous aurez besoin de pegjs. pegjs est trouvable à l'adresse suivante :
http://pegjs.org/

La sortie est un parser sous forme d'une fonction javascript.
Il est possible de modifier ensuite directement la fonction javascript plutôt que de repartir du code, mais c'est probablement moins lisible ainsi.

Lorsque le parser est généré, il faut sortir du code de la fonction pour les passer en variable globale ces deux variables :
var trace_baseURI
var trace_modelURI

L'autre option étant de les laisser dans le corps de la fonction. Cette option n'est possible que si le modèle (pour trace_modelURI) et l'adresse de la base (pour trace_base_URI) sont fixes.