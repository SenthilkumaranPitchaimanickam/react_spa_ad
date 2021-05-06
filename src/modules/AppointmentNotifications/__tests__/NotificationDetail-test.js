import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import NotificationDetail from "../NotificationDetail";
import {
  
  NotificationDetails,
 
} from '../styles';
configure({ adapter: new Adapter() });
const location={notifications:{data:[ {
  "id": 1,
  "status": "Scheduled",
  "Date": "16-02-2021",
  "Time": "10 am",
  "ordernumber": 123456,
  "warehouse": "abc",
  "bay": "bay1",
  "read": false,
  "services": "Tire repair",
  "timestamp": 1612195049
},{
  "id": 2,
  "status": "Cancelled",
  "Date": "22-02-2021",
  "Time": "9 am",
  "ordernumber": 123789033,
  "warehouse": "DRFV",
  "bay": "bay2",
  "read": false,
  "timestamp": 1612194284
},]},
id:1}
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state:location
  })
}));
describe("Notification Detail", () => {
  
  beforeEach=()=>{
    jest.clearAllMocks();
  }

  it("renders", () => {
    
    const wrapper1=shallow(<NotificationDetail />);
    console.log(wrapper1.debug)
    expect(wrapper1.find('li')).toHaveLength(2);
  });
  
  
});