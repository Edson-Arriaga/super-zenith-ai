import { MdOutlineSportsGymnastics, MdOutlineSelfImprovement } from "react-icons/md";
import { GiBrain, GiMeditation } from "react-icons/gi";
import { AiOutlineTeam, AiOutlineBulb } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs"

const SIZE = 30;

export const categoryIcons: { [key: string]: JSX.Element } = {
    PHYSICAL_HEALTH: <MdOutlineSportsGymnastics className="text-zenith-yellow" size={SIZE} />,
    MENTAL_HEALTH: <GiBrain className="text-zenith-yellow" size={SIZE} />,
    PERSONAL_GROWTH: <MdOutlineSelfImprovement className="text-zenith-yellow" size={SIZE} />,
    SOCIAL_RELATIONSHIPS: <AiOutlineTeam className="text-zenith-yellow" size={SIZE} />,
    SPIRITUALITY: <GiMeditation className="text-zenith-yellow" size={SIZE} />,
    PRODUCTIVITY: <BsGraphUp className="text-zenith-yellow" size={SIZE} />,
    CREATIVITY: <AiOutlineBulb className="text-zenith-yellow" size={SIZE} />,
};
