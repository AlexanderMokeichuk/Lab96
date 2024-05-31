import Layout from "./UI/components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Register from "./features/Users/Register";
import Login from "./features/Users/Login";
import NotFound from "./UI/components/NotFound/NotFound";
import Cocktails from "./features/Cocktails/Cocktails";
import ComponentPoliceman from "./UI/components/ComponentPoliceman/ComponentPoliceman";
import MyCocktails from "./features/Cocktails/MyCocktails";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Cocktails/>)}/>
        <Route path={"/my-cocktails"} element={(
          <ComponentPoliceman>
            <MyCocktails />
          </ComponentPoliceman>)}
        />
        <Route path={"/register"} element={(<Register/>)}/>
        <Route path={"/login"} element={(<Login/>)}/>
        <Route path={"*"} element={(<NotFound/>)}/>
      </Routes>
    </Layout>
  );
}

export default App;
