import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid) => {},
    closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

    const handleOpenBuyWindow = (stock) => {
        setIsBuyWindowOpen(true);
        setSelectedStock(stock);
    };
    const handleOpenSellWindow = (stock) => {
        setIsSellWindowOpen(true);
        setSelectedStock(stock);
    };
    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStock(null);
    };
    const handleCloseSellWindow = () => {
        setIsSellWindowOpen(false);
        setSelectedStock(null);
    };

    return (
        <GeneralContext.Provider value={{openBuyWindow: handleOpenBuyWindow, closeBuyWindow: handleCloseBuyWindow, openSellWindow: handleOpenSellWindow, closeSellWindow: handleCloseSellWindow}}>
            {props.children}
            {isBuyWindowOpen && <BuyActionWindow stock={selectedStock} />}
            {isSellWindowOpen && <SellActionWindow stock={selectedStock} />}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;