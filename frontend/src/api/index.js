const api_url = import.meta.env.VITE_API_URL;

export const api_request = async (endpoint, method = "GET", body = null, token = null) =>
{
    const headers = { "Content-Type": "application/json" };

    if (token)
        headers["Authorization"] = `Bearer ${token}`;
    
    const options = { method, headers };

    if (body)
        options.body = JSON.stringify(body);
    
    const response = await fetch(`${api_url}${endpoint}`, options);

    const content_type = response.headers.get('content-type');
    if (content_type && content_type.includes('application/json'))
    {
        const data = await response.json();

        if (!response.ok)
        {
            if (response.status === 400 && data.errors && data.errors.length > 0)
            {
                const validation_errors = data.errors.map(err => err.msg).join('; ');
                throw new Error(validation_errors);
            }
            throw new Error(data.message || "An error occurred");
        }

        return data;
    }
    else
    {
        const text_data = await response.text();
        throw new Error(`Server responded with non-JSON content (Status: ${response.status}): ${text_data.substring(0, 100)}...`);
    }
};
