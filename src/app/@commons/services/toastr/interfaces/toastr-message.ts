export interface ToastrMessageInterface {
  success?: boolean
  info?: boolean
  warning?: boolean
  error?: boolean
  message?: string
  title?: string
  type?: 'success' | 'info' | 'warning' | 'danger' | 'default'
  customDuration?: number
}
