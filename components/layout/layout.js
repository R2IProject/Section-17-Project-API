import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../ui/notification';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification>
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        </Notification>
      )}
    </Fragment>
  );
}

export default Layout;
