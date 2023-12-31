import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    numRequest: 0,
    goalRequest: "",
    nameReplacedPerson: "",
    lastnameReplacedPerson: "",
    job: "",
    newJob: "",
    classification: "",
    firstnameManager: "",
    lastnameManager: "",
    department: "",
    contractType: "",
    dateHireRequest: null,
    dpRequestStatus: 1,
    drhRequestStatus: 1,
    dafRequestStatus: 1,
    pdgRequestStatus: 1,
    globalRequestStatus: 1,
    dpComment: "",
    drhComment: "",
    dafComment: "",
    pdgComment: "",
    pourcentageWorkTime: null,
    contractReason: "",
    startDateContract: null,
    endDateContract: null,
    durationContractDay: 0,
    durationContractMonth: 0,
    minimumWage: null,
    maximumWage: null,
    monthlyVariableWage: false,
    monthlyVariableWageAmount: null,
    annualVariableWage: false,
    annualVariableWageAmount: null,
    moveAssist: false,
    annexDemand: "",
    user: "",
  },
};

export const userSlice = createSlice({
  name: "hireRequest",
  initialState,
  reducers: {
    addHireRequest: (state, action) => {
      const infoReceivedBySubmit = action.payload;
      for (const prop in infoReceivedBySubmit) {
        state.value[prop] = infoReceivedBySubmit[prop];
      }
      console.log("action.payload: ", action.payload);
      console.log("state.value: ", { ...state.value });
    },
    resetStore: () => {
      return initialState;
    },
  },
});

export const { addHireRequest, resetStore } = userSlice.actions;
export default userSlice.reducer;
