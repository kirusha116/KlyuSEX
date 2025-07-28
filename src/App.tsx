import type { Records } from "./models/Records";
import { states } from "@/constants/states";
import { labels } from "@/constants/labels";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { getHistory } from "./utils/getHistory";
import { Button } from "./components/ui/button";
import { AddInterface } from "./components/AddInterface/AddInterface";
import { saveHistory } from "./utils/saveHistory";
import { useMediaQuery } from "@mui/material";
// import { MobileMainContent } from "./components/MainContent/MobileMainContent";
import { DesktopMainContent } from "./components/MainContent/DesktopMainContent";
import { getDatesArray, makeChartData } from "./utils/makeChartData";
import { MobileMainContent } from "./components/MainContent/MobileMainContent";

function App() {
  const [history, setHistory] = useState<Records[]>(getHistory());
  const lastMeasures = history.at(-1);
  const [selectedState, setSelectedState] = useState<string>(states.Weight);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery<boolean>("(min-width: 768px)");
  const datesArray = getDatesArray(
    history[0]?.date,
    history[history?.length - 1]?.date
  );
  const chartData = makeChartData(
    datesArray as string[],
    history,
    selectedState
  );

  // console.log(JSON.parse(localStorage.getItem("KlyuSEX")));
  // console.log(history);

  return (
    <div className="flex flex-col justify-between h-screen w-full md:container xl:max-w-7xl m-auto">
      <Header
        className="relative mx-4"
        mainText={labels[selectedState]}
        setSelectedState={setSelectedState}
        labels={labels}
        openModal={() => setIsAddOpen(true)}
        isDesktop={isDesktop}
      />

      {/* Контент для ПК */}
      {lastMeasures && isDesktop && (
        <DesktopMainContent
          lastMeasures={lastMeasures}
          selectedState={selectedState}
          chartData={chartData}
        />
      )}

      {/* Контент для мобилки */}
      {lastMeasures && !isDesktop && (
        <MobileMainContent
          lastMeasures={lastMeasures}
          selectedState={Object.values(states).indexOf(selectedState)}
          setSelectedState={(index: number) =>
            setSelectedState(Object.values(states)[index])
          }
          history={history}
          chartData={chartData}
        />
      )}

      {/* Очистка памяти */}
      <div className="w-full">
        <Button
          onClick={() => {
            localStorage.removeItem("KlyuSEX");
            location.reload();
          }}
          className="m-auto mt-10"
        >
          Очистить
        </Button>
      </div>

      <AddInterface
        isOpen={isAddOpen}
        onOpenChange={(state: boolean) => setIsAddOpen(state)}
        save={(newMeasures: Records) => {
          const newHistory = [...history, newMeasures];
          setHistory(newHistory);
          saveHistory(newHistory);
        }}
        isDesktop={isDesktop}
        {...lastMeasures}
      />
    </div>
  );
}

export default App;
