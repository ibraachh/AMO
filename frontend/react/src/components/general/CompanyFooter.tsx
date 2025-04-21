import React from "react";
import Frame1 from "../../assets/image/frame-1.svg";
import Frame2 from "../../assets/image/frame-1.svg";
import Frame3 from "../../assets/image/frame-1.svg";
import { CompanyCardType } from "../companies/AmoTrade";

interface CompanyFooter {
  companyCards: CompanyCardType[];
}

const CompanyFooter: React.FC<CompanyFooter> = ({ companyCards }) => {
  const imgArr = [Frame1, Frame2, Frame3];
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 my-20">
      {companyCards &&
        companyCards.map((company, index) => (
          <div
            key={company.id}
            style={{
              borderWidth: "15px",
              borderStyle: "solid",
              borderImage: `url(${imgArr[index]}) 15 fill`,
            }}
            className="flex items-center justify-center z-0 h-[300px] text-white relative custom-border-image-1 card-1"
          >
            <p className="xl:text-[14px] md:text-[10px] sm:text-[10px] max-sm:text-[12px] leading-6 max-md:leading-6 max-sm:leading-4">
              {company.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export default CompanyFooter;
