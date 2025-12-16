import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import StreakCards from "@/components/StreakCards";
import { useMyContext } from "@/providers/ContextProvider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  const { streakLists, setstreakLists, hasHydrated, setHasHydrated } =
    useMyContext();
  useEffect(() => {
    if (streakLists.length <= 0) {
      // try get from local storage:
      const savedStreaks = localStorage.getItem("streaksDb");
      if (savedStreaks) {
        setstreakLists(JSON.parse(savedStreaks));
      }
      if (!hasHydrated) {
        setHasHydrated(true);
      }
    }
  }, []);

  return (
    hasHydrated && (
      <main className="">
        {streakLists.length <= 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4 pb-4">
            {streakLists.map((streak) => (
              <StreakCards key={streak.id} data={streak} />
            ))}
          </div>
        )}
        <div className="fixed bottom-8 right-8">
          {streakLists.length > 0 && (
            <Link to={"./add"}>
              <Button className={"rounded-full h-14 w-14 lg:hidden"}>
                <Plus className="size-6" />
              </Button>
            </Link>
          )}
        </div>
      </main>
    )
  );
};

export default Home;
