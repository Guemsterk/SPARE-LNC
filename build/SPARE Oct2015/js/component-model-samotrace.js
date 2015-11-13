

 /* 
 Fonction qui prend l'objet Json résultat de l'appel et le parse en obsel pour la trace.
 Cela permets d'avoir une visualisation.
	On doit grouper les éléments par obsel (sujet du prédicat résultant)
	On doit aussi recadrer la trace vers les bonne zones temporelles
 
 Pour le moment, je n'ai pas d'élément pour représenter un type d'obsel. Je dois donc juste faire une différence visible.
 
 On lui passe le retour de la requête ajax.
 
 */
 function transform_to_trace( json_object)
 {
 
	/* chaque éléments de la liste est un obsel */
	alert(json_object);
	
	obsel = new Array();
	
	/* Pour chaqu'un des élément, récupérer ceux qui ont le même sujet*/
	/* Dans chaque élément de l'Array, on a les triplets d'un même obsel */
		
	
  
	/* Pour chaque élément de l'array, on crée un nouvel obsel */
	for(i=0; i<obsel.length; i++)
	{
	
	
	
	}
 
 
	/* On en profite */
	
		
		
 }


/* 
	Fichier de script javacript  pour récupérer le modèle de facto de la trace analysée.
		Connexion à la base de trace etc...
		
 */

/* Utilise le  widget samotrace pour faire une liste des obsels disponibles et trier par type. */ 
 function create_model_samotrace( uri )
{	
var trace = new Samotraces.KTBS.Trace(uri);
alert(trace);
return trace;

/*
 // Create logical objects             var base_uri = 'http://dsi-liris-silex.univ-lyon1.fr/ofs/ktbs/tutorial_silex/';             var base     = new Samotraces.KTBS.Base(base_uri);             var trace_id = '';                      // <- put your name here             base.create_stored_trace(trace_id);     // creates the trace             var trace = base.get_trace(trace_id);   // loads the trace
*/

}
 
 /* A remplacer par les éléments de chargement du JSON */
/* Fonction du tutoriel : test pour récupération des éléments voulus... */
function init()
{
	// Create logical objects
	var trace = new Samotraces.LocalTrace();
            var tw = new Samotraces.TimeWindow({start: 0,end: 20});
	// Create logical objects
            var obsel_selector    = new Samotraces.Selector('Obsel'); 
	var tw      = new Samotraces.TimeWindow({start: 0,end: 20});
	var timer   = new Samotraces.Timer(Date.now());
	var tw      = new Samotraces.TimeWindow({timer: timer,width: 60*1000}); 

	// Add obsel to the Trace
	//$('body').on('click',function(e) {   trace.create_obsel({type: 'click'}); }); 		 
	
	// Fonction qui crée un obsel à chaque click.
	//$('body').on('click',function(e) { var attr = { tagName: e.target.tagName }; trace.create_obsel({type: 'click', attributes: attr}); }); 
	var options = { url: function(obsel) {
	                    if(obsel.get_type() == 'click') { return "images/cursor.png"; } else { return "images/link.png"; }        }};
	// Create widgets
            new Samotraces.UI.Widgets.TraceDisplayIcons('my-widget',trace,tw,options);        

 				// Select Obsel when clicked             
	callback = function(event) {
			var obsel = $.data(event.target,'Samotraces-data');
			obsel_selector.select(obsel); 
			};	
	// Add obsels to the trace
	var count = 0;
	$('body').on('click',function(e) { trace.create_obsel({type: 'click', begin: count++}); }); 			
	$('body').on("click",".Samotraces-obsel",callback);
	// Create widgets
    new Samotraces.UI.Widgets.TraceDisplayIcons('my-widget',trace,tw,options);
    new Samotraces.UI.Widgets.ObselInspector('obsel-inspector',obsel_selector);

}

/**
Le attribut/valeur est récupéré par JSON

trace.create_obsel(  {type: 'click', begin: ++count, end: count, attributs:'valeur', } );
/**/