$(document).ready(function(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	// console.log(today);
	var sum = 0;
	var ourData = $("#ourdata");
	// $("#getdata").click(function(){
		$.ajax({
			url:"https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json",
			success:function(resp){
				josnData = JSON.parse(resp);
				for (var i = 0; i < josnData.length; i++) {
					ourSignleData = josnData[i].data;
					// vaccined = ourSignleData[ourSignleData.length -1].people_vaccinated;
					if(ourSignleData[ourSignleData.length -1].people_vaccinated){
						vaccined = ourSignleData[ourSignleData.length -1].people_vaccinated;
					}else{
						vaccined = ourSignleData[ourSignleData.length -1].total_vaccinations;
					}

					newData = `<div class='single_data'>
						<p>${josnData[i].country} ${vaccined}</p>
					</div>`;
					ourData.append(newData);
					
					sum = sum + vaccined;
					
					// console.log(sum)
				}
				console.log(sum);
				$("#total").text(sum);
				console.log(josnData);
			}
		});

	// });
});