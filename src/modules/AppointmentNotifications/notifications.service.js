import { fetchNotificationsUrl,fetchNotificationUrl } from "../../services/urls";

export default {
  init(client) {
    const makeRequest = client;
    return {
      fetchAllNotifications() {
        return makeRequest.get(fetchNotificationsUrl())
          .then(response => response)
          .catch(error => error);
      },
      updatePost(id, reqData) {
        return makeRequest.put(fetchNotificationUrl(id), reqData)
          .then((response) => response)
          .catch((error) => error);
      },
    };
  },
};
