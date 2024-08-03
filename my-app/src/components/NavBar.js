import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import gurukul1 from '../assets/gurukul_logo.png';
import gurukul2 from '../assets/gurukul_logo_1.png'
import SignIn from "./signin/SignIn";
import { Link, useNavigate } from "react-router-dom";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-[rgba(255,255,255,0.49)] p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="black"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-gray-400"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-white"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="bg-[rgba(255,255,255,0.2)] hidden max-w-screen-xl rounded-xl lg:block">
          <ul className=" grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const  navigate = useNavigate()
  const handleHome=()=>{
    navigate('/', { replace: true });
  }
  const handleContact=()=>{
    navigate('/contact', { replace: true });
  }
  const handleCourses=()=>{
    navigate('/user/courses', { replace: true });
  }
  const handleSupport=()=>{
    navigate('/support', { replace: true });
  }
  const handleUsers=()=>{
    navigate('/allusers', { replace: true });
  }
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-2">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem onClick={handleHome} className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >

        <ListItem 
        className="flex items-center gap-2 py-2 pr-4"
        onClick={handleContact}
        >
          Contact Me
        </ListItem>
        
        
        
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >

        <ListItem 
        className="flex items-center gap-2 py-2 pr-4"
        onClick={handleCourses}
        >
          Courses
        </ListItem>
        
        
        
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >

        <ListItem 
        className="flex items-center gap-2 py-2 pr-4"
        onClick={handleUsers}
        >
          Users
        </ListItem>
        
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >

        <ListItem 
        className="flex items-center gap-2 py-2 pr-4"
        onClick={handleSupport}
        >
          1:1 Support
        </ListItem>
        
      </Typography>
    </List>
  );
}

export function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    // <div className="mx-auto px-6 py-2 bg-none rounded-s-sm">
    <div className="mx-auto px-6 py-2 bg-[rgba(255,255,255,0.1)] rounded-s-sm">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-4 cursor-pointer z-10 py-1.5 lg:ml-2 text-[#11a576] font-playball text-4xl"
        >
          Gurukul
          {/* <img className="w-48 h-24 p-0 m-0" src={gurukul2} alt="gurukul" /> */}
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        {/* <div className="hidden gap-2 lg:flex"> */}


          {/* <Link to='/signin'>
            <Button variant="text" size="lg" color="white">
              Log In
            </Button>
          </Link>
          <Link to='/signup'>
            <Button variant="gradient" size="lg">
              Sign Up
            </Button>
          </Link> */}
        {/* </div> */}
        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          
          <Link to='/signin' className="w-full">
          <Button variant="outlined" size="sm" color="white" fullWidth>
            Log In
          </Button>
          </Link>
          <Link to='/signup' className="w-full">
          <Button variant="gradient" size="sm"  fullWidth>
            Sign Up
          </Button>
          </Link>
        </div>
      </Collapse>
    </div>
  );
}