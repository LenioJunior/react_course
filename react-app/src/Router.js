import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  // <Provider store={store}>
  //   <BrowserRouter>
      // <CssBaseline />
      <App />
  //   </BrowserRouter>
  // </Provider>
);


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={rootPath} element={<IndexPage />} />

      <Route path={signinPath} element={<SignIn />} />
      <Route path={signupPath} element={<SignUp />} />
      <Route path={resetPasswordPath} element={<ResetPassword />} />
      <Route path={logoutPath} element={<Logout />} />

      <Route path='pages' element={<ConfirmAuthentication />}>
        <Route path={mapPagePath} element={<MapPage />} />

        <Route path={userPath} element={<ListUser />} />
        <Route path={userPath + '/register'} element={<RegisterUser />} />
        <Route path={userPath + '/register/:id'} element={<RegisterUser />} />

        <Route path={settingPath} element={<ListSetting />} />
        <Route path={settingPath + '/register'} element={<RegisterSetting />} />
        <Route path={settingPath + '/register/:id'} element={<RegisterSetting />} />

        <Route path={rolePath} element={<ListRole />} />
        <Route path={rolePath + '/register'} element={<RegisterRole />} />
        <Route path={rolePath + '/register/:id'} element={<RegisterRole />} />

        <Route path={reportPath} element={<ListReport />} />
        <Route path={reportPath + '/register'} element={<RegisterReport />} />
        <Route path={reportPath + '/register/:id'} element={<RegisterReport />} />

        <Route path={companyPath} element={<ListCompany />} />
        <Route path={companyPath + '/register'} element={<RegisterCompany />} />
        <Route path={companyPath + '/register/:id'} element={<RegisterCompany />} />

        <Route path={projectPath} element={<ListProject />} />
        <Route path={projectPath + '/register'} element={<RegisterProject />} />
        <Route path={projectPath + '/register/:id'} element={<RegisterProject />} />

        <Route path={executionPath} element={<ListExecution />} />
        <Route path={executionPath + '/register'} element={<RegisterExecution />} />
        <Route path={executionPath + '/register/:id'} element={<RegisterExecution />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};