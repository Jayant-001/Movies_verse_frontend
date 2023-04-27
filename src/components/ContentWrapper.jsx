import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="w-full max-w-[1200px] m-auto p-auto ">{children}</div>;
};

export default ContentWrapper;