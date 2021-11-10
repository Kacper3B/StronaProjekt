$(document).ready(function () {
  let apikey = "1e71d683";

  $("#szukanie").submit(function (event) {
    event.preventDefault();
    document.querySelector("#main").style.display = "flex";
    let film = $("#tytul").val();
    let url = "https://www.omdbapi.com/?apikey=" + apikey;
    let result = "";
    let result1 = "";
    let sezoniki = "";
    $.ajax({
      method: "GET",
      url: url + "&s=" + film,
      success: function (data) {
        console.log(data);

        for (let i = 0; i < data.Search.length; i++) {
          console.log(data.Search[i]);
          // if (data.Search[i].Type == "game") {
          //   $.ajax({
          //     method: "GET",
          //     url: url + "&s=" + data.Search[i].Title + "&plot=short",
          //     success: function (wysw) {
          //       result = `

          // 	<img style="float:left;" width="200" height="290" src="${wysw.Poster}"/>
          // 	<p class="informacje-tytul">${wysw.Title} (${wysw.Year})</p>
          // 	<br><br>
          // 	<p class="informacje">Type: ${wysw.Type}</p><br>
          // 	<p class="informacje">IMDB Rating: Brak </p>

          // 	`;
          //       $("#f" + i).html(result);
          //     },
          //   });
          // } else if {data.Search[i].Type =="game"){
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
              let b, c;
              const znaki = /\s*(?:;|$)\s*/;

              if (wysw.Actors) {
                b = wysw.Actors.split(", ");
              }
              console.log(wysw.Actors);
              console.log(b);

              //   for (let i; i <= b.length; i++) {
              //     c = b[i];
              //   }
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
			<p class="informacje-writers">Writer(s) &nbsp;&nbsp;${wysw.Writer}</p>
			<hr class="crewline">
			<p class="informacje-aktorzy ">Actors &nbsp;&nbsp;${b[0]}&nbsp;&bull;&nbsp;${b[1]}&nbsp;&bull;&nbsp;${b[2]}</p>
			<img src="" class="informacje-aktorzy-images imgact0" style="float:left;" width="100" height="145"/>
			<img src="" class="informacje-aktorzy-images imgact1" style="float:left;" width="100" height="145"/>
			<img src="" class="informacje-aktorzy-images imgact2" style="float:left;" width="100" height="145"/>
			</div>
    		<p class="informacje-premiera ">Data Premiery &nbsp;&nbsp;${wysw.Released}</p>
			<p class="informacje-kraj ">Kraj powstania &nbsp;&nbsp;${wysw.Country}</p>
			<p class="informacje-boxoffice ">BoxOffice &nbsp;&nbsp;${wysw.BoxOffice}</p><br>
      <p class="informacje-pokazsezony" id="pokazsezony${i}">Wszystkie sezony -> click </p>
			</div>
			<a href="https://www.imdb.com/title/${wysw.imdbID}" target="_blank" class="informacje-imdblink">${wysw.Title} on IMDB</a>
			  `;
              $("#f" + i).html(result);
              $("#showmoreinfo" + i).html(result1);
              if (a == "Serial") {
                document.querySelector("#more" + i).addEventListener("click", function () {
                  $.ajax({
                    method: "GET",
                    url: "https://imdb8.p.rapidapi.com/title/get-seasons?tconst=" +
                      wysw.imdbID +
                      "&rapidapi-key=e3cd1aa8bemshd3e184434681a97p194c19jsn5d64bb6ae0bb",
                    success: function (sez) {
                      console.log(sez);
                      sezoniki = `
                    <p class="sezonback" >Cofnij --> </p>
                    <img id="mikssezon${i}" src="images/IKS.svg" width="30" height="30" />
                    <div class="infopoprzednia">  
                    <p class="wiecejinfo-tytul">${wysw.Title}</p>
                    </div>
                    <div class="sezonykontent">
                    <div class="wybierzsezon">
                    <label for="sezon">Season:</label>
                    <select id="sezon" class="obecnysezon"></select>
                    </div>
                    </div>
      
                      `;

                      $("#allsezony" + i).html(sezoniki);
                      // let opcja = document.createElement("option");
                      for (let s = 0; s < sez.length; s++) {
                        // tablica z iloscia sezonow
                        // a.appendChild(opcja);
                        // let opcja = document.createElement("option");
                        let opcjanic = document.createElement("option");
                        opcjanic.text = "Wybierz sezon";
                        opcjanic.value = -1;
                        opcjanic.id = "opcja0";
                        let opcja = document.createElement("option");
                        opcja.text = s;
                        opcja.value = s;
                        opcja.id = "opcja" + (s + 1);
                        if (!document.querySelector("#opcja0")) {
                          document.querySelector("#sezon").appendChild(opcjanic);
                        }
                        if (!document.querySelector("#opcja" + s + 1)) {
                          document.querySelector("#sezon").appendChild(opcja);
                        }
                        // console.log(sez[s]);
                        for (let d = 0; d < sez[s].episodes.length; d++) {
                          // dla kazdego sezonu tworzy div z odcinkami
                          let nowydiv = document.createElement("div");
                          nowydiv.id = "odcinek" + sez[s].episodes[d].episode;
                          nowydiv.className = "season" + sez[s].season;
                          let pojedynczyodc = sez[s].episodes[d].episode;
                          let pojedynczysezon = sez[s].season;
                          document.querySelector(".sezonykontent").appendChild(nowydiv);
                          let odckontent;
                          let odcinekid;
                          if (sez[s].episodes[d].id) {
                            odcinekid = sez[s].episodes[d].id.split("/");
                          }
                          // <p class="odcinekrating">${danyodcinek.Ratings[0].Value} (${danyodcinek.imdbVotes})</p>
                          // $('#sezon :selected').val();
                          $("#sezon").change(function () {
                            let war = this.value;
                            for (let v = 0; v < sez[war].episodes.length; v++) {
                              if (sez[war].episodes[v].id) {
                                odcinekid = sez[war].episodes[v].id.split("/");
                              }
                              $.ajax({
                                method: "GET",
                                url: "https://www.omdbapi.com/?apikey=1e71d683&i=" + odcinekid[2],
                                success: function (danyodcinek) {
                                  odckontent = `

                                  <img style="float:left;" class="posterodcinek" src="${danyodcinek.Poster}"/>
                                  <div class="odcinekinformacje">
                              <p class="odcinektytul" > ${danyodcinek.Title}</p>
                               <p class="odcinekkiedy" >${danyodcinek.Released} </p><br>
                               <p class="odcinekrating">IMDB rating: ${danyodcinek.Ratings[0].Value} (${danyodcinek.imdbVotes})</p><br>
                              <p class="odcinekplot" >${danyodcinek.Plot}</p>
                                  </div>
                          `;
                                  $("#odcinek" + (v + 1) + ".season" + sez[war].season).html(
                                    odckontent
                                  );
                                },
                              });
                            }

                            $("#sezon option:selected").each(function () {
                              $(".season1").css("display", "none");
                              $(".season2").css("display", "none");
                              $(".season3").css("display", "none");
                              $(".season4").css("display", "none");
                              $(".season5").css("display", "none");
                              $(".season6").css("display", "none");
                              $(".season7").css("display", "none");
                              $(".season8").css("display", "none");
                              $(".season9").css("display", "none");

                              $(".season" + this.value).css("display", "flex");
                            });

                          });
                        }
                      }
                      // switch (document.querySelector("#sezon option:selected").value) {
                      //   case 0:
                      //   // document.querySelector(".sezonykontent").appendChild()
                      // }
                      document
                        .querySelector("#mikssezon" + i)
                        .addEventListener("click", function () {
                          document.querySelector("#allsezony" + i).style.display = "none";
                          document.querySelector(".mainsezony").style.display = "none";
                          document.querySelector("#showmoreinfo" + i).style.display = "flex";
                          document.querySelector(".tlo").style.display = "flex";
                        });
                    },
                  });
                });
              }
              // document.querySelector("#more"+i).addEventListener('click',function(){
              // 	document.querySelector("#showmoreinfo"+i).style.display = "block";
              // })
              document.querySelector("#more" + i).addEventListener("click", function () {
                document.querySelector("#showmoreinfo" + i).style.display = "block";
                document.querySelector(".tlo").style.display = "flex";
                if (a == "Serial") {
                  document.querySelector("#pokazsezony" + i).style.display = "block";
                  document.querySelector("#pokazsezony" + i).addEventListener("click", function () {
                    //funkcja do pokazania sezonow
                    document.querySelector(".tlo").style.display = "none";
                    document.querySelector("#showmoreinfo" + i).style.display = "none";
                    document.querySelector(".mainsezony").style.display = "flex";
                    document.querySelector("#allsezony" + i).style.display = "block";
                  });
                }
                for (let x = 0; x < b.length; x++) {
                  console.log(b[x]);

                  $.ajax({
                    method: "GET",
                    url: "https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" +
                      b[x] +
                      "/?format=json&rapidapi-key=e3cd1aa8bemshd3e184434681a97p194c19jsn5d64bb6ae0bb",
                    success: function (idactor) {
                      let aktor = idactor.results[0].imdb_id;
                      console.log(aktor);

                      $.ajax({
                        method: "GET",
                        url: "https://data-imdb1.p.rapidapi.com/actor/id/" +
                          aktor +
                          "/?format=json&rapidapi-key=e3cd1aa8bemshd3e184434681a97p194c19jsn5d64bb6ae0bb",
                        success: function (zdjecie) {
                          let actorimage = zdjecie.results.image_url;
                          console.log(actorimage);
                          $(".imgact" + x).attr("src", actorimage);
                        },
                      });
                    },
                  });
                }
              });
              document.querySelector("#miks" + i).addEventListener("click", function () {
                document.querySelector("#showmoreinfo" + i).style.display = "none";
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