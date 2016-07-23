


 var player = new Audio('audio/TINIGreatEscape.mp3');
player.play();
 
 
 
 
 var podaci;
 var instrument;
 var opcije;
 
 
 
 
 
 function getPodaci(){
 	dweetio.get_latest_dweet_for("IoTHackathon", function(err, dweet){
	
	if(dweet!=null){
	    var dweet = dweet[0]; 
	    if(podaci!=null){
	    	podaci[0].setValue(0, 1, dweet.content.temperatura);
	    	podaci[1].setValue(0, 1, dweet.content.vlaznost);
	    	podaci[2].setValue(0, 1, dweet.content.tlak);
	    	podaci[3].setValue(0, 1, dweet.content.razinaVode);
			instrument[0].draw(podaci[0], opcije[0]);
			instrument[1].draw(podaci[1], opcije[1]);
			instrument[2].draw(podaci[2], opcije[2]);
			instrument[3].draw(podaci[3], opcije[3]);
			if(dweet.content.razinaVode<0){
				player.pause();
			}else{
				player.play();
			}
		} 
	}	
   setTimeout(function(){ getPodaci(); }, 1000);
   
	});
	 }
	
	 
	 
	 
  google.charts.load('current', {'packages':['gauge']});
  google.charts.setOnLoadCallback(definirajinstrument);
  
  function definirajinstrument() {
    podaci = [google.visualization.arrayToDataTable([
      ['Label', 'Value'],
  ['Temperatura', 0]
]),
google.visualization.arrayToDataTable([
  ['Label', 'Value'],
  ['Vlažnost', 0]
]),
google.visualization.arrayToDataTable([
  ['Label', 'Value'],
  ['Tlak', 0]
]),
google.visualization.arrayToDataTable([
  ['Label', 'Value'],
  ['Razina vode', 0]
])
];
opcije = [{
  width: 800, height: 180,
  redFrom: 90, redTo: 100,
  yellowFrom:75, yellowTo: 90,
  minorTicks: 5
},
{
  width: 800, height: 180,
  max: 60,
  redFrom: 40, redTo: 60,
  yellowFrom:30, yellowTo: 40,
  minorTicks: 5
},
{
  width: 800, height: 180,
  max: 70,
  redFrom: 60, redTo: 70,
  yellowFrom:30, yellowTo: 60,
  minorTicks: 5
},
{
  width: 800, height: 180,
  max: 100, min: -100,
  minorTicks: 5
}];
instrument = [new google.visualization.Gauge(document.getElementById('temperatura')),
new google.visualization.Gauge(document.getElementById('vlaznost')),
new google.visualization.Gauge(document.getElementById('tlak')),
new google.visualization.Gauge(document.getElementById('razinaVode'))];
    
	instrument[0].draw(podaci[0], opcije[0]);
	instrument[1].draw(podaci[1], opcije[1]);
	instrument[2].draw(podaci[2], opcije[2]);
	instrument[3].draw(podaci[3], opcije[3]);

  }
  
  getPodaci();