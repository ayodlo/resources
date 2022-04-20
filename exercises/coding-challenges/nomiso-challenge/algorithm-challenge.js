//Interview Qustions
// What is hoisting in JS
// Difference between undefined and null
// React life cycle
// Hooks and use cases
// What is an interface in typescript


//CHALLENGE
// Find the country with the largest population by
// combining the given data on foreign keys

// The output of largestCountry should be an object with a
// key 'name' representing the country name and a key 'population'
// representing the countries total population

// Example Input Data:
// const countries = [
//   { id: 3, name: 'Russia' },
//   { id: 1, name: 'USA' },
// ];

// const cities = [
//   { id: 3, country_id: 1, name: 'Los Angeles' },
//   { id: 8, country_id: 3, name: 'Moscow' },
//   { id: 2, country_id: 1, name: 'Seattle' },
// ];

// const populations = [
//   { id: 3, city_id: 3, amount: 3960000 },
//   { id: 8, city_id: 8, amount: 11920000 },
//   { id: 2, city_id: 2, amount: 8240000 },
// ];

// Example Output: { name: 'USA', population: 12200000 }
const largestCountry = (countries, cities, populations) => {
  const combinedPopulations = {};
  populations.forEach((population) => {
    if (!combinedPopulations[population.city_id]) {
      combinedPopulations[population.city_id] = population.amount;
    } else {
      combinedPopulations[city_id] =
        combinedPopulations[population.city_id] + population.amount;
    }
  });

  let largestPopulation = null;
  for (populationId in combinedPopulations) {
    if(!largestPopulation) {
      largedPopulation = {'count': combinedPopulations[populationId]}
    }

    if combinedPopulation[populationId] > largestPopulation.
  }

  return { name: 'ToBeDecided', population: 0 };
};

module.exports = largestCountry;
