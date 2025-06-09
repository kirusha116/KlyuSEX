import type { Records } from "./models/Records";
import { states } from "@/constants/states";
import { labels } from "@/constants/labels";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { getHistory } from "./utils/getHistory";
import { Button } from "./components/ui/button";
import { AddInterface } from "./components/AddInterface/AddInterface";
import { saveHistory } from "./utils/saveHistory";
import { getUnit } from "./utils/getUnit";

function App() {
  const [history, setHistory] = useState<Records[]>(getHistory());
  const lastMeasures = history.at(-1);
  const [selectedState, setSelectedState] = useState<string>(states.Weight);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  // console.log(JSON.parse(localStorage.getItem("KlyuSEX")));
  // console.log(history);

  return (
    <div className="container max-w-7xl m-auto">
      <Header
        mainText={labels[selectedState]}
        setSelectedState={setSelectedState}
        labels={labels}
        openModal={() => setIsAddOpen(true)}
      />

      <Button
        onClick={() => {
          localStorage.removeItem("KlyuSEX");
          location.reload();
        }}
        className="m-auto mt-10"
      >
        Очистить
      </Button>

      {lastMeasures && (
        <h2 className="text-primary text-5xl text-center">
          {`${lastMeasures[selectedState]} ${
            selectedState === states.MetabolicAge
              ? getUnit(selectedState, +lastMeasures[states.MetabolicAge])
              : getUnit(selectedState)
          }`}
        </h2>
      )}

      <AddInterface
        isOpen={isAddOpen}
        onOpenChange={(state: boolean) => setIsAddOpen(state)}
        save={(newMeasures: Records) => {
          const newHistory = [...history, newMeasures];
          setHistory(newHistory);
          saveHistory(newHistory);
        }}
        {...lastMeasures}
      />
    </div>
  );
}

export default App;
