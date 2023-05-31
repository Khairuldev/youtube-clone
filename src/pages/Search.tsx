import { Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import Sidebar from "../components/Sidebar";
import Spiner from "../components/Spinner";
import { clearVideos } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { useAppDispatch, useAppSelector } from "../store/reducers/hook";
import { HomePageVideos } from "../types";

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);
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
            next={() => dispatch(getSearchPageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spiner />}
            height={650}>
            <Grid templateColumns="repeat(1, 1fr)" gap={3} py={5}>
              {videos.map((item: HomePageVideos) => {
                return (
                  <GridItem>
                    <SearchCard data={item} key={item.videoId} />
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
