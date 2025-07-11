import axios from "axios";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config";

// ✅ Define the structure of a content item
type ContentItem = {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
};

// ✅ Define the shape of the expected response
type ContentResponse = {
  content: ContentItem[];
};

export const useContent = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);

  function refresh() {
    axios
      .get<ContentResponse>(`${BACKEND_URL}/api/v1/brain/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => setContents(response.data.content))
      .catch((err) => {
        console.error("Failed to fetch content", err);
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh };
};
