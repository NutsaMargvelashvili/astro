import React from 'react';
import PageTemplate from '../components/common/PageTemplate'
import AstroMapContainer from '../containers/AstroMapContainer'
import HeaderContainer from 'containers/HeaderContainer'

const AstroMapPage = () => {
    return (
        <PageTemplate header={<HeaderContainer/>}>
            <AstroMapContainer/>
        </PageTemplate>
    );
};

export default AstroMapPage;