import { apiFetch } from './api'

export function fetchProjects() {
    return apiFetch('/projects')
}

export function saveProject(project) {
    return apiFetch('/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    })
}

export function deleteProject(projectId) {
    return apiFetch(`/projects/${projectId}`, {
        method: 'DELETE',
    })
}

export function fetchProjectRecommendation(projectId, recommendationType) {
    return apiFetch(`/projects/recommendations/${projectId}?recommendationType=${recommendationType}`)
}