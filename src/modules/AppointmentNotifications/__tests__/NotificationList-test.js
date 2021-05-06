import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import NotificationList from "../NotificationsList";
import pageInterface from '../../../services/pageInterface';
configure({ adapter: new Adapter() });
 
jest.mock('../../../services/pageInterface.js', 
() => ({ init: jest.fn() })
);
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe(" Appointment Notifications", () => {
  
  beforeEach=()=>{
    jest.clearAllMocks();
  }

  it("renders", () => {
    shallow(<NotificationList />);
  });

  it("testing overlay onclick", () => {
    const e={preventDefault:()=>{}}
    jest.spyOn(e,'preventDefault')
    const wrapper1=shallow(<NotificationList/>)
    wrapper1.find('#icon').at(0).simulate("click",e);
    expect( wrapper1.find('#icon').simulate("click",e)).toBeTruthy;
    expect(e.preventDefault).toBeCalled();
    expect(wrapper1.find('li')).toBeDefined();
  });

  it("displays notifications", () => {
    const getSpy = jest.spyOn(React, 'useEffect').mockImplementation( f => f());
    const getSpy1 = jest.spyOn(pageInterface, 'init');
    getSpy1.mockImplementation(() => ({ notificationpage: {
        fetchAllNotifications: () => Promise.resolve({data: [  {
            "id": 1,
            "status": "Scheduled",
            "Date": "16-02-2021",
            "Time": "10 am",
            "ordernumber": 123456,
            "warehouse": "abc",
            "bay": "bay1",
            "read": true,
            "services": "Tire repair",
            "timestamp": 1612195049
          }]})
      } }));

    const wrapper = shallow(<NotificationList />);
    expect(getSpy).toBeCalled();
    expect(getSpy1).toBeCalled();
    
    setImmediate(()=>{
      wrapper.update();
      expect(wrapper.find("li")).toHaveLength(1);
      expect( wrapper.find('#add').at(0).simulate("click")).toBeTruthy;
      const getSpy2 = jest.spyOn(pageInterface, 'init');
      getSpy2.mockImplementation(() => ({ notificationpage: {
        updatePost: () => Promise.resolve({data: {
          "id": 2,
          "status": "Cancelled",
          "Date": "22-02-2021",
          "Time": "9 am",
          "ordernumber": 123789033,
          "warehouse": "DRFV",
          "bay": "bay2",
          "read": true,
          "timestamp": 1612194284
        }})

    } }));
    expect(getSpy2).toBeCalled();
    })
  });

 

  
});