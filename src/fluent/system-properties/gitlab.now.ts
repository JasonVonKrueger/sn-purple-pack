import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['gitlab_url'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.url',
        value: 'https://gitlab.com/servicenow8703321/update-sets.git',
        description: 'GitLab base URL (e.g. https://gitlab.example.com)',
        type: 'string',
        suffix: 'gitlab.url',
        read_roles: ['admin'],
        write_roles: ['admin'],
        ignore_cache: false,
        is_private: false,
    },
})

Record({
    $id: Now.ID['gitlab_token'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.token',
        value: `{{dflt-gpaes}}SI1M3/30Ifa5JZgt0NOm84yQ/CU4eeERMnoNGXVTPPCE9JVVeWZ7BvIUFYaJ98pBUGmDXB7mNzfX
VxtjHYO59w==`,
        description: 'Personal / project access token for GitLab API authentication',
        type: 'password2',
        suffix: 'gitlab.token',
        read_roles: ['admin'],
        write_roles: ['admin'],
        ignore_cache: false,
        is_private: false,
    },
})

Record({
    $id: Now.ID['gitlab_project_id'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.project_id',
        value: '82507261',
        description: 'Numeric project ID or URL-encoded namespace/project path in GitLab',
        type: 'string',
        suffix: 'gitlab.project_id',
        read_roles: ['admin'],
        write_roles: ['admin'],
        ignore_cache: false,
        is_private: false,
    },
})

Record({
    $id: Now.ID['gitlab_branch'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.branch',
        value: 'main',
        description: 'GitLab branch for update sets',
        type: 'string',
        suffix: 'gitlab.branch',
        read_roles: ['admin'],
        write_roles: ['admin'],
        ignore_cache: false,
        is_private: false,
    },
})

Record({
    $id: Now.ID['gitlab_directory'],
    table: 'sys_properties',
    data: {
        name: 'x_1892699_purple_pack.gitlab.directory',
        value: 'update-sets',
        description: 'GitLab directory for update sets',
        type: 'string',
        suffix: 'gitlab.directory',
        read_roles: ['admin'],
        write_roles: ['admin'],
        ignore_cache: false,
        is_private: false,
    },
})
