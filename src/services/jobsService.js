import { apiFetch } from './api'

export function fetchJobs() {
    return apiFetch('/jobs')
}

export function saveJob(job) {
    return apiFetch('/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
    })
}

export function deleteJob(jobId) {
    return apiFetch(`/jobs/${jobId}`, {
        method: 'DELETE',
    })
}