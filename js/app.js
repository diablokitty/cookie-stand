let salesTimes = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];
let allLocations =[];

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


let seattle = new Store('Seattle', 23, 65, 6.3);
//console.log(seattle);
let tokyo = new Store('Tokyo', 3, 24, 1.2);
//console.log(tokyo);
let dubai = new Store('Dubai', 11, 38,3.7);
let paris = new Store('Paris', 20, 38, 2.3);
let lima = new Store('Lima', 2, 16, 4.6);

console.log(allLocations);

//Old object literals have been replaced by objects instantiated by the construtor. 

//const seattle = {
//   min:23,
//   max:65,
//   avg: 6.3,

//   randomAvgCustomer: function() {
//     return this.min + Math.floor((this.max - this.min +1) * Math.random());

//   },
//   cookieSalesPerHour: [],

//   randomAvgCookieSalesPerHour: function() {
    
//     for(let i=0; i<salesTimes.length; i++) {
//       let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
//       this.cookieSalesPerHour.push(saleData);
//     }
//   }
// };

// const tokyo = {
//   min: 3,
//   max: 24,
//   avg: 1.2,

//   randomAvgCustomer: function() {
//     return this.min + Math.floor((this.max - this.min +1) * Math.random());

//   },
//   cookieSalesPerHour: [],

//   randomAvgCookieSalesPerHour: function() {
    
//     for(let i=0; i<salesTimes.length; i++) {
//       let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
//       this.cookieSalesPerHour.push(saleData);
//     }
//   }
      
// };

// const dubai = {
//   min: 11,
//   max: 38,
//   avg: 3.7,

//   randomAvgCustomer: function() {
//     return this.min + Math.floor((this.max - this.min +1) * Math.random());

//   },
//   cookieSalesPerHour: [],

//   randomAvgCookieSalesPerHour: function() {
    
//     for(let i=0; i<salesTimes.length; i++) {
//       let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
//       this.cookieSalesPerHour.push(saleData);
//     }
//   }

// };

// const paris = {
//   min: 20,
//   max: 38,
//   avg: 2.3,

//   randomAvgCustomer: function() {
//     return this.min + Math.floor((this.max - this.min +1) * Math.random());
//   },
//   cookieSalesPerHour: [],

//   randomAvgCookieSalesPerHour: function() {
    
//     for(let i=0; i<salesTimes.length; i++) {
//       let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
//       this.cookieSalesPerHour.push(saleData);
//     }
//   }

// };

// const lima = {
//   min: 2,
//   max: 16,
//   avg: 4.6,

//   randomAvgCustomer: function() {
//     return this.min + Math.floor((this.max - this.min +1) * Math.random());
//   },

//   cookieSalesPerHour: [],

//   randomAvgCookieSalesPerHour: function() {
    
//     for(let i=0; i<salesTimes.length; i++) {
//       let saleData = Math.floor(this.randomAvgCustomer() * this.avg);
//       this.cookieSalesPerHour.push(saleData);
//     }
//   }
 
// };

//totalByLocation function gives total sales per city
let totalByLocation = function(city){
  let totalSalesByLocation = 0;
  for(let i=0; i<city.cookieSalesPerHour.length; i++){
    totalSalesByLocation += city.cookieSalesPerHour[i];
  }
  return totalSalesByLocation;
};

// Old function for rendering sales data replaced by method in constructor

// let renderSales = function(city){

//   city.randomAvgCookieSalesPerHour();
//   let sum = totalByLocation(city);
//   let output = "";
//   for(let i=0; i<salesTimes.length; i++) {
//     output+=`<td>${salesTimes[i]}: ${city.cookieSalesPerHour[i]} cookies. </td>`;
//   }
//   output += `<td>Total Sales: ${sum}</td>`;
  
//   return output;
// };
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
//renders hourly sales totals
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
