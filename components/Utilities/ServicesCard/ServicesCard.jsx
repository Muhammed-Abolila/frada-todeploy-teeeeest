import Link from "next/link";
import "./ServicesCard.css";
import Image from "next/image";
import { motion } from "framer-motion";
const ServicesCard = ({ link, img, head, text }) => {
  return (
    <motion.div
      className="services-card"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/category/${link}`}
        style={{ textDecoration: "none", color: "unset" }}
      >
        <div className="img-container">
          <Image loading="lazy" src={img} alt={head} />
        </div>
        <motion.div className="caption">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1,transition:{delay:.3,duration:.9}}}
          >
            {text}
          </motion.span>
          <motion.h6
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1,transition:{delay:1,duration:.9}}}
          >
            {head}
          </motion.h6>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ServicesCard;
