/************************************* Dropdown */
function Drop(x) {
   var click = document.getElementById("dropdown"+x);
   click.classList.toggle("show") 
}
function strUcFirst(a){
   return (a+'').charAt(0).toUpperCase()+a.substr(1);
}
window.onclick = function(event) {
   if (!(event.target.matches('.dropbtn')|| event.target.matches('.inputCheckbox')|| event.target.matches('.fix'))) {
     var dropdowns = document.getElementsByClassName("dropdown-content");
     var i;
     for (i = 0; i < dropdowns.length; i++) {
       var openDropdown = dropdowns[i];
       if (openDropdown.classList.contains('show')) {
         openDropdown.classList.remove('show');
       }
     }
   }
   
 }
/************************************* Prise en charge des filtres et tris */
function Checked() {
  var cases = document.getElementsByClassName('fix');
  var resultatJob = [];
  var resultat = [];
  var resultatContrat = [];
  var resultatRemote = [];
     for (var i = 0; i < cases.length; i++) {
        if (cases[i].checked) {
         switch (cases[i].value) {
            case 'jobTitle':
               resultat.push(['jobTitle',cases[i].name, cases[i].id]);
               resultatJob.push(cases[i].id);
              break;
            case 'contractType':
               resultat.push(['contractType',cases[i].name, cases[i].id]);
               resultatContrat.push(cases[i].id);
              break;
            case 'remoteWork':
               resultat.push(['remoteWork',cases[i].name, cases[i].id]);
               resultatRemote.push(cases[i].id);
              break;
            default :
            resultat.push([]);
            break;
         }
        }
     }
     document.getElementById("filter").innerHTML ="";
     for (var i = 0; i < resultat.length; i++){
         var z = document.createElement('button');
         z.setAttribute("class", "filter");
         z.setAttribute("onclick", 'removeCheck(this)');
         z.innerHTML = resultat[i][1] + "<img src='SVG Icon/clear-tag.svg' alt=''>";
         document.getElementById("filter").appendChild(z);  
      }
      document.getElementById("annonces").innerHTML ="";
      fetch("data.json")
      .then(response => response.json())
      .then(data => {
         var uuid =[];
         if (document.getElementById('sort').value == 'date'){
            data.sort(function(a, b){
               return new Date(b.publishDate.slice(0, 10)) - new Date(a.publishDate.slice(0, 10));
           });
         } else {
            data.sort(function(a, b){
               return b.salary - a.salary;
           });
         }
         
         
         for (const emploi of data){
            for(var k = 0; k < resultat.length; k++){
                if ((!(uuid.includes(emploi.uuid))) && 
                     ((resultatJob.includes(emploi.jobTitle)) || (resultatJob.length == 0)) &&
                     ((resultatContrat.includes(emploi.contractType)) || (resultatContrat.length == 0)) &&
                     ((resultatRemote.includes(emploi.remoteWork)) || (resultatRemote.length == 0)))
                     {
                  document.getElementById("annonces").appendChild(cardDetail(emploi));
                  uuid.push(emploi.uuid);
                }
            }   
         }
      });
}

/************************************* Décocher les filtres */
function removeCheck(x) {
   document.getElementsByName(x.textContent)[0].checked = false;
   Checked();
}
/************************************* Différence entre 2 dates */
function nbJours(x){
   var date1 = new Date(x); 
   var date2 = new Date(); 
   return Math.floor((date2-date1)/ (1000 * 3600 * 24));
}
/************************************* Affichage de la card */
function cardDetail(x){
   var card = document.createElement('div');
   card.setAttribute("class", "cardEmploi2");
   card.setAttribute("onclick", "toggler(this)");
   var divHead = document.createElement('div');
   divHead.setAttribute("style", "display : flex");
   var logo = document.createElement('div');
   logo.setAttribute("class", "logo");
   logo.innerHTML = x.company[0].toUpperCase();
   var div1 = document.createElement('div');
   div1.setAttribute("style", "width : 90%");
   var div2= document.createElement('div');
   div2.setAttribute("class", "card1");
   var div3 = document.createElement('div');
   div3.setAttribute("style", "display : flex");
   var p1 =document.createElement('div');
   p1.setAttribute("class", "cardTitle");
   p1.innerHTML = strUcFirst(x.jobTitle);
   var p2 =document.createElement('div');
      switch (x.remoteWork) {
         case 'eventually':
            p2.setAttribute("class", "purple");
            break;
         case 'regularly':
            p2.setAttribute("class", "yellow");
            break;
         case 'full':
            p2.setAttribute("class", "blue");
            break;
         default :
            p2.setAttribute("style", "display : none");
            break;
      }
      p2.innerHTML = "Télétravail : " + strUcFirst(x.remoteWork);
   var p3 =document.createElement('div');
      p3.setAttribute("class","toggler displayD")
      p3.innerHTML = "<b>Réduire -</b>";
   var p3bis = document.createElement('div');
      p3bis.setAttribute("class", "salaire toggler");
      p3bis.innerHTML = "Salaire: "+ x.salary +"k€";
   var div4 = document.createElement('div');
      div4.setAttribute("class", "card1");
   var div5 = document.createElement('div');
      div5.setAttribute("class", "salaire toggler displayD");
      div5.innerHTML = "Salaire: "+ x.salary +"k€";
   var div5bis = document.createElement('div');
      div5bis.setAttribute("class", "toggler");
      div5bis.innerHTML = strUcFirst(x.company) + " - " + strUcFirst(x.city) + " - " +strUcFirst(x.contractType);
   var div8 = document.createElement('div');
      div8.setAttribute("style", "display : flex; justify-content: space-between; ");
   var div7 = document.createElement('div');
      div7.setAttribute("class", "desc toggler displayD");
      div7.innerHTML = "<img src='SVG Icon/city.svg' alt=''>&ensp;"+strUcFirst(x.company)+" - "+strUcFirst(x.city)+"&emsp;<img src='SVG Icon/contract.svg' alt=''>&ensp;"+strUcFirst(x.contractType)+"&emsp;<img src='SVG Icon/date-start.svg' alt=''>&ensp; Début : "+x.startDate.slice(0,10)+"&emsp;<img src='SVG Icon/stude.svg' alt=''>&ensp;"+x.studyLevel;
   var div6 =document.createElement('div');
      div6.setAttribute("class", "date toggler displayD");
      div6.setAttribute("style", "margin-right : 25px;");
      div6.innerHTML = "Publié il y a  " + nbJours(x.publishDate) +" jours";
   var div6bis =document.createElement('div');
      div6bis.setAttribute("class", "date toggler");
      div6bis.innerHTML = "Il y a  " + nbJours(x.publishDate) +" jours";
   var div9 = document.createElement('div');
      div9.setAttribute("class", "about toggler displayD");
      div9.innerHTML = x.about;
   var div10 = document.createElement('div');
      div10.setAttribute("class", "postuler toggler displayD");
      div10.innerHTML = "Postuler";

   div3.appendChild(p1);
   div3.appendChild(p2);
   div2.appendChild(div3);
   div2.appendChild(p3);
   div2.appendChild(p3bis);
   div1.appendChild(div2);   
   divHead.appendChild(logo);
   divHead.appendChild(div1);
   card.appendChild(divHead);
   card.appendChild(div8);
   card.appendChild(div9);
   card.appendChild(div10);
   div8.appendChild(div7);
   div8.appendChild(div6);
   div4.appendChild(div5);
   div4.appendChild(div5bis);
   div4.appendChild(div6bis);
   div1.appendChild(div4);
   return card;
}
/************************************* Bascule Card simple et détaillée */
function toggler(x) {
   var element = x.getElementsByClassName("toggler");
   console.log(element);
   for (const el of element){
      el.classList.toggle("displayD");
   }        
 }
