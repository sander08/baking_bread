import React from "react";
import { inject, observer } from "mobx-react";
import { CookieService } from "../services/CookieService";

import "../styles/views/WorkBoard.scss";

import Button from "../components/Button";
import Input from "../components/Input";
import Chart from "../components/Chart";
import Table from "../components/Table";

interface PumpProps {
  isWorking: boolean;
  style?: React.CSSProperties;
}
interface ValveProps {
  isWorking: boolean;
  style?: React.CSSProperties;
}

const Pump: React.FC<PumpProps> = (props) => {
  return (
    <div
      className={`Mimic__pump  ${props.isWorking ? "working" : ""}`}
      style={{ ...props.style }}
    >
      <div></div>
    </div>
  );
};
const Valve: React.FC<ValveProps> = (props) => {
  return (
    <div
      className={`Mimic__valve  ${props.isWorking ? "working" : ""}`}
      style={{ ...props.style }}
    >
      <div className="first"></div>
      <div className="second"></div>
    </div>
  );
};

const WorkBoard: React.FC = inject(
  "WorkBoardStore",
  "LoginStore"
)(
  observer(({ WorkBoardStore, LoginStore }: any) => {
    !WorkBoardStore.isCurrentLoaded &&
      !WorkBoardStore.isCurrentPending &&
      WorkBoardStore.getCurrentData();
    !WorkBoardStore.isOptimalLoaded &&
      !WorkBoardStore.isOptimalPending &&
      WorkBoardStore.getOptimalData();

    return (
      <div className="WorkBoard">
        <div className="WorkBoard__shema">
                <div className="WorkBoard__shema__name">Baking bread</div>
          <div className="WorkBoard__shema__graphic">
            <div className="Mimic">
              <div className="Mimic__pipe p1"></div>
              <div className="Mimic__pipe p2"></div>
              <div className="Mimic__tank">
                <div className="Mimic__tank__level">
                  <div
                    className="bread"
                    style={{ height: `${WorkBoardStore.currentLevel}%` }}
                  ></div>
                </div>
              </div>

              <Pump
                isWorking={WorkBoardStore.mimic.pumpIn}
                style={{ top: "75px", left: "10px" }}
              />
              <Valve
                isWorking={WorkBoardStore.mimic.valveIn}
                style={{ top: "90px", left: "230px" }}
              />
              <Pump
                isWorking={WorkBoardStore.mimic.pumpOut}
                style={{ bottom: "35px", right: "10px" }}
              />
              <Valve
                isWorking={WorkBoardStore.mimic.valveOut}
                style={{ bottom: "60px", right: "230px" }}
              />
              <div className="Mimic__params">
                <Input
                  disabled
                  type="text"
                  name="Current temperature:"
                  style={{ width: "150px", height: "32px" }}
                  value={`${WorkBoardStore.currentTemperature}℃`}
                  onChange={() => {}}
                />
                <Input
                  disabled
                  type="text"
                  name="Current bread level:"
                  style={{ width: "150px", height: "32px" }}
                  value={`${WorkBoardStore.currentLevel}%`}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="Chart">
              <Chart data={WorkBoardStore.chart ? WorkBoardStore.chart : []} />
            </div>
            <div className="EventLog">
              {WorkBoardStore.update}
              <Table
                KEY="l_ID"
                style={{ width: "100%", height: "100%" }}
                config={[
                  {
                    key: 1,
                    name: "User ID",
                    varName: "c_ID",
                  },
                  {
                    key: 2,
                    name: "Element ID",
                    varName: "e_ID",
                    template: (id: number) => {
                      if (id === 2000) return "Input Valve";
                      if (id === 2001) return "Output Valve";
                      if (id === 3003) return "Input Pump";
                      if (id === 3004) return "Output Pump";
                    },
                  },
                  {
                    key: 3,
                    name: "Status",
                    varName: "status",
                  },
                  {
                    key: 4,
                    name: "Time",
                    varName: "time",
                    template: (time: string) => {
                      return time.split("T")[1];
                    },
                  },
                ]}
                data={WorkBoardStore.eventLog ? WorkBoardStore.eventLog : []}
              />
            </div>
          </div>
        </div>
        <div className="WorkBoard__params">
          <div className="WorkBoard__params__inputs">
            <h1>Parameters</h1>
            <Input
              type="text"
              disabled={CookieService.get("role") !== "admin"}
              name="Optimal temperature:"
              placeholder=""
              style={{ width: "100%", height: "32px" }}
              value={WorkBoardStore.optimalTemperature}
              onChange={(e) => {
                WorkBoardStore.onOTChange(e.target.value);
              }}
            />
            <Input
              type="text"
              disabled={CookieService.get("role") !== "admin"}
              name="Optimal breat temerature:"
              placeholder=""
              style={{ width: "100%", height: "32px" }}
              value={WorkBoardStore.optimalLevel}
              onChange={(e) => {
                WorkBoardStore.onOLChange(e.target.value);
              }}
            />
            <Button
              // disabled={LoginStore.role!=="admin"}
              text="Refresh optimal parameters"
              style={{ width: "100%", height: "32px", marginTop: "15px" }}
              onClick={() => {
                WorkBoardStore.refreshOptimalData();
              }}
            />
            <Button
              disabled={CookieService.get("role") !== "admin"}
              text="Change optimal parameters"
              style={{ width: "100%", height: "32px", marginTop: "15px" }}
              onClick={() => {
                WorkBoardStore.updateOptimalData();
              }}
            />
            <Button
              text={WorkBoardStore.isProcessRuning ? "Stop" : "Start"}
              style={{
                width: "269px",
                height: "269px",
                marginTop: "100px",
                borderRadius: "50%",
                fontSize: "36px",
              }}
              onClick={() => {
                WorkBoardStore.onStartHandler();
              }}
            />
          </div>
          <Button
            text="Log Out"
            style={{ width: "100%", height: "32px" }}
            onClick={() => {
              WorkBoardStore.stopPasteurization();
              LoginStore.handleLogOut();
            }}
          />
        </div>
      </div>
    );
  })
);

export default WorkBoard;
