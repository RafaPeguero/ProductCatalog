import { Container, Nav, Navbar } from 'react-bootstrap';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <>
     <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Prueba técnica</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#features">Productos</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
      <Container>
        <ProductsList />
      </Container>
    </>
  );
}

export default App;
