import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import LayoutComponent from './components/Layout/Layout';
import Blogs from './components/Blogs/Blogs';
import Blog from './components/Blog/Blog';
import CreateBlog from './components/CreateBlog/CreateBlog';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <LayoutComponent>
          <Route exact path="/" render={() => <Redirect to="/blogs" />} />
          <Route exact path="/blogs" component={Blogs} />
          <Route path="/blogs/:blogId" component={Blog} />
          <Route exact path="/createBlog" component={CreateBlog} />
        </LayoutComponent>
      </Switch>
    </Router>
  );
}

export default App;
