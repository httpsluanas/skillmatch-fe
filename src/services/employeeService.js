import { apiFetch } from './api'

export function fetchEmployees() {
  return apiFetch('/employees')
}