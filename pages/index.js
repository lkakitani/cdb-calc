import Layout from '../components/Layout';
import { Form } from '../components/Form';

export const Page = () => (
  <div>
    <h1>Calculadora CDB</h1>
    <Form />
  </div>
);

export default Layout(Page);