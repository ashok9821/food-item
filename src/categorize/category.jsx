import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { GiHamburger } from "react-icons/gi";
import { GiFullPizza } from "react-icons/gi";
import { SiHomeassistant } from "react-icons/si";
import { CiBowlNoodles } from "react-icons/ci";

export const categories=[
    {
        id:1,
        name:"All",
        image:<TiThSmallOutline className="cate-icon"/>
    },
    {
        id:2,
        name:"Breakfast",
        image:<MdOutlineFreeBreakfast className="cate-icon"/>
    },
    {
        id:3,
        name:"Soups",
        image:<TbSoup className="cate-icon"/>
    },
    {
        id:4,
        name:"Pasta",
        image:<CiBowlNoodles className="cate-icon"/>
    },
    {
        id:5,
        name:"Main Course",
        image:<SiHomeassistant className="cate-icon"/>
    },
    {
        id:6,
        name:"Pizza",
        image:<GiFullPizza className="cate-icon"/>
    },
    {
        id:7,
        name:"Burger",
        image:<GiHamburger className="cate-icon"/>
    }

]