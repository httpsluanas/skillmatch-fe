const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch(url, options) {
    const response = await fetch(`${API_URL}${url}`, options)

    if (!response.ok) {
        const errorBody = await response.text()
        const errorMessage = errorBody || `Erro na requisição: ${response.statusText}`
        throw new Error(errorMessage)
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}