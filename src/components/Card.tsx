import {
  Avatar,
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HomePageVideos } from "../types";
import { parseVideoDuration } from "../utils";

const Card = ({ data }: { data: HomePageVideos }) => {
  const isData = data ? true : false;
  return (
    <Box cursor={"pointer"}>
      <Flex position="relative">
        <Badge position={"absolute"} ml={"16vw"} mt={"10vw"}>
          {data.videoDuration}
        </Badge>
        <Link to={`/watch/${data.videoId}`}>
          <Img
            src={data.videoThumbnail}
            h={"auto"}
            w={"full"}
            alt="thumbnail"
            objectFit={"contain"}
            borderRadius={"2xl"}
          />
        </Link>
      </Flex>
      {/* <Box> */}
      <Flex px={2} py={3}>
        <Image
          src={data.channelInfo.image}
          rounded={"full"}
          boxSize={"35px"}
          alt="channel"
        />
        <Box ml="3">
          <Text fontWeight="bold" color={"white"} fontSize={"15px"}>
            {data.videoTitle}
          </Text>
          <Text fontSize="12px" color={"gray"} pt={2}>
            {data.channelInfo.name}
          </Text>
          <Text fontSize="12px" color={"gray"}>
            {data.videoViews} views. {data.videoAge}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;
