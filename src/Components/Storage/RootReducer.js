const initialState = {
  vendor: {},
  properties: {},
  subProperties: {},
  description: {},
  address: {},
  guest: {},
  amenities: {},
  vendorDBData: {},
  vendorExtraDetails: {},
};
export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_VENDOR":
      state.vendor[action.payload[0]] = action.payload[1];
      console.log("REDUX", state.vendor);
      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };
    case "ADD_PROPERTIES":
      state.properties[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };
    case "ADD_SUB_PROPERTIES":
      state.subProperties[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };

    case "ADD_PROPERTY_DESCRIPTION":
      state.description[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };

    case "ADD_ADDRESS":
      state.address[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };
    case "ADD_GUEST":
      state.guest[action.payload[0]] = action.payload[1];
      console.log("GUEST", state.guest);
      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };
    case "ADD_AMENITIES":
      state.amenities[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };

    case "ADD_DB_VENDORPROP":
      state.vendorDBData[action.payload[0]] = action.payload[1];

      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };

    case "ADD_VENDOR_EXTRA_DETAILS":
      state.vendorExtraDetails[action.payload[0]] = action.payload[1];
      console.log(state.vendorExtraDetails);
      return {
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorDBData: state.vendorDBData,
        vendorExtraDetails: state.vendorExtraDetails,
      };

    default:
      return {
        vendorDBData: state.vendorDBData,
        vendor: state.vendor,
        properties: state.properties,
        subProperties: state.subProperties,
        description: state.description,
        address: state.address,
        guest: state.guest,
        amenities: state.amenities,
        vendorExtraDetails: state.vendorExtraDetails,
      };
  }
}
