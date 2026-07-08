import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['gitlab_url'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.url',
        value: '',
        description: 'GitLab base URL (e.g. https://gitlab.example.com)',
        type: 'string',
        suffix: 'gitlab.url',
        read_roles: ['admin'],
        write_roles: ['admin'],
    },
})

Record({
    $id: Now.ID['gitlab_token'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.token',
        value: '',
        description: 'Personal / project access token for GitLab API authentication',
        type: 'password2',
        suffix: 'gitlab.token',
        read_roles: ['admin'],
        write_roles: ['admin'],
    },
})

Record({
    $id: Now.ID['gitlab_project_id'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.project_id',
        value: '',
        description: 'Numeric project ID or URL-encoded namespace/project path in GitLab',
        type: 'string',
        suffix: 'gitlab.project_id',
        read_roles: ['admin'],
        write_roles: ['admin'],
    },
})
