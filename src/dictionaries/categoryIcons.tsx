import { MdOutlineSportsGymnastics, MdOutlineSelfImprovement } from "react-icons/md";
import { GiBrain, GiMeditation } from "react-icons/gi";
import { AiOutlineTeam, AiOutlineBulb } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

export const categoryIcons: { [key: string]: JSX.Element } = {
    PHYSICAL_HEALTH: <MdOutlineSportsGymnastics className="text-zenith-yellow"/>,
    MENTAL_HEALTH: <GiBrain className="text-zenith-yellow" />,
    PERSONAL_GROWTH: <MdOutlineSelfImprovement className="text-zenith-yellow" />,
    SOCIAL_RELATIONSHIPS: <AiOutlineTeam className="text-zenith-yellow" />,
    SPIRITUALITY: <GiMeditation className="text-zenith-yellow" />,
    PRODUCTIVITY: <BsGraphUp className="text-zenith-yellow" />,
    CREATIVITY: <AiOutlineBulb className="text-zenith-yellow" />,
};
