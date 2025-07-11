import { useEffect, useState } from "react";
import { Button } from "../components/Buttons";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcons } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import BACKEND_URL from "../config";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<"twitter" | "youtube" | "all">("all");
  // @ts-ignore
  const { contents, refresh } = useContent();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");



  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/brain/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      refresh();
    } catch (error) {
      console.error("Failed to delete content", error);
    }
  };
   const filteredContents =
    filterType === "all" ? contents : contents.filter((item) => item.type === filterType);

  const handleShareNotes = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.hash) {
        const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

        await navigator.clipboard.writeText(shareUrl);
        setAlertMessage("Link copied to clipboard!");
        setShowAlert(true);
        // Clear message after 2 seconds
        setTimeout(() => setShowAlert(false), 2000);
      } else {
        setAlertMessage("Brain is now private.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      }
    } catch (err) {
      console.error("Sharing failed", err);
      setAlertMessage("Failed to share.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  }

  return (
    <div>
     <Sidebar setFilterType={setFilterType} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcons />}
          ></Button>

          <Button
            onClick={handleShareNotes}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        {showAlert && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-all animate-fade-in-out z-50">
            {alertMessage}
          </div>
        )}

        <div className="flex gap-4 flex-wrap pt-5">
          {filteredContents.map(({ _id, type, title, link }) => (
            <Card
              key={_id}
              id={_id}
              title={title}
              type={type}
              link={link}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
