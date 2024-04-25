import { defaults } from "chart.js";
import React from "react";
import LayoutCustomer from "../../layout/customer/layoutCustomer";
import History from "../../components/historyPurchase/history";

const HistoryPurchaseCustomer = () => {
    return(
        <LayoutCustomer>
            <History/>
        </LayoutCustomer>
    )
}

export default HistoryPurchaseCustomer