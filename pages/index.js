import Layout from '../components/Layout';
import { Main } from '../components/Main';

export const Page = () => (
  <div>
    <h1>Calculadora CDB</h1>
    <Main />
  </div>
);

export default Layout(Page);