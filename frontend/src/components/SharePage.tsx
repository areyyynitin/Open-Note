import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import BACKEND_URL from "../config";

const SharePage = () => {
  const { hash } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchSharedBrain = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
      setUsername(res.data.username);
      setContent(res.data.content);
      setLoading(false);
    } catch (error) {
      setNotFound(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedBrain();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
          <div className="flex gap-4 flex-wrap justify-start pt-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-md shadow-md border border-gray-200 w-72 h-72"
              >
                <div className="h-5 bg-gray-200 m-4 rounded w-1/2" />
                <div className="h-48 bg-gray-100 m-4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-10 text-xl text-center text-red-500">
        Link not found or expired.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-left">
        {username}/notes
      </h1>

      <div className="flex flex-wrap gap-4 justify-start">
        {content.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            showDelete={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SharePage;
