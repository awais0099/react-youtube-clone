import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
    { name: "New", type: "home" },
    { name: "Trending", type: "category" },
    { name: "Music", type: "category" },
    { name: "Films", type: "category" },
    { name: "Live", type: "category" },
    { name: "Gaming", type: "category" },
    { name: "News", type: "category" },
    { name: "Sports", type: "category" },
    { name: "Learning", type: "category" },
    {
        name: "Fashion & beauty",
        type: "category",
        divider: true,
    },
    { name: "Settings", type: "menu" },
    { name: "Report History", type: "menu" },
    { name: "Help", type: "menu" },
    { name: "Send feedback", type: "menu" },
];

// export const categories = [
//     { name: "New", icon: <AiFillHome />, type: "home" },
//     { name: "Trending", icon: <MdLocalFireDepartment />, type: "category" },
//     { name: "Music", icon: <CgMusicNote />, type: "category" },
//     { name: "Films", icon: <FiFilm />, type: "category" },
//     { name: "Live", icon: <MdLiveTv />, type: "category" },
//     { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
//     { name: "News", icon: <ImNewspaper />, type: "category" },
//     { name: "Sports", icon: <GiDiamondTrophy />, type: "category" },
//     { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
//     {
//         name: "Fashion & beauty",
//         icon: <GiEclipse />,
//         type: "category",
//         divider: true,
//     },
//     { name: "Settings", icon: <FiSettings />, type: "menu" },
//     { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
//     { name: "Help", icon: <FiHelpCircle />, type: "menu" },
//     { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },

// ]