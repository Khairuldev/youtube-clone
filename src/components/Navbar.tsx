import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiFillYoutube,
  AiTwotoneLike,
  AiFillFire,
  AiFillTrophy,
  AiFillFlag,
  AiFillHome,
} from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import {
  BsCameraVideo,
  BsBell,
  BsChevronDown,
  BsMusicNoteBeamed,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  HStack,
  Icon,
  Img,
  Input,
  Text,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogoYoutube, IoMdFilm } from "react-icons/io";
import {
  MdSubscriptions,
  MdHistory,
  MdSettings,
  MdFeedback,
  MdWatchLater,
} from "react-icons/md";

import { BiHelpCircle, BiNews } from "react-icons/bi";
import { MdVideoLibrary } from "react-icons/md";
import { SiYoutubegaming, SiYoutubestudio } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/reducers/hook";
import { changeSearchTerm, clearSearchTerm, clearVideos } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  const mainLinks = [
    {
      icon: <AiFillHome />,
      name: "Home",
    },
    {
      icon: <SiYoutubestudio />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions />,
      name: "Subscriptions",
    },
    {
      icon: <MdVideoLibrary />,
      name: "Library",
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdHistory />,
      name: "History",
    },
    {
      icon: <AiFillYoutube />,
      name: "Your Videos",
    },
    {
      icon: <MdWatchLater />,
      name: "Watch Later",
    },
    {
      icon: <AiTwotoneLike />,
      name: "Liked Videos",
    },
  ];

  const subscriptionLinks = [
    {
      icon: <AiFillFire />,
      name: "Trending",
    },
    {
      icon: <BiNews />,
      name: "News",
    },
    {
      icon: <BsMusicNoteBeamed />,
      name: "Music",
    },
    {
      icon: <AiFillTrophy />,
      name: "Sport",
    },
    {
      icon: <SiYoutubegaming />,
      name: " Gaming",
    },
    {
      icon: <IoMdFilm />,
      name: "Filems",
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings />,
      name: "Settings",
    },
    {
      icon: <AiFillFlag />,
      name: "Report history",
    },
    {
      icon: <BiHelpCircle />,
      name: "Help",
    },
    {
      icon: <MdFeedback />,
      name: "Send feedback",
    },
  ];

  const textLinks = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };
  return (
    <Box
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      px={10}
      py={"2vh"}
      h={"auto"}
      bg="#212121"
      opacity={95}
      top={0}
      zIndex={50}
      position="sticky">
      <Flex gap={8} alignItems="center" justifyContent="start">
        <Icon
          w={7}
          h={8}
          color="white"
          as={GiHamburgerMenu}
          ref={btnRef}
          onClick={onOpen}
          cursor={"pointer"}
        />
        <Link to={"/"}>
          <Flex gap={1} alignItems="center" display="flex">
            <Icon w={8} h={8} color="red" as={IoLogoYoutube} />
            <Text
              color="white"
              fontWeight="semibold"
              fontSize="3xl"
              fontFamily="sans-serif"
              letterSpacing="-3px">
              YouTube
            </Text>
          </Flex>
        </Link>
      </Flex>

      <Flex justifyContent="center" alignItems="center" gap={1}>
        <Flex
          gap={1}
          borderLeftRadius={30}
          border="1px solid grey"
          alignItems="center"
          justifyContent="center"
          width="100%">
          <Flex pl={3}>
            <Icon w={5} h={5} color="white" as={AiOutlineSearch} />
          </Flex>
          <Flex>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
              <Flex alignItems="center">
                <Input
                  color="white"
                  p={2}
                  variant="unstyled"
                  border="none"
                  borderStartRadius={30}
                  type="text"
                  placeholder="Search"
                  width="400px"
                  value={searchTerm}
                  onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                />
              </Flex>
            </form>
          </Flex>

          <AiOutlineClose
            cursor={"pointer"}
            className={`${!searchTerm ? "invisible" : "visible"}`}
            onClick={() => dispatch(clearSearchTerm)}
            color={"white"}
          />
        </Flex>
        <Button
          bg="whiteAlpha"
          colorScheme="whiteAlpha"
          h={10}
          w={16}
          alignItems="center"
          borderEndRadius={30}>
          <Icon w={6} h={6} color="white" as={AiOutlineSearch} />
        </Button>
        <Button rounded="full" bg="blackAlpha.50" colorScheme="whiteAlpha">
          <Icon w={5} h={5} color="white" as={TiMicrophone} />
        </Button>
      </Flex>

      <Flex alignItems="center" gap={3}>
        <Button rounded="full" bg="none" colorScheme="whiteAlpha">
          <Icon w={5} h={5} color="white" as={BsCameraVideo} />
        </Button>

        <Button rounded="full" bg="none" colorScheme="whiteAlpha">
          <span
            style={{
              position: "absolute",
              backgroundColor: "red",
              borderRadius: "30px",
              marginBottom: "20px",
              marginLeft: "15px",
              alignItems: "center",
            }}>
            <Text textAlign="center" fontSize="sm" px={1}>
              9+
            </Text>
          </span>
          <Icon w={5} h={5} color="white" as={BsBell} />
        </Button>

        <Flex gap={1}>
          <Img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            w={9}
            h={9}
            rounded="full"
          />
        </Flex>

        {/* //sidebar content */}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"xs"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader bg={"blackAlpha.900"}>
              <HStack px={"1vw"} spacing={"2vw"}>
                <Icon
                  w={7}
                  h={8}
                  color="white"
                  as={GiHamburgerMenu}
                  onClick={onClose}
                  cursor={"pointer"}
                />
                <Flex flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Icon w={8} h={8} color="red" as={IoLogoYoutube} />
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="3xl"
                    fontFamily="sans-serif"
                    letterSpacing="-3px">
                    YouTube
                  </Text>
                </Flex>
              </HStack>
            </DrawerHeader>

            <DrawerBody bg={"blackAlpha.900"}>
              <Box>
                <ul style={{ borderBottom: "1px solid grey " }}>
                  {mainLinks.map(({ icon, name }, i) => {
                    return (
                      <Flex
                        cursor={"pointer"}
                        py={"0.2vw"}
                        px={"1.5vw"}
                        alignItems="center"
                        bg="blackAlpha.100"
                        key={i}
                        borderRadius={"base"}
                        _hover={{
                          backgroundColor: "grey",
                          width: "full",
                          px: "1vw",
                        }}>
                        {/* <Text key={name}> */}
                        {name === "Home"}
                        <Icon
                          color="whiteAlpha.900"
                          mt={2}
                          w={8}
                          h={8}
                          mr={"2vw"}>
                          {icon}
                        </Icon>
                        <span style={{ color: "white" }}>{name}</span>
                        {/* </Text> */}
                      </Flex>
                    );
                  })}
                </ul>

                <ul
                  style={{
                    borderBottom: "1px solid grey ",
                    paddingBottom: "2px",
                    paddingTop: "2px",
                  }}>
                  {secondaryLinks.map(({ icon, name }, i) => {
                    return (
                      <Flex
                        cursor={"pointer"}
                        py={"0.2vw"}
                        px={"1.5vw"}
                        alignItems="center"
                        bg="blackAlpha.100"
                        key={i}
                        borderRadius={"base"}
                        _hover={{
                          backgroundColor: "grey",
                          width: "full",
                          px: "1vw",
                        }}>
                        {/* <Text key={name}> */}
                        {name === "Home"}
                        <Icon
                          color="whiteAlpha.900"
                          mt={2}
                          w={8}
                          h={8}
                          mr={"2vw"}>
                          {icon}
                        </Icon>
                        <span style={{ color: "white" }}>{name}</span>
                        {/* </Text> */}
                      </Flex>
                    );
                  })}
                </ul>

                <ul
                  style={{
                    borderBottom: "1px solid grey ",
                    paddingBottom: "2px",
                    paddingTop: "2px",
                  }}>
                  {subscriptionLinks.map(({ icon, name }, i) => {
                    return (
                      <Flex
                        cursor={"pointer"}
                        py={"0.2vw"}
                        px={"1.5vw"}
                        alignItems="center"
                        bg="blackAlpha.100"
                        key={i}
                        borderRadius={"base"}
                        _hover={{
                          backgroundColor: "grey",
                          width: "full",
                          px: "1vw",
                        }}>
                        {/* <Text key={name}> */}
                        {name === "Home"}
                        <Icon
                          color="whiteAlpha.900"
                          mt={2}
                          w={8}
                          h={8}
                          mr={"2vw"}>
                          {icon}
                        </Icon>
                        <span style={{ color: "white" }}>{name}</span>
                        {/* </Text> */}
                      </Flex>
                    );
                  })}
                </ul>

                <ul style={{ paddingBottom: "2px", paddingTop: "2px" }}>
                  {helpLinks.map(({ icon, name }, i) => {
                    return (
                      <Flex
                        cursor={"pointer"}
                        py={"0.2vw"}
                        px={"1.5vw"}
                        alignItems="center"
                        bg="blackAlpha.100"
                        key={i}
                        borderRadius={"base"}
                        _hover={{
                          backgroundColor: "grey",
                          width: "full",
                          px: "1vw",
                        }}>
                        {/* <Text key={name}> */}
                        {name === "Home"}
                        <Icon
                          color="whiteAlpha.900"
                          mt={2}
                          w={8}
                          h={8}
                          mr={"2vw"}>
                          {icon}
                        </Icon>
                        <span style={{ color: "white" }}>{name}</span>
                        {/* </Text> */}
                      </Flex>
                    );
                  })}
                </ul>
              </Box>
            </DrawerBody>
            <Divider color={"white"} />
            <DrawerFooter bg={"blackAlpha.900"} justifyContent={"center"}>
              <HStack
                borderRadius={"base"}
                justifyContent={"space-between"}
                py={1}
                w={"full"}
                onClick={onOpen}
                cursor={"pointer"}
                _hover={{
                  backgroundColor: "grey",
                  width: "full",
                  px: "1vw",
                }}>
                <Text color={"white"}>Show More</Text>
                <Icon
                  w={7}
                  h={8}
                  color="white"
                  as={BsChevronDown}
                  ref={btnRef}
                  onClick={onOpen}
                  cursor={"pointer"}
                />
              </HStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
