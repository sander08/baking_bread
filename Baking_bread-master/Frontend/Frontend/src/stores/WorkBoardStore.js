import { types } from "mobx-state-tree";
import ApiClient from "../services/ApiClient";
import { CookieService } from "../services/CookieService";
// import { routingStore } from "../index";
// import ApiClient from "../services/ApiClient";
// import FieldValidator from "../services/FieldValidator";
// import UserService from "../services/UserService";

const LogData = types.model({
  l_ID: types.optional(types.number, 0),
  c_ID: types.optional(types.number, 0),
  e_ID: types.optional(types.number, 0),
  status: types.optional(types.number, 0),
  time: types.optional(types.string, ""),
});

const ChartData = types.model({
  x: types.optional(types.number, 0),
  y: types.optional(types.number, 0),
});

const MimicData = types
  .model({
    valveIn: types.optional(types.boolean, false),
    valveOut: types.optional(types.boolean, false),
    pumpIn: types.optional(types.boolean, false),
    pumpOut: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    editValve(type, value) {
      if (type === "in") {
        self.valveIn = value;
      } else if (type === "out") {
        self.valveOut = value;
      }
    },
    editPump(type, value) {
      if (type === "in") {
        self.pumpIn = value;
      } else if (type === "out") {
        self.pumpOut = value;
      }
    },
  }));

const WorkBoardStore = types
  .model({
    mimic: types.optional(MimicData, {}),
    isCurrentLoaded: types.optional(types.boolean, false),
    isCurrentPending: types.optional(types.boolean, false),
    isOptimalLoaded: types.optional(types.boolean, false),
    isOptimalPending: types.optional(types.boolean, false),

    eventLog: types.array(LogData),
    update: types.optional(types.boolean, false),

    chart: types.array(ChartData),
    iterator: types.optional(types.number, 0),

    optimalTemperature: types.optional(types.number, 0),
    optimalLevel: types.optional(types.number, 0),
    currentTemperature: types.optional(types.number, 0),
    currentLevel: types.optional(types.number, 0),

    isProcessRuning: types.optional(types.boolean, false),
    PTimer: types.optional(types.number, 0),
  })
  .actions((self) => ({
    pushToChart(value) {
      self.chart = [...self.chart, { x: self.iterator, y: value }];
      self.iterator = self.iterator + 1;
    },
    clearChart() {
      self.chart = [];
    },
    setEventLog(data) {
      self.eventLog = data;
      self._update();
    },
    _update() {
      self.update = !self.update;
    },
    getCurrentData() {
      self.setIsCurrentPending(true);
      ApiClient.post("/api/Parameters/StarterRequest")
        .then((res) => {
          self.setCurrentData(res.data);
          if (self.currentTemperature !== 15 || self.currentLevel !== 0) {
            self.startPasteurization();
          }
          self.setIsCurrentLoaded(true);
          self.setIsCurrentPending(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setCurrentData(array) {
      array.forEach((el) => {
        if (el.p_ID === 3000) {
          self.currentTemperature = Math.ceil(el.value);
          self.pushToChart(self.currentTemperature);
        } else if (el.p_ID === 3001) {
          self.currentLevel = el.value;
        }
      });
      if (
        self.currentLevel < self.optimalLevel &&
        self.currentTemperature !== self.optimalTemperature &&
        !self.mimic.pumpIn &&
        !self.mimic.valveIn
      ) {
        self.mimic.pumpIn = true;
        self.mimic.valveIn = true;
        let I = new FormData();
        I.append("E_ID1", 2000);
        I.append("E_ID2", 3003);
        I.append("Status", 1);
        ApiClient.post("/api/Elements/UpdateStatus", I)
          .then((res) => {
            self.setEventLog(res.data);
          })
          .catch((err) => {});
        console.log("IO");
      } else if (
        self.currentLevel >= self.optimalLevel &&
        self.mimic.pumpIn &&
        self.mimic.valveIn
      ) {
        self.mimic.pumpIn = false;
        self.mimic.valveIn = false;
        let I = new FormData();
        I.append("E_ID1", 2000);
        I.append("E_ID2", 3003);
        I.append("Status", 0);
        ApiClient.post("/api/Elements/UpdateStatus", I)
          .then((res) => {
            self.setEventLog(res.data);
          })
          .catch((err) => {});
        console.log("IC");
      }

      if (
        self.currentTemperature === self.optimalTemperature &&
        !self.mimic.valveOut &&
        !self.mimic.pumpOut
      ) {
        self.mimic.valveOut = true;
        self.mimic.pumpOut = true;
        let O = new FormData();
        O.append("E_ID1", 2001);
        O.append("E_ID2", 3004);
        O.append("Status", 1);
        ApiClient.post("/api/Elements/UpdateStatus", O)
          .then((res) => {
            self.setEventLog(res.data);
          })
          .catch((err) => {});
        console.log("OO");
      } else if (
        self.currentTemperature < self.optimalTemperature &&
        self.mimic.valveOut &&
        self.mimic.pumpOut
      ) {
        self.clearChart();
        self.mimic.valveOut = false;
        self.mimic.pumpOut = false;
        let O = new FormData();
        O.append("E_ID1", 2001);
        O.append("E_ID2", 3004);
        O.append("Status", 0);
        ApiClient.post("/api/Elements/UpdateStatus", O)
          .then((res) => {
            self.setEventLog(res.data);
          })
          .catch((err) => {});
        console.log("OC");
      }
    },
    refreshOptimalData() {
      CookieService.delete("optimalTemperature");
      CookieService.delete("optimalLevel");
      self.setIsOptimalLoaded(false);
    },
    getOptimalData() {
      self.setIsOptimalPending(true);
      let opT = parseInt(CookieService.get("optimalTemperature"));
      let opL = parseInt(CookieService.get("optimalLevel"));
      if (Number.isNaN(opT) || Number.isNaN(opL)) {
        ApiClient.post("/api/Parameters/GetOptimalParameters")
          .then((res) => {
            let temp, level;
            res.data.forEach((el) => {
              if (el.p_ID === 3000) {
                temp = el.optimal_value;
              } else if (el.p_ID === 3001) {
                level = el.optimal_value;
              }
            });
            CookieService.set("optimalTemperature", temp);
            CookieService.set("optimalLevel", level);
            self.setOptimalData(temp, level);
            self.setIsOptimalLoaded(true);
            self.setIsOptimalPending(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        self.setOptimalData(opT, opL);
        self.setIsOptimalLoaded(true);
        self.setIsOptimalPending(false);
      }
    },
    setOptimalData(temperature, level) {
      self.optimalTemperature = temperature;
      self.optimalLevel = level;
    },
    onOTChange(value) {
      let v = parseInt(value);
      if (Number.isInteger(v)) self.optimalTemperature = v;
    },
    onOLChange(value) {
      let v = parseInt(value);
      if (Number.isInteger(v)) self.optimalLevel = v;
    },
    updateOptimalData() {
      let obj = new FormData();
      obj.append("level", self.optimalLevel);
      obj.append("temperature", self.optimalTemperature);

      ApiClient.post("/api/Parameters/EditOptimalParameters", obj).then(
        (res) => {
          self.setOptimalData(res.data[0], res.data[1]);
        }
      );
    },
    setIsCurrentLoaded(value) {
      self.isCurrentLoaded = value;
    },
    setIsCurrentPending(value) {
      self.isCurrentPending = value;
    },
    setIsOptimalLoaded(value) {
      self.isOptimalLoaded = value;
    },
    setIsOptimalPending(value) {
      self.isOptimalPending = value;
    },
    startPasteurization() {
      let i = 0;
      self.PTimer = setInterval(() => {
        if (self.currentTemperature === 15) i = 0;
        i++;
        let data = new FormData();
        data.append("level", self.currentLevel);
        data.append("temperature", self.currentTemperature);
        data.append("i", i);
        ApiClient.post("/api/Parameters/AutoMode", data)
          .then((res) => {
            self.setCurrentData(res.data);
          })
          .catch();
      }, 1000);
      self.isProcessRuning = true;
    },
    stopPasteurization() {
      if (self.PTimer !== 0) {
        clearInterval(self.PTimer);
        self.isProcessRuning = false;
        if (self.mimic.pumpIn && self.mimic.valveIn) {
          self.mimic.pumpIn = false;
          self.mimic.valveIn = false;

          let I = new FormData();
          I.append("E_ID1", 2000);
          I.append("E_ID2", 3003);
          I.append("Status", 0);
          ApiClient.post("/api/Elements/UpdateStatus", I)
            .then((res) => {
              self.setEventLog(res.data);
            })
            .catch((err) => {});
        }

        if (self.mimic.pumpOut && self.mimic.valveOut) {
          self.mimic.pumpOut = false;
          self.mimic.valveOut = false;

          let O = new FormData();
          O.append("E_ID1", 2001);
          O.append("E_ID2", 3004);
          O.append("Status", 0);
          ApiClient.post("/api/Elements/UpdateStatus", O)
            .then((res) => {
              self.setEventLog(res.data);
            })
            .catch((err) => {});
        }
      }
    },
    onStartHandler() {
      if (self.isProcessRuning) {
        self.stopPasteurization();
      } else {
        self.startPasteurization();
      }
    },
  }));

export default WorkBoardStore.create();
