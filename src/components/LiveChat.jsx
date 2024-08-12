import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/66ba1db6146b7af4a43966cd/1i53g847f";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      window.Tawk_API = Tawk_API;
    };
  }, []);
  return <></>;
}
