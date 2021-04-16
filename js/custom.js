

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
	var totalvaccinatedarea = $("#total_vaccined");
	var total_tarritories = $("#total_tarritories");
	var daily_vaccined = $("#daily_vaccined");
	var fully_vaccined = $("#fully_vaccined");
	var single_fully_vaccined = 0;
	var single_daily_vaccined = 0;

	// $("#getdata").click(function(){

	
		$.ajax({
			url:"https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json",
			success:function(resp){
				josnData = JSON.parse(resp);
				territories = josnData.length;
				for (var i = 0; i < josnData.length; i++) {
					ourSignleData = josnData[i].data;
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
					
					newData = `<div class='col-lg-4 col-md-4 col-sm-6 single_data'>
						<p class='country_heading'>${josnData[i].country}</p>
						<table class='signle_data_table'>
							<tr class='table_heading'>
								<td>Total</td>
								<td>Daily</td>
								<td>Fully</td>
							</tr>
							<tr>
								<td>${vaccined}</td>
								<td>${single_daily_vaccined}</td>
								<td>${single_fully_vaccined}</td>
							</tr>
						</table>
					</div>`;
					ourData.append(newData);
					
					total_vaccined_peoples = total_vaccined_peoples + vaccined;
					fullyVaccinced =fullyVaccinced + single_fully_vaccined;
					dailyVaccined =dailyVaccined + single_daily_vaccined;
					

					// console.log(total_vaccined_peoples)
				}
				console.log(total_vaccined_peoples+ " Are vaccined");
				console.log(fullyVaccinced+ " Are fullyVaccinced");
				console.log(territories + " are the territories");
				console.log(dailyVaccined+ " Are dailyVaccined");

				$("#total").text(total_vaccined_peoples);

				// Manipulating DOM here
				total_tarritories.text(territories);
				totalvaccinatedarea.text(total_vaccined_peoples);
				daily_vaccined.text(dailyVaccined);
				fully_vaccined.text(fullyVaccinced);

				console.log(josnData);
			}
		});

	// });
});