import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import page from '../../client/index.html'

export const purplePack = UiPage({
    $id: Now.ID['purple-pack-page'],
    endpoint: 'purple_pack.do',
    description: 'Purple Pack - Developer/Admin Tools Suite',
    category: 'general',
    html: page,
    direct: true,
})
