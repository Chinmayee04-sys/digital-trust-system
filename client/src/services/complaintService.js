import api from "./api";

export const getMyComplaints = async () => {
  const res = await api.get("/complaints/my");
  return res.data;
};

export const getComplaintById = async (id) => {
  const res = await api.get(`/complaints/${id}`);
  return res.data;
};
export const createComplaint = async (data) => {
  return api.post("/complaints", data);
};