import { FishCatch } from "./FishCatch"

export type AppState = {
  "user": {
    "name": string,
    "userLat": number,
    "userLng": number,
    "markerLat": number,
    "markerLng": number
  },
  "theme": {
    "darkTheme": boolean,
    "tileUrl": string
  },
  "data": {
    "filterOnSpecies": string,
    "searchResults": FishCatch[],
    "fetchError": any,
    "isLoading": boolean,
    "fishCatches": FishCatch[],
    "filterOnUser": string,
    "filterOnWeightMin": number,
    "filterOnWeightMax": number,
    "filterOnLengthMin": number,
    "filterOnLengthMax": number,
    "filterOnDateFrom": string,
    "filterOnDateTo": string,
    "sortBy": string,
    "sortOrder": string,
    "API_URL": string
  }
}
