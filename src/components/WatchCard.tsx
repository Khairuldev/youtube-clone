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
import { RecommendedVideos } from "../types";
// import { parseVideoDuration } from "../utils";

const WatchCard = ({ data }: { data: RecommendedVideos }) => {
  const isData = data ? true : false;
  return (
    <Box cursor={"pointer"}>
      {/* <Grid> */}
      <Stack direction={"row"} py={"0.3vw"}>
        <GridItem width={"80%"}>
          <Flex position="relative" width={"auto"}>
            <Link to={`/watch/${data.videoId}`}>
              <Badge position={"absolute"} ml={"11.3vw"} mt={"7.3vw"}>
                {data.videoDuration}
              </Badge>
              <Img
                src={data.videoThumbnail}
                h={"auto"}
                w={"40vw"}
                alt="thumbnail"
                objectFit={"cover"}
                backgroundRepeat={"no-repeat"}
                borderRadius={"lg"}
              />
            </Link>
          </Flex>
        </GridItem>
        <GridItem width={"100%"}>
          <Flex width={"auto"} height={"auto"}>
            <Box>
              <Text fontWeight="bold" color={"white"} fontSize={"15px"}>
                {data.videoTitle}
              </Text>
              <Text
                fontSize="13px"
                color={"gray"}
                pt={"0.8vh"}
                fontWeight="bold">
                {data.channelInfo.name}
              </Text>
              <Text fontSize="13px" color={"gray"} fontWeight="bold">
                {data.videoViews} views. {data.videoAge}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Stack>
      {/* </Grid> */}
    </Box>
  );
};

export default WatchCard;
