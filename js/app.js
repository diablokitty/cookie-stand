let salesTimes = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];


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

}

let seattle = new Store('Seattle', 23, 65, 6.3);
//console.log(seattle);
let tokyo = new Store('Tokyo', 3, 24, 1.2);
//console.log(tokyo);
let dubai = new Store('Dubai', 11, 38,3.7);
let paris = new Store('Paris', 20, 38, 2.3);
let lima = new Store('Lima', 2, 16, 4.6);

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
let total = function(city){
  let totalSales = 0;
  for(let i=0; i<city.cookieSalesPerHour.length; i++){
    totalSales += city.cookieSalesPerHour[i];
  }
  return totalSales;
};

let renderSales = function(city){

  city.randomAvgCookieSalesPerHour();
  let sum = total(city);
  let output = `${city.location} <br><br><ul>`;
  for(let i=0; i<salesTimes.length; i++) {
    output+=`<li>${salesTimes[i]}: ${city.cookieSalesPerHour[i]} cookies. </li>`;
  }
  output += `<li>Total Sales: ${sum}</li></ul> <br><br>`;
  
  return output;
};
let output="";

output += renderSales(seattle);
output += renderSales(tokyo);
output += renderSales(dubai);
output += renderSales(paris);
output += renderSales(lima);
document.getElementById("output").innerHTML=output;
