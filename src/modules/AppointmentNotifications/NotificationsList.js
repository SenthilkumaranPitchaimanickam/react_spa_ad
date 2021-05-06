import React, { useState,useEffect, useRef } from 'react';
import pageInterface from '../../services/pageInterface';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment';
import {Link,BrowserRouter as Router,
	useRouteMatch,
	useHistory} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//     NotificationContainer
//   } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBell } from '@fortawesome/free-solid-svg-icons';
import './notification.css';
function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
  
          handler(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
const NotificationList = () => {
    const history = useHistory();
	//let { path, url } = useRouteMatch();

    const services = pageInterface.init();
    moment.locale(navigator.languages[0].toLowerCase());

    // State variables
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [messageCount,showMessageCount]=useState(0);
    const [showCount,setShowCount]=useState(false);
   const [open,setOpen]=useState(false);
    // Useref for the overlay
    const ref = useRef(null);
    const key ='timestamp';
    const heading ='Notification Alerts';
    const showDate = true;
    useOnClickOutside(ref, () => setOpen(false));
    const menuClass=`notificationsBox dropdown-menu dropdown-menu-right ${open?"show":" "}`;
    React.useEffect(() => {
        // Api call to get notifications on page load
        function fetchData() {
            try {
                services.notificationpage.fetchAllNotifications().then((data) => {
                    const newdata=data.data;
                    for(let i=0;i<newdata.length;i++){
                        if(newdata[i].read===false){
                            showMessageCount(prevState=>prevState+1);
                        }
                    }
                    setData(newdata);
                    setShowCount(true);
              });
              } catch (error) {
              
              }
          }
          fetchData();
         
    }, []);
   
   

    // Converting timestamp to MM/DD/YYYY format
    const getWhen = timestamp => {
        let when = moment.unix(timestamp).format("MM/DD/YYYY");
        return when;
    }

    // Calculating the day difference
    const getDayDiff=timestamp=>{
        let dayDiff=moment.unix(timestamp).fromNow();
        return dayDiff;
    }
 

    // Function to call api to update the read status of notication
    const setUnreadCount=(id,index)=>{
        
        history.push({
			pathname: `/dashboard/notification-detail`,
            state:data
	
		});
        try {
            let reqData = data[index];
            reqData.read = true;
            services.notificationpage.updatePost(id, reqData).then((response) => {
                showMessageCount(0)
                return data;
            });
        } catch (error) {
           
        }
    
    }
    const toggleOpen=(e)=>{
        e.preventDefault();
        setOpen(!open);
        setTarget(e.target);
    }
return (
    <div class="dropdown">
        <div >
        <div className="notificationIcon headerRightIconBox notificationBell dropdown-toggle"  id="icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e)=>toggleOpen(e)}> <FontAwesomeIcon icon={faBell}/> </div>
        </div>
        <div className={menuClass} aria-labelledby="notificationDropdown" ref={ref} >
                <div class="notifTitle">Notifications </div>
                <ul class="notifItemsBox">
                {data.length > 0 ?
                                data.map((message, index) =>
                                    <li id="add" className= {message.read ? 'notification-message' : 'notification-message unread'} onClick={()=>setUnreadCount(message.id,index)}
                                        key={index}
                                    >
                                        <div className="timestamp">
                                            <span>{getDayDiff(message[key])}</span>
                                            {showDate && <span>{' ('}{getWhen(message[key])}{')'}</span>}
                                        </div>
                                        {/* <Link to={{pathname:`/notification-detail`,notifications:{data},id:index}}> */}
                                            <div className="content"  >
                                                APPOINTMENT {message.status}
                                            </div>
                                        {/* </Link> */}
                                    </li>
                                    
                                ) :
                                <>
                                    <div className="nodata">No Notifications found!</div>
                                </>}
                </ul>
                <div >  {(data.length!==0)?
                <a href class="viewAll" onClick={()=> history.push({pathname: `/dashboard/notification-detail`,state:data})}>View More</a>:null}</div>
              </div>
      
    </div>
)
};

export default NotificationList;