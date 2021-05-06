import {sampleUrl, sampleUrl1} from "../../services/urls";

export default {
  init(client) {
    const makeRequest = client;
    return {
      getDetails() {
        return makeRequest.get(sampleUrl())
          .then((response) => response)
          .catch((error) => error);
      },
      getDetails1() {
        return makeRequest.get(sampleUrl1())
          .then((response) => response)
          .catch((error) => error);
      },
    };
  },
};