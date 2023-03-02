declare global {
  type Recordable<T = any> = Record<string, T>
  declare interface ImportMetaEnv {
    VITE_APP_ENV: string
    VITE_PUBLIC_PATH: string
  }
}

export {}