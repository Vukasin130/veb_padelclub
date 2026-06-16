import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productApiSlice'
const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            <section className="home-hero">
                <div className="hero-copy">
                    <span className="hero-kicker">Novi Sad padel rezervacije</span>
                    <h1>Rezervisi teren, trening ili opremu za sledeci mec</h1>
                    <p>
                        Pregledaj dostupnu ponudu kluba i slozi rezervaciju bez cekanja na poziv.
                    </p>
                </div>
                <div className="hero-panel">
                    <div>
                        <strong>5</strong>
                        <span>ponuda</span>
                    </div>
                    <div>
                        <strong>4.8</strong>
                        <span>ocena kluba</span>
                    </div>
                    <div>
                        <strong>300+</strong>
                        <span>rezervacija</span>
                    </div>
                </div>
            </section>

            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">Klupska ponuda</span>
                    <h2>Izaberi sta ti treba</h2>
                </div>
                <p>Tereni, treninzi, oprema i clanarine na jednom mestu.</p>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <Row className="g-4">
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default HomeScreen
