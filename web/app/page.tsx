'use client';
import { useState, useEffect } from 'react';
import '@/styles/Home.scss';
import TextTransition, { presets } from 'react-text-transition';

// hero section text animations
const heroTexts = ['Watches', 'Art', 'Cars', 'Wine', 'Whisky', 'Memorabilia'];

// data for partners
import PartnersMarque from '@/components/PartnersMarque/PartnersMarque';
// import OpportunitiesSection from "@/components/OpportunitiesSection/OpportunitiesSection";
import CTA1Card from '@/components/CtaCards/CtaCard1';
import CTA2Card from '@/components/CtaCards/CtaCard2';

// Images
import Image from 'next/image';
import solanaSwissIcon from '../public/assets/home/solana-swiss-icons.webp';
import aboutIllustration from '../public/assets/home/home-about-illustraiton.webp';

import homeBriefIllustration from '../public/assets/home/home-brief-illustraiton.webp';
import overlay from '@/public/assets/home/overlay.png';
import productImage from '../public/assets/dummy-product.png';
import Rolex from '@/public/assets/home/products/Rolex-Cosmograph-daytona.webp';
import Audemar from '@/public/assets/home/products/Audemars-piguet-Royaloak.webp';
import Ferrai from '@/public/assets/home/products/ferrari512-testa-rossa.webp';
import Picasso from '@/public/assets/home/products/Pablo-Picasso-les-femmes-d-alger.png';

const featuredProducts = [
    {
        name: 'Picasso, Les Femmes d\'Alger, 1955',
        image: Picasso,
        release: 'TBA',
        startingFrom: '100$',
        earningPotential: '+8,1% y*',
    },
    {
        name: 'Audemars Piguet Royal Oak Extra Thin, 2019',
        image: Audemar,
        release: 'TBA',
        startingFrom: '100$',
        earningPotential: '+8,1% y*',
    },
    {
        name: 'Ferrari 512 Testa Rossa',
        image: Ferrai,
        release: 'TBA',
        startingFrom: '100$',
        earningPotential: '+8,1% y*',
    },
]

// how it works images
import howWorks1 from '../public/assets/home/how-it-works-1.webp';
import howWorks2 from '../public/assets/home/how-it-works-2.webp';
import howWorks3 from '../public/assets/home/how-it-works-3.webp';
import howWorks4 from '../public/assets/home/how-it-works-4.webp';
import howWorks5 from '../public/assets/home/how-it-works-5.webp';

const howItWorks = [
  {
    img: howWorks1,
    title: 'We acquire Luxury Goods.',
    description: 'We selectively choose potential value-appreciating items.',
  },
  {
    img: howWorks2,
    title: 'Certification of authenticity.',
    description:
      'A third-party will handle the creation of the necessary documents to ensure the value of the asset.',
  },
  {
    img: howWorks3,
    title: 'We securely store assets in a third-party vault.',
    description:
      'Our trusted partners will securely store the assets in a vault, which we will then share with our users.',
  },
  {
    img: howWorks4,
    title: 'We tokenize and generate digital twins of the goods.',
    description:
      'We utilize blockchain technology to create digital tokens that legally represent ownership of the assets.',
  },
  {
    img: howWorks5,
    title: 'Available for purchase online. Your chance to buy.',
    description:
      'You can purchase the tokens representing shares of the specific asset you desire.',
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  // const [isMobile, setIsMobile] = useState(true);

  // useEffect(() => {
  //   if (window) {
  //     const handleResize = () => {
  //       if (window.innerWidth < 768) {
  //         setIsMobile(true);
  //       } else {
  //         // setIsMobile(false);
  //       }
  //     };

  //     // Attach the event listener for window resize
  //     window.addEventListener('resize', handleResize);

  //     // Clean up the event listener on component unmount
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="home">
      <div className="home__hero padding">
        {/* <div className="hero-overlay"></div> */}
        <Image
          className="hero-overlay"
          src={overlay}
          alt="overlay"
        />
        <div className="home__hero__content">
          <h2 className="display-2 highlight">Digitally Owned</h2>
          <TextTransition
            style={{ color: '#fff' }}
            springConfig={presets.molasses}
            direction="down"
          >
            <h2 className="transition-text">
              {heroTexts[index % heroTexts.length]}
            </h2>
          </TextTransition>{' '}
          <h3 className="heading-5">Collect & Trade Luxury Goods</h3>
          <a href="https://tally.so/r/mYWaJz" className="btn btn-gold" style={{ zIndex: "1"}}>
            JOIN THE WAITLIST
          </a>
          <Image className="solana-swiss-icons" src={solanaSwissIcon} alt="" />
        </div>
      </div>

      {/* partners section */}
      <PartnersMarque />

      <div className="home__about padding">
        <div className="boxed">
          <div className="home__about__illustration">
            <Image
              className="home__about__illustration__img"
              src={aboutIllustration}
              alt="about illustration"
            />
          </div>
          <div className="home__about__content">
            <p className="heading-6">
              In the past decade, certain Luxury Assets have demonstrated
              superior performance compared to the S&P 500.
            </p>
            <p className="heading-6">
              Luxury Markets and Vintage collections tend to appreciate over
              time, yet they often remain out of reach for the majority of
              individuals.
            </p>
            <p className="heading-6">
              {' '}
              We offer the opportunity to access these markets through
              digitization with a starting investment of just $100.
            </p>
          </div>
        </div>
      </div>

      {/* Briefing section */}
      <section className="home__brief padding">
        <div className="boxed">
          {/* top */}
          <div className="home__brief__top">
            <div className="home__brief__top__content">
              <h2 className="heading-2">
                You collect shares of goods, we handle everything else.
              </h2>
              <p className="caption-1">
                All Luxury Goods on our platform are authenticated, certified,
                and securely stored in a third-party vault.
              </p>
              <p className="caption-1">
                We carefully curate assets, selecting only those identified by
                our expert team as having potential for value appreciation.
              </p>
              <div className="home__brief__cta">
                <a href="#" className="home__brief__button">
                  + certified & authentic goods
                </a>
                <a href="#" className="home__brief__button">
                  + transparency
                </a>
              </div>
            </div>

            <div className="home__brief__top__illustration">
              <Image
                className="home__brief__top__illustration__img"
                src={homeBriefIllustration}
                alt="about illustration"
              />
            </div>
          </div>

          {/* bottom */}
          <div className="home__brief__bottom">
            {/* card light */}
            <div className="home__brief__bottom__card-light">
              <h2 className="heading-2">Designed for non-experts.</h2>
              <h3 className="heading-5">(Enjoy a seamless Web3 experience)</h3>
              <p className="caption-1">
                Thanks to our Solana-based solution, you have the flexibility to
                choose how to connect and pay on the platform, ensuring a
                straightforward experience and the transparency of Web3
                technology.
              </p>

              <div className="home__brief__cta">
                <a href="#" className="home__brief__button">
                  sign in with email or wallet
                </a>
                <a href="#" className="home__brief__button">
                  pay with credit card or crypto
                </a>
              </div>
            </div>

            {/* card dark */}
            <div className="home__brief__bottom__card-dark">
              <h2 className="heading-2">
                Collect and admire your curated collection.{' '}
              </h2>
            <p className="caption-1">
                You will have the ability to trade your shares and redeem the
                value you&apos;ve accrued over time with The Artisan.
            </p>

              <div className="home__brief__cta">
                <a href="#" className="home__brief__button light-button">
                  value appreciation &uarr;
                </a>
                <a href="#" className="home__brief__button light-button">
                  metaverse ready
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* products section */}
      <section className="home__featured padding">
        <div className="boxed">
          <h2 className="heading-1">
            Explore the collections available on the platform.
          </h2>

          <div className="home__featured__items-cont">
            {featuredProducts.map((product, index) => {
              return (
                <div key={index} className="home__featured__items-cont__item">
                  <img
                    src="/assets/product-border-bg.png"
                    alt=""
                    className="home__featured__items-cont__item__bg"
                  />
                  <div className="item-top">
                    <Image
                      src={product.image}
                      alt="product-img"
                      className="item-top-img"
                    />
                  </div>
                  <div className="item-body">
                    <h3 className="heading-6">
                        {product.name}
                    </h3>

                    <div className="item-body-details">
                      <div className="item-body-details-set">
                        <p className="label-5">RELEASE</p>
                        <p className="label-3">TBA</p>
                      </div>

                      <div className="item-body-details-set">
                        <p className="label-5">STARTING FROM</p>
                        <p className="label-3">100$</p>
                      </div>

                      <div className="item-body-details-set">
                        <p className="label-5">EARNING POTENTIAL</p>
                        <p className="label-3 green">+8,1% y*</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="home__bottom-cta padding">
        {/* <div className="boxed"> */}
        <CTA1Card />

        {/* hwo it works section */}
        <section className="home__working ">
          <div className="boxed">
            <h2 className="heading-1">How It Works</h2>
            <div className="home__working__steps">
              {howItWorks.map((step, index) => {
                return (
                  <div key={index} className="home__working__item">
                    <Image
                      src={step.img}
                      alt="how it works"
                      className="home__working__item__img"
                    />
                    <h3 className="heading-3">{step.title}</h3>
                    <p className="caption-3">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CTA2Card />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;