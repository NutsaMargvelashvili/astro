import React from 'react';
import PageTemplate from '../components/common/PageTemplate'
import HeaderContainer from 'containers/HeaderContainer'
import AstrophotographyContainer from "../containers/AstrophotographyContainer";

const AstrophotographyPage = () => {
    return (
        <PageTemplate header={<HeaderContainer/>}>
            <AstrophotographyContainer/>
        </PageTemplate>
    );
};

export default AstrophotographyPage;