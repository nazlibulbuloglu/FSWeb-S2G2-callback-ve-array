const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const homeTeam = fifaData.find(match => match.Year === 2014 && match.Stage === "Final")["Home Team Name"];
console.log(homeTeam);



//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const awayTeam = fifaData.find(match => match.Year === 2014 && match.Stage === "Final")["Away Team Name"];
console.log(awayTeam);



//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const homeTeamGoals = fifaData.find(match => match.Year === 2014 && match.Stage === "Final")["Home Team Goals"];
console.log(homeTeamGoals);


//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const awayTeamGoals = fifaData.find(match => match.Year === 2014 && match.Stage === "Final")["Away Team Goals"];
console.log(awayTeamGoals);


//(e) 2014 Dünya kupası finali kazananı*/
const homeGoals = fifaData.find(match => match.Year === 2014)["Home Team Goals"];
const awayGoals = fifaData.find(match => match.Year === 2014)["Away Team Goals"];
const winner = homeGoals > awayGoals ? homeTeam : awayTeam;
console.log(winner);


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifa_Data) {
	
    const finaller = fifa_Data.filter((data) => {
		return data.Stage === "Final";
	  });
	  return finaller;
}
Finaller(fifaData);


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/
	  
	  function Yillar(fifa_Data, finallerCallback) {
		const finaller = finallerCallback(fifa_Data);
		const yillar = finaller.map((final) => {
		  return final.Year;
		});
		return yillar;
	  }
	  
	  Yillar(fifaData, Finaller);


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	function Kazananlar(fifaData, finallerCallback) {
		
		const finaller = finallerCallback(fifaData);	  
		
		const kazananlar = {};	  
	
		finaller.forEach(final => {
		  
		  if (final["Home Team Goals"] > final["Away Team Goals"]) {
			const evSahibi = final["Home Team Name"];
			if (!kazananlar[evSahibi]) {
			  kazananlar[evSahibi] = 1;
			} else {
			  kazananlar[evSahibi]++;
			}
		  }
		  
		  else if (final["Away Team Goals"] > final["Home Team Goals"]) {
			const deplasman = final["Away Team Name"];
			if (!kazananlar[deplasman]) {
			  kazananlar[deplasman] = 1;
			} else {
			  kazananlar[deplasman]++;
			}
		  }		 
		});	  
		
		return Object.keys(kazananlar);
	  }


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

	function YillaraGoreKazananlar(fifaData, finallerCallback, yillarCallback, kazananlarCallback) {
	const finaller = finallerCallback(fifaData);
	const yillar = yillarCallback(fifaData);
	const kazananlar = kazananlarCallback(fifaData, finallerCallback);
	const sonuclar = [];
  
	for (let i = 0; i < yillar.length; i++) {
	  sonuclar.push(`${yillar[i]} yılında, ${kazananlar[i]} dünya kupasını kazandı!`);
	}
  
	return sonuclar;
  }
  


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

	function OrtalamaGolSayisi() {
	const matches = Finaller(fifaData);
	const totalGoals = matches.reduce((acc, match) => {
	  return acc + (match["Home Team Goals"] + match["Away Team Goals"]);
	}, 0);
  
	const averageGoals = (totalGoals / matches.length).toFixed(2);
  
	return averageGoals;
  }
  OrtalamaGolSayisi(Finaller);

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
