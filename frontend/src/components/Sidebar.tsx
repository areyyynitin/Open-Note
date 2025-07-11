import { Allicons } from "../icons/Allicons";
import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TwitterIcons";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";

export const Sidebar = ({ setFilterType }: { setFilterType: (type: "twitter" | "youtube" | "all") => void }) => {
  return (
    <div className="h-screen bg-white w-72 border-r fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-900"><LogoIcon /></div>
        OpenNote
      </div>
      <div className="pt-8 pl-4">
        <SidebarItems text="All"     icon={<Allicons/>}     onClick={() => setFilterType("all")} />
        <SidebarItems text="Twitter" icon={<TwitterIcon />} onClick={() => setFilterType("twitter")} />
        <SidebarItems text="Youtube" icon={<YoutubeIcon />} onClick={() => setFilterType("youtube")} />
      </div>
    </div>
  );
};
