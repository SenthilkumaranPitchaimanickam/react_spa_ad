import React,{useEffect,useRef} from 'react';
import {
  DetailContainer,
  NotificationDetails,
  NotificationTitle,
  NotificationSubTitle,
  NotificationContent,
  NotificationIcon,
  NotificationTime
} from './styles';
import moment from 'moment';
import {useLocation} from 'react-router-dom';
import { faCalendarWeek,faInfoCircle,faMapMarker, } from '@fortawesome/free-solid-svg-icons';
import './notification.css';
const NotificationDetail = (props) => {
  const myRefs=useRef([]);
  const location=useLocation();

  const notifications=location.state.notifications.data;
  console.log(location);

// Converting timestamp to MM/DD/YYYY format
const getWhen = timestamp => {
  let when = moment.unix(timestamp).format("MM/DD/YYYY");
  return when;
}

// Calculating day difference
const getDayDiff=timestamp=>{
  let dayDiff=moment.unix(timestamp).fromNow();
  return dayDiff;
}
const getMessageContent=(notification)=>{
  if(notification.status==="SCHEDULED"){
    return `make appointment at${notification.Time}`
  }

}

//  useEffect(()=>{
//    //Scroll to the list item 
//   const id=props.location.id;
//   myRefs.current[id].scrollIntoView({behavior: 'smooth',})
// },[props.location.id]);


  return (
    <section class="calendarBoxSection">
    <div class="calendarWrapper">
      <div class="calenderMonthViewBox notifContentWrapper"> 
        

        <div class="NotifContentBox" >
          <div class="notifPageTitle nav nav-tabs" id="myTab" role="tablist"> <a class="notifInner active" id="notificationTab"  data-toggle="tab" href="#dashboard/notification-detail" role="tab" aria-controls="notifications" aria-selected="true">Notifications</a></div>
          <div class="tab-content" id="myTabContent">
			  
			
            <div class="notifTabContentBox  tab-pane fade active show" id="notifications" role="tabpanel" aria-labelledby="notificationTab">
            {notifications?notifications.map((notification, index) =>
             <li class="notifItemBox" key={index}>
             <div class="notifItemTitle">APPOINTMENT {notification.status}</div>
             <div class=""><span class="memberName">Jesson Born</span> {getMessageContent(notification)}</div>
           </li>
           ):null}
             
            </div>
			  
		
           
          </div>
        </div>
      </div>
    </div>
  </section>
    // <DetailContainer >
    //   {notifications?notifications.map((notification, index) =>
    //   <NotificationDetails ref={(el)=>(myRefs.current[index]=el)}>
    //     <NotificationTime>{getDayDiff(notification.timestamp)} {getWhen(notification.timestamp)}</NotificationTime>
    //     <NotificationTitle>
    //     <span>APPOINTMENT  {notification.status}</span>
    //     </NotificationTitle>
    //     <NotificationSubTitle>
    //     Your Appointment details
    //     </NotificationSubTitle>
    //     <NotificationContent><NotificationIcon icon={faInfoCircle}/>{notification.services}</NotificationContent>
    //     <NotificationContent><NotificationIcon icon={faCalendarWeek}/> {notification.Date}  {notification.Time}</NotificationContent>
    //     <NotificationContent><NotificationIcon icon={faMapMarker}/>{notification.warehouse},{notification.bay}</NotificationContent>
    //   </NotificationDetails>)
    // :null}
    // </DetailContainer>
  );
};

export default NotificationDetail;
