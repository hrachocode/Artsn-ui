"use client"
import "@/styles/ProductDetails.scss";
import Dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Progress = Dynamic(() => import("antd").then((mod) => mod.Progress), { ssr: false });
const Collapse = Dynamic(() => import("antd").then((mod) => mod.Collapse), { ssr: false });
const Panel = Dynamic(() => import("antd").then((mod) => mod.Collapse.Panel), { ssr: false });
const Slider = Dynamic(() => import("antd").then((mod) => mod.Slider), { ssr: false });
import { fetchProductDetails } from "@/hooks/fetchProductDetails";
const ProductsSectionDesktop = Dynamic(() => import("@/components/ProductsSectionDesktop/ProductsSectionDesktop"), { ssr: false });
const ProductsSectionMobile = Dynamic(() => import("@/components/ProductsSectionMobile/ProductsSectionMobile"), { ssr: false });
const OpportunitiesSection = Dynamic(() => import("@/components/OpportunitiesSection/OpportunitiesSection"), { ssr: false });
const CTA1Card = Dynamic(() => import("@/components/CtaCards/CtaCard1"), { ssr: false });
const ImageGallery = Dynamic(() => import("react-image-gallery"), { ssr: false });
import "react-image-gallery/styles/css/image-gallery.css";
import { useLazyQuery } from "@apollo/client";
import { listing } from "@/lib/queries";
import { Connection, Keypair } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { checkLogin } from '@/components/Web3Auth/solanaRPC';
import RPC from "@/components/Web3Auth/solanaRPC";
import { encodeURL, TransactionRequestURLFields } from "@solana/pay";
const QrModal = Dynamic(() => import("@/components/Qr/QrModal"), { ssr: false });
import { FaQrcode } from "react-icons/fa";
const Web3Auth = Dynamic(() => import("@/components/Web3Auth/Web3Auth"), { ssr: false });
import { buyTx } from "@/components/Protocol/functions";
import { toastPromise, toastError } from "@/helpers/toast";
import type { ProductDetails, OffChainData, OnChainData, Product, FAQ, Image } from "@/helpers/types";


export default function ProductDetails({ params }: { params: { id: string } }) {
    const { publicKey, sendTransaction } = useWallet();
    const [web3AuthPublicKey, setWeb3AuthPublicKey] = useState<string | null>(null);
    const [rpc, setRpc] = useState<RPC | null>(null);
    const connection = new Connection(
        process.env.NEXT_PUBLIC_HELIUS_DEVNET!,
        "confirmed"
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [faqItems, setFaqItems] = useState<Array<FAQ>>();
    const [offChainData, setOffChainData] = useState<OffChainData | undefined>(undefined);
    const [product, setProduct] = useState<Product>();
    const [images, setImages] = useState<Array<Image>>();
    const [isMobile, setIsMobile] = useState(true);
    const [solanaUrl, setSolanaUrl] = useState<URL>();
    const [refKey, setRefKey] = useState<string>();
    const [displayQr, setDisplayQr] = useState<boolean>(false);
    const [displayLoginModal, setDisplayLoginModal] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(30);
    // const [displayProfileModal, setDisplayProfileModal] = useState<boolean>(false);
    const [variables, setVariables] = useState({
        associatedId: "",
      });
    const [getDetails, { loading, error, data }] = useLazyQuery(listing, {
        variables,
    });
    if(!loading && data != undefined && offChainData == undefined){
        console.log("data", data.listings[0]);
        setOffChainData(data.listings[0]);
    }
    if(!loading && error != undefined){
        console.log("error", error);
    }

    // BUY FRACTION FUNCTIONALITY*************************************************
    async function buyListing() {        
        try {
            if(publicKey && product){
               const tx = await buyTx(product.id, product.reference, publicKey.toBase58());
                const signature = await sendTransaction(tx!, connection, {skipPreflight: true,});
                await toastPromise(signature)
            } 
            if(web3AuthPublicKey !== null && !publicKey && product){
                const tx = await buyTx(product.id, product.reference, web3AuthPublicKey);
                const signature = await rpc!.sendTransaction(tx!);
                await toastPromise(signature)
            }
        } catch (error) {
            console.error('Error sending transaction', error);
            toastError('Error sending transaction')
        }
    }
    // ***************************QR Code Logic************************************
    async function getQrCode() {
        try{
            const { location } = window
    
            // id: product.id,
            // reference: product.reference,
            // publicKey: publicKey.toBase58(),
            const refKey = Keypair.generate().publicKey.toBase58();
            setRefKey(refKey);
            const apiUrl = `${location.protocol}//${location.host}/api/qr/buy?new=true&id=${product?.id}&reference=${product?.reference}&refKey=${refKey}`
            console.log('api url', apiUrl)
            
            const urlParams: TransactionRequestURLFields = {
                link: new URL(apiUrl),
                label: "Artisan",
                message: "Thanks for your order! 🤑",
            }
            const solanaUrl = encodeURL(urlParams,)
            setSolanaUrl(solanaUrl);
            setDisplayQr(true);
        } catch (error) {
            console.error('Error generating QR code', error);
            toastError('Error generating QR code')
        };
    };


    // **************************Data Functions***********************************
    async function fetchData(accountPubkey: string) {
        const on_chain_data: OnChainData | undefined = await fetchProductDetails(accountPubkey);
        console.log('on chain data', on_chain_data)
        console.log('off chain data', offChainData)
        const product_images = offChainData!.images.map((image: string) => {
            return {
                original: image,
                thumbnail: image,
                originalHeight: 500,
            }
        })

        const product_info ={
            id: on_chain_data!.id,
            reference: on_chain_data!.reference,
            name: on_chain_data!.brand,
            model: on_chain_data!.model,
            marketValue: parseInt(offChainData!.marketValue),
            price: on_chain_data!.startingPrice,
            currency: offChainData!.currency,
            img: offChainData!.images[0],
            sold: on_chain_data!.shareSold,
            total: on_chain_data!.share,
            stockTag: "Almost Sold Out!",
            fractionLeft: on_chain_data!.share - on_chain_data!.shareSold,
            pastReturns: offChainData!.pastReturns,
            pastReturnsSuffix: "p.a.",
            earningPotential: offChainData!.earningPotential,
            earningPotentialSuffix: "p.a.",
            earningPotentialDuration: offChainData!.earningPotentialDuration,
            expectedNetReturn: offChainData!.expectedNetReturn,
            offerViews: parseInt(offChainData!.offerViews),
            investUrl: "#",
            description: offChainData!.description,
            gallery: offChainData!.images,
        }

        const faq_items = [
            {
                key: "1",
                question: "Basic Info",
                answer: offChainData!.basicInfo,
            },
            {
                key: "2",
                question: "Product Description",
                answer: offChainData!.description,
            },
            {
                key: "3",
                question: "Certificate of Authenticity",
                answer: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
            },
            {
                key: "4",
                question: "Asset Details",
                answer: offChainData!.assetDetails,
            },
        ]
        
        setFaqItems(faq_items);
        setProduct(product_info);
        setImages(product_images);
        setIsLoading(false);
    }
    // ***************************************************************************

    useEffect(() => {
        if(window){
            const handleResize = () => {
                if(window.innerWidth < 768){
                    setIsMobile(true);
                } else {
                    // setIsMobile(false);
                }
            };

            // Attach the event listener for window resize
            window.addEventListener("resize", handleResize);

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if(publicKey){
            return;
        }
        checkLogin().then((res) => {
            if(res){
                if(res.account){
                    setWeb3AuthPublicKey(res.account);
                }
                if(res.rpc !== null){
                    setRpc(res.rpc);
                }
            }
        });
    }, []);

    useEffect(() => {
        const accountPubkey = params.id;
        if(accountPubkey === undefined){
            return;
        }
        if(offChainData){
            return
        }
        setVariables({
            associatedId: accountPubkey
        });
        getDetails()
        
    }, [params.id]);

    useEffect(() => {
        if(offChainData){
            fetchData(offChainData.associatedId);
        }
    }, [offChainData]);

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="product-details">
                    <div className="product-details__header">
                        <div className="product-details__hero padding">
                            <div className="boxed">
                                <div className="product-details__hero__illustration">
                                    <ImageGallery
                                        showNav={false}
                                        showPlayButton={false}
                                        showBullets={true}
                                        items={images!}
                                    />
                                </div>

                                <div className="product-details__hero__info">
                                    <div className="product-details__hero__info__header">
                                        <h1 className="heading-2">{product!.name}</h1>
                                        <h2 className="caption-1">{product!.model}</h2>
                                    </div>

                                    <Progress
                                        percent={Number((((product!.sold )/product!.total) * 100).toFixed(0))}
                                        status="active"
                                        showInfo={true}
                                        strokeColor="#23B371"
                                        trailColor="transparent"
                                        strokeWidth={16}
                                        className="product-details__hero__info__progress"
                                    />

                                    <div className="product-details__hero__info__set">
                                        <h3 className="heading-6">Asset Information</h3>
                                        <div className="product-details__hero__info__set__cont">
                                            <div className="market-value">
                                                <p className="body">Market Value</p>
                                                <p className="heading-2 w-700">
                                                    {product!.marketValue} €
                                                </p>
                                            </div>
                                            <div className="fraction-left">
                                                <p className="body">Market Value</p>
                                                <p className="heading-2 w-700">
                                                    {product!.marketValue} €
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-details__hero__info__set">
                                        <h3 className="heading-6"> Performance Info</h3>
                                        <div className="product-details__hero__info__set__cont">
                                            <div className="past-returns">
                                                <p className="body">Past Returns</p>
                                                <p className="heading-2">
                                                    <span className="w-700">
                                                        +{product!.pastReturns}%{" "}
                                                    </span>
                                                    <span className="body-xs">
                                                        p.a.
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="earning-potential">
                                                <p className="body">
                                                    <span>Earning Potential</span>
                                                    <span className="body-tiny">
                                                        (over {product!.earningPotentialDuration})
                                                    </span>
                                                </p>
                                                <p className="heading-2">
                                                    <span className="w-700">
                                                        +{product!.earningPotential}%{" "}
                                                    </span>
                                                    <span className="body-xs">
                                                        p.a.
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-container" style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <a 
                                            onClick={
                                            ()=>{
                                                if(!publicKey && !web3AuthPublicKey){
                                                    getQrCode();
                                                }else {
                                                    buyListing();
                                                }
                                            }} 
                                            className="btn btn-white" 
                                            style={{ 
                                                justifyContent: "center", 
                                                width: !publicKey && !web3AuthPublicKey ? '49%' : '85%'
                                            }}
                                        >
                                            {!publicKey && !web3AuthPublicKey ? 'Buy with QR' :'INVEST IN FRACTIONS'}
                                        </a>
                                        
                                        {!publicKey && !web3AuthPublicKey ? (
                                            <button className="btn btn-white" style={{ justifyContent: "center", width: '49%' }} onClick={()=> setDisplayLoginModal(true)}>
                                                Login
                                            </button>
                                        ):(
                                            <a 
                                                onClick={getQrCode}
                                                // className="btn btn-white" 
                                                style={{ justifyContent: "center", cursor: 'pointer'}}
                                            >
                                                <FaQrcode size={30} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-details__about padding">
                        <div className="boxed">
                            {/* faqs (about) section */}
                            <div className="product-details__about__faq ">
                                <h2 className="heading-5">About</h2>

                                <Collapse expandIconPosition={"right"} size="large">
                                    {faqItems!.map((item) => (
                                        <Panel
                                            key={item.key}
                                            header={item.question}
                                        >
                                            <p className="body white">{item.answer}</p>
                                        </Panel>
                                    ))}
                                </Collapse>
                            </div>

                            {/* net return calculations */}
                            <div className="product-details__about__calc ">
                                <h3 className="heading-6">
                                    Calculate your Earning Potential
                                </h3>
                                <p className="body">1 = 100 USDC</p>
                                <Slider
                                    className="product-details__about__calc__range"
                                    defaultValue={30}
                                    onChange={(value) => setSliderValue(value)}
                                />
                                <div className="product-details__about__calc__returns">
                                    <p>Expected Net Return</p>
                                    <p className="green">
                                        {(sliderValue * Number(product!.expectedNetReturn)).toFixed(2)}{" "}{product!.currency}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* products sections */}
                    {isMobile ? <ProductsSectionMobile /> : <ProductsSectionDesktop />}

                    {/* Opportunities section */}
                    <OpportunitiesSection />

                    <div className="product-details__cta padding">
                        <div className="boxed">
                            <CTA1Card />
                        </div>
                    </div>
                </div>
            )}
            {displayQr && solanaUrl && refKey && (
                <div>
                    <div className="backdrop" onClick={()=> {setDisplayQr(false)}} />
                    <QrModal 
                        showModal={displayQr}
                        solanaUrl={solanaUrl}
                        refKey={refKey}
                        header={`${product?.name} | ${product?.model}`}
                        message={`Scan the QR code to purchase ${product?.name} for ${product?.price} ${product?.currency}`}
                        handleClose={() => setDisplayQr(false)}
                    />
                </div>
            )}
            {displayLoginModal && (
                <div className="login-container">
                    <div className="backdrop" onClick={()=> {setDisplayLoginModal(false)}} />
                    <Web3Auth
                        showModal={displayLoginModal}
                        handleClose={() => {setDisplayLoginModal(false)}}
                    />
                </div>
            )}
        </>
    );
};


