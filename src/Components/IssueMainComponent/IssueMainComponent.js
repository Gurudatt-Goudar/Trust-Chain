import React from 'react';
import PortalComponent from '../PortalComponent/PortalComponent';
import IssuerComponent from '../IssuerComponent/IssuerComponent';

function IssueMainComponent() {
  return (
    <div>
        <PortalComponent value={'issue'}/>
        <IssuerComponent/>
    </div>
  );
}

export default IssueMainComponent;
