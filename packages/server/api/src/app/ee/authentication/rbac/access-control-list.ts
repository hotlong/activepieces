import { Permission, ProjectMemberRole } from '@activepieces/shared'

export const rolePermissions: Record<ProjectMemberRole, Permission[]> = {
    [ProjectMemberRole.ADMIN]: [
        Permission.READ_ACTIVITY,
        Permission.READ_APP_CONNECTION,
        Permission.WRITE_APP_CONNECTION,
        Permission.READ_FLOW,
        Permission.WRITE_FLOW,
        Permission.READ_PROJECT_MEMBER,
        Permission.WRITE_PROJECT_MEMBER,
        Permission.WRITE_RPOJECT,
        Permission.WRITE_GIT_REPO,
        Permission.READ_GIT_REPO,
    ],
    [ProjectMemberRole.EDITOR]: [
        Permission.READ_ACTIVITY,
        Permission.READ_APP_CONNECTION,
        Permission.WRITE_APP_CONNECTION,
        Permission.READ_FLOW,
        Permission.WRITE_FLOW,
        Permission.READ_PROJECT_MEMBER,
        Permission.WRITE_GIT_REPO,
        Permission.READ_GIT_REPO,
    ],
    [ProjectMemberRole.VIEWER]: [
        Permission.READ_ACTIVITY,
        Permission.READ_APP_CONNECTION,
        Permission.READ_FLOW,
        Permission.READ_PROJECT_MEMBER,
    ],
    [ProjectMemberRole.EXTERNAL_CUSTOMER]: [
        Permission.READ_ACTIVITY,
        Permission.READ_APP_CONNECTION,
        Permission.WRITE_APP_CONNECTION,
    ],
}
