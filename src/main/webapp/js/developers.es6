(function () {
    function getGitHubLink(username, name) {
        return `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer">${name}</a>`;
    }

    $.getJSON(`${window.location.origin}/js/developers.json`, (data) => {
        $.each(data.contributors, (i, contributor) => {
            const $div = contributor.multiple ? $('#contributors-multiple') : $('#contributors-single');
            $div.append(
                `<li>
                    ${contributor.username ? getGitHubLink(contributor.username, contributor.name) : contributor.name}
                </li>`,
            );
        });

        $.each(data.committers, (i, committer) => {
            const $div = committer.endPeriod ? $('#committers-past') : $('#committers-current');
            $div.append(
                `<li>
                    ${getGitHubLink(committer.username, committer.name)}
                    (${committer.startPeriod} - ${(committer.endPeriod ? committer.endPeriod : '')})
                </li>`,
            );
        });
    });
}());
