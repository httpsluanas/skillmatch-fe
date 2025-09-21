import { apiFetch } from './api'

export function fetchSkills() {
  return apiFetch('/skills')
}