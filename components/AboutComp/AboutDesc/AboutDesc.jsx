import "./AboutDesc.css";
import { Col, Row } from "react-bootstrap";
export default function AboutDesc(){
    return(
        <div className="frada-descrition">
          <Row>
            <Col xs={{span:10 , offset:1,order:2}} md={{ span: 6,offset:0,order:1 }}>
              <div className="description">
                <q>
                  تعد فرادا علامة تجارية رائدة في مجال الأحذية والجزم والأزياء
                  الخليجية والعطور والإكسسوارات الرجالية في المملكة العربية
                  السعودية. تتميز بتصاميمها الأنيقة وجودتها الممتازة، وتلبي
                  احتياجات الرجال الذين يسعون للتميز والأناقة في مظهرهم الشخصي
                  تعبر فرادا عن الرؤية والرسالة المستوحاة من أناقة وثقة
                  الرجل العربي الخليجي مواكبةً لعصر الموضة
                </q>
              </div>
            </Col>
            <Col xs={{span:10 , offset:1,order:1}} md={{ span: 6 ,offset:0,order:2}}>
              <div className="image"></div>
            </Col>
          </Row>
        </div>
    )
}