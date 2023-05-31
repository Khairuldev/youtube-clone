import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = "AIzaSyAhUXje8N7vtawV9uSa5UQAg7n51PWKx0s";

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q=reactjs projects&key=AIzaSyAhUXje8N7vtawV9uSa5UQAg7n51PWKx0s&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
