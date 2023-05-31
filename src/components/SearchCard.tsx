import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { HomePageVideos } from "../types";
// import { parseVideoDuration } from "../utils";

const SearchCard = ({ data }: { data: HomePageVideos }) => {
  const isData = data ? true : false;
  return (
    <Box cursor={"pointer"}>
      {/* <Grid> */}
      <Stack direction={"row"}>
        <GridItem width={"50%"}>
          <Flex position="relative" p={"0.5vw"} width={"auto"}>
            <Badge position={"absolute"} ml={"23vw"} mt={"14vw"}>
              {data.videoDuration}
            </Badge>
            <Link to={`/watch/${data.videoId}`}>
              <Img
                src={data.videoThumbnail}
                h={"auto"}
                w={"30vw"}
                alt="thumbnail"
                objectFit={"cover"}
                backgroundRepeat={"no-repeat"}
                borderRadius={"2xl"}
              />
            </Link>
          </Flex>
        </GridItem>
        <GridItem width={"100%"}>
          <Flex width={"auto"} height={"16vw"}>
            <Box>
              <Text fontWeight="bold" color={"white"} fontSize={"18px"}>
                {data.videoTitle}
              </Text>
              <Text fontSize="12px" color={"gray"}>
                {data.videoViews} views. {data.videoAge}
              </Text>
              <HStack py={"1vw"}>
                <Image
                  src={data.channelInfo.image}
                  rounded={"full"}
                  boxSize={"35px"}
                  alt="channel"
                />

                <Text fontSize="12px" color={"gray"} pt={2}>
                  {data.channelInfo.name}
                </Text>
              </HStack>
              <Text fontSize="12px" color={"gray"}>
                {data.videoDescription}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Stack>
      {/* </Grid> */}
    </Box>
  );
};

export default SearchCard;
