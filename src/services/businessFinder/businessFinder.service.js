const mockData = require('../../constant/data');

const findBusinesses = async (businessType, city) => {
  try {
    const filteredBusinesses = mockData.filter((business) => {
      const typeMatch =
        !businessType ||
        business.businessType?.toLowerCase() === businessType.toLowerCase();

      const cityMatch =
        !city ||
        business.city?.toLowerCase() === city.toLowerCase();

      return typeMatch && cityMatch;  
    });

    console.log(`Found ${filteredBusinesses.length} businesses`);

    return filteredBusinesses;
  } catch (error) {
    console.error('Finder Agent Error:', error.message);
    throw error;
  }
};

module.exports = {
  findBusinesses,
};