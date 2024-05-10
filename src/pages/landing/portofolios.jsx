import React from "react";
import "../../App.css";
import Wedding1 from "../../assets/wedding1.png";
import Wedding2 from "../../assets/wedding2.png";
import Wedding3 from "../../assets/wedding3.png";
import Wedding4 from "../../assets/wedding4.png";

const portfoliosData = [
    { image: Wedding1, alt: "Wedding N & R", title: "N & R" },
    { image: Wedding2, alt: "Wedding Dianne & Michael", title: "Dianne & Michael" },
    { image: Wedding3, alt: "Wedding Gabrielle & Simon", title: "Gabrielle & Simon" },
    { image: Wedding4, alt: "Wedding Zee & Adrian", title: "Zee & Adrian" }
];

export default function Portfolios() {
    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const portfoliosChunks = chunkArray(portfoliosData, 2);

    return (
        <div id="portofolios" className="container w-[1038px] mt-[55px] mx-[201px] pe-[28px] mb-[70px]" style={{ maxWidth: "73%" }}>
            <h2 className="roboto-medium text-xl text-[#90998B]" style={{ lineHeight: '28px' }}>Our portfolios</h2>
            {portfoliosChunks.map((chunk, index) => (
                <div key={index} className="flex space-x-[16px] mt-[16px]">
                    {chunk.map((portfolio, idx) => (
                        <div key={idx} className="relative">
                            <img src={portfolio.image} alt={portfolio.alt} className="w-[512px] h-[298px]" />
                            <div className="absolute top-[220px] w-full text-center">
                                <h3 className="roboto-regular text-sm text-[#D9D9D9]" style={{ lineHeight: '22px' }}>THE WEDDING OF</h3>
                                <h1 className="roboto-bold text-white text-2xl" style={{ lineHeight: '32px', letterSpacing: '-0.48px' }}>{portfolio.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
