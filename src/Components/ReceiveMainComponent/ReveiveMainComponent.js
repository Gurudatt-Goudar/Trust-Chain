import React from 'react';
import PortalComponent from '../PortalComponent/PortalComponent';
import ReceiverComponent from '../ReceiverComponent/ReceiverComponent';

function ReceiveMainComponent() {
  return (
    <div>
        <PortalComponent value={'receive'}/>
        <ReceiverComponent/>
    </div>
  );
}

export default ReceiveMainComponent;

