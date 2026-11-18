// Recruiter-side API calls. Endpoint and headers are unchanged from the
// original inline fetch in the dashboard.
const baseUrl = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("RecruiterAccessToken")}`,
});

export const fetchRecruiterJobs = async (recruiterId) => {
  const response = await fetch(`${baseUrl}/company/jobs/${recruiterId}`, {
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch jobs");
    error.isApiError = true;
    throw error;
  }
  return data.myJobs || [];
};
