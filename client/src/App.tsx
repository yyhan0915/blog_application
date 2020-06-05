import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import './App.css';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
	return (
		<>
			<Helmet>
				<title>REACTERS</title>
			</Helmet>
			<Route component={PostListPage} path={['/@:username', '/']} exact />
			<Route component={LoginPage} path='/login' />
			<Route component={RegisterPage} path='/register' />
			<Route component={WritePage} path='/write' />
			<Route component={PostPage} path='/@:username/:postId' />
		</>
	);
}

export default App;
