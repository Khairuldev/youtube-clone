import {
  AspectRatio,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import WatchCard from "../components/WatchCard";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { useAppDispatch, useAppSelector } from "../store/reducers/hook";

const Watch = () => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommendedVideos
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <Box bg="#0f0f0f" h={"full"}>
          <Grid templateColumns="repeat(1, 1fr)" gap={1} color="blackAlpha.700">
            <GridItem w="100%">
              <Navbar />
            </GridItem>
            <Stack direction={"row"}>
              <GridItem w="60%" p={"1.5vw"}>
                <AspectRatio maxW="750px" maxH="420px" ratio={1}>
                  <iframe
                    title="Youtube Video Player"
                    src={`https://www.youtube.com/embed/${id}?autoplay-1`}
                    allowFullScreen
                  />
                </AspectRatio>
                {/* <Heading fontSize={"2xl"} color={"white"} py={"1vw"}></Heading> */}
                <Stack direction={"column"} py={2} width={"100%"}>
                  <Flex width={"100%"} height={"auto"}>
                    <Box width={"100%"}>
                      <Text fontWeight="bold" color={"white"} fontSize={"25px"}>
                        {currentPlaying.videoTitle}
                      </Text>
                      <HStack py={"1vw"} spacing={"2vw"}>
                        <Flex gap={"2.3vw"}>
                          <Image
                            src={currentPlaying.channelInfo.image}
                            rounded={"full"}
                            boxSize={"50px"}
                            alt="channel"
                          />
                          <Stack direction={"column"}>
                            <Text
                              fontSize="18px"
                              color={"white"}
                              fontWeight={"bold"}>
                              {currentPlaying.channelInfo.name}
                              <Text fontSize="15px" color={"grey"}>
                                {currentPlaying.channelInfo.subscribers}{" "}
                                .Subscribers
                              </Text>
                            </Text>
                          </Stack>

                          <Flex gap={9}>
                            <Button colorScheme="gray" borderRadius={"full"}>
                              Subscribe
                            </Button>
                            <Stack direction={"row"}>
                              <Flex
                                borderRadius={"full"}
                                gap={1}
                                h={"40px"}
                                bg={"#edf2f8"}
                                alignItems={"center"}>
                                <Button
                                  color={"grey"}
                                  borderLeftRadius={"full"}
                                  leftIcon={<BiLike />}
                                  colorScheme="#282c2a">
                                  {currentPlaying.videoLikes}
                                </Button>

                                <Divider orientation="vertical" />

                                <Button
                                  color={"grey"}
                                  colorScheme="#282c2a"
                                  borderRightRadius={"full"}>
                                  <BiDislike />
                                </Button>
                              </Flex>

                              <Button
                                leftIcon={<IoMdShareAlt />}
                                colorScheme="gray"
                                variant="solid"
                                borderRadius={"full"}>
                                Share
                              </Button>
                              <Button colorScheme="gray" borderRadius={"full"}>
                                ...
                              </Button>
                            </Stack>
                          </Flex>
                        </Flex>
                      </HStack>
                      <Box
                        bg={"#282b2a"}
                        borderRadius={"2xl"}
                        p={"1vw"}
                        width={"100%"}
                        overflow={"hidden"}>
                        <Collapse startingHeight={20} in={show}>
                          <pre
                            style={{
                              fontFamily: "sans-serif",
                              color: "white",
                            }}>
                            {currentPlaying.videoDescription}
                          </pre>
                        </Collapse>
                        <Button
                          rightIcon={<AiFillCaretDown />}
                          color={"white"}
                          variant={"none"}
                          size="sm"
                          onClick={handleToggle}
                          mt="1rem">
                          Show {show ? "Less" : "More"}
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Stack>
              </GridItem>
              <GridItem w={"37%"} h={"auto"} pt={"1.5vw"}>
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </GridItem>
            </Stack>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Watch;
