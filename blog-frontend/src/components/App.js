import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PostPage, PostListPage, EditorPage, NotFoundPage, AstroMapPage, AstrophotographyPage, AstrophotographyPhotoPage, AstrophotographyUploadPage } from 'pages';
import LoginContainer from 'containers/LoginContainer'
import RegisterContainer from 'containers/RegisterContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";

class App extends Component {

  componentDidMount() {
    const { AuthActions } = this.props;
    AuthActions.getUser();
  }

  render() {
    return (
        <div>
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Switch>
            <Route path="/astromap" component={AstroMapPage} />
            <Route path="/astrophotography/upload" component={AstrophotographyUploadPage} />
            <Route path="/astrophotography" component={AstrophotographyPage} />
            <Route path="/photo/:id" component={AstrophotographyPhotoPage} />
            <Route path="/pages/:page" component={PostListPage} />
            <Route path="/posts/:id" component={PostPage} />
            <Route path="/editor/:id?" component={EditorPage} />
            <Route path="/" component={PostListPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    );
  }
};

export default connect(
    state => ({
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch)
    })
)(App);