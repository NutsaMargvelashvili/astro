import React from 'react';
import PageTemplate from '../components/common/PageTemplate'
import HeaderContainer from 'containers/HeaderContainer'
import AstrophotographyPhotoContainer from "../containers/AstrophotographyPhotoContainer";

const AstrophotographyPhotoPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate header={<HeaderContainer/>}>
            <AstrophotographyPhotoContainer id={id}/>
        </PageTemplate>
    );
};

export default AstrophotographyPhotoPage;