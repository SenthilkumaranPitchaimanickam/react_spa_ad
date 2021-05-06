/* Notification Component Styles */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NotificationContainer = styled.div`
.notification-container {
    /* margin-right: 15px; */
    margin-right: 149px;
    text-align: end;
    
}

.popover-header {
    color:black;
}
/* Notifications */

.notification {
    display: inline-block;
    position: relative;
    /* padding: 6px; */
    /* // background: #282828; */
    border-radius: 45px;
    /* font-size: 1.3em; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    cursor: pointer;
}

.notification::before, 
.notification::after {
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.notification::before {
    display: block;
    font-family: "FontAwesome";
    transform-origin: top center;
}

.notification::after {
    font-family: Arial;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    top: -9px;
    right: -15px;
    padding: 5px 8px;
    line-height: 100%;
    border: 2px #fff solid;
    border-radius: 60px;
    background: #db3434;
    opacity: 0;
    content: attr(data-count);
    opacity: 0;
    transform: scale(0.5);
    transition: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
}

.notification.notify::before {
    animation: ring 1.5s ease;
}
a{
    color:darkblue
}

.notification.show-count::after {
    transform: scale(1);
    opacity: 1;
}

.notification-info-panel {
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
}

.notification-info-panel .notification-message {
    list-style: none;
    padding: 4px;
    background-color: #ebebeb;
    margin-bottom: 3px;
    border: 1px solid #ececec;
    border-radius: 8px;
}

.notification-info-panel .notification-message .timestamp {
    margin-bottom: 2px;
    font-size: 13px;
    font-weight: 600;
}

.notification-info-panel .notification-message .content {
    font-size: 17px;
}

.notification-info-panel .notification-message.unread {
    background-color:#adb5bd;
    color: #FFFFFF;
}
.popover {
    width: 280px;
}
`;

export const DetailContainer = styled.div`

`;

export const NotificationDetails = styled.li`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: start;
width: 700px;
//   /* min-height: 600px; */
background: #f8f9fa;
//   text-align: center;
margin: 10px auto 10px auto;
//   /* border-radius: 10px; */
//   padding-bottom: 32px;
`;

export const NotificationTitle = styled.div`
font-size: 14px;
color: #2a6293;
// font-weight: bold;
`;
export const NotificationSubTitle = styled.span`
font-size:0.8rem;
text-decoration:underline;
display: flex;
margin-left: 38px;
margin-bottom: 16px;
flex-direction:row;
`;
export const NotificationContent = styled.span`
font-size:0.8rem;
margin-left: 50px;
flex-direction: row;
display: flex;
margin-bottom:10px;

`;

export const NotificationIcon = styled(FontAwesomeIcon)`
margin-right:20px;
`;
export const NotificationTime = styled.div`
font-size: 0.8rem;
margin-top: 0px;
text-align: end;
`;