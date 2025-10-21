import React, { useEffect, useState } from "react";
import "./Splash.css";

function Splash({ onFinish }) {
const [visible, setVisible] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
    }, 2000);
    return () => clearTimeout(timer);
}, [onFinish]);

if (!visible) return null;

return (
    <div className="splash-screen">
        <img src="/icons/icon-192x192.png" alt="Logo" className="splash-logo" />
        <h1>PokéDex React</h1>
    </div>
    );
}

export default Splash;