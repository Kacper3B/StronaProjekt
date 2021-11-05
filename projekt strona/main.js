$(document).ready(function () {
	let apikey = "1e71d683";

	$("#szukanie").submit(function (event) {
		event.preventDefault();
		document.querySelector("#main").style.display = "flex";
		let film = $("#tytul").val();
		let url = "https://www.omdbapi.com/?apikey=" + apikey;
		let result = "";
		let result1 = "";
		$.ajax({
			method: "GET",
			url: url + "&s=" + film,
			success: function (data) {
				console.log(data);

				for (let i = 0; i < data.Search.length; i++) {
					console.log(data.Search[i]);

					$.ajax({
						method: "GET",
						url: url + "&t=" + data.Search[i].Title + "&plot=short",
						success: function (wysw) {
							console.log(wysw);
							let a;
							if (wysw.Type == "movie") {
								a = "Film";
							} else if (wysw.Type == "series") {
								a = "Serial";
							}
							result = `
				
						<img style="float:left;" width="200" height="290" src="${wysw.Poster}"/>
						<p class="informacje-tytul">${wysw.Title} (${wysw.Year})</p>
						<br><br>
						<p class="informacje">Type: ${wysw.Type}</p><br>
						<p class="informacje">IMDB Rating: ${wysw.Ratings[0].Value}</p>
						<a class="moreinfo" id="more${i}">Wiecej informacji </a>
				
						`;
							result1 = `
			<div class="informacje-gora">
			<img id="miks${i}" src="images/IKS.svg" width="30" height="30" />
			<p class="wiecejinfo-tytul">${wysw.Title} </p>
			<p class="informacje-typ">${a}&nbsp; &bull;</p>
			<p class="informacje-rok"> &nbsp;${wysw.Year}&nbsp; &bull;</p>
			<p class="informacje-czas"> &nbsp;${wysw.Runtime}</p>
			<p class="informacje-pegi">Rating: ${wysw.Rated}</p>
			<p class="informacje-rating">IMDB Rating: ${wysw.Ratings[0].Value}</p><br>
			<div class="informacje-poster">
			<img style="float:left;" class="posters" width="250" height="362,5" src="${wysw.Poster}"/>
			</div>
			</div>
			<br>
			<div class="informacje-info">
			<p class="informacje-plot">Opis: ${wysw.Plot}</p><br><br><br>
			<p class="informacje-gatunek">Gatunek &nbsp;&nbsp;${wysw.Genre}</p><br>
			<div class="informacje-crew">
			<p class="informacje-rezyser">Director &nbsp;&nbsp;${wysw.Director}</p>
			<hr class="crewline">
			<p class="informacje-writers">Writers &nbsp;&nbsp;${wysw.Writer}</p>
			<hr class="crewline">
			<p class="informacje-aktorzy ">Actors &nbsp;&nbsp;${wysw.Actors}</p>
			</div>
    		<p class="informacje-premiera ">Data Premiery &nbsp;&nbsp;${wysw.Released}</p>
			<p class="informacje-kraj ">Kraj powstania &nbsp;&nbsp;${wysw.Country}</p>
			<p class="informacje-boxoffice ">BoxOffice &nbsp;&nbsp;${wysw.BoxOffice}</p>
			</div>
			<a href="https://www.imdb.com/title/${wysw.imdbID}" target="_blank" class="informacje-imdblink">${wysw.Title} on IMDB</a>
			  `;

							// document.querySelector("#more"+i).addEventListener('click',function(){
							// 	document.querySelector("#showmoreinfo"+i).style.display = "block";
							// })
							$("#f" + i).html(result);
							$("#showmoreinfo" + i).html(result1);
							document
								.querySelector("#more" + i)
								.addEventListener("click", function () {
									document.querySelector("#showmoreinfo" + i).style.display =
										"block";
									document.querySelector(".tlo").style.display = "flex";
								});
							document
								.querySelector("#miks" + i)
								.addEventListener("click", function () {
									document.querySelector("#showmoreinfo" + i).style.display =
										"none";
									document.querySelector(".tlo").style.display = "none";
								});
						},
					});
				}
			},
			// error:alert('Error')
		});
	});
});

