export interface DashboardStore {
  sidebarState: boolean
  toggleSidebar: () => void
}

export const dashboardStore: DashboardStore = {
  sidebarState: true,
  toggleSidebar: () => {},
}
