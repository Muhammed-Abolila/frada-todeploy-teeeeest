"use client";
import Image from "next/image";
import "./Footer.css";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import bgImage from "../../public/Images/new/about/bg-1.jpg";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pb-20">
      <div className="top">
        <div className="content">
          <div className="right">
            <h5 className="title">ساعات العمل</h5>
            <p>طوال أيام الأسبوع</p>
            <p>من 9 ص - إلي 11:30 ص</p>
            <p>من 3:30 م - إلي 11:30 م</p>
          </div>
          <div className="left">
            <h5 className="title">كيف تصل إلينا</h5>
            <p>طريق أنس ابن مالك، الصحافة، الرياض 13321</p>
            <p className="tel">
              <a href="tel:+966557665585">+966-55-766-5585</a>
              <FaPhoneAlt />
            </p>
          </div>
        </div>
        <div className="image-container">
          <Image src={bgImage} alt="متجر فرادا السعودية" />
        </div>
      </div>

      <div className="footer-bottom p-10">
        <div className="footer-social-links">
          <h6>تابعنا</h6>
          <ul>
            <li>
              <Link href="https://www.facebook.com/fradaksa" target="_blank" >
              <FaFacebookF className="text-black  "/>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/fradaksa/?igsh=YzljYTk1ODg3Zg%3D%3D"
                target="_blank"
              >
                   <IoLogoInstagram className="text-black"/>
              </Link>
            </li>
            <li>
              <Link href="https://x.com/FradaKSA?s=20" target="_blank">
              <FaXTwitter className="text-black"/>
              </Link>
            </li>
            <li>
              <Link href="https://vm.tiktok.com/ZMMy4PARk/" target="_blank">
              <FaTiktok className="text-black"/>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.snapchat.com/add/frada-ksa/highlight/775f6d76-3ce0-40f9-9438-18add20663ac"
                target="_blank"
              >
                <FaSnapchatGhost className="text-black" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="policies">
          <h6>البنود القانونية</h6>
          <ul>
            <li>
              <Link href="/terms-policies/terms-conditions-site">
                <p>شروط وأحكام الموقع</p>
              </Link>
            </li>
            <li>
              <Link href="/terms-policies/terms-conditions-sale">
                <p>شروط وأحكام البيع</p>
              </Link>
            </li>
            <li>
              <Link href="/terms-policies/privacy-policy">
                <p>سياسة الخصوصية</p>
              </Link>
            </li>
            <li>
              <Link href="/terms-policies/cookie-policy">
                <p> (Cookies) سياسة ملفات الإرتباط</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="know-us">
          <h6>تعرف علينا أكثر</h6>
          <ul>
            <li>
              <Link href="/about">
                <p>من نحن</p>
              </Link>
            </li>
            <li>
              <Link href="">
                <p>وظائف فرادا</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="service">
          <h6>بخدمتكم</h6>
          <ul>
            <li>
              <Link href="/services/contact-us">
                <p>تواصل معنا</p>
              </Link>
            </li>
            <li>
              <Link href="/services/shipping-info">
                <p>معلومات الشحن</p>
              </Link>
            </li>
            <li>
              <Link href="/services/returns-and-refunds">
                <p>الإستبدال والإسترجاع</p>
              </Link>
            </li>
            <li>
              <Link href="/services/faq">
                <p> (FAQ) الأسئلة الأكثر شيوعاََ</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6>بخدمتكم</h6>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link href="/services/contact-us">
                  <p>تواصل معنا</p>
                </Link>
              </li>
              <li>
                <Link href="/services/shipping-info">
                  <p>معلومات الشحن</p>
                </Link>
              </li>
              <li>
                <Link href="/services/returns-and-refunds">
                  <p>الإستبدال والإسترجاع</p>
                </Link>
              </li>
              <li>
                <Link href="/services/faq">
                  <p> (FAQ) الأسئلة الأكثر شيوعاََ</p>
                </Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h6>تعرف علينا أكثر</h6>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link href="/about">
                  <p>من نحن</p>
                </Link>
              </li>
              <li>
                <Link href="">
                  <p>وظائف فرادا</p>
                </Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h6>البنود القانونية</h6>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link href="/terms-policies/terms-conditions-site">
                  <p>شروط وأحكام الموقع</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-policies/terms-conditions-sale">
                  <p>شروط وأحكام البيع</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-policies/privacy-policy">
                  <p>سياسة الخصوصية</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-policies/cookie-policy">
                  <p> (Cookies) سياسة ملفات الإرتباط</p>
                </Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="footer-social-links small-social-links">
        <h6>تابعنا</h6>
         <ul>
            <li>
              <Link href="https://www.facebook.com/fradaksa" target="_blank" >
              <FaFacebookF className="text-black  "/>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/fradaksa/?igsh=YzljYTk1ODg3Zg%3D%3D"
                target="_blank"
              >
                   <IoLogoInstagram className="text-black"/>
              </Link>
            </li>
            <li>
              <Link href="https://x.com/FradaKSA?s=20" target="_blank">
              <FaXTwitter className="text-black"/>
              </Link>
            </li>
            <li>
              <Link href="https://vm.tiktok.com/ZMMy4PARk/" target="_blank">
              <FaTiktok className="text-black"/>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.snapchat.com/add/fradaksa?sender_web_id=6f5594f6-1beb-4b7d-bdb4-ba7c2318498e&device_type=android&is_copy_url=true"
                target="_blank"
              >
                <FaSnapchatGhost className="text-black" />
              </Link>
            </li>
          </ul>
      </div>
      <h6 className="rights pb-10">جميع الحقوق محفوظة لشركة فرادا 2023</h6>
    </footer>
  );
}
