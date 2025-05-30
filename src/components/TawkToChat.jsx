import Script from "next/script";

export default function TawkToChat() {
    return (
        <Script
            id="tawkto-chat"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/67d343ba105c44190c242f0c/1im8k14bf';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);
                    })();
                `
            }}
        />
    );
}
