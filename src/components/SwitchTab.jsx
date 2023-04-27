import React, { useState } from "react";

const SwitchTab = ({ endPoints, setEndPoint }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const changeTab = (index) => {
        setSelectedTab(index);
        setEndPoint(endPoints[index].toLowerCase());
    };

    return (
        <span className="flex space-x-3 items-center box-border backdrop-blur-sm bg-white/30 w-fit px-4 rounded-lg py-1">
            {endPoints.map((tab, index) => {
                return (
                    <span
                        key={index}
                        className={`${
                            selectedTab === index ? "border-b-2" : ""
                        } cursor-pointer`}
                        onClick={() => changeTab(index)}
                    >
                        {tab}
                    </span>
                );
            })}
        </span>
    );
};

export default SwitchTab;
