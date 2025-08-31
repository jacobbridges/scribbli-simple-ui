import GlobeIcon from './globe-icon';
import ChevronDownIcon from './chevron-down-icon';
import GlobeAltIcon from './globe-alt-icon';
import HomeIcon from './home-icon';
import SearchIcon from './search-icon';
import OpenSidebarIcon from "~/components/icons/open-sidebar-icon";
export {default as IconBookOpen} from './icon-book-open';
export {default as IconUsers} from "./icon-users";
export {default as IconMapPin} from "./icon-map-pin";
export {default as IconScrollText} from "./icon-scroll-text";

const iconStringMap = {
  "home": HomeIcon,
  "globe_alt": GlobeAltIcon,
}


export {
  iconStringMap,
  GlobeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  HomeIcon,
  SearchIcon,
  OpenSidebarIcon,
}