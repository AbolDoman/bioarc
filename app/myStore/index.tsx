import { create } from "zustand";
import { DEFAULT_PATIENT_INDEX, patientsName } from "../assets/data/consts";
interface BearState {
  selectedPatientId: string;
  // Actions
  setSelectedPatientId: (value: any) => void;
}
const useBearStore = create<BearState>((set) => ({
  // Initial state
  selectedPatientId: patientsName[DEFAULT_PATIENT_INDEX].id,
  // Actions
  setSelectedPatientId: (value: any) => set({ selectedPatientId: value }),
}));
export default useBearStore;
