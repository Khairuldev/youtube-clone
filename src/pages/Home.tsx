import { Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spiner from "../components/Spinner";
import { clearVideos } from "../store";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { useAppDispatch, useAppSelector } from "../store/reducers/hook";
import { HomePageVideos } from "../types";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"60px 1fr 30px"}
      gridTemplateColumns={"100px 1fr"}
      h="full"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold">
      <GridItem area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem area={"main"} p={"1vw"} bg="#212121">
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spiner />}
            height={650}>
            <Grid templateColumns="repeat(4, 1fr)" gap={5} py={5}>
              {videos.map((item: HomePageVideos) => {
                return (
                  <GridItem>
                    <Card data={item} key={item.videoId} />
                  </GridItem>
                );
              })}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Center margin={"auto"} h="100px" py={"3vh"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red"
              size="xl"
            />
          </Center>
        )}
      </GridItem>
    </Grid>
  );
}
