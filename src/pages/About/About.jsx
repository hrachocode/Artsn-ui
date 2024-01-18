import "./About.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Form, Input } from "antd";

import { FaLinkedin, FaTwitter } from "react-icons/fa";

// team images
import renato from "../../assets/about/renato.webp";
import domenico from "../../assets/about/domenico.webp";
import paolo from "../../assets/about/paolo.webp";
import jonathan from "../../assets/about/jonathan.webp";
import leonardo from "../../assets/about/leonardo.webp";
import PartnersMarque from "../../components/PartnersMarque/PartnersMarque";

const teamData = [
    {
        name: "Paolo Piana",
        title: "CFO & Co-Founder",
        img: paolo,
        about: [
            "Web3 Marketer & UX Designer",
            "2y Web3 full time (SMEs and DFINITY Foundation)",
            "Bachelor in BA and MSc in Management of Innovation & Entrepreneurship",
        ],
        linkedIn: "https://www.linkedin.com/in/paolo-piana/",
        twitter: "https://twitter.com/pinoweb3",
    },
    {
        name: "Renato Capizzi",
        title: "CEO & Founder",
        img: renato,
        about: [
            "The brain behind the idea",
            "8+ years of managing experience",
            "Cryptocurrency trader",
        ],
        linkedIn: "https://www.linkedin.com/in/renatocapizzi/",
        twitter: "https://twitter.com/Capiz92",
    },
    {
        name: "Domenico Fava",
        title: "Legal Advisor & Data Protection Officer",
        img: domenico,
        about: [
            "Legal expert for several entities;",
            "Certified data protection officer, with consolidated experience;",
            "Web 3 investor and advisor",
        ],
        linkedIn: "https://www.linkedin.com/in/domenico-fava-5bb17336/",
        twitter: "#", // Domenico's Twitter link is missing
    },

    {
        name: "Jonathan Napolitano",
        title: "CTO",
        img: jonathan,
        about: [
            " Blockchain and immersive applications expert",
            "Ex Metaverse, Web3, and Blockchain Specialist for Coca-Cola",
        ],
        linkedIn: "#", // Jonathan's LinkedIn link is missing
        twitter: "#", // Jonathan's Twitter link is missing
    },
    {
        name: "Leonardo Donatacci",
        title: "Head of Development",
        img: leonardo,
        about: ["Solana Specialist", "Teacher at Web3 builder alliance"],
        linkedIn: "#", // Leonardo's LinkedIn link is missing
        twitter: "https://twitter.com/L0STE_", // Adding Leonardo's Twitter link
    },
];

const onFinish = (values) => {
    console.log("Received values:", values);
    // You can handle form submission logic here
};

const About = () => {
    return (
        <div className="about">
            <div className="about__header">
                <Navbar />
                <div className="about__hero padding">
                    <div className="boxed">
                        <h1 className="heading-primary">
                            Democratizing Luxury Good Investments
                        </h1>
                        <p className="heading-tertiary w-300">
                            We provide to users the possibility to invest in
                            luxury items such as Watches, Art Pieces, Cars and
                            more at accessible prices. <br /> These types of
                            assets have demonstrated valuation growth rate
                            during years.
                        </p>
                    </div>
                </div>
            </div>

            {/* team section */}
            <section className="about__team padding">
                <div className="boxed">
                    <h2 className="heading-primary">Meet The Team</h2>
                    <div className="about__team__members">
                        {teamData.map((member, index) => {
                            return (
                                <div
                                    key={index}
                                    className="about__team__members__member"
                                >
                                    <img
                                        src={member.img}
                                        alt=""
                                        className="about__team__members__member__img"
                                    />
                                    <h2 className="heading-quaternary">
                                        {member.name}
                                    </h2>
                                    <p className="body-small w-300">
                                        {member.title}
                                    </p>
                                    <ul className="about__team__members__member__abouts">
                                        {member.about.map((fact, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="about__team__members__member__abouts__item body-xs"
                                                >
                                                    {fact}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="about__team__members__member__socials">
                                        <a
                                            href={member.linkedIn}
                                            target="blank"
                                            className="about__team__members__member__socials__link"
                                        >
                                            <FaLinkedin />
                                        </a>
                                        <a
                                            href={member.twitter}
                                            target="blank"
                                            className="about__team__members__member__socials__link"
                                        >
                                            <FaTwitter />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* partners section */}
            <PartnersMarque />

            {/* contact us form */}
            <section className="about__contact padding">
                <div className="boxed">
                    <Form
                        name="contactForm"
                        onFinish={onFinish}
                        layout="vertical"
                        className="about__contact__form"
                    >
                        {/* Name Field */}
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    message: "Please enter your name!",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "27px",
                                    border: "1px solid #525252",
                                    padding: "10px",
                                }}
                            />
                        </Form.Item>

                        {/* Email Field */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    message: "Please enter your email!",
                                },
                                {
                                    message:
                                        "Please enter a valid email address!",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "27px",
                                    border: "1px solid #525252",
                                    padding: "10px",
                                }}
                            />
                        </Form.Item>

                        {/* Message Field */}
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[
                                {
                                    message: "Please enter your message!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "27px",
                                    border: "1px solid #525252",
                                    padding: "10px",
                                }}
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </div>
    );
};

export default About;
