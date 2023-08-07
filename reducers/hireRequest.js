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
    dpRequestStatus: false,
    drhRequestStatus: false,
    dafRequestStatus: false,
    pdgRequestStatus: false,
    globalRequestStatus: false,
    dpComment: "",
    drhComment: "",
    dafComment: "",
    pdgComment: "",
    pourcentageWorkTime: 0,
    contractReason: "",
    startDateContract: null,
    endDateContract: null,
    durationContractDay: 0,
    durationContractMonth: 0,
    minimumWage: 0,
    maximumWage: 0,
    monthlyVariableWage: false,
    monthlyVariableWageAmount: 0,
    annualVariableWage: false,
    annualVariableWageAmount: 0,
    moveAssist: false,
    annexDemand: "",
    //user_id: "",
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
  },
});

export const { addHireRequest } = userSlice.actions;
export default userSlice.reducer;
