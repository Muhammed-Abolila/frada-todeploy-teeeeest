import SocilaLinks from '../../Utilities/SocialLinks/SocilaLinks';
import { Container, Row, Col } from 'react-bootstrap';
export default function Up() {
    return (
        <div className="navbar-top-content">
            <Container>
                <Row>
                    <Col>
                        <div className="phone-number d-flex">
                           <span className='icon-phone'></span>
                            <p>+966-55-766-5585</p>
                            <p>اتصل بنا اليوم</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="envelop d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.022" height="21.353" viewBox="0 0 24.022 21.353">
                                <path id="Icon_awesome-mail-bulk" data-name="Icon awesome-mail-bulk" d="M6.673,18.684A5.059,5.059,0,0,1,4,17.349c-2.669-1.868-3.47-2.536-4-2.936v5.605a1.335,1.335,0,0,0,1.335,1.335H12.011a1.335,1.335,0,0,0,1.335-1.335V14.413c-.534.4-1.335,1.068-4,2.936A5.059,5.059,0,0,1,6.673,18.684Zm5.338-8.007H1.335A1.335,1.335,0,0,0,0,12.011v.667c1.068.8.934.8,4.8,3.6.4.267,1.2,1.068,1.868,1.068s1.468-.8,1.868-.934c3.87-2.8,3.737-2.8,4.8-3.6v-.8A1.335,1.335,0,0,0,12.011,10.676Zm10.676-4H9.342A1.335,1.335,0,0,0,8.007,8.007V9.342h4a2.673,2.673,0,0,1,2.657,2.411l.012-.009v5.605h8.007a1.335,1.335,0,0,0,1.335-1.335V8.007A1.335,1.335,0,0,0,22.687,6.673Zm-1.335,5.338H18.684V9.342h2.669Zm-14.68-4A2.672,2.672,0,0,1,9.342,5.338h9.342v-4A1.335,1.335,0,0,0,17.349,0H4A1.335,1.335,0,0,0,2.669,1.335V9.342h4Z" fill="#fff" />
                            </svg>
                            <p>تابع كل جديد من خلال الإشتراك في النشرة الإخبارية</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="social-links-container">
                            <SocilaLinks />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
