import { Switch, Route } from 'react-router-dom';

//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss'
import MainLayout from './Layout/MainLayout';
import HomepageLayout from './Layout/HomepageLayout';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path='/registration' render={
            () => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }/>
        </Switch>
    </div>
  );
}

export default App;
