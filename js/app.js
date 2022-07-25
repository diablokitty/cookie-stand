let form = document.getElementById('locationForm');

function handleSubmit(event) {
  event.preventDefault();
  let location = event.target.location.value;
  let min = parseInt(event.target.min.value);
  let max = parseInt(event.target.max.value);
  let avg = parseInt(event.target.avg.value);
  
  
  let newStore = new Store(location, min, max, avg);
  console.log(newStore);

  return newStore;
}

form.addEventListener('submit', handleSubmit);


let salesTimes = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];
let allLocations =[];


// store object construtor
function Store(location, min, max, avg) {
  this.location = location;
  this.min = min;
  this.max = max;
  this.avg = avg;

  this.randomAvgCustomer = function() {
  
    return this.min + Math.floor((this.max - this.min +1) * Math.random());

  };
  this.cookieSalesPerHour = []

  this.randomAvgCookieSalesPerHour = function() {
    
    for(let i=0; i<salesTimes.length; i++) {
      let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
      this.cookieSalesPerHour.push(saleData);

    } 
  };
  allLocations.push(this);
  this.randomAvgCookieSalesPerHour();
  
  this.renderSales = function(){
    let sum = totalByLocation(this);
    let output = `<tr><td> ${this.location}</td>`;
    for(let i=0; i<salesTimes.length; i++) {
      output+=`<td> ${this.cookieSalesPerHour[i]} </td>`;
    }
    output += `<td> ${sum}</td></tr>`;
    
    return output;
  };

}

// instantiate the location objects
let seattle = new Store('Seattle', 23, 65, 6.3);
//console.log(seattle);
let tokyo = new Store('Tokyo', 3, 24, 1.2);
//console.log(tokyo);
let dubai = new Store('Dubai', 11, 38,3.7);
let paris = new Store('Paris', 20, 38, 2.3);
let lima = new Store('Lima', 2, 16, 4.6);




//totalByLocation function gives total sales per city
let totalByLocation = function(city){
  let totalSalesByLocation = 0;
  for(let i=0; i<city.cookieSalesPerHour.length; i++){
    totalSalesByLocation += city.cookieSalesPerHour[i];
  }
  return totalSalesByLocation;
};

//   return output

let output="";

let computeHourlySalesTotal = function() {
  let totalCookieSalesPerHour =[];
  for(let i=0; i<salesTimes.length; i++) {
    let hourTotal = 0;
    for(let j=0; j<allLocations.length; j++) {
      hourTotal += allLocations[j].cookieSalesPerHour[i]; 
    }
    totalCookieSalesPerHour.push(hourTotal);
    console.log(totalCookieSalesPerHour);
  }

  return totalCookieSalesPerHour;
};

let totalCookieSalesPerHour = computeHourlySalesTotal();

//renders table head (times)
output += `<thead><tr><th></th>`;
for(let i=0; i<salesTimes.length; i++) {
  output+=`<th>${salesTimes[i]}</th>`;
}
output+= `<th>Daily Location Totals</th></tr></thead>`;

//renders table data 
for(let i=0; i<allLocations.length; i++){
  output += allLocations[i].renderSales();
}
//renders hourly sales totals and all total sales
output += `<tr><td>Totals:</td>`;
for(let i=0; i<totalCookieSalesPerHour.length; i++) {
  output+=`<td>${totalCookieSalesPerHour[i]}</td>`;
}
let totalCookieSalesAll = 0;
for(let i=0; i<totalCookieSalesPerHour.length; i++) {
  totalCookieSalesAll += totalCookieSalesPerHour[i];
}

output += `<td>${totalCookieSalesAll}</td></tr>`;

// individual function calls replaced by loop
// output += renderSales(seattle);
// output += renderSales(tokyo);
// output += renderSales(dubai);
// output += renderSales(paris);
// output += renderSales(lima);
document.getElementById("output").innerHTML=output;

//determinging the cookie tossers

let computeHourlyCookieTossers = function() {
  let totalCookieTossersPerHour =[];
  for(let i=0; i<allLocations.length; i++) {
    let tosserTotal = 0;
    let locationTossers =[];
    for(let j=0; j<salesTimes.length; j++) {
      tosserTotal = Math.floor(allLocations[i].cookieSalesPerHour[j]/20); 
      if(tosserTotal<2){
        tosserTotal =2;
      }
      locationTossers.push(tosserTotal);
    }
    totalCookieTossersPerHour.push(locationTossers);
    //console.log(totalCookieTossersPerHour);
  }

  return totalCookieTossersPerHour;
};

let totalCookieTossersPerHour = computeHourlyCookieTossers();
console.log(totalCookieTossersPerHour);

output = '';

//renders table head (times)
output += `<thead><tr><th></th>`;
for(let i=0; i<salesTimes.length; i++) {
  output+=`<th>${salesTimes[i]}</th>`;
}
output+= `</tr></thead>`;

for(let i=0; i<totalCookieTossersPerHour.length; i++) {
//let sum = tossersByLocation(this);
  output += `<tr><td> ${allLocations[i].location}</td>`;
  for(let j=0; j<salesTimes.length; j++) {
    output+=`<td> ${totalCookieTossersPerHour[i][j]} </td>`;
  }
  output += `</tr>`;
 
}
document.getElementById("output2").innerHTML=output;

