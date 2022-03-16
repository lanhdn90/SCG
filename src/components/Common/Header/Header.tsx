import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/Login/authSlice';
import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import i18n from 'translation/i18next';
import logo_vietnamese from '../../../IMG/230px-Flag_of_North_Vietnam_(1955–1976).svg.png';
import logo_english from '../../../IMG/english.png';
// import i18n from "translation/i18next.ts";
import style from './Header.module.scss';
export interface HeaderComponentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function HeaderComponent({ visible, setVisible }: HeaderComponentProps) {
  const [language, setLanguage] = useState(true);
  // const [isShowModal, setIsShowModal] = useState(0);
  const dispatch = useAppDispatch();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(!language);
  };
  useEffect(() => {
    // const paramOne =
    //   localStorage.getItem("isValueInverter").toLowerCase() === "true";
    // setValueInverter(paramOne);
    // const paramTwo =
    //   localStorage.getItem("isValueSidebar").toLowerCase() === "true";
    // setValueSidebar(paramTwo);
    // setValueNav(parseInt(localStorage.getItem("isValueNav")));
  }, []);

  //   const openNotificationWithIcon = (type: any, value: any) => {
  //     notification[type]({
  //       message: value,
  //     });
  //   };

  //   useEffect(() => {
  //     if (putLoading) {
  //       openNotificationWithIcon("success", "Update profile successfully!");
  //       restProfile();
  //     }
  //   }, [putLoading]);

  const renderLanguage = () => {
    if (language) {
      return (
        <div onClick={() => changeLanguage('vi')}>
          <img
            src={logo_english}
            alt="logo_english"
            height="25px"
            width="25px"
            style={{ borderRadius: '50%', cursor: 'pointer' }}
          />
        </div>
      );
    } else {
      return (
        <div onClick={() => changeLanguage('en')}>
          <img
            src={logo_vietnamese}
            alt="logo_vietnamese"
            height="25px"
            width="25px"
            style={{ borderRadius: '50%', cursor: 'pointer' }}
          />
        </div>
      );
    }
  };

  //   const contentNotification = (index, item) => (
  //     <div className="item-timeline">
  //       <div className="item-content-timeline">
  //         <div className="time-item-timeline">
  //           <div>
  //             <FcHighPriority />
  //           </div>
  //           {item.timeWarning} - {item.contentWarning}
  //         </div>
  //         <div className="address-notification">
  //           <div className="icon-warning"></div>
  //           {item.namePlant} > {item.nameInverter}
  //         </div>
  //       </div>
  //       <div
  //         className="btn-clear-item-timeline"
  //         onClick={() => clearItemNotification({ notificationList, index })}
  //       >
  //         X
  //       </div>
  //     </div>
  //   );

  //   const notificationShow = (
  //     <div
  //       style={{
  //         backgroundColor: "#fff",
  //         padding: "10px",
  //         borderRadius: "10px",
  //       }}
  //     >
  //       <div className="dropdown-arrow"></div>
  //       <div className="title-notification">
  //         <div className="title-content">
  //           <i>
  //             <FcAbout />
  //           </i>
  //           <p>SOLAR FARM - TODAY</p>
  //         </div>
  //         <div className="btn-clear" onClick={() => clearAllNotification()}>
  //           Clear
  //         </div>
  //       </div>
  //       <Timeline>
  //         <Timeline.Item
  //           dot={<ClockCircleOutlined className="timeline-clock-icon" />}
  //           color="red"
  //         >
  //           Ngày 14/7/2021
  //         </Timeline.Item>
  //         {notificationList.map((item, index) => (
  //           <Timeline.Item key={index}>
  //             {contentNotification(index, item)}
  //           </Timeline.Item>
  //         ))}
  //       </Timeline>
  //       {notificationList.length > 0 ? (
  //         <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //           <Pagination size="small" total={50} />
  //         </div>
  //       ) : null}
  //     </div>
  //   );

  return (
    <>
      <div className={style.header_container}>
        <div className={style.left_navbar}>
        </div>
        <div className={style.right_navbar}>
          {renderLanguage()}
          <div className={style.iconMenu}>
            <FaUserAlt
              style={{
                fontSize: '18px',
                color: '#fff',
              }}
            />
            <div className={style.dropdown_user_info}>
              <div className={style.dropdown_arrow}></div>
              <div className={style.item_user_info} 
              // onClick={() => setIsShowModal(1)}
              >
                <UserOutlined />
                <div>Profile</div>
              </div>
              <div className={style.item_user_info} onClick={() => dispatch(authActions.logout())}>
                <LoginOutlined />
                <div>Sign out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
