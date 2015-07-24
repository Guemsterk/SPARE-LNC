 /* Variable de sauvegarde et chargement.*/
 var sauvegarde = "";
 
 /* Variable temporaire contenant ce qu'on envoie au parser */
 var to_send_parser = "";
 
 /* Variable pour l'affichage des éléments dans le parser */
 var json_reponse = " "; 
 
 /* Variable  */
 var autre_variable = " ";
  
 /* requetes en attente : */
 var request_pending = 0;
 /* nom de l'element à changer d'état */
 var elem_update = ".pending_r";
 
 /* Pour l'autocompletion du add */
 var autocompletion_add_array = new Array();
 
 
 /*
 =================================
 == 	 Pour la Sauvegarde     ==
 =================================
 
 */
// Fonction de sauvegarde
// Query CLN non vide et valable
// Si query_SPARQL vide, on doit avoir le parser.
function save( title, desc, query_CLN, query_SPARQL )
{
	restitle = "";
	resdesc = "";
	var my_date = new Date();
	restitle = title;
	if(title == ""){ restitle = my_date.toDateString();	}
	resdesc = desc;
	if(desc == "") { resdesc = "Indicateur créé le  : " + my_date.toDateString(); }

	var results = " [ " + " [ " + restitle + " ], " + "[" + resdesc + "], "   
						+ " [ " + query_CLN + "], " + "[" + query_SPARQL + "]" + "]";
						
	window.open('data:text/json;charset=utf-8,' + escape(results));
}


/*

 =================================
 == 	 Pour le Chargement     ==
 =================================

*/
function my_load( query )
{
	var results = [];
	results = parserLoader.parse(query);
	var i = 0;
	// On crée une liste par element, et on la remplie avec les élément
	for( i=0; i<results.length; i++ )
	{
	    newlist(results[i][0], je_cherche_a_next);
		for( j=1; j<results[i].length; j++)
		{
		  focus_add( results[i][j], "control_world");
		  active_next_button( possessAttributValueWord_next );
		}
	}
 
} 


 /* 
 Pour les éléments de la liste. 
 Tableau : premier element : nom de l'attribut
 second element : liste des valeurs pour l'attribut
 */
 var list_attributes = new Array();

 
 
 /* Liste de fonctions actuelles */
 function update_pending()
 {
// alert('Test');
 if( request_pending != 0)
	$(elem_update).text("Il y a "+ request_pending +" requêtes SPARQL en attente de réponse... ");
 else
 	$(elem_update).text("Plus de requête en attente");
 
 
 }
 
/* Fenêtre de dialogue javascript */
/* Fonction de sauvegarde, chargement . */
/*function save( request_list, id_given, descritpion )
{
	var id;
	var description;
	var langage;
	var sparql;

}*/

function load( filename )
{

}

/* Fonction de grape d'éléments pour les mettre ensemble et en permettre le déplacement. */

 
 /* 
	Faire des affichages pour les résulats sur un onglet.  
 */
 
 /* Déclaration d'une variable globale pour chaque nouvel element créé */
 var id = 0;
 
 /* Déclaration d'une variable pour les éléments d'une requête */
 var querid = 2;
 
 /* Requete actuelle considérée pour l'ajout d'éléments */
 var focus = "#query";
 
 /* Liste dans laquelle on ajoute */
 var selection = 0;
 
 /* Variable à utiliser pour le conteneur lors de la logique de l'ajout et suprpession de requêtes dans l'interface. */
var conteneur = ".testliste";   
  
/*  */

  
/* 
	Il s'agit d'une liste de liste qui s'occupe de stocker l'ensemble des activations de boutons.
	Le premier élément de la liste est le nom du conteneur, et permet de retrouver le conteneur associé.
	Dans la logique de l'algorithme, le liste html possède autant d'éléments que sa lsi
 */
var querylist =  new Array();


 
/* 
Gestion des éléments qui peuvent suivre d'autres.
Fonctionne avec une liste d'id utilisés pour activer ou désactiver les boutons en question.

Il faut noter qu'il n'y a pas de contrainte réelle à associer la liste de boutons activés suivants
avec le bouton au nom similaire. Il faut penser à faire un bind en appelant le active_next_button
dans la fonction de déclaration.

Chaque élément de classe grammar_concerned est désactivé, puis on active les éléments de la liste.

!!!!!!!!!! IMPORTANT !!!!!!!!!!
On est posé à un problème épineux ici de boutons qui sont valable si d'autres avant on étés appuyé et pas d'autres...
On est amené à modifier les listes en fonction des boutons appuyés.
Il me faut donc faire une version clair de la grammaire actuelle pour mettre à jour l'ensemble

 */
 
 // Pour ceux qui n'ont pas encore étés déterminés
 var placeholder_next = new Array();
 
 var lesattributsWord_next = new Array("#pointWorld", "#add_button", "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga"
 );
 
 var suivi_par_next = new Array( "#unobselWord" );
 var unobselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#luimeme");
 
 var luimeme_next = new Array( "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar");
 
 var je_cherche_a_next = new Array("#countWord","#getWord") ; 
 
 var je_nomme_next = new Array("#add_button","#countWord_short","#lesobselWord") ; 
 
 var soit_next = new Array("#add_button", "#countWord_short", "#lesobselWord") ; 
 
 var compter_next = new Array("#obselWord","#attributeCountWord") ; 
 var recuperer_next = new Array("#lesobselWord","#attributesWord", "#lesattributsWord") ; 
 
 var parmi_next = new Array("#add_button", "#parmi_jecherche");
 
 var obselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar"); 
 var lesobselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar") ; 
 
 /* Défaut pour les derniers... Normalement, on doit fair eun add */
 var  ayant_un_attribut_next = new Array("#pointWorld", "#add_button", "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga",
 "#virguleWord"); 
 
 var de_type_next = new Array("#pointWorld","#possessAttributeCondWord", "#typeCond", "#add_button") ; 
 
 var possessAttributValueWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#add_button",
 "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga");
 
 var add_button_next = new Array("#pointWorld","#possessAttributeCondWord", "#typeCond", "#add_button", "#virguleWord", "#etWord", "#");

 var etWord_next = new Array("#possessAttributeCondWord", "#typeCond");
 var virguleWord_next = new Array("#possessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar" );
 
 
 /*
	Description : Fonction qui gère les enable et disable des boutons qui premettent d'ajouter des éléments pour les listes.
				  Cette fonction est appelée dans le cadre d'un bouton qui ajoute un élément à une liste.
	Precondition  : Il existe un "focus" valide qui est une li. la liste est au pire une liste vide.
	PostCondition : L'ensemble des boutons ayant la classe grammar_concerned sont désactivés, sauf ceux de la liste de paramètre. La liste "liste" est ajoutée à la liste correspondante dans la variable query_liste (ie celle dont le premier élément == focus)
 */
 function active_next_button( liste )
 {
	var i = 0;
    // On désactive tout
	$(".grammar_concerned").button(  );
	//$(".grammar_concerned").button( "option", "disabled", false );
	// !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!
	// DESACTIVIATION ENLEVEE POUR LE MOMENT, L'interface ne suit plus la grammaire
	// 2 juin : réactivation de la grammaire
	// $(".grammar_concerned").button( "option", "disabled", false );
	$(".grammar_concerned").button( "option", "disabled", true );
	//$( ".jecherche" ).button( "option", "disabled", false );
	
	// On active tout les éléments de la liste.
	for (i=0; i<liste.length; i++) 
	{
		$( liste[i] ).button( "option", "disabled", false );
    }
	
	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) { querylist[k].push(liste); //alert(liste);
	   }
    }
 }
  
 
 /* 
     Description : Fonction qui gère les enable et disabel des boutons, comme la fonction active_next_button, mais ne modifie pas la liste de 
 
 */
  function active_next( liste )
 {
	var i = 0;
    // On désactive tout
	$(".grammar_concerned").button(  );
	//$(".grammar_concerned").button( "option", "disabled", false );
	// !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!
	// RACTIVIATION ENLEVEE POUR LE MOMENT, L'interface ne suit plus la grammaire
	// 2 juin : réactivation de la grammaire
	//$(".grammar_concerned").button( "option", "disabled", false );
	$(".grammar_concerned").button( "option", "disabled", true );
	//$( ".jecherche" ).button( "option", "disabled", false );
	
	// On active tout les éléments de la liste.
	for (i=0; i<liste.length; i++) 
	{
		$( liste[i] ).button( "option", "disabled", false );
    }
	
}
 
 
 /* Mis à jour de l'element selectioné par clic. L'élément sélectionné a une bordure bold et
une classe différente. On doit aussi pseudo parser pour les disponibilité d'éléments suivants. */
 function changeFocusElement( name )
 {
    //alert(" change !");
	if( focus != name)
	{
		// On change le CSS de l'objet
		$(name).css("border-style", "solid");
		$(name).css("border-width", "3px");
		
		// On doit faire que le précédent focus soit enlevé
		if(focus != 0)
		{	
			$(focus).css("border-style", "solid");
			$(focus).css("border-width", "0px");
		}
	
	}
    // On met à jour la variable focus	
	focus = name;
	
	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   { 
	    active_next_button( querylist[k].pop() );
	   }
    }
 }
 
 /*
	Supression d'un élément.
	Se fait automatiquement sur le focus... Pas de Ctrl-Z ^^"
 */
 function remove()
 {
  	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   {
	      if( querylist[k].length <= 2 )
		  {
		    //alert(querylist[k].length);
			$(focus).remove();
			$("#content_"+focus.slice(1) ).remove(); 
			/* Recherche d'un nouvel élément. */
			var new_focus = $(conteneur).children();
			
			if( new_focus.length > 0)
			{ 
				// A voir si on peut pas faire "Le plus proche de celui qu'on a supprimé, plutôt que le premier ou le dernier"
				//alert( new_focus[new_focus.length -1].id );
				changeFocusElement( "#"+new_focus[new_focus.length -1].firstChild.id );
			}
			else
			{
				active_next([]);
			}
	  }
		  else
	      {
			 newbee_activation = querylist[k].pop();
			 new_activation = querylist[k].pop();
			 supprimer_last = focus + " li:last";
			 //alert(querylist[k].length + "  :  " + new_activation + "\n"+ newbee_activation);
			 $(supprimer_last).remove();
			 //alert( new_activation );
			 active_next_button( new_activation );				 
		  }
	 }
	   
    }
 }
 
 
 
 /*
	Génération d'un nouvel élément avec un ID unique. ici un élément de liste.
	
	//$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> 
	$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> \
	 <li id="id_number'+ id +'" class="mots" > #'+ id + '</li>\
	 <li id="element' + id + '" class="mots" >Je cherche à </li> ');
*/
 function newlist( debut, next_list) 
 {
	id++;
	querid++;
	//$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> 
	$(conteneur).append(' <div id="content_query'+ querid +'"><ul id="query' + querid +'" class="otherinnerlist"> \
	 <li id="element' + id + '" class="mots" >' + debut + '</li> </ul></div>');
	 
	 $(conteneur).animate({ scrollTop: $(".testliste")[0].scrollHeight }, "fast");

	 var chaine = "#query" + querid;
	// alert(chaine);
	$(chaine).sortable();
	$(chaine).click( function(){ changeFocusElement( chaine ); });
	
	/* Pour le moment, désactivé. Tant qu'on ne fait pas de groupage dessus. */
	$(chaine).sortable( 'disable' )
	
	changeFocusElement( chaine );
	
	/* Ajout pour le bouton de suppression */
	querylist.push(new Array(focus) );
	active_next_button( next_list );
	
	
 }

 /* Ajout d'un mot général à une liste */
 function addworld( liste, mot, type )
 {
 	id++;
	chaine = "" + type + id;
	$(liste).append('<li id="'+ chaine +'" class="mots" >'+ mot +'</li>');

 }
  
  /* Ajout d'un mot au focus */
  function focus_add( mot, type)
  {
	addworld( focus, mot, type);
  }
  
  /* restriction et element : aucune pour le moment. */
  function buttonSequence( liste )
  {
  
  }
  
  /* 
   * Extraction de la séquence et envoi au parser 
   * Dans la version actuelle, elle ne fait que l'affichage dans une zone de texte mal placée.
  */
 function extract_query( liste )
  {
	  var result = "";
	  $(liste).each( function( index ){ result += $(this).text().trim();} ); 
	  //alert( result + " : " +result.search('.'));
	  if(result.indexOf('.') <= 0 && result.indexOf(';') <= 0) { result += ' .'; }
	  console.log( result );
	  document.getElementById("resultLangage").value = result; 
	  to_send_parser = result;
	  
	  
	  synchroCLN(result);
	  
	  /* Call de ajax ! */
	  var json_response = call_base( document.getElementById("resultSPARQL").value, document.getElementById("base_uri").value, "resultJSON");
	  
     return result;
  }

  
  
 function extract_all_query( )
  {
	  var result = "";
	  
	  var childs = $(conteneur).children();
	  
	  $(childs).each( function( index ){ result += $(this).first().text().trim(); } ); 
	  console.log( result );
	  document.getElementById("resultLangage").value = result; 
	  to_send_parser = result;
	  synchroCLN(result);
	  
	  /* Call de ajax ! */
	  var json_response = call_base( document.getElementById("resultSPARQL").value, document.getElementById("base_uri").value, "resultJSON");
	  
	  
	  
     return result;
  }
  
  
  
  /*
 =============================================
				Partie appel SPARQL
 =============================================
  */
  
  /* default-graph-uri=http%3A%2F%2Flocalhost%3A8001%2FAlienBase%2Fcdemo%2F%40obsels */
    /* Fonction qui pose le JSON reusltant dans un element ayant une value */
 function call_base_by_fuseki( SPARQL_QUERY, url_base, element_ID)
 {
 
   /* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		'default-graph-uri' : "http://localhost:8001/AlienBase/cdemo/@obsels", 
		//default-graph-uri : url_base
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){  
	 document.getElementById(element_ID).value = retour.responseText;
	 var obj = $.parseJSON(retour.responseText);
     json_reponse = obj;
	 request_pending--;update_pending();
	   }, 
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();
	}
	});
	
	return retour;
} /**/

  /* Fonction qui pose le JSON reusltant dans un element ayant une value */
 function call_base( SPARQL_QUERY, url_base, element_ID)
 {
 
   /* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){  
	 document.getElementById(element_ID).value = retour.responseText;
	 var obj = $.parseJSON(retour.responseText);
     json_reponse = obj;
	 request_pending--;update_pending();
	   }, 
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();
	}
	});
	
	return retour;
} /**/
  
  
/* Fonction qui récupère les valeurs récupérées pour en faire une liste séparée par des \n */
 function call_base_list( SPARQL_QUERY, url_base, element_ID)
 {
 
	/* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){ 
	var obj = $.parseJSON(retour.responseText);
    json_reponse = obj;
	var chaine_result = "";
	for(i=0; i< obj.results.bindings.length; i++)
	{
		chaine_result += obj.results.bindings[i].o.value + "\n\r";
	}
	request_pending--;update_pending();
	//document.getElementById(element_ID).value = retour.responseText;}, 
	document.getElementById(element_ID).value = chaine_result;}, 
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();}
	
	});
	
	return retour;
} /**/
  
 
  
 /* Fonction qui cree la liste des attributs avec les valeurs associées */
 function call_base_list_2( SPARQL_QUERY, url_base, element_ID1, element_ID2)
 {
 
	/* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){ 
	var obj = $.parseJSON(retour.responseText);
    json_reponse = obj;
	var chaine_result = "";
	for(i=0; i< obj.results.bindings.length; i++)
	{
		chaine_result += obj.results.bindings[i].o.value + "\n\r";
	}
	request_pending--;update_pending();
	//document.getElementById(element_ID).value = retour.responseText;}, 
	attribut = document.getElementById(element_ID1); 
	element = document.getElementById(element_ID2);
	$(element).empty();
	$(attribut).empty();
	list_attributes = new Array();
	/* Génération de la structure de données contenant les éléments */
	for(i=0; i< obj.results.bindings.length; i++)
	{
		string_current = obj.results.bindings[i].p.value;
		found_idk = -1;
		for( k=0; k< list_attributes.length; k++)
		{
			if( string_current == list_attributes[k][0])
			{
				found_idk = k;
			}
		}
		if( found_idk == -1) { found_idk = list_attributes.length; list_attributes.push([ string_current,  new Array() ]); }
		list_attributes[found_idk][1].push( obj.results.bindings[i].o.value );
	}
	
	
	/* Génération de la liste affichée */
	for(i=0; i< list_attributes.length; i++)
	{
		$(attribut).append( '<li class="mots">' + list_attributes[i][0].substring(list_attributes[i][0].indexOf('#')+1)+ '</li>');	
	}
	
	/* A la selection, on affiche les valeurs */
	 $(attribut).selectable({
		stop: function() {
		$(element).empty();
		autocompletion_add_array = new Array();
		var result = $( element ).empty();
		$( ".ui-selected", this ).each(function() {
			var index = $( attribut ).children().index( this );
			//result.append( " #" + ( index + 1 ) );
			for(k=0; k<list_attributes[index][1].length; k++)
			{
				$(element).append('<li class="mots">' + list_attributes[index][1][k] + '</li>');
				autocompletion_add_array.push(list_attributes[index][1][k]);
			}
		}
		);
		$("#add_value").autocomplete({ source: autocompletion_add_array } );
		
		}
		});
		
	/* On rajoute l'ensemble des éléments à l'autocomplétion de add */
	
	
	},  
	//element = document.getElementById(element_ID1).value = chaine_result;},  
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();}
	
	});
	
	return retour;
} /**/
  
 
  /*
 =============================================
			Fin de Partie appel SPARQL
 =============================================
  */
  
/* Ces fonctions sont copiées collées de la version No Interface */
/* 	Fonction d'appel simple au parser*/
function synchro( text ) { document.getElementById("resultSPARQL").value = parser.parse(text) }
			
/* Autre fonction d'appel simple */
function synchroCLN( text ) { document.getElementById("resultSPARQLIntermediaire").value = parserCLN.parse(text); document.getElementById("resultSPARQL").value = parser.parse(document.getElementById("resultSPARQLIntermediaire").value);  }
 
/* Fonction de mise a jour de la variable trace_modelURI */
 function synchroTraceModel(){ 
 //alert("Test");
 trace_modelURI = document.getElementById("trace_modele").value.trim();
 synchroCLN(document.getElementById("resultLangage").value); 
 
 }
	
 
  /* Fonction générale d'initialisation */
  
	/* Fonction d'initialisation */
	// A mettre à part.
	// A besoin de la fonction de JQuery/Jcascript
	
  // Initialisation de l'ensemble
	$(function() {
	
	  /*
		A chaque ajout de liste, on doit ajouter une nouvelle liste dans querylist.
		Le premier élément est le nom de l'élément pour le retrouver dans la liste avec une comparaison 
	   */
	  querylist.push( new Array("#query") );
	
	/* Bouton pour voir le contenu brutal de la trace... Affiché en JSON ? */
	$( "#maj_elements_conseil").button();
	$( "#maj_elements_conseil" ).bind("click", 
	function()
	{
		/* Avec ces requêtes, on récupère aussi d'autres éléments.*/
		var query_Sparql_value = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?o \
		WHERE \
		 { \
		 ?sobs0 ?pobs0 ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\}"
		// Pour bien faire, il faudrait montrer les valeurs par attribut, et non en vrac
		var query_Sparql_attribute = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?p ?o \
		WHERE \
		 { \
		 ?sobs0 ?p ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\} group by ?p ?o"; 
		var json_response1 = call_base_list( query_Sparql_value, document.getElementById("base_uri").value, "value_attributes_trace");
		var json_response2 = call_base_list( query_Sparql_attribute, document.getElementById("base_uri").value, "name_attributes_trace");
		var json_response3 = call_base_list_2( query_Sparql_attribute, document.getElementById("base_uri").value, "attribut", "valeurs");
			
		
	});
	
	$( "#maj_elements_conseil2").button();
	$( "#maj_elements_conseil2" ).bind("click", 
	function()
	{
		/* Avec ces requêtes, on récupère aussi d'autres éléments.*/
		var query_Sparql_value = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?o \
		WHERE \
		 { \
		 ?sobs0 ?pobs0 ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\}"
		// Pour bien faire, il faudrait montrer les valeurs par attribut, et non en vrac
		var query_Sparql_attribute = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?p ?o \
		WHERE \
		 { \
		 ?sobs0 ?p ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\} group by ?p ?o"; 
		var json_response1 = call_base_list( query_Sparql_value, document.getElementById("base_uri").value, "value_attributes_trace");
		var json_response2 = call_base_list( query_Sparql_attribute, document.getElementById("base_uri").value, "name_attributes_trace");
		var json_response3 = call_base_list_2( query_Sparql_attribute, document.getElementById("base_uri").value, "attribut", "valeurs");
			
		
	});
	/* Bouton temporaire de création de la requête */
	$( ".processquery" ).button( );
	$( ".processquery" ).bind("click", function(){extract_query( focus ); });
	$( ".processquery").button( "option", "disabled", false );
	
	$( ".processquery_list" ).button( );
	$( ".processquery_list" ).bind("click", function(){extract_all_query( ); });
	$( ".processquery_list").button( "option", "disabled", false );
		
	/* Boutons qui rajoutent des éléments à la requête sélectionnée.  */
	$("#getWord").button();
	$( "#getWord" ).bind("click", function(){ focus_add( " récupérer ", "control_world");  active_next_button( recuperer_next );    });
	
	$("#countWord").button();
	$( "#countWord" ).bind("click", function(){ focus_add( " compter le nombre d'", "control_world");   active_next_button( compter_next );    });
	
	$("#countWord_short").button();
	$( "#countWord_short" ).bind("click", function(){ focus_add( " le nombre d'", "control_world");   active_next_button( compter_next );    });
	
	
	$("#lesobselWord").button();
	$( "#lesobselWord" ).bind("click", function(){ focus_add( " les obsels ", "control_world");   active_next_button( lesobselWord_next );    });
	
	$("#unobselWord").button();
	$( "#unobselWord" ).bind("click", function(){ focus_add( " un obsel ", "control_world");  active_next_button( unobselWord_next );  });
	
	$("#obselWord").button();
	$( "#obselWord" ).bind("click", function(){ focus_add( "obsels ", "control_world");  active_next_button( obselWord_next );   });
	
	$("#attributesWord").button();
	$( "#attributesWord" ).bind("click", function(){ focus_add( "les attributs ", "control_world");    });
	
	$("#attributeWord").button();
	$( "#attributeWord" ).bind("click", function(){ focus_add( "l'attribut ", "control_world");    });
	
	$("#possessAttributeCondWord").button();
	$( "#possessAttributeCondWord" ).bind("click", function(){ focus_add( "ayant un attribut ", "control_world");   active_next_button( ayant_un_attribut_next );  });
	
	$("#possessAttributValueWord").button();
	$( "#possessAttributValueWord" ).bind("click", function(){ focus_add( " de valeur ", "control_world");  active_next_button( possessAttributValueWord_next );  });
	
	$("#possessAttributValueWordSup").button();
	$( "#possessAttributValueWordSup" ).bind("click", function(){ focus_add( " de valeur supérieure à ", "control_world");  active_next_button( possessAttributValueWord_next );  });
	
	$("#possessAttributValueWordSupEga").button();
	$( "#possessAttributValueWordSupEga" ).bind("click", function(){ focus_add( " de valeur supérieure ou égale à ", "control_world");  active_next_button( possessAttributValueWord_next );  });

	$("#possessAttributValueWordInf").button();
	$( "#possessAttributValueWordInf" ).bind("click", function(){ focus_add( " de valeur inférieure à ", "control_world");  active_next_button( possessAttributValueWord_next );  });
		
	$("#possessAttributValueWordInfEga").button();
	$( "#possessAttributValueWordInfEga" ).bind("click", function(){ focus_add( " de valeur inférieure ou égale à ", "control_world");  active_next_button( possessAttributValueWord_next );  });

	
	$("#NonpossessAttributeCondWord").button();
	$( "#NonpossessAttributeCondWord" ).bind("click", function(){ focus_add( " n'ayant pas un attribut ", "control_world");  active_next_button( ayant_un_attribut_next );  });
	
	
	/* 
		C'est ici qu'il faudra indiquer si la requête est finie ou pas. 
		Pour estimer au fur et à mesure, il faut estimer qu'à chaque condition on teste comme si on mettait un point à la fin...
		Cela veut dire d'esayer avec 
	*/
	$("#pointWorld").button();
	$( "#pointWorld" ).bind("click", function(){ focus_add( ". ", "End_control_world");   active_next_button( [] ); });
	
	$("#add_button").button();
	$( "#add_button" ).bind("click", function(){ focus_add( ""+$("#add_value").val()+"", "value_world");  for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   {
			 new_activation = querylist[k].pop();
			 active_next_button( new_activation );
			 active_next_button( new_activation );				 
	 }
	   
    }
	});
	
	$("#suivipar").button();
	$( "#suivipar" ).bind("click", function(){ focus_add( "suivi par", "value_world");  active_next_button( suivi_par_next );  });
	
	$("#précédépar").button();
	$( "#précédépar" ).bind("click", function(){ focus_add( "précédé par", "value_world"); active_next_button( suivi_par_next  );   });
	
	$("#virguleWord").button();
	$("#virguleWord").bind("click", function(){ focus_add( ", ", "value_world"); active_next_button( virguleWord_next );   });
	
	$("#etWord").button();
	$("#etWord").bind("click", function(){ focus_add( "et ", "value_world"); active_next_button( etWord_next );    });
	
	$("#maj_model_trace").button();
	$("#maj_model_trace").bind("click", function(){  $("#model").value  = 
	create_model_samotrace( "http://dsi-liris-silex.univ-lyon1.fr/m2ia/ktbs/base-samotraces-transformations/Trace-samo-trans/@obsels"); 
		for(i=0; i< querylist.length; i++)
		{
		  if( querylist[i][0] == focus )
		  {alert( querylist[i].length ); }

		}
		
	});
	
	$("#typeCond").button();
	$("#typeCond").bind("click", function(){ focus_add( "de type ", "value_world", "add"); active_next_button( de_type_next );     });
	
	$("#attributeCountWord").button();
	$("#attributeCountWord").bind("click", function(){ focus_add( " attibuts ", "control_world"); active_next_button( de_type_next );    });
	
	$("#lesattributsWord").button();
	$("#lesattributsWord").bind("click", function(){ focus_add( " les attibuts ", "control_world"); active_next_button( lesattributsWord_next );    });
	
	
	$( "#supprimer" ).button( );
	$( "#supprimer" ).bind("click", function() { remove();  } );
	
	$("#parmi_jecherche").button();
	$("#parmi_jecherche").bind("click", function(){ focus_add( ", je cherche à ", "value_world"); active_next_button( je_cherche_a_next );   });
	
	/* Nouveaux éléments */
	$("#luimeme").button();
	$("#luimeme").bind("click", function(){ focus_add( "lui même ", "control_world"); active_next_button(luimeme_next );    });
	
	$("#directementsuivipar").button();
	$("#directementsuivipar").bind("click", function(){ focus_add( "directement suivi par ", "control_world"); active_next_button( suivi_par_next  );    });
	
	$("#directementprécédépar").button();
	$("#directementprécédépar").bind("click", function(){ focus_add( "directement précédé par ", "control_world"); active_next_button( suivi_par_next  );    });
	
	/* Boutons de début de phrase */
	$( ".jecherche" ).button( );
	$( ".jecherche" ).bind("click", function() { newlist( 'Je cherche à ', je_cherche_a_next);  } );
	
	$( ".soit" ).button( );
	$( ".soit" ).bind("click", function() { newlist('Soit ', soit_next); } );
	
	$( ".jenomme" ).button( );
	$( ".jenomme" ).bind("click", function() { newlist('Je nomme ', je_nomme_next);  } );
		
	$( ".parmi" ).button( );
	$( ".parmi" ).bind("click", function() { newlist('Parmi ', parmi_next);  } );
	
	$( ".je_garde" ).button( );
	$( ".je_garde" ).bind("click", function() { newlist('Je garde seulement ', [ "#add_button", "#pointWorld" ]);  } );
	$(".je_garde").button( "option", "disabled", false );
	
	// test de sauvegarde
	$( "#my_save" ).button( );
	$( "#my_save" ).bind("click", function() { save( $('#my_indic_title').val(),
													 $('#my_indic_desc').val(),
													 $('#resultLangage').val(),
													 parser.parse(parserCLN.parse($('#resultLangage').val()))
													 ) } );

	// test de chargement
	$( "#my_load" ).button( );
	$( "#my_load" ).bind("click", function() { my_load( $('#file_load').val()) } );
	

													 
	// Pour rafraichir la requête sans prendre depuis l'interface
	$('#refresh').button();
	$( "#refresh" ).bind("click", function() { 
	var other_response = call_base_by_fuseki( document.getElementById("resultSPARQL").value, "http://localhost:3030/sparql", "by_sparql"); 
	/* Call de ajax ! */
	var json_response = call_base( document.getElementById("resultSPARQL").value, document.getElementById("base_uri").value, "resultJSON"); 
	} );
	 
	/* Supprimer toujours fini */
	$("#supprimer").button( "option", "disabled", false );
	
	$("#json_to_obsel").button();
	$("#json_to_obsel").bind("click", function(){  transform_to_trace( json_reponse); })
	
	/*
	changeFocusElement( "#query" );
	active_next_button( je_cherche_a_next );
	alert( querylist[0] ); 
	*/
	$( ".etapes" ).tabs();
	
	
	/* Mise en place d'une première liste qui fait le tout. */
	newlist('Je cherche à', je_cherche_a_next);
	init();
	
	/*
	<button id="suivipar">suivi par</button>
	<button id="précédépar">précédé par</button>
	*/
	
	$( ".testliste" ).sortable( );
	$( ".otherinnerlist").sortable({delay: 200});
	//$( ".testliste").jScrollPane();
	
	
	$( "#query" ).click( function(){  changeFocusElement( "#query"); } );
	
	$( "#trace_modele").on("change keyup paste",  function(){synchroTraceModel(); });
	//$( "#trace_modele").change( function(){synchroTraceModel(); });
	
	
	/* activation de la liste des attributs et des valeurs d'attibuts. */
	//$("#attribut").selectable();
	
	//$("#valeurs").sortable();
	$("#valeurs").selectable();
	

	
	$( "#attribut" ).tabs();
	
}); 
	
  