(function executeRule(current, previous /*null when async*/) {
    var name = (current.name + '').trim();

    // Example: x_1892699_purple_pack_feat_SN-4821_gitlab_committer_retry_20260715
    var pattern = /^x_[a-z0-9]+_[a-z0-9]+_(feat|fix|chore|refactor|hotfix)_[A-Z]{2,10}-\d{1,7}_[a-z0-9]+(?:_[a-z0-9]+){1,8}_\d{8}$/;

    if (!pattern.test(name)) {
        gs.addErrorMessage(
            'Invalid Update Set name. Expected: x_<scope>_<app>_(feat|fix|chore|refactor|hotfix)_<TICKET-123>_<word1>_<word2>[_<word3>...]_YYYYMMDD' +
            ' \u2014 e.g. x_1892699_purple_pack_feat_SN-4821_gitlab_committer_retry_20260715'
        );
        current.setAbortAction(true);
    }
})(current, previous);
