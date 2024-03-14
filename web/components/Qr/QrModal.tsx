import '@/styles/QrModal.scss';
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from "@solana/web3.js";
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { createQR, findReference, FindReferenceError, ValidateTransferError } from "@solana/pay"

interface QrModalProps {
    showModal: boolean;
    solanaUrl: URL;
    refKey: string;
    handleClose: () => void;
}

const QrModal: React.FC<QrModalProps> = ({ showModal, solanaUrl, refKey, handleClose }) => {
    const [isOpen, setIsOpen] = useState(showModal);
    const [qrCode, setQrCode] = useState<string>();
    const [signature, setSignature] = useState<string>();

    const connection = new Connection(
        process.env.NEXT_PUBLIC_HELIUS_DEVNET!,
        "confirmed"
    );

    const handleCloseModal = () => {
        setIsOpen(false);
        handleClose();
    }
    
    async function generateQr() {
        const qr = createQR(solanaUrl);
        // get the reference from the solanaUrl        
        const qrBlob = await qr.getRawData('png');
        if (!qrBlob) return;
        // 3 - Convert the blob to a base64 string (using FileReader) and set the QR code state
        const reader = new FileReader();
        reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
            setQrCode(event.target.result);
        }
        };
        reader.readAsDataURL(qrBlob);

       
        // const found = await findReference(connection, new PublicKey(refKey));
        
    }

    async function confirm() {
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        toast.promise(
            connection.confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature: signature!
            }),
            {
                pending: 'Transaction pending...',
                success: {
                    render(){
                        return (
                            <div>
                                <Link 
                                    style={{color: 'black'}}
                                    target='_blank'  
                                    href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                                > 
                                    Transaction Confirmed 
                                </Link>
                            </div>
                        )
                    }
                },
                error: 'Error sending transaction'
            }
        );

        handleCloseModal();
    }

    useEffect(() => {
        generateQr();
    }, []);

    useEffect(() => {
        if(signature){
            confirm();
        }
    }, [signature]);

    useEffect(() => {
        if(isOpen) {
            const interval = setInterval(async () => {
            try {
                // Check if there is any transaction for the reference
                const signatureInfo = await findReference(connection, new PublicKey(refKey), { finality: 'confirmed' })
                // Validate that the transaction has the expected recipient, amount and SPL token
                setSignature(signatureInfo.signature)
                
            } catch (e) {
                if (e instanceof FindReferenceError) {
                // No transaction found yet, ignore this error
                return;
                }
                if (e instanceof ValidateTransferError) {
                // Transaction is invalid
                console.error('Transaction is invalid', e)
                return;
                }
                console.error('Unknown error', e)
            }
            }, 500)
            return () => {
                clearInterval(interval)
            }
        }
      }, [isOpen])
    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="modal-header">
                        <img src="/assets/login/login_header.svg" alt="login header" className="login-header" />
                        <img src="/assets/login/logo_bw.svg" alt="login header" className="logo" />
                        <div className="header-text-container">
                            <p className="header-text">
                                Buy Fractions
                            </p>
                            <p className="header-subtext">
                                Scan the QR code to purchase or connect your wallet.
                            </p>
                        </div>
                    </div>
                    <div className="login-container">
                        {qrCode && (
                            <Image
                                src={qrCode}
                                style={{ position: "relative", background: "white" }}
                                alt="QR Code"
                                width={200}
                                height={200}
                                priority
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default QrModal;
