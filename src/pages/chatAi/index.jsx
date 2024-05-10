import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ChatAi() {
    const [userName, setUserName] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    const answerData = {
        "paket tersedia": "Tersedia 3 macam paket yaitu intimate, seaside, dan grand wedding",
        "Royal Venture": "Royal Venture adalah mitra pernikahan Anda yang sempurna, menawarkan tiga paket eksklusif yang mencakup segalanya untuk memastikan hari istimewa Anda berjalan mulus. Dari dekorasi istana hingga layanan fotografi yang berkelas, kami mengurus segalanya. Pilihlah paket yang sesuai dengan gaya dan anggaran Anda, dan nikmati momen berharga Anda di salah satu dari tiga lokasi yang indah dan berbeda yang kami sediakan. Jadikan pernikahan Anda mewah dan tak terlupakan dengan bantuan Royal Venture",
        "berapa intimate": "Paket Intimate Wedding yang berlokasi di Malang, dirancang untuk 30 orang dengan biaya Rp. 35.000.000.",
        "berapa seaside": "Paket Seaside Elegance Wedding yang berlokasi di pesisir pantai Pulau Bali, dirancang untuk 100 orang dengan biaya Rp. 210.000.000.",
        "berapa grand": "Paket Grand Wedding yang berlokasi di Jakarta Selatan, dirancang untuk 600 orang dengan biaya Rp. 455.000.000.",
        "lokasi vanue": "Untuk informasi vanue, dapat melakukan reservasi untuk pembahasan lebih lanjut.",
        "menambah reservasi": "Untuk melakukan reservasi, silakan isi formulir reservasi di halaman home kami, lalu pilih menu reservasi pada bagian atas.",
        "batal reservasi": "Jika ingin melakukan pembatalan reservasi dapat menuju halaman history untuk pengajuan pembatalan dengan klik Cancelled pada reservasi yang ingin dibatalkan.",
        "ubah reservasi": "Jika ingin melakukan perubahan reservasi dapat menuju halaman history untuk pengajuan perubahan dengan klik Change pada reservasi yang ingin diubah.",
        "layanan intimate wedding": "Pada paket Intimate wedding sudah include dekorasi standar, handbouquet, Makeup bride and family, gown and tuxedo, simple wedding cake, photo, video, and canape / lunch / dinner.",
        "layanan seaside elegance wedding": "Pada paket Seaside Elegance Wedding sudah include 2 menginap dengan 8 kamar, event fee, beverage, buffet, decoration, acounstic band, DJ, Makeup, Gown, Suits, Photography, dan videography",
        "layanan grand wedding": "Pada paket Grand Wedding sudah include celebrant, 2 wedding cake, venue, catering, decoration, photo corner, makeup, hairdo, MC, singer and keyboardist, photography, videography, photobooth, souvenir, wedding car, gown and suit",
        "testimoni": "Testimoni paket Seaside Elegance Wedding dari Joy dan Jordan. I cannot emphasize enough how grateful I am to Royal Venture Wedding Organizer. From our first meeting to our wedding day, they have shown an exceptional level of professionalism and attention to every detail. Not only did they assist us in planning every aspect of the wedding, but they also provided the much-needed emotional support throughout the preparation. The result? Our dream wedding came true without stress and worries. I highly recommend Royal Venture Wedding Organizer to anyone looking for an unforgettable wedding service.",
        "testimoni lain": "Testimoni paket Seaside Elegance Wedding dari Charlotte & William. We consider ourselves lucky to have worked with Royal Venture Wedding Organizer. They not only helped us navigate the complex world of weddings but also became outstanding partners in designing our event. From vendor selection to meeting scheduling, every step was carried out meticulously and with care. Our wedding was so beautiful and memorable thanks to the dedication and hard work of their team. Thank you, Royal Venture Wedding Organizer, for everything!",
    };

    async function generateAnswer(e){
        e.preventDefault();
        setGeneratingAnswer(true);
        setAnswer('Loading your answers... \n It might take up to 10 seconds');

        try {
            let foundAnswer = null;
            const questionWords = question.toLowerCase().split(" ");

            // Cari jawaban berdasarkan keyword
            Object.keys(answerData).forEach(keyword => {
                // Memisahkan keyword menjadi array kata-kata
                const keywordWords = keyword.toLowerCase().split(" ");
                // Memeriksa apakah setiap kata dalam keyword ada dalam pertanyaan
                const keywordFound = keywordWords.every(word => questionWords.includes(word));
                if (keywordFound) {
                    foundAnswer = answerData[keyword];
                }
            });

            if(foundAnswer) {
                setAnswer(foundAnswer);
            } else {
                // Jika pertanyaan tidak terdapat dalam dataset, gunakan Google AI
                const response = await axios({
                    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMCYxHypBRpsZ6czn8W6Tx-5QjWBXx-WA',
                    method: 'post',
                    data: {
                        contents: [{parts: [{text: question}] }]
                    }
                });
                setAnswer(response.data.candidates[0].content.parts[0].text);
            }
            setQuestion('');
        } catch (error) {
            console.log(error);
            setAnswer("Something went wrong. please try again!");
        }
        setGeneratingAnswer(false);
    }

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) {
                const q = query(
                collection(db, "users"),
                where("email", "==", user.email)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData && userData.name) {
                    setUserName(userData.name);
                }
                });
            }
        };
        if (user) {
            fetchUserName();
        }
    }, [user]);

    return (
        <div className="bg-[#576250]">
            <Navbar />
            <div className="mt-[70px] mb-[100px]">
                <h1 className=" roboto-bold text-[56px] text-center text-white" style={{ lineHeight: '64px', letterSpacing: '-1.12px' }}>Hi {userName}!</h1>
                <p className="mt-[16px] roboto-regular text-[25px] text-center text-[#D9D9D9]" style={{ lineHeight: '24px', letterSpacing: '-0.2px' }}>FAQ</p>
                <div className="flex justify-center mt-[79px]">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
                        <div className="flex items-center mb-4">
                            <ReactMarkDown className="text-gray-800 flex-grow">{answer}</ReactMarkDown>
                            <FontAwesomeIcon icon={faCircleUser} className="w-6 h-6 text-gray-500 ml-4"/>
                        </div>
                        <form onSubmit={generateAnswer}>
                            <div className="flex items-center">
                                <input type="text" className="flex-grow border-gray-300 border rounded-l-lg p-4 outline-none focus:border-[#576250] transition-colors duration-300" placeholder="Input your question" 
                                value={question} onChange={(e) => setQuestion(e.target.value)} required/>
                                <button type="submit" className="text-white px-6 py-4 rounded-r-lg bg-[#A19E96] hover:bg-[#576250] transition-colors duration-300" disabled={generatingAnswer}>
                                    <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}