import { pincodes } from '../data/pincodes'; // Import pincodes

export const calculateDeliveryDate = (pincode, product) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    if (!product.inStock) {
      return { 
        date: null, 
        message: 'Product out of stock' 
      };
    }
  
    const pincodeInfo = pincodes[pincode];
    if (!pincodeInfo) {
      return { 
        date: null, 
        message: 'Invalid pincode' 
      };
    }
  
    switch (pincodeInfo.provider) {
      case 'ProviderA':
        if (currentHour < 17) { // Before 5 PM
          return {
            date: currentTime,
            message: 'Same day delivery',
            cutoffTime: '17:00'
          };
        }
        return {
          date: new Date(currentTime.setDate(currentTime.getDate() + 1)),
          message: 'Next day delivery'
        };
  
      case 'ProviderB':
        if (currentHour < 9) { // Before 9 AM
          return {
            date: currentTime,
            message: 'Same day delivery',
            cutoffTime: '09:00'
          };
        }
        return {
          date: new Date(currentTime.setDate(currentTime.getDate() + 1)),
          message: 'Next day delivery'
        };
  
      case 'GeneralPartners':
        const daysToAdd = pincodeInfo.region === 'metro' ? 2 : 
                         pincodeInfo.region === 'tier2' ? 3 : 5;
        return {
          date: new Date(currentTime.setDate(currentTime.getDate() + daysToAdd)),
          message: `Delivery in ${daysToAdd} days`
        };
  
      default:
        return { 
          date: null, 
          message: 'Unable to calculate delivery date' 
        };
    }
};