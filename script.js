$(document).ready(function() {
	
	// function to get top crime teams
	function getTopCrimeTeams() {
		$.get('http://nflarrest.com/api/v1/team', function(data) { 
			//console.log(data);
			
			// create compare function to sort by arrest_count
			function compare(a,b) {
				if (a.arrest_count < b.arrest_count) {
					return 1;
				} else if (a.arrest_count > b.arrest_count) {
					return -1;
				} else {
					return 0;
				}
			}
			
			// sort data
			data.sort(compare);
			
			// map top 5 teams into own array
			let topTeams = new Array();
			for (var i = 0; i < data.length; i++) {
				if (i < 5) {
					topTeams.push('<li>' + data[i].Team_preffered_name + ' (' + data[i].arrest_count + ')</li>');
				}
			}
			
			// display on page
			$("#top-teams").append(topTeams);
		});
	}
	
	// top 5 crime players function 
	function getTopCrimePlayers() {
		$.get('http://nflarrest.com/api/v1/player', function(data) {
			//console.log(data)
			// compare function of array object properties to sort by arrest_count
			function compare(a,b) {
				if (a.arrest_count < b.arrest_count) {
					return 1;
				} else if (a.arrest_count > b.arrest_count) {
					return -1;
				} else {
					return 0;
				}
			}
			// sort data by highest arrests before mapping into new array
			data.sort(compare);
			// map top 5 arrested players into array
			let topPlayers = new Array();
			for (var i = 0; i < data.length; i++) {
				if (i < 5) {
					topPlayers.push('<li>' + data[i].Name + ' (' + data[i].arrest_count + ')');
				}
			}
			
			$("#top-players").append(topPlayers);
		});
	}
	
	// total crimes across all teams
	function calcTotalCrimes() {
		$.get('http://nflarrest.com/api/v1/team', function(data) {
			//console.log(data);
			
			let eachTeamCount = new Array();
			for (var i =0; i < data.length; i++) {
				eachTeamCount.push(data[i].arrest_count);
			}
			console.log(eachTeamCount);
			
			// hold the total
			let crimeTotal = 0;
			for (var i = 0; i < eachTeamCount.length; i++) {
				// make sure to convert string values to integers to add them together
				crimeTotal += parseInt(eachTeamCount[i]);
			}
			
			$("#total-count").prepend(crimeTotal);
		});
	}
	
	// top crimes
	function getTopNflCrimes() {
		$.get('http://nflarrest.com/api/v1/crime', function(data) {
			//console.log(data);
			
			let topCrimes = new Array();
			for (var i = 0; i < data.length; i++) {
				if (i < 5) {
					topCrimes.push('<li>' + data[i].Category + ' (' + data[i].arrest_count + ')</li>');
				}
			}
			
			$('#top-crimes').append(topCrimes);
		});
	}
	
	// run the functions on page load
	getTopCrimeTeams();
	calcTotalCrimes();
	getTopNflCrimes();
	getTopCrimePlayers();
	
	// get team data
	function getTeamData() {
		// call api from http://nflarrest.com/api/
		$.get('http://nflarrest.com/api/v1/team', function(data){
			//console.log(data)
			// create new array to separate teams to output as a list item
			let teamsList = new Array();
			for (var i = 0; i < data.length; i++) {
				// add division to the table for each team
				teamsList.push('<tr class="teamShown"><td>' + data[i].Team_preffered_name + '</td><td>' + data[i].Team_Conference_Division + '</td><td>' + data[i].arrest_count + '</td></tr>');
			}
			// sort array alphabetically
			teamsList.sort();
			// show teams array on page in a table
			$("#dataTeamDisplay").append(teamsList);
		});
	};
	// get top 20 player data
	function getPlayerData() {
		$.get('http://nflarrest.com/api/v1/player', function(data) {
			//console.log(data)
			// compare function of array object properties to sort by arrest_count
			function compare(a,b) {
				if (a.arrest_count < b.arrest_count) {
					return 1;
				} else if (a.arrest_count > b.arrest_count) {
					return -1;
				} else {
					return 0;
				}
			}
			// sort data by highest arrests before mapping into new array
			data.sort(compare);
			// map top 20 arrested players into array
			let playersList = new Array();
			for (var i = 0; i < data.length; i++) {
				if (i < 20) {
					playersList.push(data[i]);
				}
			}
			//console.log(playersList);
			// create new array to create final output
			let finalPlayersList = new Array();
			for (var i = 0; i < playersList.length; i++) {
				finalPlayersList.push('<tr class="playerShown"><td>' + playersList[i].Name + '</td><td>' + playersList[i].arrest_count + '</td><td>' + playersList[i].Position + '</td><td>' + playersList[i].Team_name + '</td></tr>');
			}
			$("#dataPlayerDisplay").append(finalPlayersList);
		});
	};
	
	// add friendly text while api loads
	let $loading = $('#loading').hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
		})
		.ajaxStop(function () {
			$loading.hide();
		});
	
	// attach on click to button and display api call results
	$("#showTeamData").on('click', function() {
		$('.table-player').hide();
		$('.table-team').show();
		if ($('.teamShown').length) {
			
		} else {
			getTeamData();
		}
	});
	
	// attach on click to button and display api call results
	$("#showPlayerData").on('click', function() {
		$('.table-team').hide();
		$('.table-player').show();
		if ($('.playerShown').length) {
			
		} else {
			getPlayerData();
		}
	});
});

