import { MdSubscriptions } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { Box, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";

export default function Sidebar() {
  const mainLinks = [
    {
      icon: <AiFillHome className="text-xl" />,
      name: "Home",
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "Subscriptions",
    },

    {
      icon: <SiYoutubestudio className="text-xl" />,
      name: "Shorts",
    },

    {
      icon: <MdVideoLibrary className="text-xl" />,
      name: "Library",
    },
  ];

  return (
    <Box h={"100vh"} w={"9vw"} bg="#212121" overflow-auto pt={3} pb={8}>
      <Box py={"1vw"} px={"1vw"}>
        <ul>
          {mainLinks.map(({ icon, name }) => (
            <Grid
              justifyContent={"center"}
              _hover={{ backgroundColor: "grey" }}
              cursor={"pointer"}
              borderRadius={"2xl"}
              h={"12vh"}
              py={"1vw"}>
              <GridItem textAlign={"center"}>
                <Icon color="whiteAlpha.900" w={10} h={10} ml={"10px"}>
                  {icon}
                </Icon>
                <Text
                  key={name}
                  fontSize={"xs"}
                  color={"white"}
                  textAlign={"center"}>
                  {name}
                </Text>
              </GridItem>
            </Grid>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
