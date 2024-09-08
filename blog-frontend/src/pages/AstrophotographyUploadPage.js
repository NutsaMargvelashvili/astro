import React from 'react';
import PageTemplate from '../components/common/PageTemplate'
import HeaderContainer from 'containers/HeaderContainer'
import AstrophotographyUploadContainer from "../containers/AstrophotographyUploadContainer";

const AstrophotographyUploadPage = () => {
    return (
        <PageTemplate header={<HeaderContainer/>}>
            <AstrophotographyUploadContainer/>
        </PageTemplate>
    );
};

export default AstrophotographyUploadPage;