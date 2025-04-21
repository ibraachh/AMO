import React from "react";
import { motion } from "framer-motion";
import { opacityVariant } from "../../utils/Animation";

interface HeadingType {
  text: string;
  paragraph?: string;
}

const Heading: React.FC<HeadingType> = ({ text, paragraph }) => {
  return (
    <motion.div
      variants={opacityVariant}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="mt-12 md:mt-16"
    >
      <h4 className="text-[46px] max-md:text-[24px] relative w-max !text-white font-semibold max-sm:!text-[18px] media font-open-sans mb-[21px] transition-all duration-200">
        {text}
      </h4>
      {paragraph && (
        <p className="text-white desccc mt-6 text-[14px]">{paragraph}</p>
      )}
    </motion.div>
  );
};

export default Heading;
