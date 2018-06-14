angular.module('qmSideEffects')

    .service('correlationsVoteHelper', function () {

        this.getPreviouslyVoted = function (correlation) {
            var votedCorrelations = JSON.parse(localStorage.getItem('votedCorrelations'));
            if (votedCorrelations) {
                for (var i = 0; i < votedCorrelations.length; i++) {
                    if (correlation.effectVariableName === votedCorrelations[i].effectVariableName) {
                        if (correlation.causeVariableName === votedCorrelations[i].causeVariableName) {
                            return votedCorrelations[i].like;
                        }
                    }
                }
            }
        };

        this.saveVotedCorrelation = function (correlation, vote) {

            var votedCorrelations = JSON.parse(localStorage.getItem('votedCorrelations'));

            var correlationToSave = {
                causeVariableName: correlation.causeVariableName,
                effectVariableName: correlation.effectVariableName,
                like: vote
            };

            if (votedCorrelations) {
                var found = false;
                for (var i = 0; i < votedCorrelations.length; i++) {
                    if (correlation.effectVariableName === votedCorrelations[i].effectVariableName) {
                        if (correlation.causeVariableName === votedCorrelations[i].causeVariableName) {
                            votedCorrelations[i] = correlationToSave;
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    votedCorrelations.push(correlationToSave);
                }
            } else {
                votedCorrelations = [];
                votedCorrelations.push(correlationToSave);
            }

            localStorage.setItem('votedCorrelations', JSON.stringify(votedCorrelations));

        };

    });