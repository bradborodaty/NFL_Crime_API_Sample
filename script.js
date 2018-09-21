$(document).ready(function() {
	// get team data
	function getTeamData() {
		// call api from http://nflarrest.com/api/
		$.get('http://nflarrest.com/api/v1/team', function(data){
			console.log(data)
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
			console.log(data)
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
			console.log(playersList);
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

