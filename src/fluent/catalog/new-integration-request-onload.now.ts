import '@servicenow/sdk/global'
import { CatalogClientScript } from '@servicenow/sdk/core'
import { newIntegrationRequest } from './new-integration-request.now'

CatalogClientScript({
    $id: Now.ID['new_integration_request_onload'],
    name: 'New Integration Request - Load REST APIs',
    type: 'onLoad',
    catalogItem: newIntegrationRequest,
    active: true,
    script: `function onLoad() {
    var selectedSvcVal = g_form.getValue('api');
    g_form.clearOptions('api');

    if (!selectedSvcVal)
        g_form.addOption('api', '', '-- Select REST API --', 0);

    var otherSvcsNV = {};
    for (var svcName in g_scratchpad.svcOptionInfos) {
        var opVal = svcName;
        var opName = getOpName(svcName, g_scratchpad.svcOptionInfos[svcName]);

        // add selected svc first
        if (opVal === selectedSvcVal)
            g_form.addOption('api', opVal, opName, 0);
        else
            otherSvcsNV[opName] = opVal;
    }

    for (var key in otherSvcsNV) {
        g_form.addOption('api', otherSvcsNV[key], key);
    }
}

function getOpName(svcName, svcInfo) {
    return svcName + '   [' + svcInfo['route'] + ']';
}`,
})
