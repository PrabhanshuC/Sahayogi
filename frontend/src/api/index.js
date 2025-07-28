const api_url = import.meta.env.VITE_API_URL;

export const api_request =
async (endpoint, method = "GET", body = null, token = null) =>
{
    const headers = { "Content-Type": "application/json" };

    if (token)
        headers["Authorization"] = `Bearer ${token}`;
    
    const options = { method, headers };

    if (body)
        options.body = JSON.stringify(body);
    
    const response = await fetch(`${api_url}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok)
        throw new Error(data.message || "An error occurred");
    
    return data;
};
