function addCommas(nStr){
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
 }
 return x1 + x2;
}

function drawChart(graphData) {

	var data = google.visualization.arrayToDataTable(graphData);

	var options = {
	  title: 'CoronaVirus vaccinations Stats',
	  is3D: true,
	  backgroundColor: '#212123',
	  pieSliceTextStyle: {
        color: '#fff',
      },
      legend:{
      	textStyle: {color: '#fff', fontSize: 16}
      },
      titleTextStyle: {
      	color: "#fff",
      },
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}


$(document).ready(function(){
	/*var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;*/
	// console.log(today);
	var fullyVaccinced = 0;
	var territories;	
	var total_vaccined_peoples = 0;
	var dailyVaccined = 0;
	var ourData = $("#ourdata");
	var ourDataMoving = $("#ourdata-moving");
	var totalvaccinatedarea = $("#total_vaccined");
	var total_tarritories = $("#total_tarritories");
	var daily_vaccined = $("#daily_vaccined");
	var fully_vaccined = $("#fully_vaccined");
	var single_fully_vaccined = 0;
	var single_daily_vaccined = 0;
	var ourMapData = [];
	var updatingDate;
	var updatingDateArea = $("#updated-date");

	// $("#getdata").click(function(){
	var appended = false;
	setInterval(function(){
		total_vaccined_peoples  = 0;
		fullyVaccinced = 0;
		dailyVaccined = 0;
		countriesCount = 0;
		// ourData.html("");
		// ourDataMoving.html("");
		$.ajax({
			url:"https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json",
			success:function(resp){
				josnData = JSON.parse(resp);
				territories = josnData.length;
				updatingDate = josnData[0].country.date;
				for (var i = 0; i < josnData.length; i++) {
					ourSignleData = josnData[i].data;

					if(josnData[i].country == "Asia" || josnData[i].country == "Europe" || josnData[i].country == "European Union" ||josnData[i].country == "Africa" ||josnData[i].country == "America"||josnData[i].country == "South America"||josnData[i].country == "North America")
					{
						continue;
					}

					// vaccined = ourSignleData[ourSignleData.length -1].people_vaccinated;
					if(ourSignleData[ourSignleData.length -1].people_vaccinated){
						vaccined = ourSignleData[ourSignleData.length -1].people_vaccinated;
					}else{
						vaccined = ourSignleData[ourSignleData.length -1].total_vaccinations;
					}

					if(ourSignleData[ourSignleData.length -1].people_fully_vaccinated){
						single_fully_vaccined = ourSignleData[ourSignleData.length -1].people_fully_vaccinated
						
					}
					if(ourSignleData[ourSignleData.length -1].daily_vaccinations){
						single_daily_vaccined = ourSignleData[ourSignleData.length -1].daily_vaccinations
						
					}
					if(ourSignleData[ourSignleData.length -1].date){
						updatingDate = ourSignleData[ourSignleData.length -1].date
						
					}
					
					newData = `<div class='col-lg-4 col-md-4 col-sm-6 single_data'>
						<p class='country_heading'>${josnData[i].country}</p>
						<table class='signle_data_table'>
							<tr class='table_heading'>
								<td>Total</td>
								<td>Daily</td>
								<td>Fully</td>
							</tr>
							<tr>
								<td>${addCommas(vaccined)}</td>
								<td>${addCommas(single_daily_vaccined)}</td>
								<td>${addCommas(single_fully_vaccined)}</td>
							</tr>
						</table>
					</div>`;

					newDataMoving = `<div class='col-sm-12 single_data'>
						<p class='country_heading'>${josnData[i].country}</p>
						<table class='signle_data_table'>
							<tr class='table_heading'>
								<td>Total</td>
								<td>Daily</td>
								<td>Fully</td>
							</tr>
							<tr>
								<td>${addCommas(vaccined)}</td>
								<td>${addCommas(single_daily_vaccined)}</td>
								<td>${addCommas(single_fully_vaccined)}</td>
							</tr>
						</table>
					</div>`;
					if (!appended){
						ourData.append(newData);
						ourDataMoving.append(newDataMoving);
					}
						
					
					total_vaccined_peoples = total_vaccined_peoples + vaccined;
					fullyVaccinced =fullyVaccinced + single_fully_vaccined;
					dailyVaccined =dailyVaccined + single_daily_vaccined;
					

					// console.log(total_vaccined_peoples);

					countriesCount++;
				}
				// console.log(total_vaccined_peoples+ " Are vaccined");
				// console.log(fullyVaccinced+ " Are fullyVaccinced");
				// console.log(territories + " are the territories");
				// console.log(dailyVaccined+ " Are dailyVaccined");

				$("#total").text(addCommas(total_vaccined_peoples));

				// Manipulating DOM here
				total_tarritories.text(addCommas(countriesCount));
				totalvaccinatedarea.text(addCommas(total_vaccined_peoples));
				daily_vaccined.text(addCommas(dailyVaccined));
				fully_vaccined.text(addCommas(fullyVaccinced));
				updatingDateArea.text(updatingDate);

				ourMapData = [
					['Task', 'Hours per Day'],
					['Total Vaccined',     total_vaccined_peoples],
					['Daily Vaccined',     dailyVaccined],
					['Fully Vaccined',     fullyVaccinced],
					['Territories',     territories],
				];

				google.charts.load('current', {'packages':['corechart']});
      			google.charts.setOnLoadCallback(drawChart(ourMapData));


				console.log(josnData);
				console.log(updatingDate);
				appended = true;
			}
		});
	},1000);

	// });
});


// Scrolling Effect

moving =0;
$(function(){
  var tickerLength = $('#ourdata-moving .single_data').length;
  var tickerHeight = $('#ourdata-moving .single_data').outerHeight();
  $('#ourdata-moving .single_data:last-child').prependTo('#ourdata-moving');
  $('#ourdata-moving').css('marginTop',-tickerHeight);
  function moveTop(){
    $('#ourdata-moving').animate({
      top : -tickerHeight
    },600, function(){
     $('#ourdata-moving .single_data:first-child').appendTo('#ourdata-moving');
      $('#ourdata-moving').css('top','');
    });
    moving++;
   }
  setInterval( function(){
    moveTop();
    console.log(moving);
  }, 700);
});